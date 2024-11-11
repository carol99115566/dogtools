import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SendTransactionError } from '@solana/web3.js'
import { TASK_STATUS, TaskMeta } from '../../type/task'
// import { getCurrentTime, sleep } from '../../utils/utils';
import { PumpFunSDK } from './pumpdotfun-sdk'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { AnchorProvider } from '@coral-xyz/anchor'
import { transferAllTokens } from '@/utils/SOL_Util'
import { getCurrentTime, sleep } from '@/utils/utils'
import { HELIUS_RPC_URL } from '@/utils/constant'
const { convert } = require('html-to-text')

const apiKeyList = [
  '646ac21d-4a7a-4516-a5d8-be926d1a9434',
  'a6c921f9-ebd2-4f74-b799-ae184e2b5d1e',
  'bb54f357-b5d6-4fa0-86f1-604158e102a1',
  '442f35bf-48ea-42c6-a0ec-d0e6248499c1',
]
export const connectionConfirmedList = apiKeyList.map((apiKey) => {
  return new Connection(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
    commitment: 'confirmed',
  })
})

export const createAndBuy = async (privateKey, buyers, tokenMetadata, metadataUri, customLog) => {
  let connection = new Connection(HELIUS_RPC_URL || '')
  let wallet = new NodeWallet(new Keypair()) //note this is not used
  const provider = new AnchorProvider(connection, wallet, {
    commitment: 'finalized',
  })
  let sdk = new PumpFunSDK(provider)
  const mint = Keypair.generate()
  let boundingCurveAccount = await sdk.getBondingCurveAccount(mint.publicKey)
  console.log('boundingCurveAccount', boundingCurveAccount)
  if (boundingCurveAccount) {
    // onBundleFinished({
    //   success: false,
    // });
    // close()
    return
  }

  // 还是要加一些priorityFees的，否则容易遇到 Signature xxx has expired: block height exceeded
  const createResults = await sdk.createAndBuy(privateKey, buyers, mint, tokenMetadata, metadataUri, customLog)
  if (createResults.success) {
    customLog?.(`[confirmed]<a target='_blank' href='https://solscan.io/tx/${createResults.signature}'>Solscan</a>`)
    const mintAddress = mint.publicKey.toBase58()
    const coinUrl = `https://pump.fun/${mintAddress}`
    customLog(`[url]: <a target='_blank' href='${coinUrl}'>${coinUrl}</a>`)

    // 处理receiverAddress
    // const promises: Promise<any>[] = []
    // for (let index = 0; index < buyers.length; index++) {
    //   const buyer = buyers[index]
    //   if (buyer.receiverAddress) {
    //     // 分批，让connectionList里的每个connection，同时只处理一条交易
    //     const batchIndex = Math.floor(index / connectionConfirmedList.length)
    //     if (batchIndex > 0) {
    //       await sleep(batchIndex * 1000)
    //     }
    //     const connection = connectionConfirmedList[index % connectionConfirmedList.length]
    //     const mintPubKey = new PublicKey(mintAddress)
    //     promises.push(
    //       transferAllTokens(connection, sdk.getWallet(buyer.privateKey), mintPubKey, buyer.receiverAddress, customLog),
    //     )
    //   }
    //   await Promise.allSettled(promises)
    // }
  } else if (createResults.error) {
    const err: any = createResults.error
    customLog('❌ Error: ', err.message, JSON.stringify(err))
  }
  console.log('createResults', createResults)
  //   onBundleFinished({
  //     success: createResults.success,
  //   });
  //   close();
}
