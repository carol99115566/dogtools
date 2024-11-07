// import { WalletMeta } from '@/pages/bundle/type'
import CreateWalletModal, { ICreateWalletForm } from '@/pages/walletManage/wallet/createWallet'
import { queryUserWallets } from '@/services/api'
import { CHAIN_ITEMS, maskPrivateKey } from '@/utils/chain'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, message, Select, Space, Spin, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletMeta } from '@/pages/pump/type'

interface WalletsSelectProps {
  style: React.CSSProperties
  chain: keyof typeof CHAIN_ITEMS
  onChange?: (val: string) => void
}

const WalletsSelect: React.FC<WalletsSelectProps> = ({ chain, style = {}, onChange }) => {
  const { t } = useTranslation()
  const defaultForm = {
    chain: chain,
    name: '',
    private_key: '',
  }
  const [loading, setLoading] = useState(true)
  const [wallets, setWallets] = useState<undefined | WalletMeta[]>()
  const [initialFormValue, setInitialFormValue] = useState<ICreateWalletForm>(defaultForm)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    try {
      setLoading(true)
      const { data: wallets } = await queryUserWallets({
        chain,
      })
      setWallets(wallets)
    } catch (err: any) {
      message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  // const addItem = () => {
  //   window.open('/me?defaultTab=wallet')
  // }
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
        style={style}
        onDropdownVisibleChange={(visible) => {
          if (visible && !loading) {
            requestData()
          }
        }}
        // notFoundContent={t('bundle.emptyMessage')}
        onSelect={(val) => {
          // 调用onChange，供Form-Item监听到新值
          onChange?.(val)
        }}
        loading={loading}
        placeholder={t('bundle.issuerWalletPlacehoder')}
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
                <span>{`${wallet.name}(${maskPrivateKey(wallet.private_key)})`}</span>
                <a
                  onClick={(event) => {
                    handleEdit(event, {
                      id: wallet.id,
                      name: wallet.name,
                      private_key: wallet.private_key,
                      chain: chain,
                    })
                  }}
                >
                  {t('manager.actionEdit')}
                </a>
              </Flex>
            ),
            value: wallet.private_key,
          }
        })}
        {...props}
      ></Select>
      <CreateWalletModal
        key={modalKey}
        initialFormValues={initialFormValue}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
      />
    </>
  )
}

export default WalletsSelect
