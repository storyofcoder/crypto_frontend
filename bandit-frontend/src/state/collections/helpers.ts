import {
  getAllCollections,
  getCollectionAssets,
  getCollectionDetails,
  getRankings,
  getTrendingCollections,
  getUserCollections,
  updateCollection,
} from './source'
import { DURATION } from '../../views/Rankings'

export const getTrendingCollectionsData = async () => {
  try {
    const res = await getTrendingCollections({ per_page: 9 })
    return res.data ?? []
  } catch (error) {
    console.error('Failed to fetch trending collections data', error)
    return []
  }
}
export const getCollectionDetailsData = async (username, accessToken?) => {
  try {
    const res = await getCollectionDetails(username, accessToken)
    return res ?? {}
  } catch (error) {
    console.error('Failed to fetch collections details', error)
    return {}
  }
}

export const getRankingsData = async (offset, limit, duration) => {
  try {
    const res = await getRankings(offset, limit, duration)
    return res
  } catch (error) {
    console.error('Failed to fetch rankings', error)
    return []
  }
}
export const getTopRankingsData = async (duration: any = DURATION[0].value) => {
  try {
    const res = await getRankings(0, 10, duration)
    return res
  } catch (error) {
    console.error('Failed to fetch rankings', error)
    return []
  }
}

export const getUpcomingCollectionsData = async () => {
  const filter = [
    {
      name: 'collectionStatus',
      filter: ['upcoming'],
    },
  ]
  const sort = {
    "name": "launchDate",
    "order": "asc"
  }
  try {
    const res = await getAllCollections(0, 9, sort, filter)
    return res
  } catch (error) {
    console.error('Failed to fetch live collections', error)
    return {}
  }
}
export const getLiveCollectionsData = async () => {
  const filter = [
    {
      name: 'collectionStatus',
      filter: ['ongoing'],
    },
  ]
  const sort = {
    "name": "launchDate",
    "order": "desc"
  }
  try {
    const res = await getAllCollections(0, 9, sort, filter)
    return res
  } catch (error) {
    console.error('Failed to fetch upcoming collections', error)
    return {}
  }
}
export const getAllCollectionsData = async (offset, limit, sort, filter) => {
  try {
    const res = await getAllCollections(offset, limit, sort, filter)
    return res
  } catch (error) {
    console.error('Failed to fetch all collections', error)
    return {}
  }
}
export const getCollectionAssetsData = async (username, params) => {
  try {
    const res = await getCollectionAssets(username, params)
    return res
  } catch (error) {
    console.error('Failed to fetch all collections', error)
    return {}
  }
}
export const getUserCollectionsData = async (username, params) => {
  try {
    const res = await getUserCollections(username, params)
    return res
  } catch (error) {
    console.error('Failed to fetch user collections', error)
    return {}
  }
}

export const createOrUpdateCollection = async (usernameOrAddress, params) => {
  try {
    const res = await updateCollection(usernameOrAddress, params)
    return res
  } catch (error) {
    console.error('Failed to update collection details', error)
    throw new Error(error)
  }
}
