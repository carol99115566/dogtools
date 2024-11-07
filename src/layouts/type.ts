export interface ChainItemProps {
  key: string
  label: string
  value: string
  hashEndPoint: string
  tokenEndPoint: string
  viewOnName: string
  logo: string
}

export const allChainItems: ChainItemProps[] = [
  {
    key: 'sol',
    label: 'SOL',
    value: 'SOL',
    logo: 'https://file.dexx.ai/static/img/chain/sol.png',
    viewOnName: 'solscan.io',
    hashEndPoint: 'https://solscan.io/tx',
    tokenEndPoint: 'https://solscan.io/tx/token',
  },
]

export const getChainItem = (chain: string) => {
  const currentItem = allChainItems.find((element) => {
    return element.key.toUpperCase() === chain.toUpperCase()
  })
  return currentItem ? currentItem : allChainItems[0]
}

export const getChainItemByPath = (path: string) => {
  const currentItem = allChainItems.find((element) => {
    return path.includes(element.key)
  })
  return currentItem
}
