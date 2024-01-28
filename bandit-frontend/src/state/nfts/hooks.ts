import { useInfiniteQuery, useQuery } from '../../hooks/useReactQuery'
import { getGenesisNftsData, getNftDetailData, getTrendingAuctionData, getTrendingNftsData } from './helpers'
import { GENESIS_NFTS, NFT_DETAIL, TRENDING_AUCTIONS, TRENDING_NFTS } from '../../constant/queryKeys'
import { flatten, map } from 'lodash'

export const useGetTrendingAuction = () => {
  const { data } = useQuery([TRENDING_AUCTIONS], getTrendingAuctionData)
  const trendingAuction = data ?? []
  return trendingAuction
}
export const useGetTrendingNfts = () => {
  const { data } = useQuery([TRENDING_NFTS], getTrendingNftsData)
  const trendingNfts = data ?? []
  return trendingNfts
}
export const useGetGenesisNfts = () => {
  const { data } = useQuery([GENESIS_NFTS], getGenesisNftsData)
  const trendingNfts = data ?? []
  return trendingNfts
}

export const useGetExplore = (queryKey, queryFn, options) => {
  const { data, ...rest } = useInfiniteQuery(queryKey, queryFn, options)
  const { pages = [] } = data ?? {}

  const tokenList = flatten(map(pages, 'data'))
  // @ts-ignore
  const totalResult: any = pages[pages.length - 1]?.totalResult
  return { tokenList, totalResult, ...rest }
}

export const useNftDetail = (tokenId, contractAddress, queryOptions) => {
  const {
    data: nftDetail,
    isLoading,
    refetch,
  } = useQuery([NFT_DETAIL, tokenId, contractAddress], () => getNftDetailData(tokenId, contractAddress), queryOptions)
  return {
    nftDetail: nftDetail || {},
    isLoading,
    refetch,
  }
}

export const useNftActivity = (queryKey, queryFn, options) => {
  const { data, ...rest } = useInfiniteQuery(queryKey, queryFn, options)
  const { pages = [] } = data || {}
  const list = flatten(map(pages))
  return { list, ...rest }
}
