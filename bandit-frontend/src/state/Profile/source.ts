import axios from 'axios'
import { API } from '../../constant/endpoints'

export const getTrendingCollectors = async (offset, limit) => {
  const params = {
    action: 'getTrendingCollectors',
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
export const getTrendingCreators = async (offset, limit) => {
  const params = {
    action: 'getTrendingCreators',
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
export const getProfile = async (username) => {
  try {
    const res = await axios.get(`${API}/user/${username}`)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
export const updateProfile = async (walletAddress, signature, user, email, username) => {
  const params = {
    walletAddress,
    username,
    user,
    signature,
    email,
  }
  try {
    const res = await axios.post(`${API}/user/${username}`, params)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
