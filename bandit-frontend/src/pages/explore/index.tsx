import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { hideScrollToTop, showScrollToTop } from "../../state/Settings/actions";
import { PageMeta } from "../../components/molecules/AppLayout/PageMeta";
import { MARKETPLACE } from "constant/queryKeys";

import TokenListWithFilters from "../../components/templates/Token/TokenListWithFilters";
import { getExploreData } from "../../state/nfts/helpers";
import Page from "../../components/atomsV2/Page";
import { useRouter } from "next/router";

export const getTabList = (pathname) => [
  {
    title: 'Items',
    to: '/explore',
    active: pathname === '/explore',
  },
  {
    title: 'Activity',
    to: '/explore/activity',
    active: pathname === '/explore/activity',
  },
]

const MarketPlaceContainer = () => {
  const dispatch = useDispatch()

  const router = useRouter();

  const tabList = useMemo(() => getTabList(router.pathname), [router.pathname])

  useEffect(() => {
    dispatch(showScrollToTop())
    return () => {
      dispatch(hideScrollToTop())
    }
  }, [])

  return (
    <Page>
      <PageMeta />
      <TokenListWithFilters fetchData={getExploreData} type={MARKETPLACE} tabsList={tabList} />
    </Page>
  )
}

export default MarketPlaceContainer
