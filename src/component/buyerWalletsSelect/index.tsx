// import { BuyerWalletsMeta } from '@/pages/bundle/type'
import CreateBuyerWalletsModal from '@/pages/walletManage/privateKey/createBuyerWallets'
import { queryUserBuyerWallets } from '@/services/api'
import { CHAIN_ITEMS } from '@/utils/chain'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Input, message, Select, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { ICreateBuyerWalletsForm } from '@/pages/walletManage/privateKey/createBuyerWallets'
import { useTranslation } from 'react-i18next'
import { BuyerWalletsMeta } from '@/pages/pump/type'

interface BuyerWalletsSelectProps {
  chain: keyof typeof CHAIN_ITEMS
  placeholder?: string
  onChange?: (val: string) => void
  validate?: boolean
}

const BuyerWalletsSelect: React.FC<BuyerWalletsSelectProps> = ({
  chain,
  onChange,
  placeholder = 'Please select the buyer wallets',
  validate,
}) => {
  const { t } = useTranslation()
  const defaultForm = {
    chain: chain,
    name: '',
    buyer_wallets: '',
  }
  const [loading, setLoading] = useState(true)
  const [wallets, setWallets] = useState<undefined | BuyerWalletsMeta[]>()
  const [initialFormValue, setInitialFormValue] = useState<ICreateBuyerWalletsForm>(defaultForm)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    try {
      setLoading(true)
      const { data: wallets } = await queryUserBuyerWallets({
        chain,
      })
      setWallets(wallets)
    } catch (err: any) {
      message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event, data) => {
    event.stopPropagation()
    setInitialFormValue(data)
    // Form的initialValues可能会第二次才生效，这里用key触发下生效
    setModalKey(modalKey + 1)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    // Form的initialValues可能会第二次才生效，这里用key触发下生效
    setModalKey(modalKey + 1)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setInitialFormValue(defaultForm)
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    setInitialFormValue(defaultForm)
    requestData()
  }

  const props = loading
    ? {
        notFoundContent: <Spin />,
      }
    : {}

  return (
    <>
      <Select
        onDropdownVisibleChange={(visible) => {
          if (visible && !loading) {
            requestData()
          }
        }}
        onSelect={(val) => {
          // 调用onChange，供Form-Item监听到新值
          onChange?.(val)
        }}
        loading={loading}
        placeholder={placeholder}
        // placeholder={t('bundle.issuerWalletPlacehoder')}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <Button type="text" icon={<PlusOutlined />} onClick={handleAdd}>
              {t('manager.createName')}
            </Button>
          </>
        )}
        options={wallets?.map((wallet) => {
          return {
            label: (
              <Flex justify="space-between">
                <span
                  style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >{`${wallet.name}(${wallet.buyer_wallets})`}</span>
                <a
                  onClick={(event) => {
                    handleEdit(event, {
                      id: wallet.id,
                      name: wallet.name,
                      buyer_wallets: wallet.buyer_wallets,
                      chain: chain,
                    })
                  }}
                >
                  {t('manager.actionEdit')}
                </a>
              </Flex>
            ),
            value: wallet.buyer_wallets,
          }
        })}
        {...props}
      ></Select>
      <CreateBuyerWalletsModal
        validate={validate}
        key={modalKey}
        initialFormValues={initialFormValue}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
      />
    </>
  )
}

export default BuyerWalletsSelect
