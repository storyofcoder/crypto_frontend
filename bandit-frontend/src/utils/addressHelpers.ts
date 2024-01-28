import addresses from "../contracts/address/contractAddress";

export const getAddress = (address, contractName) => {
  let key = null
  const env = process.env.NEXT_PUBLIC_NODE_ENV
  switch (env) {
    case 'production':
      key = 'MAIN_NET'
      break
    // @ts-ignore
    case 'staging':
      key = 'STAGING_NET'
      break
    default:
      key = 'TEST_NET'
  }

  return address[key][contractName]
}

export const getWOldAddress = () => {
  return getAddress(addresses, 'wOldContract')
}
export const getWBNBAddress = () => {
  return getAddress(addresses, 'WBNBContract')
}
export const getSaleAddress = () => {
  return getAddress(addresses, 'saleContract')
}
export const getNftAddress = () => {
  return getAddress(addresses, 'nftContract')
}
export const getEscrowAddress = () => {
  return getAddress(addresses, 'escrowContract')
}
export const getAuctionAddress = () => {
  return getAddress(addresses, 'auctionContract')
}
export const getRoyaltyAddress = () => {
  return getAddress(addresses, 'royaltyContract')
}

//external
export const getExternalSaleAddress = () => {
  return getAddress(addresses, 'XsaleContract')
}

export const getExternalEscrowAddress = () => {
  return getAddress(addresses, 'XescrowContract')
}

export const getExternalAuctionAddress = () => {
  return getAddress(addresses, 'XauctionContract')
}
export const getExternalRoyaltyAddress = () => {
  return getAddress(addresses, 'XroyaltyContract')
}

export const isExternalAddress = (address) => {
  return address !== getNftAddress()
}
