import { Button, message, Modal, Space, Table } from 'antd'
import CreateWalletModal from './createWallet'
import { useEffect, useState } from 'react'
import { deleteWallet, queryUserWallets } from '@/services/api'
import { getBalanceByPrivateKey, renderChainDiv } from '@/utils/chain'
import './index.less'
import { useTranslation } from 'react-i18next'
import { useBundleContext } from '@/pages/bundle/bundleContext'
import { truncateText } from '@/utils/utils'
import { IWalletMeta } from '@/type/wallet'
import { useChainContext } from '@/layouts/chainContext'
import { WalletMeta } from '@/pages/bundle/type'
const WalletTable: React.FC = () => {
  const { t } = useTranslation()
  // const bundleItem = useBundleContext()
  const chainItem = useChainContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialFormValues, setInitialFormValue] = useState(undefined)
  const [wallets, setWallets] = useState<WalletMeta[]>()
  const [loading, setLoading] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  const columns = [
    {
      title: t('manager.formName'),
      dataIndex: 'name',
      width: 260,
    },
    {
      title: t('manager.formChain'),
      dataIndex: 'chain',
      width: 120,
      render: (data) => {
        return renderChainDiv(data)
      },
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    // },
    {
      title: t('manager.issuerWallet.privateKeyName'),
      ellipsis: true,
      dataIndex: 'private_key',
      render: (data) => {
        return truncateText(data, 10, 10, 30)
      },
    },
    {
      title: t('manager.balance', {
        chain: chainItem.value,
      }),
      dataIndex: 'balance',
      render: (data) => data || '-',
    },
    {
      title: t('manager.formAction'),
      dataIndex: '',
      key: 'Action',
      width: 120,
      render: (data) => (
        <Space>
          <a
            onClick={() => {
              handleEdit(data)
            }}
          >
            {t('manager.actionEdit')}
          </a>
          <a
            onClick={() => {
              Modal.confirm({
                title: t('manager.deleteConfirm'),
                onOk: async () => {
                  await deleteWallet(data.id)
                  requestData()
                },
              })
            }}
          >
            {t('manager.actionDelete')}
          </a>
        </Space>
      ),
    },
  ]

  const handleEdit = (data) => {
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
    setInitialFormValue(undefined)
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    setInitialFormValue(undefined)
    requestData()
  }

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    try {
      setLoading(true)
      const { data: wallets } = await queryUserWallets({
        chain: chainItem?.value,
      })
      setWallets(wallets)
      getAllBlance(wallets)
    } catch (err: any) {
      message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  const getAllBlance = async (wallets: WalletMeta[]) => {
    if (!wallets) return
    try {
      const currentWallets: WalletMeta[] = []
      for (let index = 0; index < wallets.length; index++) {
        const element = wallets[index]
        const balance = await getBalanceByPrivateKey(chainItem.value, element.private_key)
        element.balance = balance
        currentWallets.push(element)
      }
      setWallets(currentWallets)
    } catch (err: any) {
      console.log('为什么失败了呀', err)
      // message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginTop: 8,
          marginBottom: 24,
        }}
      >
        {t('manager.createName')}
      </Button>
      <Table
        className="wallet-table"
        columns={columns}
        loading={loading}
        rowKey="dataIndex"
        dataSource={wallets}
      ></Table>
      <CreateWalletModal
        key={modalKey}
        initialFormValues={initialFormValues}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
      />
    </>
  )
}

export default WalletTable
