import React, { useEffect } from "react";
import { flatten, map } from "lodash";

import InfiniteScroll from "react-infinite-scroll-component";
import TokenCardSkeleton from "../../components/molecules/Token/skeletons/TokenCard";
import TokenCard from "../../components/molecules/Token/TokenCard2";
import { useInfiniteQuery } from "react-query";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const CollectionsList = () => {
  const router = useRouter()
  const { query } = router
  const conversionRate = useSelector((state: any) => state.auth.conversionRate)

  const {
    isLoading: isCollectionListLoading,
    data: collectionData,
    refetch: refetchCollectionList,
    hasNextPage: hasCollectionNextPage,
    fetchNextPage: fetchCollectionNextPage,
  } = useInfiniteQuery('collections', fetchCollections, {
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => pages.length,
  })

  useEffect(() => {
    refetchCollectionList()
  }, [query.username])

  function fetchCollections({ pageParam = 0 }) {
    const offset = pageParam * 9
    return API.fetchMyCollections(query.username, offset, 9)
  }

  const collectionLength = (collectionData?.pages || []).reduce((counter, page) => {
    return counter + page.length
  }, 0)
  const collectionsDataList = flatten(map(collectionData?.pages))
  return (
    <>
      <InfiniteScroll
        dataLength={collectionLength}
        next={fetchCollectionNextPage}
        hasMore={!!hasCollectionNextPage}
        loader={null}
      >
        <div className="profile-assets__list">
          {isCollectionListLoading && (
            <>
              {[1, 2, 3].map((index) => (
                <TokenCardSkeleton key={index} />
              ))}
            </>
          )}
          {!isCollectionListLoading &&
            collectionsDataList.map((token: any) => <TokenCard key={token.id} token={token} showSoldOut={false} />)}
        </div>
      </InfiniteScroll>
      {!isCollectionListLoading && !collectionsDataList.length && (
        <div className="profile-assets__list--empty">No Collections</div>
      )}
    </>
  )
}

export default CollectionsList
