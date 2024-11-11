import {
  Commitment,
  Connection,
  Finality,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { Program, Provider } from '@coral-xyz/anchor'
import { GlobalAccount } from './globalAccount'
import {
  CompleteEvent,
  CreateEvent,
  CreateTokenMetadata,
  PriorityFee,
  PumpFunEventHandlers,
  PumpFunEventType,
  SetParamsEvent,
  TradeEvent,
  TransactionResult,
} from './types'
import { toCompleteEvent, toCreateEvent, toSetParamsEvent, toTradeEvent } from './events'
import { createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress } from '@solana/spl-token'
import { BondingCurveAccount } from './bondingCurveAccount'
import { BN } from 'bn.js'
import {
  DEFAULT_COMMITMENT,
  DEFAULT_FINALITY,
  calculateWithSlippageBuy,
  calculateWithSlippageSell,
  sendTx,
} from './util'
import { PumpFun, IDL } from './IDL'
// import { IBuyerObj, TaskMeta } from '../../../type/task';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'
// import { getPumpfunTax } from '../../../utils/tax';
// import { UserMeta } from '../../../type/user'
import { JitoJsonRpcClient } from '@/utils/jito'
import { IBuyerObj } from '../type'
// import { JitoJsonRpcClient } from '../../../utils/jito';

const PROGRAM_ID = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
const MPL_TOKEN_METADATA_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'

export const GLOBAL_ACCOUNT_SEED = 'global'
export const MINT_AUTHORITY_SEED = 'mint-authority'
export const BONDING_CURVE_SEED = 'bonding-curve'
export const METADATA_SEED = 'metadata'

export const DEFAULT_DECIMALS = 6

const TAX_PublicKey = new PublicKey('GWWa7UcBKFUQfFJcc2eU5ZpGyrN1xNrfrkxg285S1K4G')

export class PumpFunSDK {
  public program: Program<PumpFun>
  public connection: Connection
  constructor(provider?: Provider) {
    this.program = new Program<PumpFun>(IDL as PumpFun, provider)
    this.connection = this.program.provider.connection
  }

  getWallet(privateKey: string) {
    // 解码 Base58 编码的私钥
    const privateKeyUint8Array = bs58.decode(privateKey)
    const buyerPrivateKey = Uint8Array.from(privateKeyUint8Array)
    return Keypair.fromSecretKey(buyerPrivateKey)
  }

  async createAndBuy(
    privateKey: string,
    buyers: IBuyerObj[],
    mint: Keypair,
    tokenMetadata: CreateTokenMetadata,
    metadataUri: string,
    // task: TaskMeta,
    customLog: any,
    slippageBasisPoints: bigint = 500n,
    commitment: Commitment = DEFAULT_COMMITMENT,
  ): Promise<{
    success: boolean
  }> {
    const wallets: Keypair[] = []
    for (let index = 0; index < buyers.length; index++) {
      const buyer = buyers[index]
      wallets.push(this.getWallet(buyer.privateKey))
    }
    // 构造create的交易
    const creatorWallet = this.getWallet(privateKey)
    let createTx = await this.getCreateInstructions(
      creatorWallet.publicKey,
      tokenMetadata.name,
      tokenMetadata.symbol,
      metadataUri,
      mint,
    )
    let creatorJitoTx = new Transaction().add(...createTx.instructions)
    // const createBuyer = buyers.find((buyer) => buyer.privateKey === privateKey);
    // if (createBuyer) {
    //   const buyInstructions = await this.getBuyInstructionWithFee(createBuyer, mint, task.user, slippageBasisPoints, commitment);
    //   creatorJitoTx.add(...buyInstructions);
    // }

    const jitoTxs: Transaction[] = [creatorJitoTx]
    const jitoSigners: Keypair[][] = [[creatorWallet, mint]]
    // 构造其他buy的交易，每4个组成一个交易
    buyers = buyers.filter((buyer) => buyer.privateKey !== privateKey)
    if (buyers.length > 0) {
      const jitoTxCnt = Math.ceil(buyers.length / 4)
      for (let index = 0; index < jitoTxCnt; index++) {
        jitoTxs.push(new Transaction())
        jitoSigners.push([])
      }
      for (let index = 0; index < buyers.length; index++) {
        const buyer = buyers[index]
        const buyInstructions = await this.getBuyInstructionWithFee(
          buyer,
          mint,
          // task.user,
          slippageBasisPoints,
          commitment,
        )
        // index从0开始，index在[0,3]时，进入第一批，所以这里是index+1
        const jitoIndex = Math.ceil((index + 1) / 4)
        jitoTxs[jitoIndex].add(...buyInstructions)
        jitoSigners[jitoIndex].push(this.getWallet(buyer.privateKey))
      }
    }

    // 发起jito bundle
    const base58EncodedTransactions: string[] = []
    const jitoClient = new JitoJsonRpcClient('https://mainnet.block-engine.jito.wtf/api/v1', '')
    const randomTipAccount = await jitoClient.getRandomTipAccount()
    const jitoTipAccount = new PublicKey(randomTipAccount)
    const jitoTipAmount = 1000000 // lamports
    // Add Jito tip instruction
    const { blockhash } = await this.connection.getLatestBlockhash()
    for (let idx = 0; idx < jitoTxs.length; idx++) {
      const jitoTx = jitoTxs[idx]
      const signers = jitoSigners[idx]
      jitoTx.add(
        SystemProgram.transfer({
          fromPubkey: signers[0].publicKey,
          toPubkey: jitoTipAccount,
          lamports: jitoTipAmount,
        }),
      )
      jitoTx.recentBlockhash = blockhash
      jitoTx.feePayer = signers[0].publicKey
      jitoTx.sign(...signers)
      // Serialize and base58 encode the entire signed transaction
      const serializedTransaction = jitoTx.serialize({ verifySignatures: false })
      base58EncodedTransactions.push(bs58.encode(serializedTransaction))
    }

    try {
      // Send the bundle using sendBundle method
      const result = await jitoClient.sendBundle([base58EncodedTransactions])
      customLog('Bundle send result:', result)
      const bundleId = result.result
      customLog('Bundle ID:', bundleId)

      // Wait for confirmation with a longer timeout
      const inflightStatus = await jitoClient.confirmInflightBundle(bundleId, 180000) // 180 seconds timeout
      console.log('Inflight bundle status:', inflightStatus)

      if (inflightStatus.confirmation_status === 'confirmed') {
        customLog(`✅ Bundle successfully confirmed on-chain at slot ${inflightStatus.slot}`)
        // Additional check for bundle finalization
        try {
          customLog('Attempting to get bundle status...')
          const finalStatus = await jitoClient.getBundleStatuses([[bundleId]]) // Note the double array
          console.log('Final bundle status response:', finalStatus)
          if (finalStatus.result && finalStatus.result.value && finalStatus.result.value.length > 0) {
            const status = finalStatus.result.value[0]
            customLog('Confirmation status:', status.confirmation_status)
            const explorerUrl = `https://explorer.jito.wtf/bundle/${bundleId}`
            customLog(`Bundle Explorer URL: <a target='_blank' href='${explorerUrl}'>${explorerUrl}</a>`)
            console.log('Final bundle details:', status)

            // Updated section to handle and display multiple transactions
            if (status.transactions && status.transactions.length > 0) {
              customLog(
                `✅ Transaction URLs (${status.transactions.length} transaction${
                  status.transactions.length > 1 ? 's' : ''
                } in this bundle):`,
              )
              status.transactions.forEach((txId, index) => {
                const txUrl = `https://solscan.io/tx/${txId}`
                customLog(`Transaction ${index + 1}: <a target='_blank' href='${txUrl}'>${txUrl}</a>`)
              })
              if (status.transactions.length === 5) {
                customLog('Note: This bundle has reached the maximum of 5 transactions.')
              }
              // 只在这里返回success，不要轻易返回success，避免没收到手续费反而给了佣金
              return { success: true }
            } else {
              customLog('No transactions found in the bundle status.')
              return { success: false }
            }
          } else {
            customLog('Unexpected final bundle status response structure')
            return { success: false }
          }
        } catch (statusError: any) {
          customLog('Error fetching final bundle status:', statusError.message)
          if (statusError.response && statusError.response.data) {
            customLog('Server response:', statusError.response.data)
          }
          return { success: false }
        }
      } else if (inflightStatus.err) {
        customLog('❌ Bundle processing failed:', JSON.stringify(inflightStatus.err))
        return { success: false }
      } else {
        customLog('❌ Unexpected inflight bundle status:', JSON.stringify(inflightStatus))
        return { success: false }
      }
    } catch (error: any) {
      customLog('Error sending or confirming bundle:', JSON.stringify(error))
      if (error.response && error.response.data) {
        customLog('Server response:', JSON.stringify(error.response.data))
      }
      return { success: false }
    }
  }

  async getBuyInstructionWithFee(
    buyer: IBuyerObj,
    mint: Keypair,
    // user: UserMeta,
    slippageBasisPoints: bigint = 500n,
    commitment: Commitment = DEFAULT_COMMITMENT,
  ): Promise<TransactionInstruction[]> {
    const buyAmountSol = BigInt(Number(buyer.amount) * LAMPORTS_PER_SOL)
    const globalAccount = await this.getGlobalAccount(commitment)
    const buyAmount = globalAccount.getInitialBuyPrice(buyAmountSol)
    const buyAmountWithSlippage = calculateWithSlippageBuy(buyAmountSol, slippageBasisPoints)
    const wallet = this.getWallet(buyer.privateKey)
    // 购买交易
    const buyTx = await this.getBuyInstructions(
      wallet.publicKey,
      mint.publicKey,
      globalAccount.feeRecipient,
      buyAmount,
      buyAmountWithSlippage,
    )
    // 手续费交易
    // const fee_discount = Number(user.fee_discount);
    // if (fee_discount < 100 && Number(buyer.amount) > 0) {
    //   const feeInstruction = SystemProgram.transfer({
    //     fromPubkey: wallet.publicKey,
    //     toPubkey: TAX_PublicKey,
    //     lamports: getPumpfunTax(Number(buyer.amount), fee_discount),
    //   });
    //   return [...buyTx.instructions, feeInstruction];
    // }
    return [...buyTx.instructions]
  }

  async buy(
    buyer: Keypair,
    mint: PublicKey,
    buyAmountSol: bigint,
    slippageBasisPoints: bigint = 500n,
    priorityFees?: PriorityFee,
    commitment: Commitment = DEFAULT_COMMITMENT,
    finality: Finality = DEFAULT_FINALITY,
  ): Promise<TransactionResult> {
    let buyTx = await this.getBuyInstructionsBySolAmount(
      buyer.publicKey,
      mint,
      buyAmountSol,
      slippageBasisPoints,
      commitment,
    )

    let buyResults = await sendTx(this.connection, buyTx, buyer.publicKey, [buyer], priorityFees, commitment, finality)
    return buyResults
  }

  async sell(
    seller: Keypair,
    mint: PublicKey,
    sellTokenAmount: bigint,
    slippageBasisPoints: bigint = 500n,
    priorityFees?: PriorityFee,
    commitment: Commitment = DEFAULT_COMMITMENT,
    finality: Finality = DEFAULT_FINALITY,
  ): Promise<TransactionResult> {
    let sellTx = await this.getSellInstructionsByTokenAmount(
      seller.publicKey,
      mint,
      sellTokenAmount,
      slippageBasisPoints,
      commitment,
    )

    let sellResults = await sendTx(
      this.connection,
      sellTx,
      seller.publicKey,
      [seller],
      priorityFees,
      commitment,
      finality,
    )
    return sellResults
  }

  //create token instructions
  async getCreateInstructions(creator: PublicKey, name: string, symbol: string, uri: string, mint: Keypair) {
    const mplTokenMetadata = new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)

    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from(METADATA_SEED), mplTokenMetadata.toBuffer(), mint.publicKey.toBuffer()],
      mplTokenMetadata,
    )

    const associatedBondingCurve = await getAssociatedTokenAddress(
      mint.publicKey,
      this.getBondingCurvePDA(mint.publicKey),
      true,
    )

    return this.program.methods
      .create(name, symbol, uri)
      .accounts({
        mint: mint.publicKey,
        associatedBondingCurve: associatedBondingCurve,
        metadata: metadataPDA,
        user: creator,
      })
      .signers([mint])
      .transaction()
  }

  async getBuyInstructionsBySolAmount(
    buyer: PublicKey,
    mint: PublicKey,
    buyAmountSol: bigint,
    slippageBasisPoints: bigint = 500n,
    commitment: Commitment = DEFAULT_COMMITMENT,
  ) {
    let bondingCurveAccount = await this.getBondingCurveAccount(mint, commitment)
    if (!bondingCurveAccount) {
      throw new Error(`Bonding curve account not found: ${mint.toBase58()}`)
    }

    let buyAmount = bondingCurveAccount.getBuyPrice(buyAmountSol)
    let buyAmountWithSlippage = calculateWithSlippageBuy(buyAmountSol, slippageBasisPoints)

    let globalAccount = await this.getGlobalAccount(commitment)

    return await this.getBuyInstructions(buyer, mint, globalAccount.feeRecipient, buyAmount, buyAmountWithSlippage)
  }

  //buy
  async getBuyInstructions(
    buyer: PublicKey,
    mint: PublicKey,
    feeRecipient: PublicKey,
    amount: bigint,
    solAmount: bigint,
    commitment: Commitment = DEFAULT_COMMITMENT,
  ) {
    const associatedBondingCurve = await getAssociatedTokenAddress(mint, this.getBondingCurvePDA(mint), true)

    const associatedUser = await getAssociatedTokenAddress(mint, buyer, false)

    let transaction = new Transaction()

    try {
      await getAccount(this.connection, associatedUser, commitment)
    } catch (e) {
      transaction.add(createAssociatedTokenAccountInstruction(buyer, associatedUser, buyer, mint))
    }

    transaction.add(
      await this.program.methods
        .buy(new BN(amount.toString()), new BN(solAmount.toString()))
        .accounts({
          feeRecipient: feeRecipient,
          mint: mint,
          associatedBondingCurve: associatedBondingCurve,
          associatedUser: associatedUser,
          user: buyer,
        })
        .transaction(),
    )

    return transaction
  }

  //sell
  async getSellInstructionsByTokenAmount(
    seller: PublicKey,
    mint: PublicKey,
    sellTokenAmount: bigint,
    slippageBasisPoints: bigint = 500n,
    commitment: Commitment = DEFAULT_COMMITMENT,
  ) {
    let bondingCurveAccount = await this.getBondingCurveAccount(mint, commitment)
    if (!bondingCurveAccount) {
      throw new Error(`Bonding curve account not found: ${mint.toBase58()}`)
    }

    let globalAccount = await this.getGlobalAccount(commitment)

    let minSolOutput = bondingCurveAccount.getSellPrice(sellTokenAmount, globalAccount.feeBasisPoints)

    let sellAmountWithSlippage = calculateWithSlippageSell(minSolOutput, slippageBasisPoints)

    return await this.getSellInstructions(
      seller,
      mint,
      globalAccount.feeRecipient,
      sellTokenAmount,
      sellAmountWithSlippage,
    )
  }

  async getSellInstructions(
    seller: PublicKey,
    mint: PublicKey,
    feeRecipient: PublicKey,
    amount: bigint,
    minSolOutput: bigint,
  ) {
    const associatedBondingCurve = await getAssociatedTokenAddress(mint, this.getBondingCurvePDA(mint), true)

    const associatedUser = await getAssociatedTokenAddress(mint, seller, false)

    let transaction = new Transaction()

    transaction.add(
      await this.program.methods
        .sell(new BN(amount.toString()), new BN(minSolOutput.toString()))
        .accounts({
          feeRecipient: feeRecipient,
          mint: mint,
          associatedBondingCurve: associatedBondingCurve,
          associatedUser: associatedUser,
          user: seller,
        })
        .transaction(),
    )

    return transaction
  }

  async getBondingCurveAccount(mint: PublicKey, commitment: Commitment = DEFAULT_COMMITMENT) {
    const tokenAccount = await this.connection.getAccountInfo(this.getBondingCurvePDA(mint), commitment)
    if (!tokenAccount) {
      return null
    }
    return BondingCurveAccount.fromBuffer(tokenAccount!.data)
  }

  async getGlobalAccount(commitment: Commitment = DEFAULT_COMMITMENT) {
    const [globalAccountPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from(GLOBAL_ACCOUNT_SEED)],
      new PublicKey(PROGRAM_ID),
    )

    const tokenAccount = await this.connection.getAccountInfo(globalAccountPDA, commitment)

    return GlobalAccount.fromBuffer(tokenAccount!.data)
  }

  getBondingCurvePDA(mint: PublicKey) {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(BONDING_CURVE_SEED), mint.toBuffer()],
      this.program.programId,
    )[0]
  }

  //EVENTS
  addEventListener<T extends PumpFunEventType>(
    eventType: T,
    callback: (event: PumpFunEventHandlers[T], slot: number, signature: string) => void,
  ) {
    return this.program.addEventListener(eventType, (event: any, slot: number, signature: string) => {
      let processedEvent
      switch (eventType) {
        case 'createEvent':
          processedEvent = toCreateEvent(event as CreateEvent)
          callback(processedEvent as PumpFunEventHandlers[T], slot, signature)
          break
        case 'tradeEvent':
          processedEvent = toTradeEvent(event as TradeEvent)
          callback(processedEvent as PumpFunEventHandlers[T], slot, signature)
          break
        case 'completeEvent':
          processedEvent = toCompleteEvent(event as CompleteEvent)
          callback(processedEvent as PumpFunEventHandlers[T], slot, signature)
          console.log('completeEvent', event, slot, signature)
          break
        case 'setParamsEvent':
          processedEvent = toSetParamsEvent(event as SetParamsEvent)
          callback(processedEvent as PumpFunEventHandlers[T], slot, signature)
          break
        default:
          console.error('Unhandled event type:', eventType)
      }
    })
  }

  removeEventListener(eventId: number) {
    this.program.removeEventListener(eventId)
  }
}
