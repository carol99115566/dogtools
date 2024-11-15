export const AUTH_TOKEN_KEY = 'authToken'

export const DEFAULT_SLIPPAGE = 50

export const PUMP_CREATE_URL = 'https://pump.fun/create'
export const HELIUS_RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=442f35bf-48ea-42c6-a0ec-d0e6248499c1'

export const SOL_RPC_ENDPOINT_MAIN =
  'https://indulgent-wandering-wave.solana-mainnet.quiknode.pro/a2bbf908f0bef4ff590544046ccc4f1b711b6d32/'
export const SOL_RPC_ENDPOINT_DEV =
  'https://white-proportionate-putty.solana-devnet.quiknode.pro/11132715a936f8adb03c940c627d6c0b9369d9e6/'

// 本地存储私钥的 key
export const PRIVATE_KEY_WALLET_MANAGE = '_private_key_wallet_manager_'
// Shyft 的 key, Shyft 用于获取钱包下的所有代币信息
export const SHYFT_API_KEY = 'zTzdsl45DqK847Nr'

export enum SERVE_TYPE {
  PUMP_LAUNCH_BUY = 'pump_launch_buy', // pump 开盘并买入
  PUMP_BUNDLED_SELL = 'pump_bundled_sell', // pump 一键卖出
  PUMP_MICRO_TRADING = 'pump_micro_trading', // pump 批量交易
  PUMP_VOLUME_BOT = 'pump_volume_bot', // 微量刷单
  PUMP_MAKER_BUYERS = 'pump_maker_buyers', // 新地址买入
  WALLET_BATCH_GENERATE = 'wallet_batch_generate', // 批量创建
  WALLET_MULTI_SENDER = 'wallet_multi_sender', // 批量转账
  WALLET_BATCH_COLLECTION = 'wallet_batch_collection', // 批量归集
  WALLET_MULTI_TO_MULTI = 'wallet_multi_to_multi', // 多对多转账
  WALLET_RELAY_TRANSFER = 'wallet_relay_transfer', //
  WALLET_RECOVERY_RENT = 'wallet_recovery_rent', // 租金回收
  WALLET_BATCH_RECLAIM_RENT = 'wallet_batch_reclaim_rent', // 批量租金回收
}
