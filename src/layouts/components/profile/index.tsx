import * as React from 'react'
import './index.less'
import { history, Link } from 'umi'
import { AUTH_TOKEN_KEY } from '@/utils/constant'
import { Avatar, Dropdown, MenuProps, message, Spin } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useUser } from '@/hooks/useUser'
import { useTranslation } from 'react-i18next'

const Profile: React.FC = () => {
  const user = useUser()
  const { t } = useTranslation()
  if (!user) return <Spin />

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="myAccount">
          <div className="myAccountTitle">{t('profile.myAcount')}</div>
          <div className="account-item">
            <span style={{ color: '#999' }}>UserId </span>
            <div
              className="account-copyable"
              onClick={() => {
                navigator.clipboard.writeText(user.user_id)
                message.success('Copied')
              }}
            >
              <span style={{ marginRight: 4 }}>{user.user_id}</span>
              <CopyOutlined />
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: t('profile.logout'),
      onClick: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        history.replace('/login')
      },
    },
  ]
  if (user.role === 'admin') {
    items.push({
      key: '2',
      label: '权限管理',
      onClick: () => {
        history.push('/authManage')
      },
    })
  }

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Link to={'/me/wallet'} className="profile-container">
        <Avatar src={user.photo_url} />
        <span className="profile-name">{user.username ?? user.first_name ?? user.last_name}</span>
      </Link>
    </Dropdown>
  )
}

export default Profile
