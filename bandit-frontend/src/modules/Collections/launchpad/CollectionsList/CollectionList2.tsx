import { CREATORS } from "constant/queryKeys";
import React from "react";
import styled from "styled-components";
import { Box } from "../../../../components/atoms/StyledSystem";
import API from "../../../../services/API";
import CollectionListWithFilters from "./CollectionListWithFilter";

const SORT_NAMES = {
  'recent-desc': 'Most Recent',
  'creation-desc': 'Most Creations',
  'follow-desc': 'Most Followed',
}

const CollectionsList = () => {
  function fetchCreators(offset, limit, sort, filters) {
    return API.getExternalCollections(offset, limit, sort, filters)
  }

  return (
    <Container>
      <CollectionListWithFilters fetchData={fetchCreators} SORT_NAMES={SORT_NAMES} type={CREATORS} />
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

export default CollectionsList
