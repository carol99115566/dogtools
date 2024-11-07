import { IBuyerObj } from '@/pages/snipe/type'

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
