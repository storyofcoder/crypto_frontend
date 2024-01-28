import React from "react";
import styled from "styled-components";
import { Box, Flex } from "../components/atoms/StyledSystem";
import API from "../services/API";
import { useSelector } from "react-redux";
import ProfileListWithFilters from "../components/templates/Profile/ProfileListWithFilters";
import { CREATORS } from "constant/queryKeys";

const SORT_NAMES = {
  'recent-desc': 'Most Recent',
  'creation-desc': 'Most Creations',
  'follow-desc': 'Most Followed',
}

const Creators = () => {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth)

  function fetchCreators(offset, limit, sort, filters) {
    return API.fetchCreatorsWithFilters(offset, limit, user?.username, sort, filters)
  }

  return (
    <Container>
      {/*<Box w={"100%"}>*/}
      {/*  <Search placeholder="Search for a creator" onChange={handleSearch} />*/}
      {/*</Box>*/}

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

const FilterButtons = styled(Flex)`
  ${(p) => p.theme.media.xs} {
    flex-direction: column-reverse;
  }
`
const FilterContainer = styled(Box)`
  height: ${(p) => (p.open ? 'auto' : 0)};
  opacity: ${(p) => (p.open ? 1 : 0)};
  margin-top: ${(p) => (p.open ? '20px' : 0)};
  //max-height: ${(p) => (p.open ? '600px' : 0)};
  //transition: all 0.2s linear;
`

const Filter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  padding: 10px 16px;
  color: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
  background-color: ${(p) => (p.active ? p.theme.colors.text4 : p.theme.colors.bg2)};
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1px solid #E2E4E8;

  svg {
    path {
      fill: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
    }
  }

  span {
    margin-left: 5px;
  }
`
const Sort = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  padding: 10px 16px;
  color: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
  background-color: ${(p) => (p.active ? p.theme.colors.text4 : p.theme.colors.bg2)};
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border: 1px solid #E2E4E8;

  svg {
    path {
      fill: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.textTertiary)};
    }
  }

  span {
    margin-left: 5px;
  }

  .sort-name {
    color: #7e7e7d;
  }

  ${(p) => p.theme.media.xs} {
    margin-bottom: 10px;
  }
`

export default Creators
