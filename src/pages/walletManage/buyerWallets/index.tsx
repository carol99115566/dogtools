import { Button, Divider, Flex, message, Modal, Space, Table } from 'antd'
import CreateBuyerWalletsModal from './createBuyerWallets'
import { useEffect, useState } from 'react'
import { deleteBuyerWallets, queryUserBuyerWallets } from '@/services/api'
import { getBalanceByPrivateKey, renderChainDiv } from '@/utils/chain'
import './index.less'
import { useTranslation } from 'react-i18next'
import { useBundleContext } from '@/pages/bundle/bundleContext'
import { useChainContext } from '@/layouts/chainContext'
import { IBuyers, IBuyerWalletsWithBalance, IBuyerWalletsManage } from '@/type/wallet'
import { getSwapBuyers, truncateText, getSwapBuyerString } from '@/utils/utils'
import { BuyerWalletsMeta } from '@/pages/bundle/type'
import { IBuyerObj } from '@/pages/snipe/type'

const BuyerWalletsTable: React.FC = () => {
  const { t } = useTranslation()
  const chainItem = useChainContext()
  // const bundleItem = useBundleContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialFormValues, setInitialFormValue] = useState(undefined)
  const [wallets, setWallets] = useState<IBuyerWalletsManage[]>()
  const [loading, setLoading] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  // balance: 'balance\n({chain})',
  // purchaseAmount: 'Purchase Amount\n({chain})',
  // receivingAddress: 'Receive Address',
  // privateKeyName: 'Private Key',
  const columns = [
    {
      title: t('manager.formName'),
      dataIndex: 'name',
      width: 120,
    },
    {
      title: t('manager.formChain'),
      dataIndex: 'chain',
      width: 100,
      render: (data) => {
        return renderChainDiv(data)
      },
    },
    {
      title: t('manager.count'),
      dataIndex: 'buyer_wallets',
      width: 80,
      render: (data: IBuyerObj[]) => {
        // const buyers = getSwapBuyers(data)
        return data.length
      },
    },
    {
      title: (
        <>
          {t('manager.buyerWallet.buyerWalletName')}
          <br />
          <Flex vertical={false} align="center">
            <span style={{ width: '200px' }}>{t('manager.privateKeyName')}</span> <Divider type="vertical" />
            <span style={{ width: '90px' }}>
              {t('manager.balance', {
                chain: chainItem.value,
              })}
            </span>{' '}
            <Divider type="vertical" />
            <span style={{ width: '90px' }}>
              {t('manager.purchaseAmount', {
                chain: chainItem.value,
              })}
            </span>{' '}
            <Divider type="vertical" />
            <span style={{ width: '200px' }}>{t('manager.receivingAddress')}</span>
          </Flex>
        </>
      ),
      ellipsis: true,
      dataIndex: 'buyer_wallets',
      render: (data: IBuyerObj[]) => {
        // const buyers = getSwapBuyers(data)
        return handlePrivateKeys(data)
        // return renderChainDiv(data)
      },
    },
    {
      title: t('manager.formAction'),
      dataIndex: '',
      width: 120,
      key: 'Action',
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
                  await deleteBuyerWallets(data.id)
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

  const handlePrivateKeys = (buyers: IBuyerObj[]) => {
    return (
      <>
        {buyers.map((element, index) => {
          return (
            <Flex key={index} vertical={false} align="center">
              <span style={{ width: '200px' }}>{truncateText(element.privateKey, 10, 10, 30)}</span>{' '}
              <Divider type="vertical" />
              <span style={{ width: '90px' }}>{element.balance || '-'}</span>
              {element.amount && (
                <>
                  <Divider type="vertical" />
                  <span style={{ width: '90px' }}>{`${element.amount}`}</span>
                </>
              )}
              {element.receiverAddress && (
                <>
                  <Divider type="vertical" />
                  <span style={{ width: '200px' }}>{truncateText(element.receiverAddress, 10, 10, 30)}</span>
                </>
              )}
            </Flex>
          )
        })}
      </>
    )
  }

  const handleEdit = (data: IBuyerWalletsManage) => {
    const buyerStr = getSwapBuyerString(data.buyer_wallets)
    setInitialFormValue({
      ...data,
      buyer_wallets: buyerStr,
    })
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
      const { data: wallets } = await queryUserBuyerWallets({
        chain: chainItem?.value,
      })
      const resultWallets = wallets.map((element: BuyerWalletsMeta) => {
        return {
          ...element,
          buyer_wallets: getSwapBuyers(element.buyer_wallets),
        }
      })
      console.log('resultWallets 是什么是什么是什么', resultWallets)
      // 先展示
      setWallets(resultWallets)
      // 然后获取余额
      getAllBlance(resultWallets)
    } catch (err: any) {
      message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  const getAllBlance = async (wallets: IBuyerWalletsManage[]) => {
    if (!wallets) return
    try {
      const currentWallets: IBuyerWalletsManage[] = []
      for (let index = 0; index < wallets.length; index++) {
        const element = wallets[index]
        const buyers = element.buyer_wallets
        const currentBuyers: IBuyerObj[] = []
        for (let i = 0; i < buyers.length; i++) {
          const buyer = buyers[i]
          const balance = await getBalanceByPrivateKey(chainItem.value, buyer.privateKey)
          console.log(buyer, balance)
          currentBuyers.push({
            ...buyer,
            balance: balance,
          })
        }
        currentWallets.push({
          ...element,
          buyer_wallets: currentBuyers,
        })
      }
      setWallets(currentWallets)
    } catch (err: any) {
      console.log('为什么失败了呀', err)
      // message.error(err?.message)
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   getAllBlance()
  // }, wallets)

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
        className="buyer-wallets-table"
        columns={columns}
        loading={loading}
        rowKey="dataIndex"
        dataSource={wallets}
      ></Table>
      <CreateBuyerWalletsModal
        validate={false}
        key={modalKey}
        initialFormValues={initialFormValues}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
      />
    </>
  )
}

export default BuyerWalletsTable
