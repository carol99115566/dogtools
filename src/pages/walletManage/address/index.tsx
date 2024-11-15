import { Button, message, Modal, Space, Table } from 'antd'
import CreateWalletModal from './createWallet'
import { useEffect, useState } from 'react'
import { deleteWallet, queryUserWallets } from '@/services/api'
import './index.less'
import { useTranslation } from 'react-i18next'
import WalletInputModal from '@/component/walletInputModal'
import IntroductView from '@/component/introductView'

const WalletTable: React.FC = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialFormValues, setInitialFormValue] = useState(undefined)
  const [wallets, setWallets] = useState()
  const [loading, setLoading] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  const columns = [
    {
      title: t('manager.formName'),
      dataIndex: 'name',
      width: 260,
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

  const requestData = async () => {}

  return (
    <>
      <IntroductView title="地址管理" subTitle="本功能将您的钱包地址保存在本地，方便你的批量操作" />
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
        expandable={
          {
            // expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }
        }
      ></Table>
      <WalletInputModal
        key={modalKey}
        type="address"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOK={() => {}}
        hasName={true}
      ></WalletInputModal>
    </>
  )
}

export default WalletTable
