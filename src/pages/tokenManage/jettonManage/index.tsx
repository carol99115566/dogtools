import { Button, Input, Form, notification, Descriptions, Tag, Row, Col, message, Skeleton, Flex, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectionTitle from '../../../../component/selectionTitle'
import styles from './index.less'
import Jetton from './component/jetton'
import ContractAddressSelect from './component/addressSelect'
import { TokenMeta } from '@/type/token'
import { useBundleContext } from '../../bundleContext'
import NoAddress from './component/noAddress'
import { history, useLocation } from 'umi'

export interface JettonDetailProps {
  contactAddress?: string
  name?: string
  symbol?: string
  totalSupply?: string
  owner?: string
  isPublish?: boolean
  sourceCode?: string
  tokenBalance?: string
  ethBalance?: string
  tradeOpen?: Boolean
}

export default function JettonDetail() {
  const bundleItem = useBundleContext()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const address = searchParams.get('address')
  const [messageApi, contextHolder] = message.useMessage()
  const [selectAddress, setSelectAddress] = useState<string | null>()

  useEffect(() => {
    setSelectAddress(address)
  }, [address])

  // select 切换地址时
  const handleChangeAddress = (address: string) => {
    history.push(`${location.pathname}?address=${address}`)
  }

  return (
    <>
      {contextHolder}
      <ContractAddressSelect onChange={(token) => handleChangeAddress(token)} />
      {!selectAddress && <NoAddress />}
      {selectAddress && (
        <>
          {/* 代币管理 */}
          <Jetton address={selectAddress} />
          {/* 流动性管理 */}
        </>
      )}
    </>
  )
}
