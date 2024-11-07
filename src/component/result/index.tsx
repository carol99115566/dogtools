import React, { createContext, useContext, useState, ReactNode } from 'react'
import styles from './index.less'
import { Result, Button, Typography } from 'antd'
const { Paragraph, Text } = Typography
import { RightCircleOutlined } from '@ant-design/icons'
import { history } from 'umi'

export interface TransactionAccountNonce {
  hash: string
  signedTransaction: string
  account: string
  nonce: number
}

const BundleResult: React.FC<{
  bundleTransactions: TransactionAccountNonce[]
  endPoint: string
  onCreate: () => void
}> = ({ bundleTransactions, onCreate, endPoint }) => {
  const onCreateNew = () => {
    onCreate()
  }

  return (
    <Result
      status="success"
      title="bundle success!"
      subTitle="Your token is ready for trading!"
      extra={[
        <Button type="primary" key="console" onClick={onCreateNew}>
          Create new
        </Button>,
        //   <Button key="buy">Buy Again</Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            Bundle transactions:
          </Text>
        </Paragraph>
        <div>
          {bundleTransactions.map((transaction, index) => {
            return (
              <Paragraph>
                <RightCircleOutlined className="site-result-demo-success-icon" />{' '}
                {index === 0 ? 'Open trading. ' : 'Swap Exact ETH For Tokens. '}
                <a target="_blank" href={`${endPoint}/${transaction.hash}`}>
                  {transaction.hash} &gt;
                </a>
              </Paragraph>
            )
          })}
        </div>
      </div>
    </Result>
  )
}

export default BundleResult
