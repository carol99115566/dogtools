import { ethers } from 'ethers'
import { TronWeb } from 'tronweb'
import bs58 from 'bs58'
import { Keypair, PublicKey } from '@solana/web3.js'
import { IBuyerObj } from '@/pages/snipe/type'
import * as eth from './eht'
import * as sol from './SOL_Util'
import * as bsc from './BSC'
import * as tron from './TRON'
import { IWalletMeta } from '@/type/wallet'
import { checkBuyerWalletAndBalanceForETH } from './eht'
import { supportETHBundle, supportSnipe } from './env'

export const CHAIN_ITEMS = {
  'pump.fun': {
    logo: 'https://pump.fun/_next/image?url=%2Flogo.png&w=64&q=75',
  },
  sepolia: {
    logo: 'https://file.dexx.ai/static/img/chain/eth.png',
    ethName: 'ETH',
    buyerWalletEg: `4RGmCf72Rbn2SZuqjTzm3hbKi6CVRQHn2KYHpw5Txs3Gi5aiQFMrBme2rJAjg61FL54dzrSasWVj1otd9SfhBZzU,5
KYHpw5me2rJA2SZuqjTzjg61FL54dzrSaotd9SfhBZzUsTxs3Gi5aiQF4RGmCf72Rbnm3hbKi6CVRQHn2MrBWVj1,8.8,39DPtGi9wpqjy5R92mU5mMHD1km4TnptQAPcaWS5132D`,
  },
  ETH: {
    logo: 'https://file.dexx.ai/static/img/chain/eth.png',
    ethName: 'ETH',
    allowReceiverAddress: true,
    buyerWalletEg: `bbdf28479d989c209aa35d710b424985dd13897f69ba3d6f56a6967339a203d8,1.5
8956a63d8bbdf22967339a0aa797f69ba3d6f8c209d989d710354b424985dd13,3.8,0xF5b219Ba86c312d80Cb13d5134046F9fF7D467A3
  `,
  },
  BSC: {
    ethName: 'BNB',
    logo: 'https://file.dexx.ai/static/img/chain/bsc.png',
    buyerWalletEg: `bbdf28479d989c209aa35d710b424985dd13897f69ba3d6f56a6967339a203d8,1.5
8956a63d8bbdf22967339a0aa797f69ba3d6f8c209d989d710354b424985dd13,3.8
  `,
  },
  SOL: {
    logo: 'https://file.dexx.ai/static/img/chain/sol.png',
    ethName: 'SOL',
    allowReceiverAddress: true,
    // SOL一条交易最多1232字节，我们8个购买钱包，就1215了，不能超过8个，会失败
    // 后续如果单独收手续费，或只对一个钱包收手续费，这个可以再提高，看用户有无诉求
    maxBuyersNumber: 8,
    buyerWalletEg: `4RGmCf72Rbn2SZuqjTzm3hbKi6CVRQHn2KYHpw5Txs3Gi5aiQFMrBme2rJAjg61FL54dzrSasWVj1otd9SfhBZzU,5
KYHpw5me2rJA2SZuqjTzjg61FL54dzrSaotd9SfhBZzUsTxs3Gi5aiQF4RGmCf72Rbnm3hbKi6CVRQHn2MrBWVj1,8.8,39DPtGi9wpqjy5R92mU5mMHD1km4TnptQAPcaWS5132D`,
  },
  TRON: {
    ethName: 'TRX',
    logo: 'https://file.dexx.ai/static/img/chain/trx.png',
    // TODO，暂时不支持receiverAddress
    allowReceiverAddress: false,
    buyerWalletEg: `bbdf28479d989c209aa35d710b424985dd13897f69ba3d6f56a6967339a203d8,1000`,
  },
}

