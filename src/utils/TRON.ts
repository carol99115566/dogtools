import { TronWeb } from 'tronweb'
import { IWalletMeta } from '@/type/wallet'

// 配置 Tron 网络的 FullNode, SolidityNode 和 EventServer 的 URL
const tronWebConfig = {
  fullHost: 'https://api.trongrid.io', // 如果是测试网，可以使用测试网的 API URL
  headers: { 'TRON-PRO-API-KEY': 'd5e6ab0a-f69b-4362-a754-66128a466283' },
}

export const createWalletsForTRON = async (count: number) => {
  const tronWeb = new TronWeb(tronWebConfig)

  const newWallets: IWalletMeta[] = []
  for (let i = 0; i < count; i++) {
    const wallet = await tronWeb.createAccount()
    newWallets.push({
      address: wallet.address.base58,
      privateKey: wallet.privateKey,
    })
  }
  return newWallets
}
