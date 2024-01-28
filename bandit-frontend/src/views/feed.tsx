import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import Button from "../components/atoms/Button/Button";
import API from "../services/API";
import { hideScrollToTop, showScrollToTop } from "../state/Settings/actions";
import TokenListWithFilters from "../components/templates/Token/TokenListWithFilters";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

const Feed = () => {
  const { user } = useSelector((state: any) => state.auth)
  const [showRequireFollowers, setShowRequireFollowers] = useState(false)
  const [showRequireMoreFollowers, setShowRequireMoreFollowers] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showScrollToTop())
    return () => {
      dispatch(hideScrollToTop())
    }
  }, [])

  function fetchFeed(offset, limit, sort, filters) {
    return API.fetchFeedWithFilters(offset, limit, user?.username, user.signature, sort, filters)
  }

  const handleValidateFeedPage = (
    isLoading,
    isFetching,
    activeFiltersListLength,
    sortName,
    tokenListLength,
    followingsLength,
  ) => {
    if (!isLoading && followingsLength < 5) setShowRequireFollowers(true)
    else setShowRequireFollowers(false)
    if (
      !isFetching &&
      !activeFiltersListLength &&
      sortName !== 'auction_time' &&
      followingsLength >= 5 &&
      !tokenListLength
    )
      setShowRequireMoreFollowers(true)
    else setShowRequireMoreFollowers(false)
  }

  return (
    <>
      <PageMeta />
      <Container>
        <TokenListWithFilters
          fetchData={fetchFeed}
          validateFeedPage={handleValidateFeedPage}
          hide={showRequireFollowers || showRequireMoreFollowers}
          type="feed"
        />
        {showRequireFollowers && <RequireFollowers />}
        {showRequireMoreFollowers && <RequireMoreFollowers />}
      </Container>
    </>
  )
}

const RequireMoreFollowers = () => {
  return (
    <Flex flex={1} height="100%" alignItems="center" flexDirection="column" justifyContent="center">
      <Text fontSize={40} lineHeight={1.2} fontWeight={700} color={'text'} textAlign="center">
        No latest feed
      </Text>
      <Text fontSize={20} lineHeight={1.2} fontWeight={700} color={'text'} textAlign="center" mt={10}>
        To build your feed follow more creators…
      </Text>
      <NextLinkFromReactRouter to="/creators">
        <Button width={200} height={50} mt={20} variant="primary">
          View all creators
        </Button>
      </NextLinkFromReactRouter>
    </Flex>
  )
}

const RequireFollowers = () => {
  return (
    <Flex flex={1} height="100%" alignItems="center" flexDirection="column" justifyContent="center">
      <Text fontSize={40} lineHeight={1.2} fontWeight={700} color={'text'} textAlign="center">
        Follow at least five creators <br /> to build your feed…
      </Text>
      <NextLinkFromReactRouter to="/creators">
        <Button width={200} height={50} mt={10} variant="primary">
          View all creators
        </Button>
      </NextLinkFromReactRouter>
    </Flex>
  )
}
const Container = styled(Box)`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;

  ${(p) => p.theme.media.xs} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 10px 40px 40px 40px;
    //max-width: var(--max-width);
    margin: 0 auto;
  }
`

export default Feed
