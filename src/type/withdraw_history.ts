export interface WithdrawHistory {
  id: number
  user_id: string
  chain: string
  applied_amt: string
  applied_address: string
  created_timestamp: string
  remark: string
  status: string
}

export type WITHDRAW_STATUS = 'pending' | 'success' | 'fail'
