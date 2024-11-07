import { IReferralRewards } from './referral'

export interface UserMeta {
  id: number
  user_id: string
  first_name: string
  last_name: string
  username: string
  photo_url: string

  // 当前用户的邀请码
  referral_code: string
  // 当前用户的推荐人
  reference: string
  // 当前用户的二级推荐人（推荐人的推荐人）
  second_reference: string
  // 当前用户的三级推荐人
  third_reference: string

  lv1_reward_percent: number
  lv2_reward_percent: number
  lv3_reward_percent: number
  rewards?: IReferralRewards

  // 第一级推荐个数
  lv1_referred_user: number
  // 第二级推荐个数
  lv2_referred_user: number
  // 第三级推荐个数
  lv3_referred_user: number

  created_timestamp: string
  supe_expiration_time: string
  status: number
  role: string
}
