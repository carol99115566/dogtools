import { useGlobalContext } from '@/layouts/chainContext'
import { ethers, Wallet } from 'ethers'
import { IBuyerObj } from '@/pages/snipe/type'
import i18n from '@/language'
import { IWalletMeta } from '@/type/wallet'

const axios = require('axios')

const ETHERSCAN_API_KEY = '9W1MD4KJ9Q3631W9RW6VXWD3E1WI7RSN9I'
const contractAbi = [
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    type: 'function',
  },
  'function decimals() view returns (uint8)',
]
const platform = localStorage.getItem('platform')
const etherscanEndPoint =
  platform === 'sepolia' ? 'https://api-sepolia.etherscan.io/api' : 'https://api.etherscan.io/api'

const provider = ethers.getDefaultProvider(platform === 'sepolia' ? 'sepolia' : 'mainnet', {
  // alchemy: '0UsIjUNqHRJVM2dc2rfn34kZ3WzLXtab',
  etherscan: ETHERSCAN_API_KEY,
})

async function getContractSource(tokenAddress: string) {
  const url = `${etherscanEndPoint}?module=contract&action=getsourcecode&address=${tokenAddress}&apikey=${ETHERSCAN_API_KEY}`
  const response = await axios.get(url)
  const result = response.data.result[0]
  if (result.SourceCode) {
    return result.SourceCode
  } else {
    return '0x'
  }
}

function formatNumber(num: number) {
  // 将数字转成字符串形式
  const [integerPart, decimalPart] = num.toString().split('.')
  // 格式化整数部分
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // 如果有小数部分，则保留并添加到结果中
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
}

function unformatNumber(formattedNum: string) {
  // 移除所有逗号
  return formattedNum.replace(/,/g, '')
}

export const getEHTJettonDetail = async (address: string) => {
  try {
    const contractInstance = new ethers.Contract(address, contractAbi, provider)
    console.log(contractInstance)
    let [name, symbol, totalSupply, owner, balance, ehtBalance, decimals, code] = await Promise.all([
      contractInstance.name(),
      contractInstance.symbol(),
      contractInstance.totalSupply(),
      contractInstance.owner(),
      contractInstance.balanceOf(address),
      provider.getBalance(address),
      contractInstance.decimals(),
      getContractSource(address),
    ])
    const total = ethers.formatUnits(totalSupply, decimals)
    const balanceString = ethers.formatUnits(balance, decimals)
    const isPublish = code === '0x' ? false : true
    const ethbalance = ethers.formatEther(ehtBalance)
    // const sourceCode = code

    return {
      name,
      symbol,
      // contactAddress: address,
      //  name,
      //  symbol,
      // sourceCode: code,
      owner,
      totalSupply: formatNumber(Number(total)),
      tokenBalance: formatNumber(Number(balanceString)),
      ethBalance: formatNumber(Number(ethbalance)),
      isPublish,
    }
  } catch (error: any) {
    console.log(error)
    return {
      contactAddress: address,
    }
  }
}

export const ehtTransferIn = async (privateKey: string, address: string, amount?: string, value?: string) => {
  try {
    const wallet = new ethers.Wallet(privateKey, provider)
    const tokenContract = new ethers.Contract(address, contractAbi, wallet)
    if (value && amount) {
      console.log('value && amount', value, amount)
      const transfer = await tokenContract.transfer(address, ethers.parseUnits(unformatNumber(amount), 9))
      const transferValue = await wallet.sendTransaction({
        to: address,
        value: ethers.parseEther(value), // 这里假设你要发送0.1 ETH
      })
      return [transfer, transferValue]
    }
    if (amount) {
      console.log('amount', amount)
      return await tokenContract.transfer(address, ethers.parseUnits(unformatNumber(amount), 9))
    }
    if (value) {
      console.log('value', value)
      return await wallet.sendTransaction({
        to: address,
        value: ethers.parseEther(value), // 这里假设你要发送0.1 ETH
      })
    }
  } catch (error) {
    console.log(error)
    return undefined
  }
}

/**
 * 通过私钥获取用户的余额
 * @param privateKey - 用户私钥
 * @returns 用户的余额
 */
export const getBalanceByPrivateKeyEHT = async (privateKey: string) => {
  // 校验钱包私钥是否合法
  let wallet: Wallet
  try {
    wallet = new ethers.Wallet(privateKey, provider)
  } catch (error: any) {
    if (error?.message) {
      throw new Error(
        i18n.t('bundle.checkBuyerWallet.privateKeyError', {
          privateKey: privateKey,
          error: error.message,
        }),
      )
    }
    throw error
  }
  // 校验余额，单位是 wei
  const balanceWei = await provider.getBalance(wallet.address)
  const balance = Number(ethers.formatEther(balanceWei))
  return balance
}

// 获取当前的 Gas Price
export const getBaseGasPrice = async () => {
  const gasFee = await provider.getFeeData()
  console.log('手续费：', gasFee)
  const gasBasePrice = gasFee.gasPrice || ''
  const basePrice = Number(ethers.formatEther(gasBasePrice))
  return basePrice
}

// 校验
export const checkBuyerWalletAndBalanceForETH = async (buyerObj: IBuyerObj): Promise<any> => {
  // 校验钱包私钥是否合法
  let wallet: Wallet
  try {
    wallet = new ethers.Wallet(buyerObj.privateKey, provider)
  } catch (error: any) {
    if (error?.message) {
      throw new Error(
        i18n.t('bundle.checkBuyerWallet.privateKeyError', {
          privateKey: buyerObj.privateKey,
          error: error.message,
        }),
        // `Can't setup wallet from ${buyerObj.privateKey}, please check.\nError message: ${error.message}`,
      )
    }
    throw error
  }
  // 校验余额
  const balanceWei = await provider.getBalance(wallet.address)
  const balance = Number(ethers.formatEther(balanceWei))
  console.log('余额是：', balance, '期望转账的金额：', buyerObj.amount)
  if (balance + 0.01 < Number(buyerObj.amount)) {
    throw new Error(
      i18n.t('bundle.checkBuyerWallet.insufficientError', {
        privateKey: buyerObj.privateKey,
        chain: 'ETH',
      }),
      // `Insufficient balance: ${buyerObj.privateKey}\nPlease reserve another 0.01 ETH for gas fee`,
    )
  }
}

/**
 * 批量创建 ETH 钱包
 * @param {number} count - 钱包数量
 * @returns {[]} - 创建好的钱包数组
 */
export const createWalletsForETH = async (count: number) => {
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
