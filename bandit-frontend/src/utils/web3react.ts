import { ethers } from 'ethers'
import { CONNECTOR_ID } from './storagekeys'
import { NETWORK_URLS } from '../constant/network'
import { ALL_SUPPORTED_CHAIN_IDS, MAIN_NET_CHAIN_IDS, TEST_NET_CHAIN_IDS } from '../constant/chains'

const env = process.env.NEXT_PUBLIC_NODE_ENV

const POLLING_INTERVAL = 12000
// const rpcUrl = ['development', 'qa'].includes(env)
//     ? TEST_NET.rpcUrls[0]
//     : MAIN_NET.rpcUrls[0];
// const chainId = ['development', 'qa'].includes(env) ? ChainId.TEST_NET : ChainId.MAIN_NET;

export const ConnectorNames = {
  Injected: 'injected',
  WalletConnect: 'walletconnect',
  BSC: 'bsc',
}

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider: any, account: string, message: string) => {
  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
