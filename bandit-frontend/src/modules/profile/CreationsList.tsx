import React, { useEffect } from "react";
import { flatten, map } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import TokenCardSkeleton from "../../components/molecules/Token/skeletons/TokenCard";
import TokenCard from "../../components/molecules/Token/TokenCard2";
import { useInfiniteQuery } from "react-query";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const CreationsList = ({ burnToken }) => {
  const router = useRouter()
  const { query } = router
  const { user, isLoggedIn } = useSelector((state: any) => state.auth)
  const conversionRate = useSelector((state: any) => state.auth.conversionRate)
  const {
    isLoading: isCreationListLoading,
    data: CreationData,
    refetch: refetchCreationList,
    hasNextPage: hasCreationNextPage,
    fetchNextPage: fetchCreationNextPage,
  } = useInfiniteQuery('creations', fetchCreations, {
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, pages) => pages.length,
  })

  useEffect(() => {
    refetchCreationList()
  }, [query.username])

  function fetchCreations({ pageParam = 0 }) {
    const offset = pageParam * 9
    return API.fetchMyCreations(query.username, offset, 9)
  }

  const creationDataLength = (CreationData?.pages || []).reduce((counter, page) => {
    return counter + page.length
  }, 0)
  const creationDataList = flatten(map(CreationData?.pages))

  return (
    <>
      <InfiniteScroll
        dataLength={creationDataLength}
        next={fetchCreationNextPage}
        hasMore={!!hasCreationNextPage}
        loader={null}
      >
        <div className="profile-assets__list">
          {isCreationListLoading && (
            <>
              {[1, 2, 3].map(() => (
                <TokenCardSkeleton />
              ))}
            </>
          )}
          {!isCreationListLoading &&
            creationDataList.map((token: any) => (
              <TokenCard
                key={token.id}
                token={token}
                onClickBurn={(e) => burnToken(e, token.id, token.onSale)}
                showSoldOut={true}
                showBurn={
                  token.tokenCreator === token.tokenOwner &&
                  token.tokenCreator === user?.username &&
                  ['mint', 'sale'].includes(token.status)
                }
              />
            ))}
        </div>
      </InfiniteScroll>
      {!isCreationListLoading && !creationDataList.length && (
        <div className="profile-assets__list--empty">No Creations</div>
      )}
    </>
  )
}

export default CreationsList
