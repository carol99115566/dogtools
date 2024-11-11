import { Button, Divider, Flex, message, Modal, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import './index.less'
import { useTranslation } from 'react-i18next'
import { useChainContext } from '@/layouts/chainContext'
import { IBulkWalletMeta, IBulkWallet, IWalletInfo } from '@/type/wallet'
import WalletInputModal, { IInputWalletData } from '@/component/walletInputModal'
import IntroductView from '@/component/introductView'
import { addBulkWallet, deleteBulkWallet, getBulkWallets, updateBulkWallet } from '../utils'
import { usePassword } from '@/layouts/passwordContext'
import { getWalletInfoFromPrivateKey } from '@/utils/SOL_Util'
import type { TableColumnsType } from 'antd'
import EncryptDecryptView from '@/component/encryptDecryptView'
import { truncateText } from '@/utils/utils'

const BuyerWalletsTable: React.FC = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialFormValues, setInitialFormValue] = useState(undefined)
  const [bulkWallets, setBulkWallets] = useState<IBulkWallet[]>()
  const [loading, setLoading] = useState(false)
  const [modalKey, setModalKey] = useState(0)
  const [currentBulkWallet, setCurrentBulkWallet] = useState<IBulkWallet>()
  const { password, setPassword } = usePassword()

  // 第一级列配置
  const mainColumns: TableColumnsType<IBulkWallet> = [
    {
      title: t('manager.formName'),
      dataIndex: 'name',
      // width: 120,
    },
    {
      title: t('manager.count'),
      dataIndex: 'number',
      // width: 80,
      render: (_, record) => {
        return record.wallets.length
      },
    },
    // {
    //   title: 'SOL 总余额',
    //   dataIndex: 'buyer_wallets',
    //   width: 80,
    //   render: (data: IBuyerObj[]) => {
    //     // const buyers = getSwapBuyers(data)
    //     return data.length
    //   },
    // },
    {
      title: t('manager.formAction'),
      dataIndex: '',
      width: 120,
      key: 'Action',
      render: (_, record, index) => (
        <Space>
          <a
            onClick={() => {
              handleEdit(record)
            }}
          >
            {t('manager.actionEdit')}
          </a>
          <a
            onClick={() => {
              Modal.confirm({
                title: t('manager.deleteConfirm'),
                onOk: handleDelete,
              })
            }}
          >
            {t('manager.actionDelete')}
          </a>
        </Space>
      ),
    },
  ]

  // 第二级的列配置
  const subColumns: TableColumnsType<IWalletInfo> = [
    {
      title: '私钥',
      dataIndex: 'privateKey',
      key: 'privateKey',
      render: (data: string) => {
        return truncateText(data, 5, 5, 20)
      },
    },
    {
      title: '钱包地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'SOL 余额',
      dataIndex: 'balance',
      key: 'balance',
    },
    // {
    //   title: '代币量',
    //   dataIndex: 'tokenAmount',
    //   key: 'tokenAmount',
    // },
    {
      title: '操作',
      key: 'subAction',
      render: (text, record) => <a onClick={() => {}}>代币管理</a>,
    },
  ]

  const handleEdit = (data: IBulkWallet) => {
    setCurrentBulkWallet(data)
    setModalKey(modalKey + 1)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setCurrentBulkWallet(undefined)
    // Form的initialValues可能会第二次才生效，这里用key触发下生效
    setModalKey(modalKey + 1)
    setIsModalOpen(true)
  }

  const handleDelete = (index: number) => {
    const isSuccess = deleteBulkWallet(index, password)
    if (isSuccess) {
      const currentWallets = [...bulkWallets!]
      currentWallets.splice(index, 1)
      setBulkWallets(currentWallets)
      message.success('delete success')
    } else {
      message.error('delete failed')
    }
  }

  const handlePrivateInputOk = (data: IInputWalletData, isAdd: boolean) => {
    if (isAdd) {
      addBulkWallet(
        {
          name: data.name || '',
          privateKeys: data.value,
        },
        password,
      )
    } else {
      updateBulkWallet(
        {
          name: data.name || '',
          privateKeys: data.value,
        },
        Number(currentBulkWallet?.key),
        password,
      )
    }
    refreshDataSource()
    setCurrentBulkWallet(undefined)
    setIsModalOpen(false)
    message.success(isAdd ? 'add success!' : 'edit success!')
  }

  useEffect(() => {
    refreshDataSource()
  }, [password])

  const refreshDataSource = () => {
    if (password) {
      const wallets = getBulkWallets(password)
      if (wallets) {
        configBulkWallets(wallets)
      }
    }
  }

  const configBulkWallets = async (bulkMetaWallets: IBulkWalletMeta[]) => {
    setLoading(true)
    try {
      const currentBulkWallets: IBulkWallet[] = []
      for (let index = 0; index < bulkMetaWallets.length; index++) {
        const element = bulkMetaWallets[index]
        const privateKeys = element.privateKeys.split('\n')
        const wallets: IWalletInfo[] = []
        for (let privateKey of privateKeys) {
          const wallet = await getWalletInfoFromPrivateKey(privateKey)
          if (wallet) wallets.push(wallet)
        }
        currentBulkWallets.push({
          key: `${index}`,
          name: element.name,
          wallets: wallets,
        })
      }
      setBulkWallets(currentBulkWallets)
    } catch (err: any) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <IntroductView
        title="私钥管理"
        subTitle="本功能基于 AES 加密，并存储在本地。我们无法获取你的信息。请确保您的电脑足够安全"
      />
      {password && (
        <Table
          className="buyer-wallets-table"
          columns={mainColumns}
          loading={loading}
          rowKey="key"
          dataSource={bulkWallets}
          title={() => (
            <Button onClick={handleAdd} type="primary">
              {t('manager.createName')}
            </Button>
          )}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <div>
                  <Table
                    rowKey="dataIndex"
                    columns={subColumns}
                    dataSource={record.wallets}
                    pagination={false}
                    style={{ width: '100%' }}
                    size="small"
                    bordered
                  />
                </div>
              )
            },
          }}
        ></Table>
      )}
      {!password && <EncryptDecryptView />}
      <WalletInputModal
        key={modalKey}
        type="privateKey"
        open={isModalOpen}
        walletData={
          currentBulkWallet
            ? {
                name: currentBulkWallet?.name,
                value: currentBulkWallet.wallets.map((item) => item.privateKey).join('\n'),
              }
            : undefined
        }
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOK={(data, isAdd) => {
          handlePrivateInputOk(data, isAdd)
        }}
        hasName={true}
      ></WalletInputModal>
    </>
  )
}

export default BuyerWalletsTable
