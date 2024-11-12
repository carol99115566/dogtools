import { Divider, Flex, Space, Switch } from 'antd'
import * as React from 'react'

const TitleSwitch: React.FC<{
  title: string
  onChange: (value: boolean) => void
  value?: boolean
}> = ({ title, onChange, value }) => {
  return (
    <Flex vertical={true}>
      <Space>
        <span className="title-group">{title}</span>
        <Switch value={value} onChange={onChange} />
      </Space>
      <Divider />
    </Flex>
  )
}

export default TitleSwitch
