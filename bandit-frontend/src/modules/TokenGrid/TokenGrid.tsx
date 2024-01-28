import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { Box, Flex, Text } from '../../components/atoms/StyledSystem'
import { Mixpanel, MixpanelEvents } from '../../analytics/Mixpanel'

import TokenCard from '../../components/molecules/TokenV2/TokenCard'
import TokenCardSkeleton from '../../components/molecules/Token/skeletons/TokenCard'
import UseGridCount from 'hooks/useGridCount'

const TokenGrid = ({ tokenList = [], isFetching, getTokenOptionsList, type, setGridCount }: any) => {
  const user = useSelector((state: any) => state.auth.user)
  const { isSmallFrame, filterOpen } = useSelector((state: any) => state.settings)

  const containerRef: any = useRef()

  const { gridCount } = UseGridCount({
    containerRef,
    filterOpen,
    isSmallFrame,
    small: 245,
    big: 250,
  })


  useEffect(() => {
    if (setGridCount) setGridCount(gridCount)
  }, [gridCount])

  function onClickToken(tokenId) {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.PRODUCT_DETAIL_VIEW, {
      source: type,
      tokenId,
    })
  }

  return (
    <>
      <FeedListContainer isSmallFrame={isSmallFrame} ref={containerRef} grid={gridCount}>
        {tokenList.map((token, index) => (
          <TokenCard
            isSmallLayout={isSmallFrame}
            key={token.metaData.name + token.id + index}
            token={token}
            onClick={() => onClickToken(token.id)}
            optionList={getTokenOptionsList && getTokenOptionsList(token)}
            isCollectionToken={type === 'collections'}
          />
        ))}
        {isFetching && Array.from(Array(gridCount * 3)).map((index) => <TokenCardSkeleton key={index} />)}
      </FeedListContainer>

      {!isFetching && !tokenList.length && (
        <Flex justifyContent="center" alignItems="center" height="30vh">
          <Text fontSize="16px" color="text">
            No items to display
          </Text>
        </Flex>
      )}
    </>
  )
}

const FeedListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: 20px;
`

export default TokenGrid
