import { SECRET_KEY, BUYER_WALLET_MANAGE, WALLET_MANAGE } from '@/utils/constant'
import CryptoJS from 'crypto-js'
import { IBuyerWalletsWithBalance } from '@/type/wallet'
// 添加到购买钱包
export function addBuyerWallet(wallet: IBuyerWalletsWithBalance) {
  const encryptWallets = localStorage.getItem(BUYER_WALLET_MANAGE)
  let wallets: any[] = []
  if (encryptWallets) {
    wallets = JSON.parse(decryptStringAES(encryptWallets))
  }
  wallets.push(wallet)
  const decryptString = encryptStringAES(JSON.stringify(wallets))
  localStorage.setItem(BUYER_WALLET_MANAGE, decryptString)
}

// 编辑购买钱包
export function updateBuyerWallet(wallet: IBuyerWalletsWithBalance, index: number) {
  const encryptWallets = localStorage.getItem(BUYER_WALLET_MANAGE) || ''
  let wallets = JSON.parse(decryptStringAES(encryptWallets))
  wallets[index] = wallet
  const decryptString = encryptStringAES(JSON.stringify(wallets))
  localStorage.setItem(BUYER_WALLET_MANAGE, decryptString)
}

// 删除购买钱包
export function deleteBuyerWallet(index: number) {
  const encryptWallets = localStorage.getItem(BUYER_WALLET_MANAGE) || ''
  let wallets = JSON.parse(decryptStringAES(encryptWallets))
  wallets.splice(index, 1)
  const decryptString = encryptStringAES(JSON.stringify(wallets))
  localStorage.setItem(BUYER_WALLET_MANAGE, decryptString)
}

// 获取所有购买钱包
export function getBuyerWallets(chain?: string): IBuyerWalletsWithBalance[] {
  const encryptWallets = localStorage.getItem(BUYER_WALLET_MANAGE) || ''
  let wallets = JSON.parse(decryptStringAES(encryptWallets))
  if (chain) {
    wallets = wallets.filter((item) => {
      return item.chain === chain
    })
  }
  return wallets
}

// 加密函数
export function encryptStringAES(plainText: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString()
  return encrypted
}

// 解密函数
export function decryptStringAES(encryptedText: string): string {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY).toString(CryptoJS.enc.Utf8)
  return decrypted
}