// const solChianItem = {
//   logo: 'https://file.dexx.ai/static/img/chain/sol.png',
//   ethName: 'SOL',
//   allowReceiverAddress: true,
//   // dev钱包的创建、买入，单独成一个交易
//   // 然后是其他的buyer wallets，每4个钱包一组，构成一个交易，最多4组
//   // 然后和dev的那组，一共5个交易，发给jito捆绑执行。故最多支持16个买入钱包，和竞品一样
//   maxBuyersNumber: 16,
//   buyerWalletEg: `4RGmCf72Rbn2SZuqjTzm3hbKi6CVRQHn2KYHpw5Txs3Gi5aiQFMrBme2rJAjg61FL54dzrSasWVj1otd9SfhBZzU,5
// KYHpw5me2rJA2SZuqjTzjg61FL54dzrSaotd9SfhBZzUsTxs3Gi5aiQF4RGmCf72Rbnm3hbKi6CVRQHn2MrBWVj1,8.8,39DPtGi9wpqjy5R92mU5mMHD1km4TnptQAPcaWS5132D`,
// }

// const ethChainItem = {
//   logo: 'https://file.dexx.ai/static/img/chain/eth.png',
//   ethName: 'ETH',
//   buyerWalletEg: `bbdf28479d989c209aa35d710b424985dd13897f69ba3d6f56a6967339a203d8,1.5
// 8956a63d8bbdf22967339a0aa797f69ba3d6f8c209d989d710354b424985dd13,3.8
// `,
// }

// const bscChainItem = {
//   ethName: 'BNB',
//   logo: 'https://file.dexx.ai/static/img/chain/bsc.png',
//   buyerWalletEg: `bbdf28479d989c209aa35d710b424985dd13897f69ba3d6f56a6967339a203d8,1.5
// 8956a63d8bbdf22967339a0aa797f69ba3d6f8c209d989d710354b424985dd13,3.8
// `,
// }

// const tronChainItem = {
//   ethName: 'TRX',
//   logo: 'https://file.dexx.ai/static/img/chain/trx.png',
//   // TODO，暂时不支持receiverAddress
//   allowReceiverAddress: false,
//   buyerWalletEg: `bbdf28479d989c209aa35d710b424985dd13897f69ba3d6f56a6967339a203d8,1000`,
// }

// export const CHAIN_ITEMS = {
//   SOL: solChianItem,
// }
// if (supportETHBundle()) {
//   CHAIN_ITEMS['ETH'] = ethChainItem
// }
// if (supportSnipe()) {
//   CHAIN_ITEMS['BSC'] = bscChainItem
//   CHAIN_ITEMS['TRON'] = tronChainItem
// }

// const ALL_CHAIN_ITEMS = {
//   SOL: solChianItem,
//   ETH: ethChainItem,
//   BSC: bscChainItem,
//   TRON: tronChainItem,
// }

export const renderChainDiv = (chain: keyof typeof CHAIN_ITEMS) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <img width={18} height={18} style={{ marginRight: 10 }} src={CHAIN_ITEMS[chain].logo} />
      {chain}
    </div>
  )
}

export const CHAIN_OPTIONS = Object.keys(CHAIN_ITEMS).map((key: any) => {
  return {
    value: key,
    label: renderChainDiv(key),
  }
})

/**
 * 验证私钥是否合法
 * @param {string} privateKey - 私钥
 * @param {string} chain - 链类型（ETH、BSC、TRON、SOL）
 * @returns {boolean} - 返回私钥是否合法
 */
export const isValidPrivateKey = (privateKey: string, chain: keyof typeof CHAIN_ITEMS) => {
  switch (chain.toUpperCase()) {
    case 'ETH':
    case 'BSC':
      // 对于 ETH 和 BSC，可以使用 ethers.js 的 Wallet 类进行验证
      new ethers.Wallet(privateKey)
      return true
    case 'TRON':
      const address = TronWeb.address.fromPrivateKey(privateKey)
      return TronWeb.isAddress(address)
    case 'SOL':
      const privateKeyUint8Array = bs58.decode(privateKey)
      const buyerPrivateKey = Uint8Array.from(privateKeyUint8Array)
      Keypair.fromSecretKey(buyerPrivateKey)
      return true
    default:
      console.error('Unsupported chain type', chain)
      // 兜底，没加校验规则的，先直接放行
      return true
  }
}

