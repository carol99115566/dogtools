import styles from './menu.module.less'
import { Radio } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
// import './index.less'
import { SnipePlatform } from '@/pages/snipe/type'

export interface MenuItemProps {
  value: string
  label: string
}

const YYMenu: React.FC<{
  items: MenuItemProps[]
  defaultValue: string
  onChange?: (value: string) => void
}> = ({ items, defaultValue, onChange }) => {
  const handleOnChange = (e) => {
    onChange?.(e.target.value)
  }

  return (
    <Radio.Group onChange={handleOnChange} defaultValue={defaultValue}>
      {items.map((item) => {
        return (
          <Radio.Button key={item.label} value={item.value}>
            {item.label}
          </Radio.Button>
        )
      })}
    </Radio.Group>
  )
}

export default YYMenu
