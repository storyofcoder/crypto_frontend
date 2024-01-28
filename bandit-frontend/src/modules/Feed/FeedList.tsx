import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Box } from "../../components/atoms/StyledSystem";
import { useWindowSize } from "../../services/hooks";
import TokenCard from "../../components/molecules/Token/TokenCard2";
import { useSelector } from "react-redux";
import TokenCardSkeleton from "../../components/molecules/Token/skeletons/TokenCard";

const FeedListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: ${(p) => (p.isSmallFrame ? 15 : 30)}px;
  margin-top: 30px;
`

const FeedList = ({
  feedList,
  onClick,
  isFetching,
  isLoading,
  loadingSkletons,
  getTokenOptionsList,
  getGridCount,
  isCollectionToken = false,
}: any) => {
  const [gridCount, setGridCount] = useState(0)
  const { isSmallFrame, filterOpen } = useSelector((state: any) => state.settings)
  const container: any = useRef()
  const size = useWindowSize()
  const big = 330,
    small = 230

  useEffect(() => {
    const containerWidth = container?.current?.offsetWidth || size.width
    let grid = Math.floor(containerWidth / (isSmallFrame ? small : big))
    if (!grid) {
      setGridCount(1)
    } else {
      setGridCount(grid)
    }
  }, [filterOpen, container, size, isSmallFrame])

  useEffect(() => {
    setTimeout(() => {
      const containerWidth = container?.current?.offsetWidth || size.width
      let grid = Math.floor(containerWidth / (isSmallFrame ? small : big))
      if (!grid) {
        setGridCount(1)
      } else {
        setGridCount(grid)
      }
    }, 300)
  }, [filterOpen])

  useEffect(() => {
    getGridCount(gridCount)
  }, [gridCount])

  return (
    <>
      <FeedListContainer isSmallFrame={isSmallFrame} ref={container} grid={gridCount}>
        {feedList.map((token, index) => (
          <TokenCard
            isSmallLayout={isSmallFrame}
            key={token.metaData.name + token.id + index}
            token={token}
            onClick={() => onClick(token.id)}
            optionList={getTokenOptionsList && getTokenOptionsList(token)}
            isCollectionToken={isCollectionToken}
          />
        ))}
        {isFetching && Array.from(Array(gridCount * 2)).map((index) => <TokenCardSkeleton key={index} />)}
      </FeedListContainer>
    </>
  )
}
export default FeedList
