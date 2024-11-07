import { truncateText } from '@/utils/utils'
import {
  Button,
  Input,
  Form,
  notification,
  Descriptions,
  Tag,
  Row,
  Col,
  message,
  Skeleton,
  Flex,
  Modal,
  Popover,
} from 'antd'
import React, { useEffect, useState } from 'react'
import type { DescriptionsProps } from 'antd'
import styles from './index.less'
import { JettonDetailProps } from '../..'
import SelectionTitle from '@/component/selectionTitle'
import { TokenMeta } from '@/type/token'
import OpenTrading from '../openTrading'
import { useBundleContext } from '@/pages/bundle/bundleContext'
import { queryTokenByAddress } from '@/services/api'
import { getEHTJettonDetail } from '@/utils/eht'

export default function Jetton({ address }: { address: string }) {
  const bundleItem = useBundleContext()
  const [items, setItems] = useState<DescriptionsProps['items']>()
  const [messageApi, contextHolder] = message.useMessage()
  const [isCodeOpen, setIsCodeOpen] = useState<boolean>(false)
  const [token, setToken] = useState<TokenMeta>()
  const [bundleModelOpen, setBundleModelOpen] = useState<boolean>(false)
  const [jettonDetail, setJettonDetail] = useState<JettonDetailProps>()
  const [loading, setLoading] = useState<boolean>(false)
  const endPoint = bundleItem?.value === 'sepolia' ? 'https://sepolia.etherscan.io' : 'https://etherscan.io'

  useEffect(() => {
    // 请求代币信息
    setLoading(true)
    requestQueryTokenByAddress()
    getJettonDetail()
  }, [address])

  useEffect(() => {
    if (jettonDetail && token) {
      // 开始初始化信息
      initItems()
    }
  }, [jettonDetail, token])

  // 从数据库请求代币信息
  const requestQueryTokenByAddress = () => {
    queryTokenByAddress({ address: address })
      .then((res) => {
        console.log('token token token 是什么', res)
        setToken(res.data)
      })
      .catch((error) => {
        console.log('代币信息请求不到请求不到啊', error)
      })
  }

  // 通过链上拿到代币信息
  const getJettonDetail = () => {
    if (address) {
      setLoading(true)
      try {
        getEHTJettonDetail(address).then((res) => {
          console.log('结果结果结果拿回来了吗', res)
          setJettonDetail(res)
          setLoading(false)
        })
      } catch (error: any) {
        messageApi.error(error.message ?? JSON.stringify(error ?? {}))
        console.log(error)
        setLoading(false)
      }
    }
  }

  const onCopyCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(function () {
        message.success('copied!')
      })
      .catch(function (err) {
        message.error('fail copy')
      })
  }

  const initItems = async () => {
    let i = 0
    const item = [
      {
        key: 'Token',
        label: 'Token',
        children: (
          <a target="_blank" rel="noopener noreferrer" href={`${endPoint}/address/${token?.address}`}>
            {token?.listname}
          </a>
        ),
      },
      {
        key: 'Source Code',
        label: 'Source Code',
        children: (
          <Button
            style={{ height: '25px' }}
            onClick={() => {
              setIsCodeOpen(true)
            }}
          >
            view
          </Button>
        ),
      },
      {
        key: 'Owner',
        label: 'Owner',
        children: (
          <a target="_blank" rel="noopener noreferrer" href={`${endPoint}/address/${jettonDetail?.owner}`}>
            {truncateText(jettonDetail?.owner, 6, 6, 30)}
          </a>
        ),
      },
      {
        key: 'Total Supply',
        label: 'Total Supply',
        children: jettonDetail?.totalSupply,
      },
      {
        key: 'Token Balance',
        label: 'Token Balance',
        children: jettonDetail?.tokenBalance,
      },
      {
        key: 'ETH Balance',
        label: 'ETH Balance',
        children: jettonDetail?.ethBalance,
      },
      {
        key: 'Published',
        label: 'Published',
        children: (
          <div>
            <Tag color={jettonDetail?.isPublish ? 'success' : 'error'}>
              {jettonDetail?.isPublish ? 'true' : 'false'}
            </Tag>
            {jettonDetail?.isPublish === false && (
              <Popover
                content={`compileVersion: ${token?.token_info.compileVersion}\nfileType: ${token?.token_info.fileType}`}
                title="compile desc"
              >
                <Button
                  style={{ height: '28px' }}
                  onClick={() => {
                    window.open(`${endPoint}/address/${jettonDetail?.contactAddress}#code`, '_blank')
                  }}
                >
                  Go to Published
                </Button>
              </Popover>
            )}
          </div>
        ),
      },
      {
        key: 'TradeOpen',
        label: 'TradeOpen',
        children: (
          <>
            <Tag color={token?.trading_open ? 'success' : 'error'}>{token?.trading_open ? 'true' : 'false'}</Tag>
            {token?.trading_open === false && (
              <Button
                style={{ height: '28px' }}
                onClick={() => {
                  setBundleModelOpen(true)
                }}
              >
                添加流动性 & 捆绑买入
              </Button>
            )}
          </>
        ),
      },
    ]
    setItems(item)
    setLoading(false)
  }
  return (
    <>
      <div>
        {contextHolder}
        <Skeleton loading={loading} active>
          <Descriptions title={'代币合约管理'} style={{ marginTop: 24 }} items={items} className="selectionWrapper" />
        </Skeleton>
      </div>

      <Modal
        title="Source Code"
        width={900}
        open={isCodeOpen}
        onOk={() => {
          onCopyCode(token?.token_info.sourceCode!)
          // setIsCodeOpen(false)
        }}
        onCancel={() => {
          setIsCodeOpen(false)
        }}
        okText="copy"
      >
        <div className={styles.textContainer}>{token?.token_info.sourceCode}</div>
      </Modal>

      <Modal
        title="Source Code"
        width={900}
        onCancel={() => {
          setBundleModelOpen(false)
        }}
        open={bundleModelOpen}
        footer={<></>}
      >
        <OpenTrading address={token?.address} complete={() => {}} />
      </Modal>
    </>
  )
}