/**
 * 校验钱包地址是否合法
 * @param {string} address - 要校验的钱包地址
 * @param {string} chain - 链类型（ETH、BSC、TRON、SOL）
 * @returns {boolean} - 如果地址合法则返回true，否则返回false
 */
export const isValidAddress = (address, chain: keyof typeof CHAIN_ITEMS) => {
  switch (chain.toUpperCase()) {
    case 'ETH':
    case 'BSC':
      return ethers.isAddress(address)
    case 'TRON':
      return TronWeb.isAddress(address)
    case 'SOL':
      try {
        // 尝试创建PublicKey对象
        const publicKey = new PublicKey(address)
        // 校验该地址是否在曲线上
        return PublicKey.isOnCurve(publicKey)
      } catch (error) {
        // console.log('isValidAddress error', error)
        // 捕获任何错误，意味着地址不合法
        return false
      }
    default:
      console.error('Unsupported chain type', chain)
      // 兜底，没加校验规则的，先直接放行
      return true
  }
}

/**
 * 批量创建钱包
 * @param {chain} chain - 链类型（ETH、BSC、TRON、SOL）
 * @param {number} count - 需要创建的数量
 */
export const createWallets = async (chain: keyof typeof CHAIN_ITEMS, count: number): Promise<IWalletMeta[]> => {
  switch (chain.toUpperCase()) {
    case 'ETH':
      return await eth.createWalletsForETH(count)
    case 'BSC':
      return await bsc.createWalletsForBSC(count)
    case 'TRON':
      return await tron.createWalletsForTRON(count)
    case 'SOL':
      return await sol.createWalletsForSOL(count)
    default:
      console.error('Unsupported chain type', chain)
      return []
  }
}

/**
 * 通过私钥获取余额
 * @param {string} privateKey - 私钥
 * @returns {number | undefined} - 如果地址合法则返回余额，否则返回 undefined
 */
export async function getBalanceByPrivateKey(
  chain: keyof typeof CHAIN_ITEMS,
  privateKey: string,
): Promise<number | undefined> {
  switch (chain.toUpperCase()) {
    case 'ETH':
    case 'BSC':
    case 'TRON':
    case 'SOL':
      return await sol.getBalanceByPrivateKey(privateKey)
    default:
      console.error('Unsupported chain type', chain)
      return undefined
  }
}

/**
 * 校验购买余额是否充足
 * @param {IBuyerObj} buyerObj - 需要校验的购买对象
 * @param {chain} chain - 链类型（ETH、BSC、TRON、SOL）
 */
export const checkBuyerWalletAndBalance = async (
  buyerObj: IBuyerObj,
  chain: keyof typeof CHAIN_ITEMS,
): Promise<any> => {
  switch (chain.toUpperCase()) {
    case 'ETH':
      await eth.checkBuyerWalletAndBalanceForETH(buyerObj)
    case 'BSC':
    case 'TRON':
    case 'SOL':
    default:
      console.error('Unsupported chain type', chain)
      // 兜底，没加校验规则的，先直接放行
      return true
  }
}

export function maskPrivateKey(privateKey) {
  if (privateKey.length <= 8) {
    return privateKey // 如果私钥长度较短，则不做任何处理
  }
  const start = privateKey.slice(0, 4) // 取前4位
  const end = privateKey.slice(-4) // 取后4位
  let masked = '*'.repeat(privateKey.length - 8) // 中间部分用星号替代
  if (masked.length > 10) {
    masked = masked.slice(0, 10)
  }

  return `${start}${masked}${end}`
}
