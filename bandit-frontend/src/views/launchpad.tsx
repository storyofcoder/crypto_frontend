import React from "react";
import { Box } from "../components/atoms/StyledSystem";
import API from "../services/API";
import { useQuery } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from "../modules/Collections/launchpad/Banner/Banner";
import CollectionList from "../modules/Collections/launchpad/CollectionsList/CollectionList";
import PageLoader from "../components/atoms/Loader/PageLoader";

const Launchpad = () => {
  const { data: featuredCollection, isLoading } = useQuery('collection-activity-chart-data', fetchFeaturedCollection, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  function fetchFeaturedCollection() {
    return API.getFeaturedCollections()
  }

  if (isLoading) return <PageLoader />
  return (
    <Box>
      {!!featuredCollection.length && <BannerSlider banners={featuredCollection} />}
      <CollectionList />
    </Box>
  )
}

export default Launchpad
