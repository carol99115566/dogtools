// import { IBuyerObj } from '@/pages/snipe/type'
import CryptoJS from 'crypto-js'
import { IBuyerObj } from '@/pages/pump/type'

export const getSwapBuyers = (receiverText: string): IBuyerObj[] => {
  const receivers = receiverText.trim().split('\n')
  const transferReceivers = receivers.map((element) => {
    const receiverArray = element.split(',')
    return {
      privateKey: receiverArray[0]?.trim(),
      amount: receiverArray[1]?.trim(),
      receiverAddress: receiverArray[2]?.trim(),
    }
  })
  return transferReceivers
}

export const getSwapBuyerString = (buyers: IBuyerObj[]): string => {
  // const receivers = receiverText.trim().split('\n')
  const transferReceivers = buyers.map((element) => {
    const amountStr = element.amount ? `,${element.amount}` : ''
    const receiveStr = element.receiverAddress ? `,${element.receiverAddress}` : ''
    return element.privateKey + amountStr + receiveStr
  })
  return transferReceivers.join('\n')
}

export const truncateText = (text: string, startChars: number, endChars: number, maxLength: number) => {
  if (!text) return undefined
  if (text.length <= maxLength) return text
  const start = text.slice(0, startChars)
  const end = text.slice(-endChars)
  return `${start}...${end}`
}

export function formatDateTime() {
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
  let browserLang = navigator.language
  let defaultBrowserLang = ''
  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    defaultBrowserLang = 'zh'
  } else {
    defaultBrowserLang = 'en'
  }
  return defaultBrowserLang
}

export function getCurrentTime() {
  const now = new Date()

  // 获取小时、分钟、秒、毫秒
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0')

  // 返回格式化的时间
  return `${hours}:${minutes}:${seconds} ${milliseconds}`
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 加密函数
export function encryptStringAES(plainText: string, secretKey: string): string {
  try {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey).toString()
    return encrypted
  } catch (error) {
    throw error
  }
}

// 解密函数
export function decryptStringAES(encryptedText: string, secretKey: string): string {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8)
    return decrypted
  } catch (error) {
    throw error
  }
}
