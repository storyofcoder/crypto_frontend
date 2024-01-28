import useActiveWeb3React from './useActiveWeb3React'
import {
  getERC721NFTRContract,
  getERC721NFTContract,
  getERC721PHASESContract,
  getERC721PHASESRContract,
  getERC721CustomContract,
} from '../utils/contractHelpers'
import useDeployContract from './useDeployContract'
import { simpleRpcProvider } from '../utils/providers'
import { useWeb3React } from '@web3-react/core'

const useERC721Contracts = () => {
  const { library, account } = useActiveWeb3React()
  const { connector } = useWeb3React()
  const { ContractTypes } = useDeployContract()

  const getContract = (type, address, chainId, abi: any = null) => {
    if (ContractTypes.NFTR === type) {
      return getERC721NFTRContract(simpleRpcProvider[chainId], address)
    }
    if (ContractTypes.NFT === type) {
      return getERC721NFTContract(simpleRpcProvider[chainId], address)
    }
    if (ContractTypes.PHASES === type) {
      return getERC721PHASESContract(simpleRpcProvider[chainId], address)
    }
    if (ContractTypes.PHASESR === type) {
      return getERC721PHASESRContract(simpleRpcProvider[chainId], address)
    }
    if (ContractTypes.CUSTOM === type) {
      return getERC721CustomContract(simpleRpcProvider[chainId], address, abi)
    }
  }
  return { getContract }
}

export default useERC721Contracts
