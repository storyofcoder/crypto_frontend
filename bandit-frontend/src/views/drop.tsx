import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import DropTokenList from "../components/templates/Token/DropTokenList";
import API from "../services/API";
import { flatten, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { hideScrollToTop, showScrollToTop } from "../state/Settings/actions";

const DropList = () => {
  let timeoutObj: null | ReturnType<typeof setTimeout> = null
  const [nextCallEventSend, setNextCallEventSend] = React.useState(false)
  const userFbPages = useSelector((state: any) => state.auth.userFbPages)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showScrollToTop())
    return () => {
      dispatch(hideScrollToTop())
    }
  }, [])

  useEffect(() => {
    // TODO handle windoow
    // window.fbq('track', 'ViewContent');
    // timeoutObj = setTimeout(() => {
    //   dispatch(setFbPages('drop'));
    //   console.log(userFbPages,"userFbPages");
    //   if (isWarmUser(userFbPages)) {
    //     window.fbq('track', 'superWarmAudience');
    //   }
    // }, 20000)
    // return () => {
    //   clearTimeout(timeoutObj)
    // }
  }, [])
  const {
    isLoading,
    error,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery('drops', fetchDrops, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => pages.length,
  })

  const { pages } = data || {}

  const dataLength = (pages || []).reduce((counter, page) => {
    return counter + page.length
  }, 0)

  const tokenList = flatten(map(pages))

  function fetchDrops({ pageParam = 0 }) {
    const tokenIds = tokenList.map((t) => t.id)
    return API.fetchNFTDrop(5, tokenIds)
  }

  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={() => {
          if (!nextCallEventSend) {
            //TODO
            // window.fbq('track', 'coldAudience');
            setNextCallEventSend(true)
          }
          fetchNextPage()
        }}
        hasMore={!!hasNextPage}
        loader={null}
      >
        <DropTokenList tokenList={tokenList} isLoading={isFetching} />
      </InfiniteScroll>
    </>
  )
}

export default DropList
