import { Connector } from '@web3-react/types'

import Metamask from '../components/atoms/svg/wallets/Metamask'
import TrustWallet from '../components/atoms/svg/wallets/TrustWallet'
import Coinbase from '../components/atoms/svg/wallets/Coinbase'
import Injected from '../components/atoms/svg/wallets/Injected'
import WalletConnect from '../components/atoms/svg/wallets/WalletConnect'
import { coinbaseWallet, injected, Wallet, walletConnect } from 'connectors'


interface WalletInfo {
  connector?: Connector
  wallet?: Wallet
  name: string
  icon: any
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  // INJECTED: {
  //   connector: injected,
  //   wallet: Wallet.INJECTED,
  //   name: 'Injected',
  //   icon: Injected,
  //   description: 'Injected web3 provider.',
  //   href: null,
  //   color: '#010101',
  //   primary: true,
  // },
  METAMASK: {
    connector: injected,
    wallet: Wallet.INJECTED,
    name: 'MetaMask',
    icon: Metamask,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    wallet: Wallet.WALLET_CONNECT,
    name: 'WalletConnect',
    icon: WalletConnect,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  // COINBASE_WALLET: {
  //   connector: coinbaseWallet,
  //   wallet: Wallet.COINBASE_WALLET,
  //   name: 'Coinbase Wallet',
  //   icon: Coinbase,
  //   description: 'Use Coinbase Wallet app on mobile device',
  //   href: null,
  //   color: '#315CF5',
  // },
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   icon: Coinbase,
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true,
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   wallet: Wallet.FORTMATIC,
  //   name: 'Fortmatic',
  //   icon: FORTMATIC_ICON_URL,
  //   description: 'Login using Fortmatic hosted wallet',
  //   href: null,
  //   color: '#6748FF',
  //   mobile: true,
  // },
}
