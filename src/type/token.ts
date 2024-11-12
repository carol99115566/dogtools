export interface ITokenMeta {
  address: string
  associated_account: string
  balance: number
  info: {
    decimals: number
    image: string
    metadata_uri: string
    name: string
    symbol: string
  }
}

export interface TokenMeta {
  id: number
  user_id: string
  token_info: any
  platform: TOKEN_PLATFORM
  trading_open: Boolean
  created_timestamp: string
  address: string
  listname: string
}

export interface PumpTokenInfo {
  name: string
  symbol: string
  description: string
  image: string
  showName: string
  createdOn: string
  metadataUri: string
  contractAddress: string
}

export interface ETHTokenInfo {
  sourceCode: string
  fileType: string
  verify: any
  compileVersion: string
  contract: any
}

export interface SOLTokenInfo {
  name: string
  symbol?: string
  image?: string
  website?: string
  twitter?: string
  telegram?: string
  description?: string
  decimals: number
  url: 'mainnet' | 'devnet'
  initialMintingAmount: number
  revokeAuthorities?: boolean
}

export type Result<T, E = any> = {
  Ok?: T
  Err?: E
}
export type TOKEN_PLATFORM = 'ETH' | 'pump'
