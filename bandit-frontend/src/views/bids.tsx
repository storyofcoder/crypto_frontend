import React, { useEffect, useRef, useState } from "react";
import { flatten, map } from "lodash";
import styled from "styled-components";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import InfiniteScroll from "react-infinite-scroll-component";

import { useInfiniteQuery } from "react-query";
import API from "../services/API";
import { useSelector } from "react-redux";
import TokenCardSkeleton from "../components/molecules/Token/skeletons/TokenCard";
import BidTokenCard from "../components/molecules/Token/BidTokenCard";
import { useWindowSize } from "../services/hooks";
import { useRouter } from "next/router";

const Bids = () => {
  const [gridCount, setGridCount] = useState(0)

  const conversionRate = useSelector((state: any) => state.auth.conversionRate)
  const { user } = useSelector((state: any) => state.auth)
  const router = useRouter()

  const container: any = useRef()
  const size = useWindowSize()
  const big = 330

  useEffect(() => {
    const containerWidth = container?.current?.offsetWidth || size.width
    let grid = Math.floor(containerWidth / big)
    setGridCount(grid)
  }, [container, size])

  const {
    isLoading,
    error,
    data = { pages: [] },
    isFetching: isTokenFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery('bids', fetchTokens, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: !!user?.username,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 12 ? pages?.length : undefined
    },
  })

  const { pages } = data || {}
  const tokenList = flatten(map(pages))

  async function fetchTokens({ pageParam = 0 }) {
    const offset = pageParam * 12
    return API.fetchAllBids(offset, 12, user?.username, user?.signature)
  }

  function onClickClaim(token) {
    router.push(`/assets/${token.contractAddress}/${token.id}/settle`)
  }
  return (
    <Container>
      {/*<Box w={"100%"}>*/}
      {/*  <Search placeholder="Search for a creator" onChange={handleSearch} />*/}
      {/*</Box>*/}
      <InfiniteScroll dataLength={tokenList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
        <ListContainer ref={container} grid={gridCount}>
          {tokenList.map((token: any, index: any) => (
            <BidTokenCard
              key={token.metaData.name + token.id + index}
              token={token}
              onClickClaim={onClickClaim}
              hasClaimed={!token.auctionLive && token.topBidBy === user?.username}
              hasWon={token.topBidBy === user?.username}
              winning={token.topBidBy === user?.username}
            />
          ))}
          {isTokenFetching && Array.from(Array(gridCount)).map((item) => <TokenCardSkeleton key={item} />)}
        </ListContainer>
      </InfiniteScroll>
      {!tokenList.length && !isTokenFetching && (
        <Flex flex={1} alignItems="center" flexDirection="column" justifyContent="center" height={'70vh'}>
          <Text textAlign="center" fontSize={40} lineHeight={1.2} fontWeight={700} color={'text'}>
            Your bids will be shown here
          </Text>
        </Flex>
      )}
    </Container>
  )
}

const Container = styled(Box)`
  // min-height: 70vh;
  // ${(p) => p.theme.media.xs} {
  //   padding: 20px;
  // }
  // ${(p) => p.theme.media.sm} {
  //   padding: 20px;
  // }
  // ${(p) => p.theme.media.md} {
  //   padding: 20px;
  // }
  // ${(p) => p.theme.media.xlg} {
  //   padding: 0;
  //max-width: var(--max-width);
  //   margin: 0 auto;
  // }
`

const ListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: 30px;
  margin-top: 20px;

  // display: grid;
  // //grid-template-columns: repeat(3, 1fr);
  // grid-gap: 30px;
  // margin-top: 20px;
  //
  // ${(p) => p.theme.media.xs} {
  //   grid-template-columns: repeat(1, 1fr);
  // }
  // ${(p) => p.theme.media.sm} {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  // ${(p) => p.theme.media.lg} {
  //   grid-template-columns: repeat(4, 1fr);
  // }
`

export default Bids
