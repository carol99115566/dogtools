import { IBuyerObj } from '@/pages/snipe/type'

export interface TaskMeta {
  id: number
  user_id: string
  type: TASK_TYPE
  platform: TASK_PLATFORM
  form_values: string
  log: string
  fee: string
  created_timestamp: string
  status: TASK_STATUS
}

export type TASK_STATUS = 'initial' | 'processing' | 'success' | 'fail'

export type TASK_TYPE = 'snipe' | 'bundle'

export type TASK_PLATFORM = 'flap' | 'pump' | 'sunpump'

export type ISnipeForm = {
  // 要狙击的平台
  platform: TASK_PLATFORM
  // 狙击的dev钱包地址，填0的话狙击所有人，狙击到一次就停止
  launcherAddress: string
  // 要狙击买入代币的钱包
  buyers: string
  buyerObjs: IBuyerObj[]
  // 自定义打印日志
  customLog: (...args) => void
  // 狙击完成回调
  onFinish: (params: { success: boolean; data: any }) => void
}
