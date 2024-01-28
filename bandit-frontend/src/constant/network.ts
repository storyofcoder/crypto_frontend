import { SupportedChainId } from './chains'

const SUPPORTED_NETWORKS_NAMES = {
  [SupportedChainId.MAINNET]: 'Ethereum mainnet',
  [SupportedChainId.RINKEBY]: 'Rinkeby',
  [SupportedChainId.BINANCE]: 'Binance smart chain mainnet',
  [SupportedChainId.BINANCE_TESTNET]: 'Binance smart chain testnet',
}

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://speedy-nodes-nyc.moralis.io/91c05ddf9222f0571d93013a/eth/mainnet`,
  [SupportedChainId.RINKEBY]: `https://speedy-nodes-nyc.moralis.io/91c05ddf9222f0571d93013a/eth/rinkeby`,
  [SupportedChainId.BINANCE]: `https://speedy-nodes-nyc.moralis.io/91c05ddf9222f0571d93013a/bsc/mainnet`,
  [SupportedChainId.BINANCE_TESTNET]: `https://speedy-nodes-nyc.moralis.io/91c05ddf9222f0571d93013a/bsc/testnet`,
}
export const NETWORK_URLS_FOR_WALLET: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://speedy-nodes-nyc.moralis.io/91c05ddf9222f0571d93013a/eth/mainnet`,
  [SupportedChainId.RINKEBY]: `https://speedy-nodes-nyc.moralis.io/91c05ddf9222f0571d93013a/eth/rinkeby`,
  [SupportedChainId.BINANCE]: `https://bsc-dataseed.binance.org`,
  [SupportedChainId.BINANCE_TESTNET]: `https://data-seed-prebsc-1-s1.binance.org:8545`,
}

export { SUPPORTED_NETWORKS_NAMES }
