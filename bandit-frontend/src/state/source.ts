import axios from 'axios'
import { API } from '../constant/endpoints'

export const getBanner = async () => {
  try {
    const res = await axios.get(`${API}/banner/message`)
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}

export const uploadFile = async (walletAddress, signature, image, type) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('imageFor', type)
  formData.append('walletAddress', walletAddress)
  formData.append('signature', signature)
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  try {
    const res = await axios.post(`${API}/file/upload`, formData, headers)
    return res.data.data
  } catch (e) {
    throw new Error(e)
  }
}

export const subscribe = async (email: string) => {
  try {
    const res = await axios.post(`${API}/subscription/subscribe`, {
      email,
    })
    return res.data.data
  } catch (e) {
    throw new Error(e)
  }
}
