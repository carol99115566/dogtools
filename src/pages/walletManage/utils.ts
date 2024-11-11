import { PRIVATE_KEY_WALLET_MANAGE } from '@/utils/constant'
import { IBulkWalletMeta } from '@/type/wallet'
import { decryptStringAES, encryptStringAES } from '@/utils/utils'

// 添加到购买钱包
export function addBulkWallet(wallet: IBulkWalletMeta, secretKey: string) {
  try {
    const encryptWallets = localStorage.getItem(PRIVATE_KEY_WALLET_MANAGE)
    let wallets: any[] = []
    if (encryptWallets) {
      wallets = JSON.parse(decryptStringAES(encryptWallets, secretKey))
    }
    wallets.push(wallet)
    const decryptString = encryptStringAES(JSON.stringify(wallets), secretKey)
    localStorage.setItem(PRIVATE_KEY_WALLET_MANAGE, decryptString)
  } catch (error) {
    console.error(error)
  }
}

// 编辑购买钱包
export function updateBulkWallet(wallet: IBulkWalletMeta, index: number, secretKey: string): boolean {
  try {
    const encryptWallets = localStorage.getItem(PRIVATE_KEY_WALLET_MANAGE) || ''
    let wallets = JSON.parse(decryptStringAES(encryptWallets, secretKey))
    wallets[index] = wallet
    const decryptString = encryptStringAES(JSON.stringify(wallets), secretKey)
    localStorage.setItem(PRIVATE_KEY_WALLET_MANAGE, decryptString)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 删除购买钱包
export function deleteBulkWallet(index: number, secretKey: string): boolean {
  try {
    const encryptWallets = localStorage.getItem(PRIVATE_KEY_WALLET_MANAGE) || ''
    let wallets = JSON.parse(decryptStringAES(encryptWallets, secretKey))
    wallets.splice(index, 1)
    const decryptString = encryptStringAES(JSON.stringify(wallets), secretKey)
    localStorage.setItem(PRIVATE_KEY_WALLET_MANAGE, decryptString)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// 获取所有购买钱包
export function getBulkWallets(secretKey: string): IBulkWalletMeta[] | undefined {
  try {
    const encryptWallets = localStorage.getItem(PRIVATE_KEY_WALLET_MANAGE)
    if (encryptWallets) {
      return JSON.parse(decryptStringAES(encryptWallets, secretKey))
    }
    return undefined
  } catch (error) {
    console.error(error)
    return undefined
  }
}
