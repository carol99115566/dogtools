import { FormInstance } from 'antd'
import { Rule, RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'
import { getSwapBuyers } from '@/utils/utils'
import { IBuyerObj } from '@/pages/snipe/type'
import { BundleForm } from './type'
import i18n from '@/language'

// 代币捆绑抽象类
export abstract class TokenBundle {
  abstract ethName

  // 是否是合法的钱包地址
  abstract isValidAddress(address: string): boolean

  // 创建钱包，子类实现
  abstract createWallets(count: number): Promise<any>

  // 子类，校验钱包是否合法，余额是否足够
  abstract checkBuyerWalletAndBalance(buyerObj: IBuyerObj, formValues: BundleForm, index: number): Promise<any>

  // 捆绑钱包校验规则
  // 依赖子类实现checkBuyerWalletAndBalance做校验，比如私钥是否合法，余额是否足够
  public getBuyersRules = (form: FormInstance) => {
    return [
      { required: true, message: i18n.t('bundle.buyerWalletsPlacehoder') },
      {
        validator: async (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => {
          const formValues = form.getFieldsValue()
          const buyerObjs = getSwapBuyers(value)
          const checkBuyerPromises: Promise<any>[] = []
          for (let index = 0; index < buyerObjs.length; index++) {
            const buyerObj = buyerObjs[index]
            if (!buyerObj.amount || !buyerObj.privateKey || Number.isNaN(Number(buyerObj.amount))) {
              throw new Error(
                i18n.t('manager.buyerWallet.formatErrorMessage', {
                  index: index + 1,
                }),
              )
            }
            if (buyerObj.receiverAddress) {
              if (!this.isValidAddress(buyerObj.receiverAddress)) {
                throw new Error(
                  i18n.t('manager.buyerWallet.receiverAddresErrorMessage', {
                    index: index + 1,
                  }),
                )
              }
            }
            checkBuyerPromises.push(this.checkBuyerWalletAndBalance(buyerObj, formValues, index))
          }
          await Promise.all(checkBuyerPromises)
        },
      },
    ] as Rule[]
  }
}
