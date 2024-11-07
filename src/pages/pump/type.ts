export type IBuyerObj = {
  privateKey: string
  amount: string
  receiverAddress?: string
  balance?: number
}

export interface IPumpToken {
  mint: string
  name: string
  symbol: string
  description: string
  image_uri: string
  creator: string
  created_timestamp: string
  username: string

  metadata_uri: string

  bonding_curve: string
  associated_bonding_curve: string

  virtual_sol_reserves: number
  virtual_token_reserves: number
}

export interface BundleForm {
  name: string
  symbol: string
  description: string
  file: Blob
  twitter?: string
  telegram?: string
  website?: string

  // 要捆绑买入代币的钱包
  buyers: string
  buyerObjs: IBuyerObj[]
  // 自定义打印日志
  customLog: (...args) => void
  // 狙击完成回调
  onFinish: (params: { success: boolean; data: any }) => void
}

export type BundlePlatform = 'pump'
export type BundleChain = 'ETH' | 'sepolia' | 'SOL' | 'BSC' | 'TRON'

export interface BundleItemProps {
  key: string
  label: string
  value: BundlePlatform | BundleChain
  hashEndPoint?: string
  tokenEndPoint?: string
  createUrl?: string
  chain: string
  viewOnName?: string
  // 放创建的 form
  createComponent?: {
    key: string
    label: string
    children: React.ReactNode
  }[]
}

export interface BuyerWalletsMeta {
  id: number
  user_id: string
  chain: string
  buyer_wallets: string
  name: string
  created_timestamp: string
  status: string
}

export interface WalletMeta {
  id: number
  user_id: string
  chain: string
  private_key: string
  name: string
  created_timestamp: string
  status: string
  balance?: number
}
