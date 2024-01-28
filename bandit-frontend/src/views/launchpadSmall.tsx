import React from "react";
import startCase from "lodash/startCase";
import { Box, Text } from "../components/atoms/StyledSystem";
import API from "../services/API";
import { useQuery } from "react-query";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from "../modules/Collections/launchpad/Banner/Banner";
import PageLoader from "../components/atoms/Loader/PageLoader";
import CollectionCardGridWithoutPagination
  from "../modules/Collections/launchpad/CollectionsList/CollectionCardGridWithoutPagination";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

const Launchpad = () => {
  const { data: featuredCollection, isLoading } = useQuery('launchpad-featured-collections', fetchFeaturedCollection, {
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
      <Container>
        <OnGoingCollections />
        <UpcomingCollections />
        <EndedCollections />
      </Container>
    </Box>
  )
}

const OnGoingCollections = () => {
  const type = 'ongoing'
  const getLaunchpadCollections = (limit, offset) => {
    const filter = {
      name: 'collection',
      filter: type,
    }
    return API.getLaunchpadCollections(offset, limit, filter)
  }
  return (
    <CollectionCardGridWithoutPagination
      type={type}
      fetchData={getLaunchpadCollections}
      cardType="DETAILS"
      wrapperComponent={BaseTemplate}
    />
  )
}
const UpcomingCollections = () => {
  const type = 'upcoming'
  const getLaunchpadCollections = (limit, offset) => {
    const filter = {
      name: 'collection',
      filter: type,
    }
    return API.getLaunchpadCollections(offset, limit, filter)
  }
  return (
    <CollectionCardGridWithoutPagination
      type={type}
      fetchData={getLaunchpadCollections}
      cardType="DETAILS"
      wrapperComponent={BaseTemplate}
    />
  )
}
const EndedCollections = () => {
  const type = 'ended'
  const getLaunchpadCollections = (limit, offset) => {
    const filter = {
      name: 'collection',
      filter: type,
    }
    return API.getLaunchpadCollections(offset, limit, filter)
  }
  return (
    <CollectionCardGridWithoutPagination
      type={type}
      fetchData={getLaunchpadCollections}
      cardType="DETAILS"
      wrapperComponent={BaseTemplate}
    />
  )
}

const BaseTemplate = ({ children, type }) => {
  return (
    <>
      <PageMeta />
      <BaseTemplateContainer>
        <Text fontSize={[26, 26, 36]} color="bg2" fontWeight={600}>
          {startCase(type)}
        </Text>
        {children}
      </BaseTemplateContainer>
    </>
  )
}

const BaseTemplateContainer = styled(Box)`
  position: relative;
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    background-color: black;
    height: 380px;
    width: 100%;
    left: 0;
    z-index: -1;
  }

  ${(p) => p.theme.media.xs} {
    padding: 60px 20px 60px 20px;

    &:after {
      height: 340px;
    }
  }
  ${(p) => p.theme.media.md} {
    padding: 60px 20px 100px 20px;
    &:after {
      height: 340px;
    }
  }
  ${(p) => p.theme.media.lg} {
    padding: 60px 40px 60px 40px;
  }
`

const Container = styled(Box)``

export default Launchpad
