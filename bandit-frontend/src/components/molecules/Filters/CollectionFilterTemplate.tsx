import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import styled from "styled-components";

import { Box, Text } from "../../atoms/StyledSystem";

import Input from "../../atoms/Form/CustomInput";
import ProfileAvatar from "../../atoms/Avatar/FilterAvatar";

const CollectionFilterTemplate = ({
  isCollectionsLoading,
  collectionsHasNextPage,
  collectionFetchNextPage,
  setCollectionsSearch,
  collectionsFilter,
  isCollectionFetching,
  selectedCollectionState,
  onClickCollectionState,
}) => {
  const [collections, setCollections] = useState([])
  const [hashSelectedCollectionState, setHashSelectedCollectionState] = useState({})

  useEffect(() => {
    let hash = {}
    selectedCollectionState.map((value) => (hash[value] = true))
    let _collectionsFilter = collectionsFilter
    _collectionsFilter.sort((a, b) => {
      if (hash[a.username]) return -1
      else return 1
    })
    setCollections([..._collectionsFilter])
    setHashSelectedCollectionState({ ...hash })
  }, [collectionsFilter, selectedCollectionState])

  const handleSearch = (e) => {
    debouncedProfiles(e.target.value)
  }
  const debouncedProfiles = useCallback(
    debounce((value) => setCollectionsSearch(value), 500),
    [],
  )

  const handleActive = (userName) => {
    onClickCollectionState(userName)
  }

  return (
    <>
      <StyledSearch>
        <Input type="text" placeholder="Search" onChange={(e) => handleSearch(e)} />
        <ProfileViewContainer id="collectionsScroll">
          <InfiniteScroll
            dataLength={collections.length}
            next={collectionFetchNextPage}
            hasMore={!!collectionsHasNextPage}
            loader={null}
            scrollableTarget="collectionsScroll"
          >
            {collections.map((profile) => {
              return (
                <ProfileAvatar
                  key={profile?.username}
                  avatarImage={profile?.profileImage}
                  userName={profile?.username}
                  verified={profile?.is_verified}
                  name={profile?.name}
                  isActive={!!hashSelectedCollectionState[profile?.username]}
                  onClick={handleActive}
                />
              )
            })}

            {!collections.length && !isCollectionsLoading && (
              <Box>
                <Text textAlign="center" fontSize={14}>
                  No Search results.
                </Text>
              </Box>
            )}
          </InfiniteScroll>
        </ProfileViewContainer>
      </StyledSearch>
    </>
  )
}

const StyledSearch = styled(Box)`
  input {
    padding: 10px 20px !important;
    background-color: ${(p) => p.theme.colors.bg2};
  }
`

const ProfileViewContainer = styled.div`
  max-height: 200px;
  overflow: auto;
`
export default CollectionFilterTemplate
