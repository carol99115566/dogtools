import { Form, Input, message, Modal, Select } from 'antd'
import './createWallet.less'
import { CHAIN_OPTIONS, CHAIN_ITEMS, isValidPrivateKey } from '@/utils/chain'
import { RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'
import { addWallet, updateWallet } from '@/services/api'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

class CreateWalletModalProps {
  isModalOpen = false

  initialFormValues: undefined | ICreateWalletForm = undefined

  handleCancel = () => {}

  handleSuccess = () => {}
}

export type ICreateWalletForm = {
  id?: number
  // 所属链
  chain: keyof typeof CHAIN_ITEMS
  // 钱包的名字
  name: string
  // 钱包私钥
  private_key: string
}

const CHAIN_KEY = 'chain'

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({
  isModalOpen,
  handleSuccess,
  handleCancel,
  initialFormValues,
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    form
      .validateFields()
      .then(async (formValues: ICreateWalletForm) => {
        setLoading(true)
        if (initialFormValues?.id) {
          await updateWallet({
            ...formValues,
            id: initialFormValues.id,
          })
        } else {
          await addWallet(formValues)
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
  return (
    <Modal
      width={1000}
      maskClosable={false}
      title={initialFormValues?.id ? t('manager.issuerWallet.editName') : t('manager.issuerWallet.creatName')}
      open={isModalOpen}
      okButtonProps={{
        loading,
      }}
      destroyOnClose
      onCancel={handleCancel}
      onOk={onSubmit}
    >
      <Form preserve={false} initialValues={initialFormValues} className="create-wallet-form" form={form}>
        <Form.Item
          initialValue={defaultChain}
          label={t('manager.formChain')}
          name={CHAIN_KEY}
          rules={[{ required: true }]}
        >
          <Select placeholder={t('manager.formChainPlaceholder')} options={CHAIN_OPTIONS}></Select>
        </Form.Item>
        <Form.Item label={t('manager.formName')} name="name" rules={[{ required: true }]}>
          <Input placeholder={t('manager.issuerWallet.namePlaceholder')} />
        </Form.Item>
        <Form.Item
          validateFirst
          validateTrigger="onSubmit"
          label={t('manager.issuerWallet.privateKeyName')}
          name="private_key"
          rules={[
            { required: true },
            {
              validator: async (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => {
                const chain = form.getFieldValue(CHAIN_KEY)
                try {
                  if (!isValidPrivateKey(value, chain)) {
                    throw new Error(t('manager.issuerWallet.privateKeyInvalid'))
                  }
                } catch (error: any) {
                  throw new Error(`${t('manager.issuerWallet.privateKeyInvalid')}\nError:${error?.message}`)
                }
              },
            },
          ]}
        >
          <Input placeholder={t('manager.issuerWallet.privateKeyPlaceholder')} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateWalletModal
