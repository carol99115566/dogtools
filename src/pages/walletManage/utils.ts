import { PRIVATE_KEY_WALLET_MANAGE } from '@/utils/constant'
import { IBulkWalletMeta, IBulkWallet, IWalletInfo } from '@/type/wallet'
import { decryptStringAES, encryptStringAES } from '@/utils/utils'
import { getWalletInfoFromPrivateKey } from '@/utils/SOL_Util'

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
export function getBulkWalletsMeta(secretKey: string): IBulkWalletMeta[] | undefined {
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

export const getBulkWalletsInfo = async (secretKey: string): Promise<IBulkWallet[] | undefined> => {
  try {
    const bulkMetaWallets = getBulkWalletsMeta(secretKey)
    if (!bulkMetaWallets) return undefined
    const currentBulkWallets: IBulkWallet[] = []
    for (let index = 0; index < bulkMetaWallets.length; index++) {
      const element = bulkMetaWallets[index]
      const privateKeys = element.privateKeys.split('\n')
      const wallets: IWalletInfo[] = []
      for (let privateKey of privateKeys) {
        const wallet = await getWalletInfoFromPrivateKey(privateKey)
        if (wallet) wallets.push(wallet)
      }
      currentBulkWallets.push({
        key: `${index}`,
        name: element.name,
        wallets: wallets,
      })
    }
    return currentBulkWallets
  } catch (err: any) {
    return undefined
  }
}
