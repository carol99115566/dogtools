import { Steps, Flex, Alert, Tabs, Menu, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { getContentItems } from './items'
import { useChainContext } from '@/layouts/chainContext'
import { history, Outlet, useParams } from 'umi'
import './index.less'

const MainContent: React.FC = () => {
  const chainItem = useChainContext()
  if (!chainItem) return

  const items = getContentItems(chainItem.value)

  const getDefaultKey = () => {
    let selectKey = history.location.pathname
    items.forEach((element) => {
      element.children.forEach((childElement) => {
        if (childElement.key) {
          if (history.location.pathname.includes(childElement.key)) {
            selectKey = childElement.key
          }
        }
      })
    })
    return selectKey
  }

  // const allkeys = getDefaultKey()

  if (history.location.pathname === '/sol') {
    history.push('/sol/pump')
  }

  const handleMenuClick = (e) => {
    history.push(e.key)
  }

  return (
    <div className="mainWrapper">
      <Flex vertical={false} gap={24}>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          disabledOverflow
          onClick={handleMenuClick}
          defaultSelectedKeys={[getDefaultKey()]}
        />
        <div style={{ width: '80%' }}>
          <Outlet />
        </div>
      </Flex>
    </div>
  )
}

export default MainContent
