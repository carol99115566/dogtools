import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
  TransactionError,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
import { IWalletMeta } from '@/type/wallet'
const { createMint } = require('@solana/spl-token')
// const { Metaplex, bundlrStorage, keypairIdentity } = require('@metaplex-foundation/js')
import { Result, SOLTokenInfo } from '@/type/token'
import bs58 from 'bs58'
import { Wallet, web3 } from '@project-serum/anchor'
import { SOL_RPC_ENDPOINT_DEV, SOL_RPC_ENDPOINT_MAIN } from './constant'
import { IBuyerWalletsManage, IBuyerWalletsWithBalance, IBuyers } from '@/type/wallet'
// 初始化连接
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

const apiKeyList = [
  '646ac21d-4a7a-4516-a5d8-be926d1a9434',
  'a6c921f9-ebd2-4f74-b799-ae184e2b5d1e',
  'bb54f357-b5d6-4fa0-86f1-604158e102a1',
  '442f35bf-48ea-42c6-a0ec-d0e6248499c1',
]
export const connectionList = apiKeyList.map((apiKey) => {
  return new Connection(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`)
})
export const connectionConfirmedList = apiKeyList.map((apiKey) => {
  return new Connection(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
    commitment: 'confirmed',
  })
})

export const defaultConnection = connectionConfirmedList[connectionConfirmedList.length - 1]

// export async function createToken(
//   input: SOLTokenInfo,
//   privateKey: string,
// ): Promise<Result<{ tokenId: string; txSignature: string }, string>> {
//   try {
//     const { decimals, name, image, symbol, website, telegram, twitter, url, initialMintingAmount, description } = input
//     const metadata = {} as any
//     metadata.name = name
//     metadata.symbol = symbol
//     metadata.description = description || ''
//     metadata.extensions = { website: '', twitter: '', telegram: '' }
//     metadata.extensions.website = website
//     metadata.extensions.twitter = twitter
//     metadata.extensions.telegram = telegram
//     metadata.tags = []
//     metadata.creator = {
//       name: 'DEXLAB MINTING LAB',
//       site: 'https://www.dexlab.space',
//     }
//     if (image) metadata.image = image
//     console.log({ input })
//     console.log({ metadata })

//     const keypair = getKeypairFromStr(privateKey)
//     const wallet = new Wallet(keypair)
//     const endpoint = url == 'mainnet' ? SOL_RPC_ENDPOINT_MAIN : SOL_RPC_ENDPOINT_DEV
//     const baseMpl = new BaseMpl(wallet, { endpoint })

//     let ipfsHash = 'Null'
//     if (ENV.IN_PRODUCTION) {
//       console.log('Deploying json metadata')
//       const hash = await deployJsonData(metadata).catch(() => null)
//       console.log('Deployed json metadata')
//       if (!hash) {
//         return { Err: 'failed to deploy json metadata' }
//       }
//       ipfsHash = hash
//     }
//     if (!ipfsHash) throw 'Failed to deploy metadata'
//     const uri = `https://${ENV.PINATA_DOMAIN}/ipfs/${ipfsHash}`

//     console.log('Creating token')
//     const res = await baseMpl.createToken(
//       {
//         name,
//         uri,
//         symbol,
//         sellerFeeBasisPoints: 0,
//         tokenStandard: TokenStandard.Fungible,
//         creators: [{ address: wallet.publicKey, share: 100 }],
//       },
//       {
//         decimal: decimals,
//         mintAmount: initialMintingAmount ?? 0,
//         revokeAuthorities: input.revokeAuthorities,
//       },
//     )

//     if (!res) {
//       return { Err: 'Failed to send the transation' }
//     }

//     // console.log(`DEPLOYED TO ${res.token}, UPDATING METADATA`)
//     // await updateMetadata(res.token, input)

//     return {
//       Ok: {
//         txSignature: res.txSignature,
//         tokenId: res.token,
//       },
//     }
//   } catch (error) {
//     log({ error })
//     return { Err: 'failed to create the token' }
//   }
// }

//
export const createWalletsForSOL = async (count: number) => {
  const newWallets: IWalletMeta[] = []
  for (let i = 0; i < count; i++) {
    const wallet = Keypair.generate()
    newWallets.push({
      address: wallet.publicKey.toString(),
      privateKey: bs58.encode(wallet.secretKey),
    })
  }
  return newWallets
}

// 批量转账
export const batchtransfer = async (privateKey: string, wallets: string[], amount: number): Promise<string[]> => {
  const batchSize = 5 // 每批次交易包含的转账指令数量
  const sender = getKeypairFromStr(privateKey)
  console.log('开始批量转账咯', privateKey, wallets, amount)
  const balance = await defaultConnection.getBalance(sender.publicKey)
  console.log('发送方账户余额:', balance / 1000000000, 'SOL')

  try {
    const rentExemptionBalance = await connection.getMinimumBalanceForRentExemption(0)
    console.log('租金豁免所需最低 SOL:', rentExemptionBalance / 1000000000, 'SOL')

    const balance = await connection.getBalance(sender.publicKey)
    console.log('发送方账户余额:', balance / 1000000000, 'SOL')
    let transactionTimes = 0
    const errResults: string[] = []
    for (let i = 0; i < wallets.length; i += batchSize) {
      const transaction = new Transaction()

      const batch = wallets.slice(i, i + batchSize)
      for (const address of batch) {
        const recipient = new PublicKey(address)

        // 查看接收方地址是否初始化
        const recipientAccountInfo = await connection.getAccountInfo(recipient)
        if (!recipientAccountInfo) {
          console.log('接收方账户未初始化，转账初始化:', address)
          if (amount * 1000000000 < rentExemptionBalance) {
            console.error(`无法向 ${address} 转账，因为金额不足以支付账户初始化租金.`)
            errResults.push(`无法向 ${address} 转账，因为金额不足以支付账户初始化租金.`)
            continue
          }
        }
        transactionTimes++
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: recipient,
            lamports: amount * 1000000000,
          }),
        )
      }
      if (transactionTimes > 0) {
        // 发送并确认当前批次交易
        const signature = await sendAndConfirmTransaction(defaultConnection, transaction, [sender])
        console.log(`批次 ${Math.floor(i / batchSize) + 1} 转账成功，交易签名：`, signature)
        // return true
      }
    }
    return errResults
  } catch (error) {
    throw error
  }
}

