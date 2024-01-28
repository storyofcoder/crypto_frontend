import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
// import Fortmatic from 'fortmatic'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from '../constant/chains'
import { NETWORK_URLS } from '../constant/network'

const env = process.env.NEXT_PUBLIC_NODE_ENV

const defaultChainId = env === 'production' ? SupportedChainId.MAINNET : SupportedChainId.RINKEBY

export enum Wallet {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  // FORTMATIC = 'FORTMATIC',
  NETWORK = 'NETWORK',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
}

export const BACKFILLABLE_WALLETS = [Wallet.COINBASE_WALLET, Wallet.WALLET_CONNECT, Wallet.INJECTED]
export const SELECTABLE_WALLETS = [...BACKFILLABLE_WALLETS]

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

export function getWalletForConnector(connector: Connector) {
  switch (connector) {
    case injected:
      return Wallet.INJECTED
    case coinbaseWallet:
      return Wallet.COINBASE_WALLET
    case walletConnect:
      return Wallet.WALLET_CONNECT
    // case fortmatic:
    //   return Wallet.FORTMATIC
    case network:
      return Wallet.NETWORK
    case gnosisSafe:
      return Wallet.GNOSIS_SAFE
    default:
      throw Error('unsupported connector')
  }
}

export function getConnectorForWallet(wallet: Wallet) {
  switch (wallet) {
    case Wallet.INJECTED:
      return injected
    case Wallet.COINBASE_WALLET:
      return coinbaseWallet
    case Wallet.WALLET_CONNECT:
      return walletConnect
    case Wallet.GNOSIS_SAFE:
      return gnosisSafe
    // case Wallet.FORTMATIC:
    //   return fortmatic
    case Wallet.NETWORK:
      return network
  }
}

function getHooksForWallet(wallet: Wallet) {
  switch (wallet) {
    case Wallet.INJECTED:
      return injectedHooks
    case Wallet.COINBASE_WALLET:
      return coinbaseWalletHooks
    case Wallet.WALLET_CONNECT:
      return walletConnectHooks
    // case Wallet.FORTMATIC:
    //   return fortmaticHooks
    case Wallet.NETWORK:
      return networkHooks
    case Wallet.GNOSIS_SAFE:
      return gnosisSafeHooks
  }
}

export const [network, networkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: NETWORK_URLS, defaultChainId }),
)

export const [gnosisSafe, gnosisSafeHooks] = initializeConnector<GnosisSafe>((actions) => new GnosisSafe({ actions }))

export const [injected, injectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions, onError }))

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
        rpc: NETWORK_URLS,
        qrcode: true,
      },
      onError,
    }),
)

// export const [fortmatic, fortmaticHooks] = initializeConnector<EIP1193>(
//   (actions) => new EIP1193({ actions, provider: new Fortmatic(process.env.REACT_APP_FORTMATIC_KEY).getProvider() })
// )

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: NETWORK_URLS[defaultChainId],
        appName: 'bandit.network',
        appLogoUrl: 'https://bandit.network/favicon.ico',
        supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
        reloadOnDisconnect: false,
      },
      onError,
    }),
)

interface ConnectorListItem {
  connector: Connector
  hooks: Web3ReactHooks
}

function getConnectorListItemForWallet(wallet: Wallet) {
  return {
    connector: getConnectorForWallet(wallet),
    hooks: getHooksForWallet(wallet),
  }
}

export function getConnectors(selectedWallet: Wallet | undefined) {
  const connectors: ConnectorListItem[] = [{ connector: gnosisSafe, hooks: gnosisSafeHooks }]
  if (selectedWallet) {
    connectors.push(getConnectorListItemForWallet(selectedWallet))
  }
  connectors.push(
    ...SELECTABLE_WALLETS.filter((wallet) => wallet !== selectedWallet).map(getConnectorListItemForWallet),
  )
  connectors.push({ connector: network, hooks: networkHooks })
  const web3ReactConnectors: [Connector, Web3ReactHooks][] = connectors.map(({ connector, hooks }) => [
    connector,
    hooks,
  ])
  return web3ReactConnectors
}
