import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import {
  getAuctionContract,
  getExternalAuctionContract,
  getExternalNftContract,
  getExternalRoyaltyContract,
  getExternalSaleContract,
  getNftContract,
  getSaleContract,
  getWBNBContract,
  getWOldContract
} from "../utils/contractHelpers";

export const useWOldContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getWOldContract(library?.getSigner()), [library])
}
export const useWrappedBNBContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getWBNBContract(library?.getSigner()), [library])
}
export const useSaleContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSaleContract(library?.getSigner()), [library])
}
export const useNftContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getNftContract(library?.getSigner()), [library])
}

export const useAuctionContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getAuctionContract(library?.getSigner()), [library])
}

export const useExternalSaleContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getExternalSaleContract(library?.getSigner()), [library])
}

export const useExternalAuctionContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getExternalAuctionContract(library?.getSigner()), [library])
}

export const useExternalNftContract = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getExternalNftContract(library?.getSigner(), address), [library, address])
}
export const useExternalRoyaltyContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getExternalRoyaltyContract(library?.getSigner()), [library])
}
