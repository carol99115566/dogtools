import { Button, Table, Space, Spin, Input, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WalletInputModal from '@/component/walletInputModal'
import { getBalanceByPrivateKey, getKeypairFromStr, getTokenBalanceFromPrivateKey } from '@/utils/SOL_Util'
import { truncateText } from '@/utils/utils'
import { LoadingOutlined, SyncOutlined, DeleteOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import AmountInputModal from '../amountInputModal'
import WalletSelectModal from '../walletSelectModal'

interface IBulkPrivatekeySelect {
  privateKey: string
  address: string
  balance: number
  buyAmount?: string
  tokenBlance?: string
}

const BulkPrivatekeySelect: React.FC<{
  onChange: (wallets: IBulkPrivatekeySelect[] | undefined) => void
  type: 'buy' | 'sell'
  tokenAddress?: string
}> = ({ onChange, type, tokenAddress }) => {
  const { t } = useTranslation()
  const [isManualInputOpen, setIsManualInputOpen] = useState(false)
  const [isPrivateSelectOpen, setIsPrivateSelectOpen] = useState(false)
  const [isAmountInputOpen, setIsAmountInputOpen] = useState(false)
  const [wallets, setWallets] = useState<IBulkPrivatekeySelect[]>()
  const [loading, setLoading] = useState(false)
  const [blanceLoading, setBlanceLoading] = useState(false)
  const [tokenBlanceLoading, setTokenBlanceLoading] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  useEffect(() => {
    onChange(wallets)
  }, [wallets])

  // 通过私钥数组，计算大钱包数组
  const calculateBigWallet = async (privatekeys: string[]) => {
    setLoading(true)
    const bigWallet: IBulkPrivatekeySelect[] = []
    for (let index = 0; index < privatekeys.length; index++) {
      let currentWallet: IBulkPrivatekeySelect
      const privatekey = privatekeys[index]
      const wallet = getKeypairFromStr(privatekey)
      const balance = await getBalanceByPrivateKey(privatekey)
      currentWallet = {
        privateKey: privatekey,
        address: wallet.publicKey.toString(),
        balance: balance,
      }
      if (tokenAddress) {
        const tokenBalance = await getTokenBalanceFromPrivateKey(privatekey, tokenAddress)
        currentWallet.tokenBlance = tokenBalance
      }
      bigWallet.push(currentWallet)
    }
    setLoading(false)
    setWallets(bigWallet)
  }

  // 更新 SOL 余额
  const updateSOLBalance = async () => {
    if (!wallets) return
    setBlanceLoading(true)
    const bigWallet: IBulkPrivatekeySelect[] = []
    for (let index = 0; index < wallets.length; index++) {
      const wallet = wallets[index]
      const balance = await getBalanceByPrivateKey(wallet.privateKey)
      bigWallet.push({
        ...wallet,
        balance: balance,
      })
    }
    setBlanceLoading(false)
    setWallets(bigWallet)
  }

  // 更新钱包
  const updateWallet = (wallet: IBulkPrivatekeySelect, index: number) => {
    const newWallets = [...wallets!]
    newWallets[index] = wallet
    setWallets(newWallets)
  }

  // 删除钱包
  const deleteWallet = (wallet: IBulkPrivatekeySelect, index: number) => {
    const newWallets = [...wallets!]
    newWallets.splice(index, 1)
    setWallets(newWallets)
  }

  // 更新 token 余额
  const updateTokenBalance = async () => {
    if (!wallets) return
    setTokenBlanceLoading(true)
    const bigWallet: IBulkPrivatekeySelect[] = []
    for (let index = 0; index < wallets.length; index++) {
      const wallet = wallets[index]
      const tokenBalance = await getTokenBalanceFromPrivateKey(wallet.privateKey, tokenAddress!)
      bigWallet.push({
        ...wallet,
        tokenBlance: tokenBalance,
      })
    }
    setTokenBlanceLoading(false)
    setWallets(bigWallet)
  }

  const columns: TableProps<IBulkPrivatekeySelect>['columns'] = [
    {
      title: '私钥',
      dataIndex: 'privateKey',
      render: (data: string) => {
        return truncateText(data, 5, 5, 20)
      },
    },
    {
      title: '钱包地址',
      dataIndex: 'address',
    },
    {
      title: (
        <Space>
          <span>SOL 余额</span>
          {wallets && wallets?.length !== 0 && (
            <Tooltip title="刷新余额">
              <SyncOutlined onClick={updateSOLBalance} />
            </Tooltip>
          )}
        </Space>
      ),
      dataIndex: 'balance',
      render: (data: number) => {
        console.log('blance blance 是什么', data)
        return blanceLoading ? <Spin indicator={<LoadingOutlined spin />} /> : data
      },
      // width: 260,
    },
  ]

  // 购买信息
  if (type === 'buy') {
    columns.push({
      title: (
        <Space>
          <span>买入金额(SOL)</span>
          {wallets && wallets?.length !== 0 && (
            <Button
              onClick={() => {
                setIsAmountInputOpen(true)
              }}
            >
              一键输入
            </Button>
          )}
        </Space>
      ),
      dataIndex: 'buyAmount',
      render: (data: string, wallet: IBulkPrivatekeySelect, index: number) => {
        return (
          <Input
            placeholder="请输入"
            value={data}
            onChange={(e) => {
              const newWallet = {
                ...wallet,
                buyAmount: e.target.value,
              }
              updateWallet(newWallet, index)
            }}
          />
        )
      },
      // width: 260,
    })
  }

  // token 信息
  if (tokenAddress) {
    columns.push({
      title: (
        <Space>
          <span>Token 余额</span>
          <Tooltip title="刷新 token 余额">
            <SyncOutlined onClick={updateTokenBalance} />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'tokenBlance',
      render: (data: string) => {
        return tokenBlanceLoading ? <Spin indicator={<LoadingOutlined spin />} /> : data
      },
      // width: 260,
    })
  }

  columns.push({
    title: '操作',
    dataIndex: 'action',
    render: (_, record, index) => {
      return (
        <DeleteOutlined
          onClick={() => {
            deleteWallet(record, index)
          }}
        />
      )
    },
  })

  const handleInputAllAmount = (amount: string) => {
    if (!wallets) return
    const bigWallet: IBulkPrivatekeySelect[] = []
    for (let index = 0; index < wallets.length; index++) {
      const wallet = wallets[index]
      bigWallet.push({
        ...wallet,
        buyAmount: amount,
      })
    }
    setIsAmountInputOpen(false)
    setWallets(bigWallet)
  }

  const handleAddFromManualInput = () => {
    // Form的initialValues可能会第二次才生效，这里用key触发下生效
    setModalKey(modalKey + 1)
    setIsManualInputOpen(true)
  }

  const handleAddFromPrivateManage = () => {
    setIsPrivateSelectOpen(true)
  }

  const headerRender = () => {
    return (
      <Space>
        <Button onClick={handleAddFromPrivateManage}>从私钥管理中导入</Button>
        <Button onClick={handleAddFromManualInput}>手动导入</Button>
      </Space>
    )
  }

  const footerRender = () => {
    if (wallets?.length) {
      return (
        <span className="table-tip">
          共 <strong>{wallets?.length}</strong> 个钱包
        </span>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <Table
        className="wallet-table"
        columns={columns}
        loading={loading}
        rowKey="dataIndex"
        dataSource={wallets}
        bordered
        title={headerRender}
        footer={footerRender}
      ></Table>
      <WalletInputModal
        key={modalKey}
        type="privateKey"
        open={isManualInputOpen}
        onCancel={() => {
          setIsManualInputOpen(false)
        }}
        onOK={(data) => {
          calculateBigWallet(data.value.split('\n'))
          setIsManualInputOpen(false)
        }}
      ></WalletInputModal>
      <WalletSelectModal
        open={isPrivateSelectOpen}
        onCancel={() => {
          setIsPrivateSelectOpen(false)
        }}
        onOK={(privatekeys) => {
          calculateBigWallet(privatekeys)
          setIsPrivateSelectOpen(false)
        }}
      />
      <AmountInputModal
        onOK={handleInputAllAmount}
        open={isAmountInputOpen}
        onCancel={() => {
          setIsAmountInputOpen(false)
        }}
      />
    </>
  )
}

export default BulkPrivatekeySelect
