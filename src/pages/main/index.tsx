import { Steps, Flex, Alert, Tabs, Menu, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { history, Outlet, useParams } from 'umi'
import './index.less'
import { allMainMenuItems, getMainMenuItemByPath } from '@/layouts/type'

const MainContent: React.FC = () => {
  const items = getMainMenuItemByPath(history.location.pathname)?.items

  useEffect(() => {
    let key = history.location.pathname
    const allkeys = items.map((item) => item.key)
    if (!allkeys.includes(key)) {
      history.push(allkeys[0])
    }
  }, [items])

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
          defaultSelectedKeys={[history.location.pathname]}
        />
        <div style={{ width: '80%', minHeight: '600px' }}>
          <Outlet />
        </div>
      </Flex>
    </div>
  )
}

export default MainContent
