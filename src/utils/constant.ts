import { SnipeItemProps } from '@/pages/snipe'
import i18n from '@/language'

export const AUTH_TOKEN_KEY = 'authToken'

export const DEFAULT_SLIPPAGE = 50

export const PUMP_CREATE_URL = 'https://pump.fun/create'

export const sniperItems: SnipeItemProps[] = [
  //   {
  //     label: 'pump.fun',
  //     value: 'pump',
  //     createUrl: PUMP_CREATE_URL,
  //     image: 'https://pump.fun/_next/image?url=%2Flogo.png&w=64&q=75',
  //     description: 'The Meme Fair Launch Platform on Solana',
  //     // scanBaseUrl: 'https://solscan.io/tx/',
  //     // component: <PumpDev/>
  //   },
  {
    label: 'SunPump',
    value: 'sunpump',
    createUrl: 'https://sunpump.meme/launch',
    image: 'https://sunpump.meme/favicon.ico',
    description: i18n.t('snipe.form.sunpumpDes'),
    // scanBaseUrl: 'https://solscan.io/tx/',
    // component: <SunpumpDev/>
  },
  {
    label: 'flap.sh',
    value: 'flap',
    createUrl: 'https://flap.sh/launch',
    image: 'https://flap.sh/favicon.ico',
    description: i18n.t('snipe.form.flapDes'),
    // scanBaseUrl: 'https://solscan.io/tx/',
    // component: <FlapDev/>
  },
]

export const SOL_RPC_ENDPOINT_MAIN =
  'https://indulgent-wandering-wave.solana-mainnet.quiknode.pro/a2bbf908f0bef4ff590544046ccc4f1b711b6d32/'
export const SOL_RPC_ENDPOINT_DEV =
  'https://white-proportionate-putty.solana-devnet.quiknode.pro/11132715a936f8adb03c940c627d6c0b9369d9e6/'

export const SECRET_KEY = 'devtools_manage_2024'
export const BUYER_WALLET_MANAGE = '_walletmanager_buyer_'
export const WALLET_MANAGE = '_walletmanager_dev'
