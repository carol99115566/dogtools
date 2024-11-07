import { Form, Input, message, Modal, Select } from 'antd'
import './createBuyerWallets.less'
import { CHAIN_OPTIONS, CHAIN_ITEMS, isValidPrivateKey, isValidAddress } from '@/utils/chain'
import { RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'
import { addBuyerWallets, updateBuyerWallets } from '@/services/api'
import { useState } from 'react'
import { getSwapBuyers } from '@/utils/utils'
import { useTranslation } from 'react-i18next'

class CreateBuyerWalletsModalProps {
  isModalOpen = false
  validate? = true
  initialFormValues: undefined | ICreateBuyerWalletsForm = undefined

  handleCancel = () => {}

  handleSuccess = () => {}
}

export type ICreateBuyerWalletsForm = {
  id?: number
  // 所属链
  chain: keyof typeof CHAIN_ITEMS
  // 该批钱包的名字
  name: string
  // 钱包的私钥和购买金额
  buyer_wallets: string
  // 是否开启校验
  validate?: boolean
}

const CHAIN_KEY = 'chain'

const CreateBuyerWalletsModal: React.FC<CreateBuyerWalletsModalProps> = ({
  isModalOpen,
  handleSuccess,
  handleCancel,
  validate = true,
  initialFormValues,
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [renderCount, setRenderCount] = useState(0)

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (formValues: ICreateBuyerWalletsForm) => {
        setLoading(true)
        if (initialFormValues?.id) {
          await updateBuyerWallets({
            ...formValues,
            id: initialFormValues.id,
          })
        } else {
          await addBuyerWallets(formValues)
        }
        // message.success('Added successfully')
        handleSuccess()
      })
      .catch((err) => {
        message.error(err.message)
        // console.log('onSubmit', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const defaultChain = Object.keys(CHAIN_ITEMS)[0]
  const chain = form.getFieldValue('chain') ?? initialFormValues?.chain ?? defaultChain
  const chainItem = CHAIN_ITEMS[chain]
  const receiverTip = chainItem.allowReceiverAddress ? t('manager.buyerWallet.buyerWalletPlaceholderExtra') : ''

  return (
    <Modal
      width={1000}
      maskClosable={false}
      title={initialFormValues?.id ? t('manager.buyerWallet.editName') : t('manager.buyerWallet.creatName')}
      open={isModalOpen}
      okButtonProps={{
        loading,
      }}
      destroyOnClose
      onCancel={handleCancel}
      onOk={onSubmit}
    >
      <Form
        preserve={false}
        initialValues={initialFormValues}
        className="create-wallet-form"
        form={form}
        labelCol={{ span: 3 }}
      >
        <Form.Item
          label={t('manager.formChain')}
          initialValue={defaultChain}
          name={CHAIN_KEY}
          rules={[{ required: true }]}
        >
          <Select
            placeholder={t('manager.formChainPlaceholder')}
            onSelect={() => {
              setRenderCount(renderCount + 1)
            }}
            options={CHAIN_OPTIONS}
          ></Select>
        </Form.Item>
        <Form.Item label={t('manager.formName')} name="name" rules={[{ required: true }]}>
          <Input placeholder={t('manager.buyerWallet.namePlaceholder')} />
        </Form.Item>
        <Form.Item
          validateFirst
          validateTrigger="onSubmit"
          label={t('manager.buyerWallet.buyerWalletName')}
          name="buyer_wallets"
          rules={[
            { required: true },
            {
              validator: async (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => {
                if (!validate) return
                const chain = form.getFieldValue(CHAIN_KEY)
                const chainConfig = CHAIN_ITEMS[chain]
                const formValues = form.getFieldsValue()
                const buyerObjs = getSwapBuyers(value)

                if (chainConfig.maxBuyersNumber && buyerObjs.length > chainConfig.maxBuyersNumber) {
                  throw new Error(t('manager.buyerWallet.limitErrorMessage'))
                }

                // const checkBuyerPromises: Promise<any>[] = []
                for (let index = 0; index < buyerObjs.length; index++) {
                  const buyerObj = buyerObjs[index]
                  // if (!buyerObj.amount || !buyerObj.privateKey || Number.isNaN(Number(buyerObj.amount))) {
                  //   throw new Error(
                  //     t('manager.buyerWallet.formatErrorMessage', {
                  //       index: index + 1,
                  //     }),
                  //   )
                  // }
                  if (!buyerObj.amount || !buyerObj.privateKey || Number.isNaN(Number(buyerObj.amount))) {
                    throw new Error(`Line ${index + 1} format error, please separate with commas`)
                  }
                  let isValidKey
                  try {
                    isValidKey = isValidPrivateKey(buyerObj.privateKey, chain)
                  } catch (error: any) {
                    throw new Error(
                      `${t('manager.buyerWallet.privateKeyInvalidMessage', {
                        index: index + 1,
                      })}\n${error?.message}`,
                    )
                  }
                  if (!isValidKey) {
                    throw new Error(
                      t('manager.buyerWallet.privateKeyInvalidMessage', {
                        index: index + 1,
                      }),
                    )
                  }

                  if (buyerObj.receiverAddress) {
                    if (!isValidAddress(buyerObj.receiverAddress, chain)) {
                      throw new Error(
                        t('manager.buyerWallet.receiverAddresErrorMessage', {
                          index: index + 1,
                        }),
                      )
                    }
                  }
                  // TODO，这里先不校验吧
                  // checkBuyerPromises.push(this.checkBuyerWalletAndBalance(buyerObj, formValues, index))
                }
                // await Promise.all(checkBuyerPromises)
              },
            },
          ]}
        >
          <Input.TextArea
            // placeholder={t('manager.buyerWallet.buyerWalletPlaceholder', {
            //   ethName: chainItem.ethName,
            //   receiverTip: receiverTip,
            //   buyerWalletEg: chainItem.buyerWalletEg,
            // })}
            placeholder={
              validate
                ? `The buyer wallet's [private key] and [${chainItem.ethName} amount]${receiverTip}, separate with commas. \nOne line per wallet\n\nExample:\n${chainItem.buyerWalletEg}`
                : 'One private key per line.'
            }
            rows={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateBuyerWalletsModal
