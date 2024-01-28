import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { SupportedChainId } from '../constant/chains'
import { NETWORK_URLS } from '../constant/network'

const getStaticJsonRpcProvider = (RPC_URL) => {
  return new StaticJsonRpcProvider(RPC_URL)
}

export const simpleRpcProvider = {
  [SupportedChainId.MAINNET]: getStaticJsonRpcProvider(NETWORK_URLS[SupportedChainId.MAINNET]),
  [SupportedChainId.RINKEBY]: getStaticJsonRpcProvider(NETWORK_URLS[SupportedChainId.RINKEBY]),
  [SupportedChainId.BINANCE]: getStaticJsonRpcProvider(NETWORK_URLS[SupportedChainId.BINANCE]),
  [SupportedChainId.BINANCE_TESTNET]: getStaticJsonRpcProvider(NETWORK_URLS[SupportedChainId.BINANCE_TESTNET]),
}

