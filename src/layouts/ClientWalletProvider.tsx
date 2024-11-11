import type { WalletProviderProps } from '@solana/wallet-adapter-react'
import { WalletProvider } from '@solana/wallet-adapter-react'

import {
  PhantomWalletAdapter, // getPhantomWallet,
  LedgerWalletAdapter, // getLedgerWallet,
  MathWalletAdapter, // getMathWallet,
  SolflareWalletAdapter, // getSolflareWallet,
  SolongWalletAdapter, // getSolletWallet, // getSolongWallet,
  // getSlopeWallet,
} from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import('@solana/wallet-adapter-react-ui/styles.css' as any)

export function ClientWalletProvider(props: Omit<WalletProviderProps, 'wallets'>): JSX.Element {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolongWalletAdapter(),
    ],
    [],
  )

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  )
}

export default ClientWalletProvider
