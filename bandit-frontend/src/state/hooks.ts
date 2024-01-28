import { useQuery } from "../hooks/useReactQuery";
import { getBannerData } from "./helpers";
import { BANNERS } from "../constant/queryKeys";

export const useGetBanner = () => {
  const { data } = useQuery([BANNERS], getBannerData)
  const bannerData = data ?? null
  return bannerData
}