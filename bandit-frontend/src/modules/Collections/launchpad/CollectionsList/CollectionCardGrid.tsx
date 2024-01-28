import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { flatten } from 'lodash'
import { Box, Flex, Text } from '../../../../components/atoms/StyledSystem'
import { NextLinkFromReactRouter } from '../../../../components/atoms/NextLink'
import { useSelector } from 'react-redux'

import { useFetchCollectionList } from 'state/collections/hooks'

import useGridCount from '../../../../hooks/useGridCount'
import InfiniteScroll from 'react-infinite-scroll-component'
import CollectionCard from '../../../../components/molecules/collections/CollectionCardV3'
import CollectionCardSkeletonV3 from '../../../../components/molecules/collections/CollectionCardSkeletonV3'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

const defaultImage = 'https://bandit-network.s3.ap-southeast-1.amazonaws.com/assets/default-profile.png'

const CollectionCardGrid = ({ type, fetchData, askRefresh = 0, customEmptyState, filterOpen }: any) => {
  const { isSmallFrame } = useSelector((state: any) => state.settings)
  const containerRef: any = useRef()

  const { gridCount } = useGridCount({
    containerRef,
    filterOpen,
    isSmallFrame,
    small: 250,
    big: 360,
  })

  const {
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFetchCollectionList(type, gridCount, fetchData)

  useEffect(() => {
    if (askRefresh) {
      refetch()
    }
  }, [askRefresh])

  const { pages } = data || {}
  const collectionList = useMemo(() => flatten(pages), [pages])

  return (
    <div>
      <InfiniteScroll dataLength={collectionList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
        <ListContainer ref={containerRef} grid={gridCount}>
          {collectionList.map((c: any, index) => (
            <NextLinkFromReactRouter
              key={c.username + index}
              to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[c.chainId]}/${c.contractAddress}${c.mintEnabled ? '#mint' : ''}`}
            >
              <CollectionCard
                details={{
                  ...c,
                  profileImage: c.profileImage ? c.profileImage : defaultImage,
                  coverImage: c.coverImage ? c.coverImage : defaultImage,
                }}
              />
            </NextLinkFromReactRouter>
          ))}

          {isFetching &&
            Array.from(Array(gridCount * 3 - (collectionList.length % gridCount)).keys()).map((c, index) => (
              <CollectionCardSkeletonV3 key={index + Math.random(100)} />
            ))}
        </ListContainer>
        {!isFetching && !collectionList.length && (
          <Flex justifyContent="center" alignItems="center" height="30vh">
            <Text fontSize="16px" color="text">
              No items to display
            </Text>
          </Flex>
        )}
      </InfiniteScroll>
    </div>
  )
}

const ListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: 30px;
`

export default CollectionCardGrid
