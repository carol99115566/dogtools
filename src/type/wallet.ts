// import { IBuyerObj } from '@/pages/snipe/type'
import { IBuyerObj } from '@/pages/pump/type'

// 存储在本地的数据模型
export interface IBulkWalletMeta {
  name: string
  privateKeys: string
}

export interface IWalletInfo {
  privateKey: string
  address: string
  balance: number
  tokenNumber?: number
}

export interface IBulkWallet {
  key: string
  name: string
  wallets: IWalletInfo[]
}

export interface IWalletMeta {
  address: string
  privateKey: string
}

export interface IBuyers {
  balance: number
  privateKey: string
}

// export interface IBuyerWalletsManage {
//   name: string
//   buyers: string[]
//   chain: string
// }

export interface IBuyerWalletsWithBalance {
  name: string
  buyers: IBuyers[]
  chain: string
}

export interface IBuyerWalletsManage {
  id: number
  user_id: string
  chain: string
  buyer_wallets: IBuyerObj[]
  name: string
  created_timestamp: string
  status: string
}
