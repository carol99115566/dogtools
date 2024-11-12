import styles from './index.less'
import { Divider, Flex, Space } from 'antd'
import React from 'react'

const IntroductView: React.FC<{
  title: string
  subTitle: string
  image?: string
}> = ({ title, subTitle, image }) => {
  return (
    <Flex vertical={true}>
      <Space>
        {image && <img className={styles.img} src={image} />}
        <Flex vertical={true} gap={10}>
          <span className={styles.title}>{title}</span>
          <div className={styles.description}>{subTitle}</div>
        </Flex>
      </Space>
      <Divider />
    </Flex>
  )
}

export default IntroductView
