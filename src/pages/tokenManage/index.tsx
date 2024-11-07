import { Button, message, Modal, Space, Table, Tooltip, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { deleteWallet, queryUserTokens } from '@/services/api'
import { renderChainDiv } from '@/utils/chain'
import './index.less'
import { useTranslation } from 'react-i18next'
import { TokenMeta } from '@/type/token'
import { token } from '@coral-xyz/anchor/dist/cjs/utils'
import { allBundleItems } from '@/pages/bundle'
import { useBundleContext } from '@/pages/bundle/bundleContext'
import { history } from 'umi'

const TokenManageTable: React.FC = () => {
  const bundleItem = useBundleContext()
  const { t } = useTranslation()
  const [tokens, setTokens] = useState<TokenMeta[]>()
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: t('manager.tokenManage.tablePlantform'),
      dataIndex: 'platform',
      width: 120,
      render: (data) => {
        // const platform = data.split('.')[0];
        return renderChainDiv(data)
      },
    },
    {
      title: t('manager.tokenManage.tableToken'),
      dataIndex: 'listname',
      width: 260,
      render: (_, item: TokenMeta) => {
        const result = allBundleItems.find((element) => element.label.toLowerCase() === item.platform.toLowerCase())
        return (
          <Tooltip
            title={t('manager.tokenManage.viewOn', {
              platform: result?.viewOnName,
            })}
          >
            <a target="_blank" href={`${result?.tokenEndPoint}/${item.address}`}>
              {item.listname}
            </a>
          </Tooltip>
        )
      },
    },
    {
      title: t('manager.tokenManage.tableIsOpenTrade'),
      dataIndex: 'isOpenName',
      width: 260,
      render: (_, item: TokenMeta) => {
        return (
          <Tag color={item.trading_open ? 'success' : 'error'}>
            {item.trading_open ? t('manager.tokenManage.openTrade') : t('manager.tokenManage.disOpen')}
          </Tag>
        )
      },
    },
    {
      title: t('manager.formAction'),
      dataIndex: '',
      key: 'Action',
      width: 120,
      render: (_, item: TokenMeta) => (
        <Space>
          <a
            onClick={() => {
              history.push(`/bundle/${bundleItem?.value}/tokenManage?address=${item.address}`)
            }}
          >
            {t('manager.tokenManage.actionDetail')}
          </a>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    try {
      setLoading(true)
      const { data: tokens } = await queryUserTokens({
        platform: bundleItem?.label,
      })
      setTokens(tokens)
    } catch (err: any) {
      message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Table
        className="wallet-table"
        columns={columns}
        loading={loading}
        rowKey="dataIndex"
        dataSource={tokens}
      ></Table>
    </>
  )
}

export default TokenManageTable
