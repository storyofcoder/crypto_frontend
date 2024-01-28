import { ContractFactory } from '@ethersproject/contracts'
import NFT from '../contracts/ERC721/NFT.json'
import NFTR from '../contracts/ERC721/NFTR.json'
import PHASES from '../contracts/ERC721/Phases.json'
import PHASESR from '../contracts/ERC721/PhasesR.json'
import useActiveWeb3React from './useActiveWeb3React'
import { getExternalRoyaltyAddress } from '../utils/addressHelpers'

enum ContractTypes {
  NFT = 'NFT',
  NFTR = 'NFTR',
  PHASES = 'PHASES',
  PHASESR = 'PHASESR',
  CUSTOM = 'CUSTOM',
}

const useDeployContract = () => {
  const { library, account } = useActiveWeb3React()
  const deploy = async (contractType, args) => {
    let contract

    // nft && // nft revelable
    //   name, symbol,uri, startTime, mintingPrice, maxSupply, maxperaddress, rotaltyContract, royalty, royaltyReceiver
    //
    // phase
    // name, symbol, uri[], maxSupply, startTime[], mintingPrice[], supply[], maxPerAddress[], whitelists[],  rotaltyContract, royalty, royaltyReceiver
    //
    // phase revealable
    // name:sting, symbol:sting, uri[]:sting,revealableUri[]:sting, maxSupply:number, startTime[]:epoch, mintingPrice[]:uint256, supply[]:number, maxPerAddress[]:number, whitelists[]:string,  rotaltyContract, royalty:uint256, royaltyReceiver
    //

    switch (contractType) {
      case ContractTypes.NFT: {
        contract = NFT
        break
      }
      case ContractTypes.NFTR: {
        contract = NFTR
        break
      }
      case ContractTypes.PHASES: {
        contract = PHASES
        break
      }
      case ContractTypes.PHASESR: {
        contract = PHASESR
        break
      }
    }

    let factory = new ContractFactory(contract['abi'], contract['bytecode'], library.getSigner())
    const deployedContract = await factory.deploy(...args)
    await deployedContract.deployTransaction.wait()

    return deployedContract
  }

  return { deploy, ContractTypes }
}

export default useDeployContract
