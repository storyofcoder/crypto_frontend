import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useInfiniteQuery } from "react-query";
import { findIndex, flatten, map } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../../services/hooks";
import { hideScrollToTop, showScrollToTop } from "../../../state/Settings/actions";
import { setFollowings } from "../../../state/Profile/actions";
import { notify } from "../../atoms/Notification/Notify";
import { Mixpanel, MixpanelEvents } from "../../../analytics/Mixpanel";
import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { CrossIcon, RightIcon } from "../../../components/atoms/svg";

import FiltersTemplate from "../../molecules/Filters/FiltersTemplate";
import ProfileCard from "../../molecules/Creator/ProfileCard";
import ProfileCardSkeleton from "../../molecules/Creator/skeletons/ProfileCardSkeleton";
import useWalletModal from "../../../hooks/useWalletModal";
import DiscoverLayout from "../../molecules/AppLayout/DiscoverLayout";
import API from "../../../services/API";
import useAuth from "../../../hooks/useAuth";

const ProfileListWithFilters = ({ SORT_NAMES, type, fetchData, defaultSort, defaultSelectedSort, tabsList }: any) => {
  const [parsingUrl, setParsingUrl] = useState(true)
  const [profiles, setProfiles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [gridCount, setGridCount] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState([])
  const [selectedProfileType, setSelectedProfileType] = useState([])
  const [selectedSort, setSelectedSort] = useState(defaultSelectedSort || 'Most Recent')
  const [activeFiltersList, setActiveFiltersList] = useState([])
  const [filtersValuesKeys, setFiltersValuesKeys] = useState({})

  const dispatch = useDispatch()
  const history = useRouter()
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
      if (gridCount != 1) setGridCount(1)
    } else {
      if (gridCount != grid) setGridCount(grid)
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
    // TODO handle windoow
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
    const { sort, status, profileType }: any = parsed || {}
    if (sort) {
      const [name, order] = sort.split('-')
      setSort({ name, order })
      setSelectedSort(SORT_NAMES[sort])
    }

    if (status) {
      const statusData = Array.isArray(status) ? status : [status]
      setSelectedStatus(statusData)
    }

    if (profileType) {
      const profileTypeData = Array.isArray(profileType) ? profileType : [profileType]
      setSelectedProfileType(profileTypeData)
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
    {
      name: 'people',
      filter: selectedProfileType,
    },
  ]

  const { user } = useSelector((state: any) => state.auth)
  const { isLoggedIn }: any = useAuth()
  const followings = useSelector((state: any) => state.profile.followings)

  const { onPresentConnectModal } = useWalletModal()

  const {
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

  const { pages } = data || {}

  const ProfileList = useMemo(() => flatten(map(pages, 'data')), [pages])

  useEffect(() => {
    setProfiles(ProfileList)
  }, [ProfileList])

  useEffect(() => {
    const _filtersValuesKeys = {
      selectedStatus: {
        verified: {
          key: 'verified',
          value: 'Verified Only',
          callback: 'onClickNftState',
        },
      },
      selectedProfileType: {
        creator: {
          key: 'creator',
          value: 'Creators',
          callback: 'onClickProfileType',
        },
        collector: {
          key: 'collector',
          value: 'Collectors',
          callback: 'onClickProfileType',
        },
      },
    }
    setFiltersValuesKeys(_filtersValuesKeys)
  }, [])

  async function handleFollow(isFollowing, username) {
    const index = findIndex(profiles, { username })
    if (!isLoggedIn) return onPresentConnectModal()
    try {
      if (isFollowing) {
        setProfiles([
          ...profiles.slice(0, index),
          {
            ...profiles[index],
            followers: Number(profiles[index].followers) - 1,
          },
          ...profiles.slice(index + 1),
        ])
        dispatch(setFollowings(followings.filter((item) => item !== username)))
        await API.unFollowUser(user.username, username, user.signature)
      } else {
        setProfiles([
          ...profiles.slice(0, index),
          {
            ...profiles[index],
            followers: Number(profiles[index].followers) + 1,
          },
          ...profiles.slice(index + 1),
        ])
        dispatch(setFollowings([...followings, username]))
        await API.followUser(user.username, username, user.signature)
      }
      // fetchFollowing();
    } catch (e) {
      notify.error('Something went wrong please try again later', '')
    }
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
    setSelectedProfileType([])
  }

  function onClickNftState(state) {
    if (selectedStatus.includes(state)) {
      setSelectedStatus(selectedStatus.filter((c) => c !== state))
    } else {
      setSelectedStatus([...selectedStatus, state])
    }
  }
  function onClickProfileType(state) {
    if (selectedProfileType.includes(state)) {
      setSelectedProfileType(selectedProfileType.filter((c) => c !== state))
    } else {
      setSelectedProfileType([...selectedProfileType, state])
    }
  }

  const handleActiveFiltersList = () => {
    let result = []
    for (let i = 0; i < selectedStatus.length; i++) result.push(filtersValuesKeys['selectedStatus'][selectedStatus[i]])

    for (let i = 0; i < selectedProfileType.length; i++)
      result.push(filtersValuesKeys['selectedProfileType'][selectedProfileType[i]])

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

    if (!!selectedProfileType.length) {
      parsed.profileType = selectedProfileType
    } else {
      delete parsed.profileType
    }

    const stringify = queryString.stringify(parsed, { arrayFormat: 'comma' })
    const encoded = encodeURIComponent(stringify)
    history.replace({
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
  }, [sort, selectedStatus, selectedProfileType])

  const viewType = type === 'creators' ? 'created' : 'collected'
  const valueKey = type === 'creators' ? 'creations' : 'collections'
  return (
    <DiscoverLayout
      filterList={[
        {
          title: 'Type',
          render: () => (
            <FiltersTemplate
              pillList={[
                {
                  name: 'Creators',
                  onClick: () => onClickProfileType('creator'),
                  active: selectedProfileType.includes('creator'),
                },
                {
                  name: 'Collectors',
                  onClick: () => onClickProfileType('collector'),
                  active: selectedProfileType.includes('collector'),
                },
              ]}
            />
          ),
        },
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
        {
          title: 'Most Recent',
          onClick: () => handleSort('Most Recent', 'recent', 'desc'),
        },
        {
          title: 'Most Created',
          onClick: () => handleSort('Most Created', 'creation', 'desc'),
        },
        {
          title: 'Most Collected',
          onClick: () => handleSort('Most Collected', 'collections', 'desc'),
        },
        {
          title: 'Most Followed',
          onClick: () => handleSort('Most Followed', 'follow', 'desc'),
        },
        {
          title: 'Most Spent',
          onClick: () => handleSort('Most Spent', 'spent', 'desc'),
        },
      ]}
      selectedSort={selectedSort}
      // listCount={`FOUND ${pages[pages.length - 1]?.totalResult || 0} ${type}`}
      listCount={``}
      activeFiltersListCount={activeFiltersList?.length}
      onClickClear={onClickClear}
      tabsList={tabsList}
    >
      <SelectedFilterContainer>
        {!!activeFiltersList.length && (
          <ActiveFiltersWrapper ref={ActveFilterRefer}>
            {/*{!!activeFiltersList.length && (*/}
            {/*    <SelectedFilterWrapper*/}
            {/*        width={108}*/}
            {/*        onClick={onClickClear}*/}
            {/*        className="clear-button"*/}
            {/*        fontSize={["10px", "10px", "14px"]}*/}
            {/*    >*/}
            {/*      Clear filters*/}
            {/*    </SelectedFilterWrapper>*/}
            {/*)}*/}

            <ClearFilter onClick={() => onClickClear()} className="clear-button" fontSize={['10px', '10px', '14px']}>
              Clear Filter
            </ClearFilter>
            {activeFiltersList.map((item) => (
              <SelectedFilterWrapper fontSize={['10px', '10px', '14px']}>
                {item.value}{' '}
                <span onClick={() => combineMethods(item.callback, item.key)}>
                  <CrossIcon />
                </span>
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
            <ProfileCard
              key={profile.username + index}
              creator={profile}
              to={`/${profile.username}?tab=${viewType}`}
              handleFollow={handleFollow}
              isFollowing={followings.includes(profile.username)}
              stats={[
                {
                  name: valueKey,
                  value: profile[valueKey],
                },
                {
                  name: 'Followers',
                  value: profile.followers,
                },
              ]}
              showFollow={profile.username !== user?.username}
            />
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
    </DiscoverLayout>
  )
}

const ListContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(${(p) => p.grid}, 1fr);
  grid-gap: 30px;
  margin-top: 30px;

  // ${(p) => p.theme.media.xs} {
  //   grid-template-columns: repeat(1, 1fr);
  // }
  // ${(p) => p.theme.media.sm} {
  //   grid-template-columns: repeat(2, 1fr);
  // }
  // ${(p) => p.theme.media.lg} {
  //   grid-template-columns: repeat(4, 1fr);
  // }
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

export default ProfileListWithFilters
