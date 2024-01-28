import { useInfiniteQuery, useQuery } from '../../hooks/useReactQuery'
import {
  getAllCollectionsData,
  getCollectionDetailsData,
  getLiveCollectionsData,
  getTopRankingsData,
  getUpcomingCollectionsData,
} from './helpers'
import {
  COLLECTION_DETAILS,
  COLLECTION_ROADMAP,
  LIVE_COLLECTIONS,
  RANKINGS,
  UPCOMING_COLLECTIONS,
} from '../../constant/queryKeys'
import { flatten, map } from 'lodash'
import { getCollectionRoadmap } from './source'

export const useGetLiveCollections = () => {
  const { data } = useQuery([LIVE_COLLECTIONS], getLiveCollectionsData)
  const liveCollections = data ?? []
  return liveCollections
}
export const useGetUpcomingCollections = () => {
  const { data } = useQuery([UPCOMING_COLLECTIONS], getUpcomingCollectionsData)
  const upcomingCollections = data ?? []
  return upcomingCollections
}

export const useGetCollectionRankings = (username, queryProps) => {
  const { data, ...rest }: any = useQuery([COLLECTION_ROADMAP], ()=>getCollectionRoadmap(username), queryProps)
  const roadmap = data?.data ?? ""
  return {roadmap, ...rest}
}

export const useGetCollectionDetails = (params, queryProps) => {
  const {username, accessToken} =  params
  const { data, ...rest } = useQuery([COLLECTION_DETAILS, username], () => getCollectionDetailsData(username, accessToken), {
    ...queryProps,
  })
  const collectionDetails = data ?? {}
  return { collectionDetails, ...rest }
}

export const useFetchCollectionList = (type, gridCount, fetchData) => {
  const {
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(type, ({ pageParam = 0 }) => fetchData(gridCount * 3, pageParam * gridCount * 3), {
    enabled: gridCount >= 1,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage?.length === gridCount * 3 ? pages.length : undefined),
  })
  return { data, isFetching, hasNextPage, fetchNextPage, refetch }
}

export const useGetRankings = (fetchData) => {
  const { data = { pages: [] }, ...rest } = useInfiniteQuery(RANKINGS, (props) => fetchData(props), {
    getNextPageParam: (lastPage, pages) => (lastPage?.length === 10 ? pages.length : undefined),
  })
  const { pages = [] } = data ?? {}

  const rankings = flatten(map(pages))
  return { rankings, ...rest }
}

export const useGetTopRankings = (duration, queryProps?: any) => {
  const { data, ...rest } = useQuery(RANKINGS, () => getTopRankingsData(duration), {
    ...queryProps,
  })
  const rankings = data ?? []
  return { rankings, ...rest }
}
