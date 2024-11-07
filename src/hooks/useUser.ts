import { getProfile } from '@/services/api'
import { UserMeta } from '@/type/user'
import React from 'react'
import { history } from 'umi'

export const useUser = () => {
  const [user, setUser] = React.useState<UserMeta>()

  React.useEffect(() => {
    getProfile().then((res) => {
      console.log('getProfile', res)
      if (res.data === null) {
        history.replace('/login')
      } else {
        setUser(res.data)
      }
    })
  }, [])

  return user
}
