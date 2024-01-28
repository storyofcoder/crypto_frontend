import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import API from "../services/API";
import { Box } from "../components/atoms/StyledSystem";
import { hideScrollToTop, showScrollToTop } from "../state/Settings/actions";
import TokenListWithFilters from "../components/templates/Token/TokenListWithFilters";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";
import { MARKETPLACE } from "constant/queryKeys";

export const tabsList = [
  {
    title: 'NFTs',
    to: '/explore',
  },
  {
    title: 'Collections',
    to: '/collections',
  },
  {
    title: 'Profiles',
    to: '/profiles',
  },
]

const MarketPlaceContainer = () => {
  let timeoutObj: null | ReturnType<typeof setTimeout> = null
  const userFbPages = useSelector((state: any) => state.auth.userFbPages)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showScrollToTop())
    return () => {
      dispatch(hideScrollToTop())
    }
  }, [])

  useEffect(() => {
    // TODO
    // timeoutObj = setTimeout(() => {
    //   window.fbq("track", "warmAudience");
    //   dispatch(setFbPages("marketplace"));
    //   if (isWarmUser(userFbPages)) {
    //     window.fbq("track", "superWarmAudience");
    //   }
    // }, 20000);
    // return () => {
    //   clearTimeout(timeoutObj);
    // };
  }, [])

  async function fetchTokens(offset, limit, sort, filters) {
    return API.fetchNftWithFilter(offset, limit, sort, filters)
  }

  return (
    <Container>
      <PageMeta data="Explore" />
      <TokenListWithFilters fetchData={fetchTokens} type={MARKETPLACE} tabsList={tabsList} />
    </Container>
  )
}

const Container = styled(Box)`
  //padding-top: 10px;
  //padding-left: 40px;
  //padding-right: 40px;

  ${(p) => p.theme.media.xs} {
    padding: 10px 20px 0 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 10px 20px 0 20px;
  }

  ${(p) => p.theme.media.xlg} {
    //max-width: var(--max-width);
    margin: 0 auto;
    padding: 10px 40px 0 40px;
  }
`

export default MarketPlaceContainer
