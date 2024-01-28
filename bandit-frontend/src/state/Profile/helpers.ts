import { getProfile, getTrendingCollectors, getTrendingCreators } from "./source";

export const getTrendingCollectorsData = async () => {
  try {
    const res = await getTrendingCollectors(0, 12)
    return res ?? []
  } catch (error) {
    console.error('Failed to fetch trending collectors data', error)
    return []
  }
}
export const getTrendingCreatorsData = async () => {
  try {
    const res = await getTrendingCreators(0, 12)
    return res ?? []
  } catch (error) {
    console.error('Failed to fetch trending creators data', error)
    return []
  }
}
export const getProfileData = async (username) => {
  try {
    const res = await getProfile(username)
    return res ?? {}
  } catch (error) {
    console.error('Failed to fetch profile data', error)
    return {}
  }
}
