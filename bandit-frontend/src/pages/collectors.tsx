import React from "react";
import styled from "styled-components";

import { PageMeta } from "../components/molecules/AppLayout/PageMeta";
import { Box } from "../components/atoms/StyledSystem";
import { useSelector } from "react-redux";

import API from "../services/API";

import ProfileListWithFilters from "../components/templates/Profile/ProfileListWithFilters";
import { COLLECTORS } from "constant/queryKeys";

const SORT_NAMES = {
  'spent-desc': 'Most Spent',
  'recent-desc': 'Most Recent',
  'collections-desc': 'Most Collections',
  'follow-desc': 'Most Followed',
}

const Collectors = () => {
  const { user } = useSelector((state: any) => state.auth)

  function fetchCollectors(offset, limit, sort, filters) {
    return API.getSortedAndFilteredCollectors(offset, limit, user?.username, sort, filters)
  }

  return (
    <Container>
      <PageMeta />
      <ProfileListWithFilters
        fetchData={fetchCollectors}
        SORT_NAMES={SORT_NAMES}
        type={COLLECTORS}
        defaultSelectedSort="Most Spent"
        defaultSort={{ name: 'spent', order: 'desc' }}
      />
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

export default Collectors
