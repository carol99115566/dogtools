import React, { useState } from 'react'
import styles from './index.less'
import { Button, Flex, Input, Space, message } from 'antd'
import { usePassword } from '@/layouts/passwordContext'
import { PRIVATE_KEY_WALLET_MANAGE } from '@/utils/constant'
import { getBulkWalletsMeta } from '@/pages/walletManage/utils'

const EncryptDecryptView: React.FC = () => {
  const { password, setPassword } = usePassword()
  const [value, setValue] = useState<string>()

  const storePrivateKeys = localStorage.getItem(PRIVATE_KEY_WALLET_MANAGE)
  const handleAction = () => {
    if (!value) {
      message.error('please input password')
      return
    }
    // 校验是否能解锁成功
    if (storePrivateKeys) {
      const wallets = getBulkWalletsMeta(value)
      if (!wallets) {
        message.error('password error')
        return
      }
    }
    setPassword(value)
  }

  return (
    <Flex vertical={true} gap={20} align="center" justify="center">
      {!storePrivateKeys && <div className="desc">您还未开启本地私钥管理，请设置加密密码并开启管理</div>}
      <Space>
        <Input.Password value={value} onChange={(e) => setValue(e.target.value)} placeholder="请输入密码" />
        <Button onClick={handleAction} type="primary">
          {storePrivateKeys ? '解锁' : '开启管理'}
        </Button>
      </Space>
    </Flex>
  )
}

export default EncryptDecryptView
