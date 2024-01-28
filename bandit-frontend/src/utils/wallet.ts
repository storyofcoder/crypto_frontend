import { isMobile } from "react-device-detect";

declare global {
  interface Window {
    ethereum: any
  }
}

export const IS_DAPP = isMobile && !!window.ethereum

const TEST_NET = {
  chainId: '0x61',
  chainName: 'Binance Smart Chain - Testnet',
  nativeCurrency: {
    name: 'Binance',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://data-seed-prebsc-2-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com'],
}

const MAIN_NET = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'Binance',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com'],
}

export const setupNetwork = async () => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV
  // @ts-ignore
  const provider = window.ethereum
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: ['development', 'qa'].includes(env) ? [TEST_NET] : [MAIN_NET],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}
