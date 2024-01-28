import axios from "axios";

const ipfs_provider = process.env.NEXT_PUBLIC_IPFS_PROVIDER
const validateIpfsFormat = async (hash, checkFolder = false) => {
  try {
    let url = `${ipfs_provider}/ipfs/${hash}`
    if (checkFolder) {
      url = `${ipfs_provider}/ipfs/${hash}/0`
    }
    const res = await axios.get(url)
    return !!res.data.name
  } catch (e) {
    return false
  }
}

export default validateIpfsFormat
