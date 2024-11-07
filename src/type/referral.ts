export interface IReferralRewards {
  id: number
  user_id: string
  chain: string

  lv1_referral_rewards: number
  lv2_referral_rewards: number
  lv3_referral_rewards: number

  created_timestamp: string
  status: number
}
