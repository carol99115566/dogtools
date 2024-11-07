import { url } from '@/layouts/components/connectWallet/connectors/url'
import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import './index.less'
import messageSVG from '../../../../../../assets/message.svg'
import { Flex } from 'antd'
// 从 CDN 加载样式
const TippyStyles = () => <link rel="stylesheet" href="https://unpkg.com/tippy.js@6.3.1/dist/tippy.css" />

const NoAddress = () => {
  const words = [
    { text: '批量转账', value: 100 },
    { text: '加池子', value: 99 },
    { text: '创建流动性并买入', value: 100 },
    { text: '空投', value: 99 },
    { text: '燃烧流动性', value: 98 },
    { text: '销毁流动性', value: 98 },
    { text: '做市场机器人', value: 99 },
  ]

  return (
    <Flex gap={24} vertical={true} justify="center" align="center">
      <div className="wordCloudWrapper">
        <TippyStyles />
        <ReactWordcloud words={words} />
      </div>
      <span className="sub-title">选择或输入代币地址，来管理你的代币吧!</span>
    </Flex>
  )
}

export default NoAddress
