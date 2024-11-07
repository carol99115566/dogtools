import { Tabs } from 'antd'
import BuyerWalletsTable from './buyerWallets'
import WalletTable from './wallet'
import './index.less'
import { useTranslation } from 'react-i18next'
import CreateWallets from './createWallets'
import { useBundleContext } from '@/pages/bundle/bundleContext'

const TAB_ITEMS = [
  {
    label: 'Dev Wallet',
    key: 'wallet',
    children: <WalletTable />,
  },
  {
    label: 'Buyer Wallets',
    key: 'buyerWallets',
    children: <BuyerWalletsTable />,
  },
]

const params = new URLSearchParams(location.search)
const defaultTab = params.get('defaultTab') ?? TAB_ITEMS[0].key

const WalletManage: React.FC = () => {
  const bundleItem = useBundleContext()
  const { t } = useTranslation()

  const TAB_ITEMS = [
    {
      label: t('manager.issuerWallet.name'),
      key: 'wallet',
      children: <WalletTable />,
    },
    {
      label: t('manager.buyerWallet.name'),
      key: 'buyerWallets',
      children: <BuyerWalletsTable />,
    },
  ]

  const params = new URLSearchParams(location.search)
  const defaultTab = params.get('defaultTab') ?? TAB_ITEMS[0].key

  return (
    <div className="right-wrapper">
      {/* <div className="right-title">Wallet Manage</div> */}
      <Tabs className="wallet-manage-tabs" defaultActiveKey={defaultTab} items={TAB_ITEMS} />
    </div>
  )
}

export default WalletManage
