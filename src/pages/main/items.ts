import i18n from '@/language'

export const getContentItems = (chain: string) => {
  const allChainContentItems = [
    {
      chain: 'SOL',
      items: [
        {
          key: 'token',
          label: i18n.t('menuList.tokenGroup'),
          type: 'group',
          children: [
            { key: '/sol/pump', label: i18n.t('menuList.sol.pump') },
            { key: 'tokenManage', label: '代币管理' },
          ],
        },
        {
          key: 'wallet',
          label: i18n.t('menuList.walletGroup'),
          type: 'group',
          children: [
            { key: '/sol/create-wallets', label: i18n.t('menuList.createWallet') },
            { key: '/sol/my-wallets', label: i18n.t('menuList.walletManage') },
          ],
        },
      ],
    },
  ]

  const currentChain = allChainContentItems.find((element) => {
    return element.chain === chain
  })
  return currentChain ? currentChain.items : allChainContentItems[0].items
}
