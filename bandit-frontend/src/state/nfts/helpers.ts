import { getExplore, getGenesisNfts, getNftDetail, getTrendingAuction, getTrendingNfts } from "./source";

export const getTrendingAuctionData = async () => {
  try {
    const res = await getTrendingAuction(12)
    return res.data ?? []
  } catch (error) {
    console.error('Failed to fetch trending auction data', error)
    return []
  }
}
export const getTrendingNftsData = async () => {
  try {
    const res = await getTrendingNfts(0, 12)
    return res.data ?? []
  } catch (error) {
    console.error('Failed to fetch trending nfts data', error)
    return []
  }
}
export const getGenesisNftsData = async () => {
  try {
    const res = await getGenesisNfts(0, 12)
    return res.data
  } catch (error) {
    console.error('Failed to fetch genesis nfts data', error)
    return []
  }
}
export const getNftDetailData = async (tokenId, contractAddress) => {
  try {
    const res = await getNftDetail(tokenId, contractAddress)
    return res
  } catch (error) {
    console.error('Failed to fetch nft detail', error)
    return null
  }
}
export const getExploreData = async (offset, limit, sort, filters) => {
  try {
    const res = await getExplore(offset, limit, sort, filters)
    return res
  } catch (error) {
    console.error('Failed to fetch nft detail', error)
    return null
  }
}
