import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import queryString from "query-string";
import { useInfiniteQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { debounce, flatten } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import CollectionLayout from "./CollectionLayout";
import { useWindowSize } from "../../../../services/hooks";
import { hideScrollToTop, showScrollToTop } from "../../../../state/Settings/actions";
import useWalletModal from "../../../../hooks/useWalletModal";
import { getFollowings } from "../../../../state/Profile/actions";
import { Mixpanel, MixpanelEvents } from "../../../../analytics/Mixpanel";
import FiltersTemplate from "../../../../components/molecules/Filters/FiltersTemplate";
import ProfileCardSkeleton from "../../../../components/molecules/Creator/skeletons/ProfileCardSkeleton";
import { Box, Flex, Text } from "../../../../components/atoms/StyledSystem";
import { CrossIcon, RightIcon } from "../../../../components/atoms/svg";
import CollectionCard from "../../../../components/molecules/collections/CollectionsCard";
import { useRouter } from "next/router";
import { NextLinkFromReactRouter } from "../../../../components/atoms/NextLink";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

const CollectionListWithFilters = ({ SORT_NAMES, type, fetchData, defaultSort, defaultSelectedSort }: any) => {
  const [parsingUrl, setParsingUrl] = useState(true)
  const [profiles, setProfiles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [gridCount, setGridCount] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState([])
  const [selectedSort, setSelectedSort] = useState(defaultSelectedSort || 'Most Recent')
  const [activeFiltersList, setActiveFiltersList] = useState([])
  const [filtersValuesKeys, setFiltersValuesKeys] = useState({})

  const userFbPages = useSelector((state: any) => state.auth.userFbPages)
  let timeoutObj: null | ReturnType<typeof setTimeout> = null
  const dispatch = useDispatch()
  const router = useRouter()
  const { asPath, pathname } = useRouter()
  const search = asPath?.replace(pathname, '')
  const container: any = useRef()
  const ActveFilterRefer = useRef(null)
  const size = useWindowSize()

  const { isSmallFrame, filterOpen } = useSelector((state: any) => state.settings)
  const big = 330
  const small = 230

  useEffect(() => {
    const containerWidth = container?.current?.offsetWidth || size.width
    let grid = Math.floor(containerWidth / (isSmallFrame ? small : big))
    if (!grid) {
      setGridCount(1)
    } else {
      setGridCount(grid)
    }
  }, [filterOpen, container, size, isSmallFrame])

  useEffect(() => {
    setTimeout(() => {
      const containerWidth = container?.current?.offsetWidth || size.width
      let grid = Math.floor(containerWidth / (isSmallFrame ? small : big))
      if (!grid) {
        setGridCount(1)
      } else {
        setGridCount(grid)
      }
    }, 300)
  }, [filterOpen])

  useEffect(() => {
    dispatch(showScrollToTop())
    return () => {
      dispatch(hideScrollToTop())
    }
  }, [])

  useEffect(() => {
    // TODO
    // timeoutObj = setTimeout(() => {
    //   dispatch(setFbPages(type));
    //   if (isWarmUser(userFbPages)) {
    //     window.fbq("track", "superWarmAudience");
    //   }
    // }, 20000);
    // return () => {
    //   clearTimeout(timeoutObj);
    // };
  }, [])

  useEffect(() => {
    setParsingUrl(true)
    const parsed = queryString.parse(decodeURIComponent(search), {
      arrayFormat: 'comma',
    })
    const { sort, status }: any = parsed || {}
    if (sort) {
      const [name, order] = sort.split('-')
      setSort({ name, order })
      setSelectedSort(SORT_NAMES[sort])
    }

    if (status) {
      const statusData = Array.isArray(status) ? status : [status]
      setSelectedStatus(statusData)
    }

    setParsingUrl(false)
  }, [])

  const [sort, setSort] = useState(
    defaultSort || {
      name: 'recent',
      order: 'desc',
    },
  )

  const filters = [
    {
      name: 'verification_status',
      filter: selectedStatus,
    },
  ]

  const { user, isLoggedIn } = useSelector((state: any) => state.auth)

  const { onPresentConnectModal } = useWalletModal()

  const {
    isLoading,
    error,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch: refetchProfiles,
  } = useInfiniteQuery(type, fetchProfiles, {
    enabled: !parsingUrl && gridCount > 0,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => pages.length,
  })

  function fetchProfiles({ pageParam = 0 }) {
    const limit = gridCount * 3
    const offset = pageParam * limit
    return fetchData(offset, limit, sort, filters)
  }

  function fetchFollowing() {
    dispatch(getFollowings(user.username))
  }

  const debouncedProfiles = useCallback(
    debounce((value) => refetchProfiles(value), 500),
    [],
  )

  function handleSearch(e) {
    setSearchQuery(e.target.value)
    debouncedProfiles(e.target.value)
  }

  const { pages } = data || {}

  const CollectionList = useMemo(() => flatten(pages), [pages])

  useEffect(() => {
    setProfiles(CollectionList)
  }, [CollectionList])

  useEffect(() => {
    const _filtersValuesKeys = {
      selectedStatus: {
        verified: {
          key: 'verified',
          value: 'Verified',
          callback: 'onClickNftState',
        },
      },
    }
    setFiltersValuesKeys(_filtersValuesKeys)
  }, [])

  function handleFilter() {
    setFiltersOpen(!filtersOpen)
  }

  function handleSort(title, name, order) {
    Mixpanel.track(MixpanelEvents.SORT_LISTING, {
      title,
      name,
      order,
      Section: type,
    })
    setSelectedSort(title)
    setSort({
      name,
      order,
    })
  }

  function onClickClear() {
    setSelectedStatus([])
    setFiltersOpen(false)
  }

  function onClickNftState(state) {
    if (selectedStatus.includes(state)) {
      setSelectedStatus(selectedStatus.filter((c) => c !== state))
    } else {
      setSelectedStatus([...selectedStatus, state])
    }
  }

  const handleActiveFiltersList = () => {
    let result = []
    for (let i = 0; i < selectedStatus.length; i++) result.push(filtersValuesKeys['selectedStatus'][selectedStatus[i]])

    setActiveFiltersList(result)
  }

  const combineMethods = (callback, key) => {
    switch (callback) {
      case 'onClickNftState':
        return onClickNftState(key)
    }
  }

  function handleFilters() {
    let parsed = queryString.parse(decodeURIComponent(search))

    if (sort) {
      parsed.sort = `${sort.name}-${sort.order}`
    } else {
      delete parsed.sort
    }

    if (!!selectedStatus.length) {
      parsed.status = selectedStatus
    } else {
      delete parsed.status
    }
    const stringify = queryString.stringify(parsed, { arrayFormat: 'comma' })
    const encoded = encodeURIComponent(stringify)
    router.replace({
      search: `?${encoded}`,
    })
  }

  useEffect(() => {
    if (!parsingUrl) {
      refetchProfiles()
    }
  }, [search])

  useEffect(() => {
    handleFilters()
    handleActiveFiltersList()
  }, [sort, selectedStatus])

  return (
    <CollectionLayout
      filterList={[
        {
          title: 'Verification',
          render: () => (
            <FiltersTemplate
              pillList={[
                {
                  name: 'Verified Only',
                  onClick: () => onClickNftState('verified'),
                  active: selectedStatus.includes('verified'),
                },
              ]}
            />
          ),
        },
      ]}
      sortOptionList={[
        ...(type === 'collectors'
          ? [
              {
                title: 'Most Spent',
                onClick: () => handleSort('Most Spent', 'spent', 'desc'),
              },
            ]
          : []),
        {
          title: 'Most Recent',
          onClick: () => handleSort('Most Recent', 'recent', 'desc'),
        },
        ...(type === 'creators'
          ? [
              {
                title: 'Most Creations',
                onClick: () => handleSort('Most Creations', 'creation', 'desc'),
              },
            ]
          : [
              {
                title: 'Most Collections',
                onClick: () => handleSort('Most Collections', 'collections', 'desc'),
              },
            ]),

        {
          title: 'Most Followed',
          onClick: () => handleSort('Most Followed', 'follow', 'desc'),
        },
      ]}
      selectedSort={selectedSort}
      listCount={``}
      activeFiltersListCount={activeFiltersList?.length}
      onClickClear={onClickClear}
    >
      <SelectedFilterContainer>
        {!!activeFiltersList.length && (
          <ActiveFiltersWrapper ref={ActveFilterRefer}>
            <ClearFilter onClick={() => onClickClear()} className="clear-button" fontSize={['10px', '10px', '14px']}>
              Clear Filter
            </ClearFilter>
            {activeFiltersList.map((item) => (
              <SelectedFilterWrapper fontSize={['10px', '10px', '14px']}>
                {item.value} <CrossIcon onClick={() => combineMethods(item.callback, item.key)} />
              </SelectedFilterWrapper>
            ))}
            {ActveFilterRefer?.current?.scrollWidth > size?.width && (
              <div className="next-icon">
                <RightIcon />
              </div>
            )}
          </ActiveFiltersWrapper>
        )}
      </SelectedFilterContainer>

      <InfiniteScroll dataLength={profiles.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
        <ListContainer ref={container} grid={gridCount}>
          {profiles.map((profile, index) => (
            <NextLinkFromReactRouter to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[profile?.chainId]}/${profile.username}`} key={profile.username}>
              <CollectionCard
                key={profile.username}
                details={{
                  ...profile,
                  profileImage: `${profile.profileImage}?q=80&width=300&auto=format`,
                  coverImage: `${profile.coverImage}?q=80&width=300&auto=format`,
                }}
              />
            </NextLinkFromReactRouter>
          ))}
          {isFetching && Array.from(Array((gridCount || 1) * 2)).map((item) => <ProfileCardSkeleton key={item} />)}
        </ListContainer>
        {!profiles.length && !!searchQuery.length && (
          <Box>
            <Text textAlign="center" fontSize={40}>
              No Search results.
            </Text>
          </Box>
        )}
      </InfiniteScroll>
      {!isFetching && !parsingUrl && !profiles.length && (
        <Flex justifyContent="center" alignItems="center" height="30vh">
          <Text fontSize="20px" textAlign="center">
            There are no matching {type} for this filter
          </Text>
        </Flex>
      )}
    </CollectionLayout>
  )
}

const ListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: 30px;
  margin-top: 20px;
`

const ActiveFiltersWrapper = styled(Box)`
  .next-icon {
    display: none;
  }
  ${(p) => p.theme.media.sm} {
    white-space: nowrap;
    overflow-y: auto;
    padding-bottom: 10px;

    svg {
      width: 8px;
      height: 8px;
      margin-left: 5px;
    }
    .next-icon {
      position: sticky;
      right: -2px;
      width: 20px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 18%, rgba(239, 238, 234, 1) 91%);
      display: inline-block;
    }
  }
`

const SelectedFilterContainer = styled.div`
  justify-content: space-between;
  display: flex;
  .clear-button {
    cursor: pointer;
  }
`

const SelectedFilterWrapper = styled(Text)`
  margin-top: 20px;
  margin-right: 10px;
  display: inline-block;
  border-radius: 22px;
  padding: 4px 15px;
  box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 10%);
  background: ${(p) => p.theme.colors.bg2};
  color: ${(p) => p.theme.colors.text};
  fontfamily: roc-grotesk;
  svg {
    height: 9px;
    cursor: pointer;
  }
  min-width: ${(p) => p.width}px;
`

const ClearFilter = styled(Text)`
  display: inline-block;
  color: ${(p) => p.theme.colors.text};
  margin-right: 10px;
  border-bottom: 1px solid ${(p) => p.theme.colors.text};
`

export default CollectionListWithFilters
