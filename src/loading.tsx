// https://umijs.org/docs/guides/directory-structure#loadingtsxjsx

import { Spin } from 'antd'

const UmiLoading: React.FC = () => {
  return (
    <div className="mainContent flexCenter">
      <Spin></Spin>
    </div>
  )
}

export default UmiLoading
