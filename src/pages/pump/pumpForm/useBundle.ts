import { useMemo } from 'react'
import { PumpFunTokenBundle } from './pumpBundle'
import { TokenBundle } from '../bundle'

export const useTokenBundle = (platform: string): TokenBundle => {
  return useMemo(() => {
    switch (platform) {
      case 'pump':
        return new PumpFunTokenBundle()
      default:
        return new PumpFunTokenBundle()
    }
  }, [platform])
}
