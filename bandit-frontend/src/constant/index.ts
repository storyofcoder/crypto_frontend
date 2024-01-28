import { BIG_TEN } from "../utils/bigNumber";

const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)


const ipfsEndpoint = 'https://ipfs.infura.io/ipfs'
const etherscanEndpoint = 'https://rinkeby.etherscan.io/token'
const connectApiRes = {
  DIFFRENT_NETWORK: 'DIFFRENT_NETWORK',
  WALLET_CONNCTED: 'WALLET_CONNCTED',
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
}

const WALLET_SOURCE = {
  DESKTOP: 'DESKTOP',
  DAPPS: 'DAPPS',
  TRUST_WALLET: 'TRUST_WALLET',
  MOBILE: 'MOBILE',
}
export { ipfsEndpoint, etherscanEndpoint, connectApiRes, WALLET_SOURCE, DEFAULT_TOKEN_DECIMAL }
