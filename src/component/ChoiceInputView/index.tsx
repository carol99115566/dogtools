import React, { useState } from 'react'
import { Radio, Input, Tooltip, Flex, Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import type { RadioChangeEvent } from 'antd'

interface ChoiceInputViewProps {
  type: 'jito'
  onChange: (value: string) => void
}

interface IChoiceInputViewData {
  title: string
  titleExplain?: string
  datas: string[]
  defaultData?: string
}

const dataItems = {
  jito: {
    title: 'Jito MEV小费(仅需支付一次，建议选择0.0003)',
    datas: [
      {
        label: '默认0.00003',
        value: '0.00003',
      },
      {
        label: '高速0.0001',
        value: '0.0001',
      },
      {
        label: '极速0.0003',
        value: '0.0003',
      },
    ],
    defaultData: '0.0003',
    titleExplain: `Jito MEV 防夹模式为您的交易分配专用“赛道”，基于 Solana 的技术，确保每个区块有三分之一的空间专用于 Jito 的操作。\n通过固定位置的捆绑包，Jito MEV 功能能同时处理流动性创建和购买交易，确保它们同时上链。\n用户可选择支付给矿工的“贿赂”费用，提高交易的优先级，费用越高，交易上链速度越快。`,
  },
}

const ChoiceInputView: React.FC<ChoiceInputViewProps> = ({ type, onChange }) => {
  const { title, titleExplain, datas, defaultData } = dataItems[type]
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultData)
  const [inputValue, setInputValue] = useState<string>(defaultData ? String(defaultData) : '')
  const handleRadioChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value
    setSelectedValue(newValue)
    setInputValue(String(newValue)) // 同时将 Radio 值赋给 Input
    onChange(String(newValue)) // 调用 onChange，仅传入 Input 的值
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setSelectedValue(undefined) // 取消选中 Radio
    onChange(newValue) // 调用 onChange，仅传入 Input 的值
  }

  return (
    <Flex vertical={true} gap={10}>
      {/* Title and tooltip */}
      <Space>
        <span className="title-group">{title}</span>
        {titleExplain && (
          <Tooltip title={titleExplain}>
            <QuestionCircleOutlined style={{ marginLeft: 8 }} />
          </Tooltip>
        )}
      </Space>

      {/* Radio and Input */}
      <Space>
        <Radio.Group
          buttonStyle="solid"
          options={datas}
          value={selectedValue}
          onChange={handleRadioChange}
          optionType="button"
        />
        <Input style={{ width: 200, marginLeft: 10 }} value={inputValue} onChange={handleInputChange} />
      </Space>
    </Flex>
  )
}

export default ChoiceInputView
