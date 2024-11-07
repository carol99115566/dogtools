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
import { ChainItemProps, allChainItems, getChainItemByPath } from './type'
import type { MenuProps } from 'antd'

const { Header, Content, Footer } = Layout
let routeKeys = {}

export default function LayoutIndex() {
  const currentChainItem = getChainItemByPath(history.location.pathname)
  console.log('当前的 chain 是什么是什么是什么呀', currentChainItem)
  // 国际化相关
  const [i18nLocale, setI18nLocale] = useState(zhCN)
  const [language, setLanguage] = useState(localStorage.getItem('language'))

  const handleChangeMenu: MenuProps['onClick'] = (e) => {
    history.push(`/${e.key.toLowerCase()}`)
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

  return (
    <ConfigProvider
      locale={i18nLocale}
      theme={{
        token: {
          colorPrimary: '#2C72D3',
        },
      }}
    >
      <ChainItemContext.Provider value={{ chainItem: currentChainItem }}>
        <Layout className={styles.layoutWrapper}>
          <Header className={styles.header} style={{ paddingLeft: 80 }}>
            <Logo />
            <Menu
              theme="light"
              mode="horizontal"
              items={allChainItems}
              style={{ flex: 1, minWidth: 0 }}
              disabledOverflow
              className={styles.menu}
              onClick={handleChangeMenu}
              defaultSelectedKeys={[currentChainItem?.key]}
            />
            <Language language={language} setLanguage={setLanguage} />
          </Header>
          <Outlet />
          <Footer style={{ textAlign: 'center' }}>DevTools ©{new Date().getFullYear()}</Footer>
        </Layout>
      </ChainItemContext.Provider>
    </ConfigProvider>
  )
}