export async function getBalanceForRent(): Promise<number> {
  const rentExemptionBalance = await connection.getMinimumBalanceForRentExemption(0)
  console.log('租金豁免所需最低 SOL:', rentExemptionBalance / 1000000000, 'SOL')
  return rentExemptionBalance
}

// 通过私钥获取余额
export async function getBalanceByPrivateKey(privateKey: string): Promise<number | undefined> {
  const keypair = getKeypairFromStr(privateKey)
  if (keypair) {
    const balance = await defaultConnection.getBalance(keypair.publicKey)
    console.log('SOL - getBalanceByPrivateKey', privateKey, balance)
    return balance / 1000000000
  }
  return undefined
}

// 钱包管理获取有余额的大数组
export async function getBuyerBalanceWallets(wallets: IBuyerWalletsManage[]): Promise<IBuyerWalletsWithBalance[]> {
  const resultWallets: IBuyerWalletsWithBalance[] = []
  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i]
    const buyers: IBuyers[] = []
    for (const privateKey of wallet.buyers) {
      const keypair = getKeypairFromStr(privateKey)
      const balance = await defaultConnection.getBalance(keypair.publicKey)
      buyers.push({
        privateKey: privateKey,
        balance: balance,
      })
    }
    resultWallets.push({
      name: wallet.name,
      chain: wallet.chain,
      buyers: buyers,
    })
  }
  return resultWallets
}

// 通过私钥获取钱包
export function getKeypairFromStr(str: string): web3.Keypair {
  try {
    const privateKeyUint8Array = bs58.decode(str)
    const buyerPrivateKey = Uint8Array.from(privateKeyUint8Array)
    return Keypair.fromSecretKey(buyerPrivateKey)
  } catch (error) {
    throw 'Keypair Not Found'
  }
}
