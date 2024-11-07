import React, { createContext, useContext } from 'react'
import { ChainItemProps } from './type'

interface ChainContextType {
  chainItem: ChainItemProps
  setChainItem?: (value: ChainItemProps) => void
}

export const ChainItemContext = createContext<ChainContextType | null>(null)

export function useChainContext() {
  const context = useContext(ChainItemContext)
  if (!context) {
    // return undefined
    throw new Error('useChainContext must be used within a provider')
  }
  return context.chainItem
}
