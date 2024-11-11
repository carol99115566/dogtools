import i18n from '@/language'

export interface ChainItemProps {
  key: string
  label: string
  // value: string
  hashEndPoint: string
  tokenEndPoint: string
  viewOnName: string
  logo: string
  items: any[]
}

// export const allChainItems: ChainItemProps[] = [
//   {
//     key: '/sol',
//     label: 'SOL',
//     logo: 'https://file.dexx.ai/static/img/chain/sol.png',
//     viewOnName: 'solscan.io',
//     hashEndPoint: 'https://solscan.io/tx',
//     tokenEndPoint: 'https://solscan.io/tx/token',
//     items:
//   },
// ]

export const allMainMenuItems = [
  {
    key: '/sol/pump',
    label: 'Pump',
    items: [
      { key: '/sol/pump/create', label: i18n.t('menuList.sol.pump') },
      { key: '/sol/pump/selling', label: 'Pump 一键卖出' },
    ],
  },
  {
    key: '/sol/wallet-manage',
    label: 'Wallet Manage',
    items: [
      { key: '/sol/wallet-manage/address', label: '地址管理' },
      { key: '/sol/wallet-manage/privatekey', label: '私钥管理' },
    ],
  },
]

export const getMainMenuItemByPath = (path: string) => {
  const currentItem = allMainMenuItems.find((element) => {
    return path.includes(element.key)
  })
  return currentItem || allMainMenuItems[0]
}

// export const getChildMenuItemByPath = (path: string) => {
//   const currentItem = allChainItems.find((element) => {
//     return path.includes(element.key)
//   })
//   return currentItem
// }
// export const getChainItem = (chain: string) => {
//   const currentItem = allChainItems.find((element) => {
//     return element.key.toUpperCase() === chain.toUpperCase()
//   })
//   return currentItem ? currentItem : allChainItems[0]
// }

// export const getChainItemByPath = (path: string) => {
//   const currentItem = allChainItems.find((element) => {
//     return path.includes(element.key)
//   })
//   return currentItem
// }
