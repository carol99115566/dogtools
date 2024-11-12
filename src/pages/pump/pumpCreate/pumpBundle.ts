import { PublicKey, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getWallet, transferAllTokens } from '@/utils/pump'
import { IBuyerObj, BundleForm, IPumpToken } from '../type'
import { CHAIN_ITEMS, isValidAddress } from '@/utils/chain'
import i18n from '@/language'
import { connectionList } from '@/utils/SOL_Util'
import { TokenBundle } from '../bundle'

export class PumpFunTokenBundle extends TokenBundle {
  public ethName = CHAIN_ITEMS['SOL'].ethName

  public coinData: IPumpToken | null = null

  public createWallets = async (count: number) => {
    const newWallets: any[] = []
    for (let i = 0; i < count; i++) {
      const wallet = Keypair.generate()
      newWallets.push({
        address: wallet.publicKey,
        privateKey: wallet.secretKey,
      })
    }
    return newWallets
  }

  /**
   * 校验Solana钱包地址是否合法
   */
  public isValidAddress = (address) => {
    return isValidAddress(address, 'SOL')
  }

  // 子类，校验钱包是否合法，余额是否足够
  public async checkBuyerWalletAndBalance(buyerObj: IBuyerObj, formValues: BundleForm, index: number): Promise<any> {
    // 校验钱包私钥是否合法
    let wallet
    try {
      wallet = getWallet(buyerObj.privateKey)
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
    const solBalance = await this.getSolBalance(wallet.publicKey, index)
    if (solBalance < 0.025 + Number(buyerObj.amount)) {
      throw new Error(
        `Insufficient balance: ${buyerObj.privateKey}\nPlease reserve another 0.025 ${this.ethName} for gas fee`,
      )
    }
  }

  private async getSolBalance(walletAddress: string, index: number) {
    const connection = connectionList[index % connectionList.length]
    // 将钱包地址转换为 PublicKey
    const publicKey = new PublicKey(walletAddress)
    // 获取账户的余额（单位是 Lamports，1 SOL = 10^9 Lamports）
    const balance = await connection.getBalance(publicKey)
    // 将 Lamports 转换为 SOL
    const solBalance = balance / LAMPORTS_PER_SOL
    console.log(`The wallet ${walletAddress} has a balance of ${solBalance} SOL`)
    return solBalance
  }

  private transferAllTokens = async (
    senderWallet: Keypair,
    mintPubkey: PublicKey,
    receiverAddress: string,
    customLog,
    index: number,
  ) => {
    try {
      const signature = await transferAllTokens(senderWallet, mintPubkey, receiverAddress, index)
      customLog(
        `✅ Transfer transaction confirmed! View on <a target='_blank' href='https://solscan.io/tx/${signature}'>Solscan</a>`,
      )
    } catch (error: any) {
      console.log('transferAllTokens error', error)
      customLog('❌ Transfer transaction failed: ', error?.message ?? error)
    }
  }
}
