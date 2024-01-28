import { Connector } from '@web3-react/types'
import { coinbaseWallet, injected, walletConnect, network, gnosisSafe } from 'connectors'
import { CHAIN_INFO, MAIN_NET_CHAIN_IDS, TEST_NET_CHAIN_IDS } from '../constant/chains'
import { NETWORK_URLS_FOR_WALLET } from '../constant/network'

const env = process.env.NEXT_PUBLIC_NODE_ENV

export const getEnvSupportedChainIds = () => {
  return ['development', 'qa'].includes(env) ? TEST_NET_CHAIN_IDS : MAIN_NET_CHAIN_IDS
}

export function isChainAllowed(connector: Connector, chainId: number) {
  const chainIds = getEnvSupportedChainIds()
  switch (connector) {
    case injected:
    case coinbaseWallet:
    case walletConnect:
    case network:
    case gnosisSafe:
      return chainIds.includes(chainId)
    default:
      return false
  }
}

export const switchChain = async (connector: Connector, chainId: number) => {
  if (!isChainAllowed(connector, chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`)
  } else if (connector === walletConnect || connector === network) {
    await connector.activate(chainId)
  } else {
    const info = CHAIN_INFO[chainId]
    const addChainParameter = {
      chainId,
      chainName: info.label,
      rpcUrls: [NETWORK_URLS_FOR_WALLET[chainId]],
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    }
    await connector.activate(addChainParameter)
  }
}
