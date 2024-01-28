import { ethers } from "ethers";
import {
  useAuctionContract,
  useExternalAuctionContract,
  useExternalSaleContract,
  useNftContract,
  useSaleContract
} from "./useContract";
import {
  getAuctionAddress,
  getEscrowAddress,
  getExternalAuctionAddress,
  getExternalEscrowAddress,
  getExternalSaleAddress,
  getNftAddress,
  getSaleAddress
} from "../utils/addressHelpers";
import { getExternalNftContract } from "../utils/contractHelpers";
import useActiveWeb3React from "./useActiveWeb3React";

const useDecideContract = () => {
  const { library } = useActiveWeb3React()

  const nftAddress = getNftAddress()
  const escrowAddress = getEscrowAddress()
  const externalEscrowAddress = getExternalEscrowAddress()

  const nftContract = useNftContract()
  const saleContract = useSaleContract()
  const auctionContract = useAuctionContract()

  const externalSaleContract = useExternalSaleContract()
  const externalAuctionContract = useExternalAuctionContract()

  const checkIsExternalContract = (_address = '') => {
    return _address.toLowerCase() !== nftAddress.toLowerCase()
  }

  const initDecideContract = (_address = '') => {
    if (!ethers.utils.isAddress(_address)) return {}
    const isExternalContract = checkIsExternalContract(_address)

    return checkIsExternalContract(_address)
      ? {
          escrowAddress: externalEscrowAddress,
          nftContract: getExternalNftContract(library?.getSigner(), _address),
          saleContract: externalSaleContract,
          auctionContract: externalAuctionContract,
          isExternalContract,
          saleContractAddress: getExternalSaleAddress(),
          auctionContractAddress: getExternalAuctionAddress(),
        }
      : {
          escrowAddress,
          nftContract,
          saleContract,
          auctionContract,
          isExternalContract,
          saleContractAddress: getSaleAddress(),
          auctionContractAddress: getAuctionAddress(),
        }
  }

  return { initDecideContract }
}

export default useDecideContract
