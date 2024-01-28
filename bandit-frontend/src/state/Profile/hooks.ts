import { useQuery } from "../../hooks/useReactQuery";
import { PROFILE, TRENDING_COLLECTORS, TRENDING_CREATORS } from "../../constant/queryKeys";
import { getProfileData, getTrendingCollectorsData, getTrendingCreatorsData } from "./helpers";

export const useGetTrendingCollectors = () => {
  const { data } = useQuery([TRENDING_COLLECTORS], getTrendingCollectorsData)
  const trendingCollectors = data ?? []
  return trendingCollectors
}
export const useGetTrendingCreators = () => {
  const { data } = useQuery([TRENDING_CREATORS], getTrendingCreatorsData)
  const trendingCreators = data ?? []
  return trendingCreators
}
export const useGetProfile = (username, queryConfig) => {
  const { data, ...rest } = useQuery([PROFILE, username], () => getProfileData(username), {
    ...queryConfig,
  })
  const profileData = data ?? {}
  return { profileData, ...rest }
}
