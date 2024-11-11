import { history, Outlet, useLocation, useParams } from 'umi'
import styles from './index.less'
import { ConfigProvider, Layout, Menu, theme } from 'antd'
import Logo from './components/logo/Logo'
import '../global.less'
import { useState, useEffect } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { getBrowserLang } from '@/utils/utils'
import Language from './components/Language/Language'
import i18n from '@/language'
import { ChainItemContext } from './chainContext'
import { ChainItemProps, allMainMenuItems, getMainMenuItemByPath } from './type'
import type { MenuProps } from 'antd'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { ConnectWallet } from './components/ConnectWallet'
import { useWallet } from '@solana/wallet-adapter-react'
import ClientWalletProvider from './ClientWalletProvider'
import { PasswordProvider } from './passwordContext'

import 'tailwindcss/tailwind.css'
// import "../styles/globals.css";
// import "../styles/App.css";

const { Header, Content, Footer } = Layout
let routeKeys = {}

export default function LayoutIndex() {
  const currentChainItem = getMainMenuItemByPath(history.location.pathname)
  // 国际化相关
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  const [language, setLanguage] = useState(localStorage.getItem('language'))

  const handleChangeMenu: MenuProps['onClick'] = (e) => {
    history.push(`${e.key}`)
  }

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == 'zh') return setI18nLocale(zhCN)
    if (language && language == 'en') return setI18nLocale(enUS)
    if (getBrowserLang() == 'zh') return setI18nLocale(zhCN)
    if (getBrowserLang() == 'en') return setI18nLocale(enUS)
  }

  // 切换国际化
  useEffect(() => {
    i18n.changeLanguage(language || getBrowserLang())
    // setLanguage(language || getBrowserLang())
    setAntdLanguage()
  }, [language])

  const [walletToParsePublicKey, setWalletToParsePublicKey] = useState<string>('')
  const { publicKey } = useWallet()

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58())
    }
  }

  return (
    <ConfigProvider
      locale={i18nLocale}
      theme={{
        token: {
          colorPrimary: '#2C72D3',
        },
      }}
    >
      <PasswordProvider>
        <ClientWalletProvider autoConnect={true}>
          <ChainItemContext.Provider value={{ chainItem: currentChainItem }}>
            <Layout className={styles.layoutWrapper}>
              <Header className={styles.header} style={{ paddingLeft: 80 }}>
                <Logo />
                <Menu
                  theme="light"
                  mode="horizontal"
                  items={allMainMenuItems}
                  style={{ flex: 1, minWidth: 0 }}
                  disabledOverflow
                  className={styles.menu}
                  onClick={handleChangeMenu}
                  defaultSelectedKeys={[currentChainItem?.key]}
                />
                <div className="flex-none">
                  <WalletMultiButton className="btn btn-ghost" />
                  <ConnectWallet onUseWalletClick={onUseWalletClick} />
                </div>
                <Language language={language} setLanguage={setLanguage} />
              </Header>
              <Outlet />
              <Footer style={{ textAlign: 'center' }}>DevTools ©{new Date().getFullYear()}</Footer>
            </Layout>
          </ChainItemContext.Provider>
        </ClientWalletProvider>
      </PasswordProvider>
    </ConfigProvider>
  )
}
