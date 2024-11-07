import { IPumpToken } from '@/pages/snipe/pump/type'
import {
  ComputeBudgetProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { DEFAULT_SLIPPAGE } from './constant'
import bs58 from 'bs58'
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  transfer,
} from '@solana/spl-token'
import { IBuyerObj } from '@/pages/snipe/type'
import { connectionConfirmedList } from '@/utils/SOL_Util'

const GLOBAL = new PublicKey('4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf')
const FEE_RECIPIENT = new PublicKey('CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM')
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
const RENT = new PublicKey('SysvarRent111111111111111111111111111111111')
const PUMP_FUN_PROGRAM = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P')
const PUMP_FUN_ACCOUNT = new PublicKey('Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1')
const SYSTEM_PROGRAM_ID = SystemProgram.programId

export const getBuyKeys = (
  coinData: IPumpToken,
  wallet: Keypair,
  tokenAccountAddress: PublicKey,
  mintPubkey: PublicKey,
) => {
  return [
    { pubkey: GLOBAL, isSigner: false, isWritable: false },
    { pubkey: FEE_RECIPIENT, isSigner: false, isWritable: true },
    { pubkey: mintPubkey, isSigner: false, isWritable: false },
    {
      pubkey: new PublicKey(coinData.bonding_curve),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(coinData.associated_bonding_curve),
      isSigner: false,
      isWritable: true,
    },
    { pubkey: tokenAccountAddress, isSigner: false, isWritable: true },
    { pubkey: wallet.publicKey, isSigner: false, isWritable: true },
    { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: RENT, isSigner: false, isWritable: false },
    { pubkey: PUMP_FUN_ACCOUNT, isSigner: false, isWritable: false },
    { pubkey: PUMP_FUN_PROGRAM, isSigner: false, isWritable: false },
  ]
}

export const createTransaction = async (connection, instructions, payer, priorityFeeInSol = 0) => {
  const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
    units: 1400000,
  })
  const transaction = new Transaction().add(modifyComputeUnits)
  if (priorityFeeInSol > 0) {
    const microLamports = priorityFeeInSol * 1_000_000_000
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports,
    })
    transaction.add(addPriorityFee)
  }
  transaction.add(...instructions)
  transaction.feePayer = payer
  transaction.recentBlockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  return transaction
}

export const bufferFromUInt64 = (value) => {
  const buffer = Buffer.alloc(8)
  const view = new DataView(buffer.buffer)
  view.setBigUint64(0, BigInt(value), true) // true 表示使用小端字节序
  return buffer
}

export const getWallet = (privateKey: string) => {
  // 解码 Base58 编码的私钥
  const privateKeyUint8Array = bs58.decode(privateKey)
  const buyerPrivateKey = Uint8Array.from(privateKeyUint8Array)
  return Keypair.fromSecretKey(buyerPrivateKey)
}

export const getBuyInstructions = async (
  coinData: IPumpToken,
  buyer: IBuyerObj,
  slippage = DEFAULT_SLIPPAGE,
  index: number,
): Promise<TransactionInstruction[]> => {
  const slippageDecimal = slippage / 100

  const { privateKey, amount } = buyer
  const solAmount = Number(amount)
  const wallet = getWallet(privateKey)

  const mintPubkey = new PublicKey(coinData.mint)
  const tokenAccountAddress = await getAssociatedTokenAddress(mintPubkey, wallet.publicKey, false)
  // const connection = connectionList[index % connectionList.length]
  // const tokenAccountInfo = await connection.getAccountInfo(tokenAccountAddress)
  const instructions: any[] = []
  // instructions.push(getOrCreateAssociatedTokenAccount(connection, wallet, mintPubkey, wallet.publicKey))
  // 既然是狙击，肯定是没有ATA的，直接创建，避免查询一次getAccountInfo
  // if (!tokenAccountInfo) {
  instructions.push(
    createAssociatedTokenAccountInstruction(wallet.publicKey, tokenAccountAddress, wallet.publicKey, mintPubkey),
  )
  // }

  const solInLamports = solAmount * LAMPORTS_PER_SOL
  const tokenOut = Math.floor((solInLamports * coinData.virtual_token_reserves) / coinData.virtual_sol_reserves)
  const solInWithSlippage = solAmount * (1 + slippageDecimal)
  const maxSolCost = Math.floor(solInWithSlippage * LAMPORTS_PER_SOL)

  const keys = getBuyKeys(coinData, wallet, tokenAccountAddress, mintPubkey)
  const data = Buffer.concat([
    bufferFromUInt64('16927863322537952870'),
    bufferFromUInt64(tokenOut),
    bufferFromUInt64(maxSolCost),
  ])

  const instruction = new TransactionInstruction({
    keys: keys,
    programId: PUMP_FUN_PROGRAM,
    data: data,
  })
  instructions.push(instruction)
  return instructions
}

export const transferAllTokens = async (senderWallet: Keypair, mintPubkey: PublicKey, receiverAddress, index) => {
  // 发送交易并确认，这个要选Confirmed级别的，避免创建ATA账户后没立刻取到
  const connection = connectionConfirmedList[index % connectionConfirmedList.length]
  // 接收者的钱包地址
  const recipientPublicKey = new PublicKey(receiverAddress)
  // 获取或创建发送者的 Associated Token Account (ATA)
  const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    senderWallet, // 发送者的钱包
    mintPubkey, // 代币的 mint 地址
    senderWallet.publicKey, // 发送者的钱包地址
  )

  // 获取发送者账户的 SPL 代币余额
  const senderTokenAccountInfo = await getAccount(connection, senderTokenAccount.address)
  const senderBalance = senderTokenAccountInfo.amount // 代币余额 (单位为最小单位，如 10^6)
  if (senderBalance === 0n) {
    console.log('The sender has no tokens to transfer.')
    return
  }

  // 获取或创建接收者的 Associated Token Account (ATA)
  const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    senderWallet, // 发送者的钱包 (支付手续费)
    mintPubkey, // 代币的 mint 地址
    recipientPublicKey, // 接收者的钱包地址
    undefined,
    'confirmed',
    {
      commitment: 'confirmed',
    },
  )
  const signature = await transfer(
    connection,
    senderWallet,
    senderTokenAccount.address, // 发送者的代币账户地址
    recipientTokenAccount.address, // 接收者的代币账户地址
    senderWallet.publicKey, // 发送者的公共地址（签名者）
    senderBalance, // 转账金额 (单位为代币的最小单位，通常是小数点后的精度)
    [],
    {
      skipPreflight: true,
      maxRetries: 2,
      commitment: 'confirmed',
    },
  )
  return signature
}
