import React from "react";
import styled from "styled-components";
import { flatten, map } from "lodash";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import CollectionCard from "../components/molecules/collections/CollectionsCard";
import CollectionCardSkeleton from "../components/molecules/collections/CollectionsCardSkeleton";
import API from "../services/API";
import CreateCollectionCard from "../components/molecules/collections/CreateCollectionCard";
import { notify } from "../components/atoms/Notification/Notify";
import { MODAL, showModal } from "../modules/Modals";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { useRouter } from "next/router";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

const CollectionsList = ({ isPrivate, profileDetails }) => {
  const { user, isLoggedIn } = useSelector((state: any) => state.auth)

  const router = useRouter()
  const { query } = router

  const {
    isLoading,
    error,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery('my-collection-list', fetchCollections, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length === 12 ? pages.length : undefined),
  })

  function fetchCollections({ pageParam = 0 }) {
    const offset = pageParam * 12
    return API.fetchMyCollection(query?.username, offset, 12)
  }

  async function deleteCollection(collection) {
    try {
      const res = await API.deleteCollection({
        username: user?.username,
        signature: user?.signature,
        collectionUsername: collection.username,
      })
      refetch()
    } catch (e) {
      console.log(e)
      notify.error('Failed to delete collection', e.message)
    }
  }

  function confirmDeleteCollection(collection) {
    showModal(
      MODAL.TX_LOADING,
      {
        title: 'Are you sure you want to delete the collection?',
        callback: () => deleteCollection(collection),
      },
      {},
    )
  }

  function onClick() {
    Mixpanel.track(MixpanelEvents.CREATE_COLLECTION_CLICK)
  }

  function getOptions(collection) {
    let options = []
    const isOwner = collection?.owner?.username === user?.username

    if (isOwner) {
      options.push({
        title: 'Edit',
        onClick: (e) => {
          e.preventDefault()
          router.push(`/edit-collection/${collection.username}`)
        },
      })
    }
    if (isOwner && collection.statistics.items <= 0) {
      options.push({
        title: 'Delete',
        onClick: (e) => {
          e.preventDefault()
          confirmDeleteCollection(collection)
        },
      })
    }

    return options
  }

  // @ts-ignore
  const collectionList = flatten(map(data.pages))

  return (
    <Container>
      {/*<Box mt={20}>*/}
      {/*  <Link to="/create-collection">*/}
      {/*    <Button variant="solid">Create Collection</Button>*/}
      {/*  </Link>*/}
      {/*</Box>*/}
      <InfiniteScroll dataLength={collectionList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
        <ListContainer>
          {isLoggedIn && isPrivate && user?.is_mintable && (
            <NextLinkFromReactRouter to="/create-collection">
              <CreateCollectionCard onClick={onClick} />
            </NextLinkFromReactRouter>
          )}
          {collectionList.map((c: any) => (
            <NextLinkFromReactRouter to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[c?.chainId]}/${c.username}`} key={c.username}>
              <CollectionCard
                key={c.username}
                details={{
                  ...c,
                  profileImage: `${c.profileImage}?width=300&auto=format,compress`,
                  coverImage: `${c.coverImage}?width=300&auto=format,compress`,
                }}
                optionList={getOptions(c)}
              />
            </NextLinkFromReactRouter>
          ))}

          {isFetching &&
            Array.from(Array(8 - (collectionList.length % 4)).keys()).map((c, index) => (
              <CollectionCardSkeleton key={index} />
            ))}
        </ListContainer>
        {!isFetching && !collectionList.length && (
          <Flex justifyContent="center" alignItems="center" height="30vh">
            <Text fontSize="16px" color="text">No items to display</Text>
          </Flex>
        )}
      </InfiniteScroll>
    </Container>
  )
}

const Container = styled(Box)`
  ${(p) => p.theme.media.xs} {
    //padding: 20px;
  }
  ${(p) => p.theme.media.sm} {
    //padding: 20px;
  }
  ${(p) => p.theme.media.md} {
    //padding: 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 0;
    //max-width: var(--max-width);
    margin: 0 auto;
  }
`

const ListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin-top: 20px;

  ${(p) => p.theme.media.xs} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${(p) => p.theme.media.sm} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${(p) => p.theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${(p) => p.theme.media.xlg} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default CollectionsList
