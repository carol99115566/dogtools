import styles from './index.less'
import { Flex } from 'antd'
import React from 'react'

const IntroductView: React.FC<{
  title: string
  subTitle: string
  image?: string
}> = ({ title, subTitle, image }) => {
  return (
    <div className={styles.titleView}>
      <img className={styles.img} src={image} />
      <Flex vertical={true} gap={10}>
        <Flex gap={10} vertical={false} align="center">
          <span className={styles.title}>{title}</span>
        </Flex>
        <div className={styles.description}>{subTitle}</div>
      </Flex>
    </div>
  )
}

export default IntroductView
