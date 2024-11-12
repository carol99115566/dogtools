import { SHYFT_API_KEY } from '@/utils/constant'
import { get, post } from './instance'

// 发送 GET 请求
export const requestDeploy = (params: object) => {
  return get('/api/contract/deploy', params)
}

export const requestBundle = (params: {
  contractAddress: string
  privateKey: string
  buyers: {
    privateKey: string
    amount: string
  }[]
  isSepolia?: boolean
  gas?: string
}) => {
  return post('/api/contract/bundle', params)
}

export const getCoinData = (tokenAddress: string) => {
  const url = `https://frontend-api.pump.fun/coins/${tokenAddress}`
  return get(`/api/proxy/get?url=${encodeURIComponent(url)}`)
}

export const getLatestCoins = () => {
  const url = `https://frontend-api.pump.fun/coins?offset=0&limit=10&sort=created_timestamp&order=DESC&includeNsfw=false`
  return get(`/api/proxy/get?url=${encodeURIComponent(url)}`)
}

export const getAllTokens = (walletAddress: string) => {
  const url = `https://api.shyft.to/sol/v1/wallet/all_tokens?network=mainnet-beta&wallet=${walletAddress}`
  return fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': SHYFT_API_KEY,
    },
  }).then((response) => response.json())
}

export const createCoin = (create) => {
  let formData = new FormData()
  formData.append('file', create.file)
  formData.append('name', create.name)
  formData.append('symbol', create.symbol)
  formData.append('description', create.description)
  formData.append('twitter', create.twitter || '')
  formData.append('telegram', create.telegram || '')
  formData.append('website', create.website || '')
  formData.append('showName', 'true')
  return post(`/api/proxy/ipfs`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getProfile = () => {
  return get(`/api/user/profile`)
}

export const doLogin = (params) => {
  return get(`/api/user/login`, params)
}

export const addTask = (params) => {
  return post(`/api/task/add`, params)
}

export const updateMyTask = (params) => {
  return post(`/api/task/update-my`, params)
}

export const addWallet = (params) => {
  return post(`/api/wallet/add`, params)
}

export const updateWallet = (params) => {
  return post(`/api/wallet/update`, params)
}

export const deleteWallet = (id) => {
  return post(`/api/wallet/delete`, { id })
}

export const queryUserWallets = (params = {}) => {
  return get(`/api/wallet/query`, params)
}

export const addBuyerWallets = (params) => {
  return post(`/api/buyer_wallets/add`, params)
}

export const updateBuyerWallets = (params) => {
  return post(`/api/buyer_wallets/update`, params)
}

export const deleteBuyerWallets = (id) => {
  return post(`/api/buyer_wallets/delete`, { id })
}

export const queryUserBuyerWallets = (params = {}) => {
  return get(`/api/buyer_wallets/query`, params)
}

export const addToken = (params: {
  platform: string
  token_info: string
  trading_open: boolean
  address: string
  listname: string
}) => {
  return post(`/api/token/add`, params)
}

export const queryUserTokens = (params: { platform?: string }) => {
  return get(`/api/token/query`, params)
}

export const queryTokenByAddress = (params: { address: string | undefined }) => {
  return get(`/api/token/queryByAddress`, params)
}
export const getSupeCollection = (params = {}) => {
  return post(`/api/proxy/supe`, params)
}

export const updateAuthority = (params = {}) => {
  return post(`/api/user/setSupeAuth`, params)
}

export const addWithdraw = (params) => {
  return post(`/api/withdraw/add`, params)
}

export const queryUserWithdraw = (params = {}) => {
  return get(`/api/withdraw/query-my`, params)
}

export const queryUserCommission = (params = {}) => {
  return get(`/api/user/commission`, params)
}
