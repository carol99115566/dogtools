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
import { PriorityFee, SUPE_COLLECTION } from './types'
import { createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress } from '@solana/spl-token'
import { SUPE_IDL_JSON } from './idl'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'
import { defaultConnection } from '../SOL_Util'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { AnchorProvider } from '@project-serum/anchor'
import { IBuyerObj } from '@/pages/snipe/type'
import { sendTx } from './utils'

const connection = defaultConnection
const TAX_PublicKey = new PublicKey('GWWa7UcBKFUQfFJcc2eU5ZpGyrN1xNrfrkxg285S1K4G')

export class SupeSDK {
  public program: Program
  public connection: Connection
  constructor(provider?: Provider) {
    // @ts-ignore
    this.program = new Program(SUPE_IDL_JSON, provider)
    this.connection = this.program.provider.connection
  }

  getWallet(privateKey: string) {
    // 解码 Base58 编码的私钥
    const privateKeyUint8Array = bs58.decode(privateKey)
    const buyerPrivateKey = Uint8Array.from(privateKeyUint8Array)
    return Keypair.fromSecretKey(buyerPrivateKey)
  }

  async mintCollection(
    collection: SUPE_COLLECTION,
    mintNumber: number,
    buyerObjs: IBuyerObj[],
    customLog,
  ): Promise<{
    success: boolean
  }> {
    console.log('mintCollection collection', collection)
    customLog('Processing...')
    // 逐个钱包操作购买
    for (let index = 0; index < buyerObjs.length; index++) {
      const buyerObj = buyerObjs[index]
      const wallet = this.getWallet(buyerObj.privateKey)
      // 创建 mintCnftNative 方法调用的 Instruction
      const tx = new Transaction()
      for (let index = 0; index < mintNumber; index++) {
        const instruction = await this.getMintCnftNativeIx(collection, wallet.publicKey)
        tx.add(instruction)
      }
      const res = await sendTx(connection, tx, wallet.publicKey, [wallet], customLog, {
        unitPrice: 500000,
      })
      if (!res.success) {
        const err = res.error as any
        customLog('❌ Error: ', err.message, JSON.stringify(err))
      }
    }
    return {
      success: true,
    }
  }

  async getMintCnftNativeIx(collection: SUPE_COLLECTION, buyer: PublicKey) {
    return await this.program.methods
      .mintCnftNative()
      .accounts({
        payer: buyer,
        leafOwner: buyer,
        leafDelegate: buyer,
        tree: new PublicKey(collection.tree),
        treeConfig: new PublicKey(collection.tree_config),
        collectionConfig: new PublicKey(collection.collection_config),
        platformTreasury: new PublicKey('2pw9hArdNoY9Q4tYt54fZSWC3hfNhtStf1aXKCbHFfNE'),
        bubblegumSigner: new PublicKey('4ewWZC5gT6TGpm5LZNDs9wVonfUT2q5PP5sc9kVbwMAK'),
        collectionMint: new PublicKey(collection.mint),
        collectionMetadata: new PublicKey(collection.metadata),
        collectionMasterEdition: new PublicKey(collection.master_edition),
      })
      .instruction()
  }
}

const wallet = new NodeWallet(new Keypair()) //note this is not used
const provider = new AnchorProvider(connection, wallet, {
  commitment: 'finalized',
})
// @ts-ignore
export const supeSDK = new SupeSDK(provider)
