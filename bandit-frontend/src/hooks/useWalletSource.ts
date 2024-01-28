import { isMobile } from "react-device-detect";
import { WALLET_SOURCE } from "../constant";

const useWalletSource = () => {
  const walletSource = !isMobile
    ? WALLET_SOURCE.DESKTOP
    : 'web3' in window || 'ethereum' in window
    ? window.ethereum?.isTrust
      ? WALLET_SOURCE.TRUST_WALLET
      : WALLET_SOURCE.DAPPS
    : WALLET_SOURCE.MOBILE
  return walletSource
}

export default useWalletSource
