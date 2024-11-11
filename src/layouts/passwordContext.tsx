import React, { createContext, useContext, useState } from 'react'

interface passwordContextType {
  password: string
  setPassword: (value: string) => void
}

// 创建一个 Context 用于存储密码
const PasswordContext = createContext<passwordContextType | undefined>(undefined)

// 创建一个 Provider 组件，提供读取和设置密码的方法
export function PasswordProvider({ children }) {
  const [password, setPassword] = useState('') // 初始化密码为空

  return <PasswordContext.Provider value={{ password, setPassword }}>{children}</PasswordContext.Provider>
}

// 自定义 Hook 便于读取和设置密码
export function usePassword() {
  const context = useContext(PasswordContext)

  if (!context) {
    throw new Error('usePassword must be used within a PasswordProvider')
  }
  return context
}
