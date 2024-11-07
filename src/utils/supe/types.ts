import { PublicKey, VersionedTransactionResponse } from '@solana/web3.js'

export type SUPE_COLLECTION = {
  id: 670
  chain: 'solana'
  program: 'FAKvSE6CypSNAXVGtZQVbFkFRJ6Hu5j2dqzB28Y4Supe'
  mint: '7QViSLFF3MkfHx98RDTRvpdtsQRtLBKjowR2QSHGGQoD'
  creator: '8gwhXUXiLKhqzqNov9GS4Ksu46eXvoaDBFw4Ncf96yqP'
  tree: '7n4WBZEqV2DJgwjsSDF9kskS1o5ngQ78FuppiJSyQ1Ax'
  tree_config: '3Hs11d3FXfVbCVXihuZwvoBfzzvdpoQEKDFATbm2BWHu'
  collection_config: 'ErX38gvd32PyJXJGbE2CBnvNuq9NxWT2UD4PMaXc1NXW'
  metadata: '2U4p87zEzVe55FRByY8BuFAYGGkFWX9auynpSeKXfZNx'
  master_edition: '2A57TMZWgUTZ1DGgEv83tUv8WRj369fxohkQugf2kkDG'
  name: 'chiikawa'
  symbol: 'chiikawa'
  uri: 'https://newgame.mypinata.cloud/ipfs/QmcQqFP8z4AEL2bxWdQGZW1p85wnMjhFnzbri44ChiPvjc'
  uri_prefix: 'https://metadata.supe.com/'
  img_url: ''
  is_one_pic: 1
  presale_pct: 8000
  current_mint_token_id: 1686
  public_start_id: 1
  public_end_id: 1600
  pool_start_id: 1601
  pool_end_id: 2000
  total_supply: 2000
  system_decimal: 0
  token_decimal: 0
  create_ts: 1730430090
  bonding_curve: 'AUoutReCYEmqnkH784stSXF9c755TjLPPo65ijQZ2q7C'
  reserve_nft: 535
  reserve_quote: 224299084
  quote_symbol: 'sol'
  quote_mint: 'So11111111111111111111111111111111111111112'
  quote_system_decimal: 9
  quote_token_decimal: 9
  swap_nft_order_id: 2988382320001187400
  signature: '2rDeLLGgUTZNHV4y3Gzr7PuqSvo3QbRxyMekLNTEpy7acZXqfh8G7mmf2Xe2raQeEUcRLELR55uSAk9ALu435d4d'
  create_pool_signature: '3kwaWX1uHRcYgMnf1WTuz1Hr5BV9gTH3GzfV9xfoKi3ajubDA3xDFX9DByzedsd92Ud8b8nxzTEzLiRycYyeAirw'
  slot: 298833236
  mint_unique_id: 3408526003
  price_mint_sol: 5000000
  price_usd_f: 0.07040626670000001
  price_quote_f: 0.000420035
  price_sol_f: 0.0004200350000000001
  create_fee: 0
  order_id: 2988332360001126370
  mint_nft_order_id: 2988380120001184942
  buy_fee_rate: 100
  sell_fee_rate: 200
  marketcap_u: 140812533
  mint_status: 1
  volume_base: 0
  volume_quote: 0
  claimed_fee_amount: 0
  total_fee_amount: 3769180
  total_mint_reward: 6799999200
  max_depth: 11
  max_buffer_size: 32
  canopy_depth: 8
  created_at: '2024-11-01 03:01:33'
  updated_at: '2024-11-01 03:40:13'
  creator_info: {
    id: 7972
    addr: '8gwhXUXiLKhqzqNov9GS4Ksu46eXvoaDBFw4Ncf96yqP'
    user_name: '8gwhX'
    avatar: 'https://nft.game.com/resource/6c6d13f485105f01a70a627a7049e1c1.png'
  }
}

export type PriorityFee = {
  unitLimit?: number
  unitPrice?: number
}

export type TransactionResult = {
  signature?: string
  error?: unknown
  results?: VersionedTransactionResponse
  success: boolean
}
