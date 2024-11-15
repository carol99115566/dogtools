import { SERVE_TYPE } from '@/utils/constant'
import { Divider, Flex, Space, Switch, Button } from 'antd'
import * as React from 'react'

const ServeButton: React.FC<{
  type: SERVE_TYPE
  onClick: () => void
}> = ({ onClick }) => {
  const dataSource = {
    //   PUMP_BUNDLED_SELL = 'pump_bundled_sell', // pump 一键卖出
    //   PUMP_MICRO_TRADING = 'pump_micro_trading', // pump 批量交易
    //   PUMP_VOLUME_BOT = 'pump_volume_bot', // 微量刷单
    //   PUMP_MAKER_BUYERS = 'pump_maker_buyers', // 新地址买入
    //   WALLET_BATCH_GENERATE = 'wallet_batch_generate', // 批量创建
    //   WALLET_MULTI_SENDER = 'wallet_multi_sender', // 批量转账
    //   WALLET_BATCH_COLLECTION = 'wallet_batch_collection', // 批量归集
    //   WALLET_MULTI_TO_MULTI = 'wallet_multi_to_multi', // 多对多转账
    //   WALLET_RELAY_TRANSFER = 'wallet_relay_transfer', //
    //   WALLET_RECOVERY_RENT = 'wallet_recovery_rent', // 租金回收
    //   WALLET_BATCH_RECLAIM_RENT = 'wallet_batch_reclaim_rent', // 批量租金回收
  }

  return (
    <Flex vertical={true}>
      <Button type="primary" onClick={onClick} shape="round" size="large"></Button>
    </Flex>
  )
}

export default ServeButton
