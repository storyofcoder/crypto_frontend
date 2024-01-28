import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Box } from "../components/atoms/StyledSystem";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

import ProfileListWithFilters from "../components/templates/Profile/ProfileListWithFilters";
import API from "../services/API";
import { CREATORS } from "constant/queryKeys";

const SORT_NAMES = {
  'recent-desc': 'Most Recent',
  'creation-desc': 'Most Creations',
  'follow-desc': 'Most Followed',
}

const Creators = () => {
  const { user } = useSelector((state: any) => state.auth)

  function fetchCreators(offset, limit, sort, filters) {
    return API.fetchCreatorsWithFilters(offset, limit, user?.username, sort, filters)
  }

  return (
    <Container>
      <PageMeta data="Creators" />
      <ProfileListWithFilters fetchData={fetchCreators} SORT_NAMES={SORT_NAMES} type={CREATORS} />
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

export default Creators
