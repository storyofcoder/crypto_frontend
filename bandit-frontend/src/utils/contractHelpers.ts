import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import type { Signer } from '@ethersproject/abstract-signer'
import type { JsonRpcProvider, JsonRpcSigner, Provider, Web3Provider } from '@ethersproject/providers'
import wOldAbi from '../contracts/IERC20.json'
import saleAbi from '../contracts/Sale.json'
import nftAbi from '../contracts/NFT.json'
import auctionAbi from '../contracts/AuctionMarket.json'

// external
import XsaleAbi from '../contracts/external/XSale.json'
import XauctionAbi from '../contracts/external/XAuctionMarket.json'
import XnftAbi from '../contracts/external/IERC721Upgradeable.json'
import XRoyaltyAbi from '../contracts/external/XRoyalty.json'
import WBNBAbi from '../contracts/ERC20/WBNB.json'

import NFTR from '../contracts/ERC721/NFTR.json'
import NFT from '../contracts/ERC721/NFT.json'
import PHASES from '../contracts/ERC721/Phases.json'
import PHASESR from '../contracts/ERC721/PhasesR.json'

import {
  getAuctionAddress,
  getExternalAuctionAddress,
  getExternalRoyaltyAddress,
  getExternalSaleAddress,
  getNftAddress,
  getSaleAddress,
  getWBNBAddress,
  getWOldAddress,
} from './addressHelpers'

// account is not optional
export function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

const getContract = (abi: any, address: string, signer?: JsonRpcProvider) => {
  if (!utils.isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, abi, getProviderOrSigner(signer, undefined))
}

export const getWOldContract = (signer?: JsonRpcProvider) => {
  return getContract(wOldAbi.abi, getWOldAddress(), signer)
}
export const getWBNBContract = (signer?: JsonRpcProvider) => {
  return getContract(WBNBAbi.abi, getWBNBAddress(), signer)
}

export const getSaleContract = (signer?: JsonRpcProvider) => {
  return getContract(saleAbi.abi, getSaleAddress(), signer)
}

export const getNftContract = (signer?: JsonRpcProvider) => {
  return getContract(nftAbi.abi, getNftAddress(), signer)
}

export const getAuctionContract = (signer?: JsonRpcProvider) => {
  return getContract(auctionAbi.abi, getAuctionAddress(), signer)
}

//external
export const getExternalSaleContract = (signer?: JsonRpcProvider) => {
  return getContract(XsaleAbi.abi, getExternalSaleAddress(), signer)
}

export const getExternalAuctionContract = (signer?: JsonRpcProvider) => {
  return getContract(XauctionAbi.abi, getExternalAuctionAddress(), signer)
}

// @ts-ignore
export const getExternalNftContract = (signer?: JsonRpcProvider, address) => {
  if (!address) return null
  return getContract(XnftAbi.abi, address, signer)
}

// @ts-ignore
export const getExternalRoyaltyContract = (signer?: JsonRpcProvider) => {
  return getContract(XRoyaltyAbi.abi, getExternalRoyaltyAddress(), signer)
}

// @ts-ignore
export const getERC721NFTContract = (signer?: JsonRpcProvider, address) => {
  if (!address) return null
  return getContract(NFT.abi, address, signer)
}

// @ts-ignore
export const getERC721NFTRContract = (signer?: JsonRpcProvider, address) => {
  if (!address) return null
  return getContract(NFTR.abi, address, signer)
}

// @ts-ignore
export const getERC721PHASESContract = (signer?: JsonRpcProvider, address) => {
  if (!address) return null
  return getContract(PHASES.abi, address, signer)
}

// @ts-ignore
export const getERC721PHASESRContract = (signer?: JsonRpcProvider, address) => {
  if (!address) return null
  return getContract(PHASESR.abi, address, signer)
}
// @ts-ignore
export const getERC721CustomContract = (signer?: JsonRpcProvider, address, abi) => {
  if (!address) return null
  return getContract(abi, address, signer)
}
