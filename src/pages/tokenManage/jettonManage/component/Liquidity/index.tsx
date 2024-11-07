import { getSwapBuyers, truncateText } from '@/utils/utils'
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
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'umi'
import type { DescriptionsProps } from 'antd'
// import JettonTransfer from './jettonTransfer'
// import OpenTrading from './openTrading'
import { useGlobalContext } from '@/layouts/chainContext'
// import NoAddress from '../../../../../component/noAddress'
// import { getEHTJettonDetail } from '@/utils/eht'
import styles from './index.less'
import { JettonDetailProps } from '../..'
import SelectionTitle from '@/component/selectionTitle'
import { TokenMeta } from '@/type/token'
import OpenTrading from '../openTrading'
import { useBundleContext } from '@/pages/bundle/bundleContext'

export default function Jetton({
  jettonDetail,
  token,
}: {
  jettonDetail: JettonDetailProps | undefined
  token: TokenMeta | undefined
}) {
  const bundleItem = useBundleContext()
  const [items, setItems] = useState<DescriptionsProps['items']>()
  const [messageApi, contextHolder] = message.useMessage()
  const [isCodeOpen, setIsCodeOpen] = useState<boolean>(false)
  const [bundleModelOpen, setBundleModelOpen] = useState<boolean>(false)
  const endPoint = bundleItem?.value === 'sepolia' ? 'https://sepolia.etherscan.io' : 'https://etherscan.io'

  useEffect(() => {
    if (jettonDetail && token) {
      console.log('token_info 是什么是什么是什么', token.token_info, jettonDetail)
      initItems()
    }
  }, [jettonDetail, token])

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
  }
  return (
    <>
      <div>
        {contextHolder}
        <Skeleton loading={jettonDetail ? false : true} active>
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
        <OpenTrading address={jettonDetail?.contactAddress!} complete={() => {}} />
      </Modal>
    </>
  )
}
