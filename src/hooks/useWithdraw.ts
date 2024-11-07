import { queryUserWithdraw } from '@/services/api'
import { WithdrawHistory } from '@/type/withdraw_history'
import React from 'react'

export const useWithdrawHistory = () => {
  const [withdrawHistory, setWithdrawHistory] = React.useState<WithdrawHistory[]>()

  React.useEffect(() => {
    queryUserWithdraw().then((res) => {
      let history = res.data
      if (history) {
        // 改为Number后，就可以自动科学计算法展示了
        history.forEach((item) => {
          item.applied_amt = Number(item.applied_amt)
        })
      }
      setWithdrawHistory(history)
    })
  }, [])

  return withdrawHistory
}
