import axios from 'axios'
import { API } from '../../constant/endpoints'

export const getTrendingCollections = async (pagination) => {
  const params = {
    action: 'getTrendingCollections',
    pagination,
  }
  try {
    const res = await axios.post(API, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getCollectionDetails = async (username, accessToken="") => {
  try {
    const res = await axios.get(`${API}/collection/${username}${accessToken ? `?access_token=${accessToken}` : ""}`)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}

export const getAllCollections = async (offset, limit, sort, filter) => {
  const params = {
    offset,
    limit,
    sort,
    filter,
  }
  try {
    const res = await axios.post(`${API}/collection`, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const getCollectionAssets = async (username, params) => {
  try {
    const res = await axios.post(`${API}/collection/assets/${username}`, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}

export const getUserCollections = async (username, params) => {
  try {
    const res = await axios.post(`${API}/user/${username}/collection`, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const updateCollection = async (usernameOrAddress, params) => {
  try {
    const res = await axios.post(`${API}/collection/${usernameOrAddress}`, params)
    return res.data
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
export const getRankings = async (offset, limit, duration) => {
  try {
    const res = await axios.get(`${API}/collection/rankings?duration=${duration}&offset=${offset}&limit=${limit}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export const getCollectionRoadmap = async (username) => {
  try {
    const res = await axios.get(`${API}/collection/roadmap/${username}`)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const updateCollectionRoadmap = async (username, params) => {
  try {
    const res = await axios.post(`${API}/collection/roadmap/${username}`, params)
    return res.data
  } catch (e) {
    console.log(e)
  }
}
export const updateCollectionMints = async (contractAddress, params) => {
  try {
    const res = await axios.post(`${API}/collection/${contractAddress}/mints`, params)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const updateCollectionMintErrors = async (contractAddress, errorLog) => {
  try {
    const res = await axios.post(`${API}/collection/${contractAddress}/mints/error`, {errorLog})
    return res.data
  } catch (e) {
    console.log(e)
  }
}
