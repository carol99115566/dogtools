import React, { useEffect, useState } from 'react'
import { Modal, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import './index.less'
import { usePassword } from '@/layouts/passwordContext'
import type { TableColumnsType, TableProps } from 'antd'
import EncryptDecryptView from '@/component/encryptDecryptView'
import { truncateText } from '@/utils/utils'
import { IBulkWallet, IWalletInfo } from '@/type/wallet'
import { getBulkWalletsInfo } from '@/pages/walletManage/utils'
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection']

function WalletSelectModal({
  open,
  onOK,
  onCancel,
}: {
  open: boolean
  onOK: (privateKeys: string[]) => void
  onCancel: () => void
}) {
  const { t } = useTranslation()
  const { password, setPassword } = usePassword()
  const [bulkWallets, setBulkWallets] = useState<IBulkWallet[]>()
  const [selectedRows, setSelectedRows] = useState<IBulkWallet[]>()
  const [loading, setLoading] = useState(false)

  // 第一级列配置
  const mainColumns: TableColumnsType<IBulkWallet> = [
    {
      title: t('manager.formName'),
      dataIndex: 'name',
    },
    {
      title: t('manager.count'),
      dataIndex: 'number',
      render: (_, record) => {
        return record.wallets.length
      },
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
  ]

  useEffect(() => {
    refreshDataSource()
  }, [password])

  const refreshDataSource = async () => {
    if (password) {
      setLoading(true)
      const wallets = await getBulkWalletsInfo(password)
      setBulkWallets(wallets)
      setLoading(false)
    }
  }

  const handleOK = () => {
    onOK(getPrivateKeys()!)
  }

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<IBulkWallet> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows)
    },
  }

  const getPrivateKeys = () => {
    if (!selectedRows) return undefined
    const privateKeys: string[] = []
    for (const bulkWallet of selectedRows) {
      for (const element of bulkWallet.wallets) {
        privateKeys.push(element.privateKey)
      }
    }
    return privateKeys
  }

  return (
    <Modal
      width={1000}
      // maskClosable={false}
      title="请选择私钥组"
      open={open}
      destroyOnClose
      onCancel={onCancel}
      onOk={handleOK}
      okButtonProps={{
        disabled: selectedRows?.length === 0 || !selectedRows,
      }}
    >
      {password && (
        <Table
          className="buyer-wallets-table"
          columns={mainColumns}
          loading={loading}
          rowKey="key"
          dataSource={bulkWallets}
          rowSelection={{ ...rowSelection }}
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
      {password && (
        <span className="table-tip">
          共选择 <strong>{(getPrivateKeys() || []).length}</strong> 个钱包
        </span>
      )}
    </Modal>
  )
}

export default WalletSelectModal
