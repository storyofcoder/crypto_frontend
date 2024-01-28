import axios from 'axios'
import { API } from '../../constant/endpoints'

export const getTrendingAuction = async (limit) => {
  const params = {
    action: 'getTrendingAuction',
    limit,
  }
  try {
    const res = await axios.post(API, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getTrendingNfts = async (offset, limit) => {
  const params = {
    action: 'getTrendingNft',
    offset,
    limit,
  }
  try {
    const res = await axios.post(API, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getGenesisNfts = async (offset, limit) => {
  const params = {
    action: 'getGenesisNft',
    offset,
    limit,
  }
  try {
    const res = await axios.post(API, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getNftDetail = async (tokenId, contractAddress) => {
  try {
    const res = await axios.get(`${API}/assets/${contractAddress}/${tokenId}?&chainId=1`)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getExplore = async (offset, limit, sort, filters) => {
  const params = {
    offset,
    limit,
    sort,
    filters,
  }
  try {
    const res = await axios.post(`${API}/assets/explore`, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getTokenActivity = async (contractAddress, id, offset, limit) => {
  try {
    const res = await axios.get(
      `${API}/assets/activity/${contractAddress}/${id}?&chainId=1&offset=${offset}&limit=${limit}`,
    )
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
