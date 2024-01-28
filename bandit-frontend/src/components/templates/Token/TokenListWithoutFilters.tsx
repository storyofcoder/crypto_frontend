import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { flatten, map } from "lodash";
import { useInfiniteQuery } from "react-query";

import MarketPlace from "../../../components/templates/Token/MarketPlace";
import usePreviousValue from "../../../hooks/usePreviousValue";

const TokenListWithoutFilters = (props) => {
  const { fetchData, type, getTokenOptionsList, askRefresh } = props
  const [gridCount, setGridCount] = useState(0)

  const previousAskRefresh = usePreviousValue(askRefresh)

  const {
    isLoading,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  }: any = useInfiniteQuery(type, fetchTokens, {
    enabled: gridCount > 0,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    retry: false,
    getNextPageParam: (lastPage, pages) => (lastPage.data.length === gridCount * 3 ? pages.length : undefined),
  })

  useEffect(() => {
    if (!!askRefresh && askRefresh !== previousAskRefresh && gridCount > 0) {
      refetch()
    }
  }, [askRefresh, gridCount])

  async function fetchTokens({ pageParam = 0 }) {
    const limit = gridCount * 3
    const offset = pageParam * limit
    return fetchData(offset, limit)
  }

  function getGridCount(gridCount) {
    setGridCount(gridCount)
  }

  const { pages } = data || {}
  const tokenList = flatten(map(pages, 'data'))
  return (
    <div>
      <InfiniteScroll dataLength={tokenList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
        <MarketPlace
          tokenList={tokenList}
          isLoading={isLoading}
          isFetching={isFetching}
          loadMore={{
            disabled: true,
            onClick: fetchNextPage,
          }}
          getTokenOptionsList={getTokenOptionsList}
          getGridCount={getGridCount}
          type={type}
        />
      </InfiniteScroll>
    </div>
  )
}

export default TokenListWithoutFilters
