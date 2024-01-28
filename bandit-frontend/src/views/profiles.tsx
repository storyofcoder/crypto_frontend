import React from "react";
import styled from "styled-components";
import { Box } from "../components/atoms/StyledSystem";
import API from "../services/API";
import { useSelector } from "react-redux";
import ProfileListWithFilters from "../components/templates/Profile/ProfileListWithFilters";
import { tabsList } from "./marketplace";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";
import { PROFILES } from "constant/queryKeys";

const SORT_NAMES = {
  'recent-desc': 'Most Recent',
  'creation-desc': 'Most Created',
  'collections-desc': 'Most Collected',
  'follow-desc': 'Most Followed',
  'spent-desc': 'Most Spent',
}

const Profiles = () => {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth)

  function fetchCreators(offset, limit, sort, filters) {
    return API.fetchSortedANdFilteredPeople(offset, limit, sort, filters)
  }

  return (
    <Container>
      <PageMeta data="Profiles" />
      <ProfileListWithFilters fetchData={fetchCreators} SORT_NAMES={SORT_NAMES} type={PROFILES} tabsList={tabsList} />
    </Container>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 10px 20px 20px 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 10px 40px 40px 40px;
    //max-width: var(--max-width);
    margin: 0 auto;
  }
`

export default Profiles
