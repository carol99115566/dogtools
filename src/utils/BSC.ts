import { ethers } from 'ethers'
import { IWalletMeta } from '@/type/wallet'

export const createWalletsForBSC = async (count: number) => {
  const newWallets: IWalletMeta[] = []
  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom()
    newWallets.push({
      address: wallet.address,
      privateKey: wallet.privateKey,
    })
  }
  return newWallets
}
