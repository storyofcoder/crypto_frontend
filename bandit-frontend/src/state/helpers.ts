import { getBanner } from './source'

export const getBannerData = async () => {
  try {
    const res = await getBanner()
    return res ?? []
  } catch (error) {
    console.error('Failed to fetch banner data', error)
    return []
  }
}
