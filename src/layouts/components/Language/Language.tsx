import { Dropdown, Menu } from 'antd'
// import { connect } from "react-redux";
// import { setLanguage } from "@/redux/modules/global/action";
import type { MenuProps } from 'antd'
import './Language.less'

const Language = (props: any) => {
  const { language, setLanguage } = props

  // const setLanguage = (language: string) => {
  //   localStorage.setItem('language', language)
  // }

  const getLanguage = () => {
    return localStorage.getItem('language')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>简体中文</span>,
      onClick: () => {
        localStorage.setItem('language', 'zh')
        setLanguage('zh')
      },
      disabled: getLanguage() === 'zh',
    },
    {
      key: '2',
      label: <span>English</span>,
      onClick: () => {
        localStorage.setItem('language', 'en')
        setLanguage('en')
      },
      disabled: getLanguage() === 'en',
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={['click']} arrow={true}>
      <i className="icon-style iconfont icon-zhongyingwen"></i>
    </Dropdown>
  )
}

// const mapStateToProps = (state: any) => state.global;
// const mapDispatchToProps = { setLanguage };
export default Language
