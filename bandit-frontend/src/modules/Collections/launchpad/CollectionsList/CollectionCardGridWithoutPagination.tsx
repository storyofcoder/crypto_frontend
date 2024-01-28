import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import CollectionCard from "../../../../components/molecules/collections/CollectionsCard";
import CollectionCardSkeleton from "../../../../components/molecules/collections/CollectionsCardSkeleton";
import { Box } from "../../../../components/atoms/StyledSystem";
import useGridCount from "../../../../hooks/useGridCount";
import { useSelector } from "react-redux";
import { NextLinkFromReactRouter } from "../../../../components/atoms/NextLink";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

const CollectionCardGridWithoutPagination = ({
  type,
  fetchData,
  askRefresh = 0,
  cardType,
  wrapperComponent: WrapperComponent = <></>,
}: any) => {
  const { isSmallFrame, filterOpen } = useSelector((state: any) => state.settings)
  const containerRef = useRef()
  const { gridCount } = useGridCount({
    containerRef,
    isSmallFrame,
    filterOpen,
    small: 250,
    big: 330,
  })
  const {
    isLoading,
    error,
    data: collectionList = [],
    isFetching,
    refetch,
  } = useQuery(type, fetchCollections, {
    enabled: gridCount >= 1,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  async function fetchCollections() {
    const limit = 50
    const offset = 0
    return fetchData(limit, offset)
  }
  const getNavigation = (colelction) => {
    let url = `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[colelction?.chainId]}/${colelction?.username}`
    switch (type) {
      case 'ongoing':
        url = url + '?tab=MINT'
        break
      case 'upcoming':
        url = url + '?tab=ROADMAP'
        break
    }
    return url
  }

  useEffect(() => {
    if (askRefresh) {
      refetch()
    }
  }, [askRefresh])

  if (!isFetching && !collectionList.length) return null

  return (
    <WrapperComponent type={type}>
      <ListContainer ref={containerRef} grid={gridCount}>
        {collectionList.map((c: any) => (
          <NextLinkFromReactRouter to={getNavigation(c)} key={c.username}>
            <CollectionCard
              key={c.username}
              details={{
                ...c,
                profileImage: `${c.profileImage}?width=300&auto=format,compress`,
                coverImage: `${c.coverImage}?width=300&auto=format,compress`,
              }}
              cardType={cardType}
              type={type}
            />
          </NextLinkFromReactRouter>
        ))}

        {isFetching && Array.from(Array(8).keys()).map((c, index) => <CollectionCardSkeleton key={index} />)}
      </ListContainer>
    </WrapperComponent>
  )
}

const ListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: 30px;
  margin-top: 30px;

  // ${(p) => p.theme.media.xs} {
  //   grid-template-columns: repeat(1, 1fr);
  // }
  // ${(p) => p.theme.media.sm} {
  //   grid-template-columns: repeat(1, 1fr);
  // }
  // ${(p) => p.theme.media.md} {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  // ${(p) => p.theme.media.xlg} {
  //   grid-template-columns: repeat(4, 1fr);
  // }
`

export default CollectionCardGridWithoutPagination
