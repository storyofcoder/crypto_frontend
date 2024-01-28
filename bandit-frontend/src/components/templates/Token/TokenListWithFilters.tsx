import React, { useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "query-string";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import { flatten } from "lodash";

import { Mixpanel, MixpanelEvents } from "../../../analytics/Mixpanel";
import { CrossIcon, RightIcon } from "../../../components/atoms/svg";
import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { useWindowSize } from "../../../services/hooks";

import API from "../../../services/API";
import ActiveFilterAvatar from "../../atoms/Avatar/ActiveFilterAvatar";
import DiscoverLayout from "../../molecules/AppLayout/DiscoverLayout";
import TokenGrid from "modules/TokenGrid/TokenGrid";
import { useGetExplore } from "../../../state/nfts/hooks";

const SelectedFilterWrapper = styled(Text)`
  margin-right: 10px;
  display: inline-block;
  background: ${(p) => p.theme.colors.bg2};
  color: ${(p) => p.theme.colors.text};
  svg {
    height: 9px;
    cursor: pointer;
  }

  padding: 5px 10px;
  border: 1px solid ${(p) => p.theme.colors.text};
  border-radius: 12px;

  // min-width: ${(p) => p.width}px;
`

const ClearFilter = styled(Text)`
  display: inline-block;
  color: ${(p) => p.theme.colors.text};
  margin-right: 10px;
  border-bottom: 1px solid ${(p) => p.theme.colors.text};
  position: relative;
  top: 7px;
`

const ActiveFiltersWrapper = styled(Box)`
  white-space: nowrap;
  overflow: auto;
  padding-bottom: 15px;

  svg {
    width: 8px;
    height: 8px;
    margin-left: 5px;
  }
  .next-icon {
    position: sticky;
    right: -2px;
    top: 11px;
    width: 10%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(239, 238, 234, 1) 60%);
    display: inline-block;
    text-align: end;

    svg {
      width: 15px;
      height: 15px;
    }
  }

  ${(p) => p.theme.media.md} {
    .next-icon {
      display: none;
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

const TokenListWithFilters = ({
  fetchData,
  type,
  getTokenOptionsList,
  askRefresh,
  customSorts = {},
  defaultSort,
  defaultSelectedSort,
  tabsList = [],
  ...props
}: any) => {
  const [parsingUrl, setParsingUrl] = useState(true)
  const [selectedSort, setSelectedSort] = useState(defaultSelectedSort || 'Date Listed: Newest')
  const [selectedNftState, setSelectedNftState] = useState([])
  const [selectedNftMarket, setSelectedNftMarket] = useState([])
  const [customFilters, setCustomFilters] = useState({})
  const [customFiltersSearch, setCustomFiltersSearch] = useState({})
  const [selectedNftBadge, setSelectedNftBadge] = useState([])
  const [selectedAuctionState, setSelectedAuctionState] = useState([])
  const [activeFiltersList, setActiveFiltersList] = useState([])
  const [filtersValuesKeys, setFiltersValuesKeys] = useState({})
  const [selectedCollectionState, setSelectedCollectionState] = useState([])
  const [gridCount, setGridCount] = useState(4)
  const [collectionsSearch, setCollectionsSearch] = useState('')
  const followings = useSelector((state: any) => state.profile.followings)
  const ActveFilterRefer = useRef(null)
  const size = useWindowSize()
  const [sort, setSort] = useState(
    defaultSort || {
      name: 'recent',
      order: 'desc',
    },
  )

  const router = useRouter()
  const { asPath, pathname, isReady } = useRouter()
  const search = asPath?.replace(pathname, '')
  const { hide, customFiltersList = [] } = props
  const { names, actions: customSortActions = [] } = customSorts || {}

  const SORT_NAMES = useMemo(
    () => ({
      'recent-desc': 'Date Listed: Newest',
      'recent-asc': 'Date Listed: Oldest',
      'sold-desc': 'Date Sold: Newest',
      'sold-asc': 'Date Sold: Oldest',
      'price-asc': 'Price: Lowest',
      'price-desc': 'Price: Highest',
      'auction_time-asc': 'Auction Ending Soon',
      ...names,
    }),
    [names],
  )

  const { isLoading, tokenList, totalResult, isFetching, hasNextPage, fetchNextPage, refetch } = useGetExplore(
    [type],
    ({ pageParam = 0 }) => fetchTokens(gridCount * 3, pageParam * gridCount * 3),
    {
      enabled: !parsingUrl && isReady && gridCount > 0,
      getNextPageParam: (lastPage, pages) => (lastPage?.data?.length === gridCount * 3 ? pages.length : undefined),
    },
  )

  useEffect(() => {
    if (!!askRefresh) {
      refetch()
    }
  }, [askRefresh, isReady])

  useEffect(() => {
    setParsingUrl(true)
    const parsed = queryString.parse(search, {
      arrayFormat: 'comma',
    })
    const { sort, nftState, market, auctionState, nftBadge, properties, collections }: any = parsed || {}
    if (sort) {
      const [name, order] = sort.split('-')
      setSort({ name, order })
      setSelectedSort(SORT_NAMES[sort])
    }


    if (nftState) {
      const nftData = Array.isArray(nftState) ? nftState : [nftState]
      setSelectedNftState(nftData)
    }

    if (collections) {
      const selectedCollectionState = Array.isArray(collections) ? collections : [collections]
      setSelectedCollectionState(selectedCollectionState)
    }

    if (nftBadge) {
      const badge = Array.isArray(nftBadge) ? nftBadge : [nftBadge]
      setSelectedNftBadge(badge)
    }

    if (market) {
      const marketState = Array.isArray(market) ? market : [market]
      setSelectedNftMarket(marketState)
    }

    if (auctionState) {
      const auctionData = Array.isArray(auctionState) ? auctionState : [auctionState]

      setSelectedAuctionState(auctionData)
    }

    if (properties) {
      setCustomFilters(JSON.parse(properties))
    }
    setParsingUrl(false)
  }, [])

  useEffect(() => {
    const _filtersValuesKeys = {
      selectedNftMarket: {
        PRIMARY: {
          key: 'PRIMARY',
          value: 'Primary',
          callback: 'onClickNftMarket',
        },
        SECONDARY: {
          key: 'SECONDARY',
          value: 'Secondary',
          callback: 'onClickNftMarket',
        },
      },
      selectedNftState: {
        BUY: { key: 'BUY', value: 'Buy now', callback: 'onClickNftState' },
        SOLD: { key: 'SOLD', value: 'Sold', callback: 'onClickNftState' },
        GENESIS: {
          key: 'GENESIS',
          value: 'Genesis NFTs',
          callback: 'onClickNftState',
        },
        // has_offers: {
        //   key: 'has_offers',
        //   value: 'Has offers',
        //   callback: 'onClickNftState',
        // },
        // has_splits: {
        //   key: 'has_splits',
        //   value: 'Has splits',
        //   callback: 'onClickNftState',
        // },
      },
      selectedAuctionState: {
        on_auction: {
          key: 'on_auction',
          value: 'On auction',
          callback: 'onClickAuctionState',
        },
        reserve_not_met: {
          key: 'reserve_not_met',
          value: 'Reserve not met',
          callback: 'onClickAuctionState',
        },
      },
      selectedNftBadge: {
        '1': { key: '1', value: '1K Badge', callback: 'onClickNftBadge' },
      },
      customFilters: {},
    }

    for (let i = 0; i < customFiltersList.length; i++) {
      let arr = []
      for (let j = 0; j < customFiltersList[i].values.length; j++) {
        arr = [
          ...arr,
          {
            key: customFiltersList[i].values[j],
            value: customFiltersList[i].values[j],
            callback: 'onClickCustomFilter',
            parent: customFiltersList[i].key,
          },
        ]
      }
      _filtersValuesKeys['customFilters'][customFiltersList[i].key] = arr
    }

    setFiltersValuesKeys(_filtersValuesKeys)
  }, [ customFiltersList.length])

  // --------------------------------------------------- Collection Filters Start ------------------------------------------
  const {
    isLoading: isCollectionsLoading,
    data: collectionsData = { pages: [] },
    isFetching: isCollectionFetching,
    hasNextPage: collectionsHasNextPage,
    fetchNextPage: collectionFetchNextPage,
    refetch: refetchCollections,
  } = useInfiniteQuery('collectionFilter', fetchCollections, {
    enabled: !parsingUrl,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length : undefined
    },
  })

  function fetchCollections({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * limit
    return API.fetchCollectionsforFilter(offset, limit, collectionsSearch, selectedCollectionState)
  }
  const { pages: collectionPages } = collectionsData || {}

  const collectionList = useMemo(() => flatten(collectionPages), [collectionPages])

  // --------------------------------------------------- Collection Filters End  --------------------------------------------

  const filters = [
    {
      name: 'sale_type',
      filter: selectedNftState,
    },
    {
      name: 'auction_status',
      filter: ['Auction Ending Soon'].includes(selectedSort) ? ['on_auction'] : selectedAuctionState,
    },
    {
      name: 'market',
      filter: selectedNftMarket,
    },
    {
      name: 'badge',
      filter: selectedNftBadge,
    },
    {
      name: 'collection',
      filter: selectedCollectionState,
    },
  ]

  async function fetchTokens(limit, offset) {
    return fetchData(offset, limit, sort, filters, customFilters)
  }

  function handleSort(title, name, order) {
    Mixpanel.track(MixpanelEvents.SORT_LISTING, {
      title,
      name,
      order,
      Section: type,
    })
    // if (name === "auction_time") {
    //   setSelectedAuctionState([]);
    //   setSelectedNftState([]);
    // }
    setSelectedSort(title)
    setSort({
      name,
      order,
    })
  }


  const onClickNftState = (state) => {
    if (selectedNftState.includes(state)) {
      setSelectedNftState(selectedNftState.filter((c) => c !== state))
    } else {
      setSelectedNftState([...selectedNftState, state])
    }

    if (['BUY', 'SOLD'].includes(state) && sort.name === 'auction_time') {
      setSort(
        defaultSort || {
          name: 'recent',
          order: 'desc',
        },
      )
      setSelectedSort(defaultSelectedSort || 'Date Listed: Newest')
    }
  }
  const onClickNftMarket = (state) => {
    if (selectedNftMarket.includes(state)) {
      setSelectedNftMarket(selectedNftMarket.filter((c) => c !== state))
      Mixpanel.track(MixpanelEvents.SELECTED_NFT_MARKET, {
        ...selectedNftMarket.filter((c) => c !== state),
      })
    } else {
      setSelectedNftMarket([...selectedNftMarket, state])
      Mixpanel.track(MixpanelEvents.SELECTED_NFT_MARKET, {
        ...[...selectedNftMarket, state],
      })
    }
  }
  const onClickNftBadge = (state) => {
    if (selectedNftBadge.includes(state)) {
      setSelectedNftBadge(selectedNftBadge.filter((c) => c !== state))
    } else {
      setSelectedNftBadge([...selectedNftBadge, state])
    }
  }
  const onClickAuctionState = (state) => {
    if (selectedAuctionState.includes(state)) {
      setSelectedAuctionState(selectedAuctionState.filter((c) => c !== state))
    } else {
      setSelectedAuctionState([...selectedAuctionState, state])
    }
  }

  const onClickCollectionState = (state) => {
    if (selectedCollectionState.includes(state)) {
      setSelectedCollectionState(selectedCollectionState.filter((c) => c !== state))
    } else {
      setSelectedCollectionState([...selectedCollectionState, state])
    }
  }

  const onClickCustomFilter = (key, value) => {
    if (customFilters[key]?.includes(value)) {
      const updateList = customFilters[key].filter((v) => v != value)
      let customFiltersCopy = { ...customFilters }

      if (!updateList.length) {
        delete customFiltersCopy[key]
      } else {
        customFiltersCopy = {
          ...customFiltersCopy,
          [key]: updateList,
        }
      }
      setCustomFilters(customFiltersCopy)
    } else {
      setCustomFilters({
        ...customFilters,
        [key]: [...(customFilters[key] ? customFilters[key] : []), value],
      })
    }
  }

  function onChangeSearch(e, key) {
    setCustomFiltersSearch({
      ...customFiltersSearch,
      [key]: e.target.value,
    })
  }

  function onClickClear() {
    setSelectedNftState([])
    setSelectedNftMarket([])
    setSelectedNftBadge([])
    setSelectedAuctionState([])
    setCustomFilters({})
    setSelectedCollectionState([])
  }
  const handleActiveFiltersList = () => {
    let result = []
    for (let i = 0; i < selectedNftMarket.length; i++) {
      result.push(filtersValuesKeys['selectedNftMarket'][selectedNftMarket[i]])
      result[result.length - 1].from = 'NFT State'
    }

    for (let i = 0; i < selectedAuctionState.length; i++) {
      result.push(filtersValuesKeys['selectedAuctionState'][selectedAuctionState[i]])
      result[result.length - 1].from = 'NFT State'
    }

    for (let i = 0; i < selectedNftState.length; i++) {
      result.push(filtersValuesKeys['selectedNftState'][selectedNftState[i]])
      result[result.length - 1].from = 'NFT State'
    }


    for (let i = 0; i < collectionList.length; i++)
      if (selectedCollectionState.includes(collectionList[i].username)) {
        result.push({
          key: collectionList[i].username,
          value: collectionList[i].name,
          callback: 'onClickCollectionState',
          avatar: collectionList[i].profileImage,
          from: 'Collections',
        })
      }

    for (const property in customFilters) {
      customFilters[property].map((item) => {
        if (filtersValuesKeys['customFilters'][property]) {
          result.push(filtersValuesKeys['customFilters'][property]?.find((p) => p.key === item))
        }
      })
    }


    setActiveFiltersList(result)
  }

  function handleFilters() {
    let parsed = queryString.parse(decodeURIComponent(search))

    if (sort) {
      parsed.sort = [`${sort.name}-${sort.order}`]
    } else {
      delete parsed.sort
    }
    if (!!selectedNftMarket.length) {
      parsed.market = selectedNftMarket
    } else {
      delete parsed.market
    }
    if (!!selectedNftState.length) {
      parsed.nftState = selectedNftState
    } else {
      delete parsed.nftState
    }
    if (!!selectedNftBadge.length) {
      parsed.nftBadge = selectedNftBadge
    } else {
      delete parsed.nftBadge
    }
    if (!!selectedAuctionState.length) {
      parsed.auctionState = selectedAuctionState
    } else {
      delete parsed.auctionState
    }

    if (!!selectedCollectionState.length) {
      parsed.collections = selectedCollectionState
    } else {
      delete parsed.collections
    }

    if (!!Object.keys(customFilters)?.length) {
      let arr = []
      for (const property in customFilters) {
        arr.push(JSON.stringify({ [property]: customFilters[property] }))
      }
      parsed.properties = arr
    } else {
      delete parsed.properties
    }
    const stringify = queryString.stringify(parsed, { arrayFormat: 'comma' })
    const encoded = encodeURIComponent(stringify)
    let _parsed = decodeURIComponent(stringify)
    // if (router.isReady) {
    //   if (router?.query?.username) {
    //     if (!_parsed.includes('?')) _parsed = _parsed.replace('&', '?')
    //     router.replace(`${_parsed}`, undefined, { shallow: true })
    //   } else {
    //     router.replace(`?${_parsed}`, undefined, { shallow: true })
    //   }
    // }
  }

  // useEffect(() => {
  //   if (!parsingUrl && isReady) {
  //     refetch()
  //   }
  // }, [search, parsingUrl, isReady])

  useEffect(() => {
    handleFilters()
    handleActiveFiltersList()
  }, [
    sort,
    selectedNftState,
    selectedAuctionState,
    selectedNftMarket,
    selectedNftBadge,
    customFilters,
    selectedCollectionState,
    collectionList.length,
  ])

  useEffect(() => {
    refetchCollections()
  }, [collectionsSearch])

  useEffect(() => {
    if (filtersValuesKeys['customFilters'] && !!Object.keys(filtersValuesKeys['customFilters'])?.length) {
      handleActiveFiltersList()
    }
  }, [filtersValuesKeys])

  const combineMethods = (state) => {
    const { callback, key, parent } = state
    switch (callback) {
      case 'onClickNftState':
        return onClickNftState(key)
      case 'onClickNftMarket':
        return onClickNftMarket(key)
      case 'onClickNftBadge':
        return onClickNftBadge(key)
      case 'onClickAuctionState':
        return onClickAuctionState(key)
      case 'onClickCustomFilter':
        return onClickCustomFilter(parent, key)
      case 'onClickCollectionState':
        return onClickCollectionState(key)
    }
  }

  function scrollToRight() {
    if (ActveFilterRefer?.current) {
      const width = ActveFilterRefer?.current?.scrollWidth
      ActveFilterRefer.current.scrollTo({
        left: width,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (props.validateFeedPage)
      props.validateFeedPage(
        isLoading,
        isFetching,
        activeFiltersList.length,
        sort.name,
        tokenList.length,
        followings.length,
      )
  }, [isLoading, isFetching, activeFiltersList, sort, tokenList, followings])

  return (
    !hide && (
      <DiscoverLayout
        filterList={
          [
            //   {
            //     title: 'NFT State',
            //     render: () => (
            //       <FiltersTemplate
            //         pillList={[
            //           {
            //             name: 'Buy now',
            //             onClick: () => onClickNftState('BUY'),
            //             active: selectedNftState.includes('BUY'),
            //           },
            //           {
            //             name: 'On auction',
            //             onClick: () => onClickAuctionState('on_auction'),
            //             active: selectedAuctionState.includes('on_auction'),
            //           },
            //           // {
            //           //   name: "Reserve not met",
            //           //   onClick: () => onClickAuctionState("reserve_not_met"),
            //           //   active: selectedAuctionState.includes("reserve_not_met"),
            //           // },
            //           {
            //             name: 'Sold',
            //             onClick: () => onClickNftState('SOLD'),
            //             active: selectedNftState.includes('SOLD'),
            //           },
            //           ...(!['created', 'splits', 'external-collection'].includes(type)
            //             ? [
            //                 {
            //                   name: 'Genesis NFTs',
            //                   onClick: () => onClickNftState('GENESIS'),
            //                   active: selectedNftState.includes('GENESIS'),
            //                 },
            //               ]
            //             : []),
            //           {
            //             name: 'Has offers',
            //             onClick: () => onClickNftState('has_offers'),
            //             active: selectedNftState.includes('has_offers'),
            //           },
            //           ...(!['external-collection'].includes(type)
            //             ? [
            //                 {
            //                   name: 'Has splits',
            //                   onClick: () => onClickNftState('has_splits'),
            //                   active: selectedNftState.includes('has_splits'),
            //                 },
            //               ]
            //             : []),
            //         ]}
            //       />
            //     ),
            //   },
            //   {
            //     title: 'Categories',
            //     render: () => (
            //       <div>
            //         <FiltersTemplate
            //           pillList={[
            //             {
            //               name: '1K Badge',
            //               onClick: () => onClickNftBadge('1'),
            //               active: selectedNftBadge.includes('1'),
            //             },
            //             ...categories.map((category) => ({
            //               name: category.description,
            //               id: category.id,
            //               onClick: () => onClickCategory(category.id),
            //               active: selectedCategories.includes(category.id),
            //             })),
            //           ]}
            //         />
            //       </div>
            //     ),
            //   },
            //   ...(!['external-collection', 'collections'].includes(type)
            //     ? [
            //         {
            //           title: 'Collections',
            //           render: () => (
            //             <CollectionFilterTemplate
            //               isCollectionsLoading={isCollectionsLoading}
            //               isCollectionFetching={isCollectionFetching}
            //               collectionsHasNextPage={collectionsHasNextPage}
            //               collectionFetchNextPage={collectionFetchNextPage}
            //               setCollectionsSearch={(value) => setCollectionsSearch(value)}
            //               collectionsFilter={collectionList}
            //               selectedCollectionState={selectedCollectionState}
            //               onClickCollectionState={onClickCollectionState}
            //             />
            //           ),
            //         },
            //       ]
            //     : []),
            //   ...customFiltersList.map((cf) => {
            //     return {
            //       title: <FilterTitle title={startCase(cf.key)}>{startCase(cf.key)}</FilterTitle>,
            //       render: () => (
            //         <div>
            //           {cf.values.length > 5 && (
            //             <StyledSearch>
            //               <Input type="text" placeholder="Search" onChange={(e) => onChangeSearch(e, cf.key)} />
            //             </StyledSearch>
            //           )}
            //           <FiltersTemplate
            //             pillList={cf.values
            //               .filter((item) => !customFiltersSearch[cf.key] || item.indexOf(customFiltersSearch[cf.key]) >= 0)
            //               .map((item) => ({
            //                 name: startCase(item),
            //                 onClick: () => onClickCustomFilter(cf.key, item),
            //                 active: customFilters[cf.key]?.includes(item),
            //               }))}
            //           />
            //         </div>
            //       ),
            //       extra: <Text fontSize={'14px'}>{cf.values.length}</Text>,
            //     }
            //   }),
          ]
        }
        sortOptionList={
          [
            // ...customSortActions?.map(({ title, params }) => ({
            //   title,
            //   onClick: () => handleSort(params[0], params[1], params[2]),
            // })),
            // ...(!['collected', 'created', 'splits'].includes(type)
            //   ? [
            //       {
            //         title: 'Date Listed: Newest',
            //         onClick: () => handleSort('Date Listed: Newest', 'recent', 'desc'),
            //       },
            //       {
            //         title: 'Date Listed: Oldest',
            //         onClick: () => handleSort('Date Listed: Oldest', 'recent', 'asc'),
            //       },
            //     ]
            //   : []),
            // {
            //   title: 'Price: Highest',
            //   onClick: () => handleSort('Price: Highest', 'price', 'desc'),
            // },
            // {
            //   title: 'Price: Lowest',
            //   onClick: () => handleSort('Price: Lowest', 'price', 'asc'),
            // },
            // ...(type !== 'collected'
            //   ? [
            //       {
            //         title: 'Date Sold: Newest',
            //         onClick: () => handleSort('Date Sold: Newest', 'sold', 'desc'),
            //       },
            //       {
            //         title: 'Date Sold: Oldest',
            //         onClick: () => handleSort('Date Sold: Oldest', 'sold', 'asc'),
            //       },
            //     ]
            //   : []),
            // {
            //   title: 'Auction Ending Soon',
            //   onClick: () => handleSort('Auction Ending Soon', 'auction_time', 'asc'),
            //   ...(!!intersection(['BUY', 'SOLD'], selectedNftState).length && {
            //     customComponent: () => (
            //       <Popover
            //         content={() => (
            //           <div style={{ padding: '10px' }}>
            //             This sort cannot be combined <br /> with buy/sold filter
            //           </div>
            //         )}
            //         placement="topLeft"
            //       >
            //         Auction Ending Soon
            //       </Popover>
            //     ),
            //   }),
            //   disabled: !!intersection(['BUY', 'SOLD'], selectedNftState).length,
            // },
            // {
            //   title: "Ending: Latest",
            //   onClick: () => handleSort("Ending: Latest", "auction_time", "desc"),
            // },
            // {
            //   title: "Recently Added",
            //   onClick: () => handleSort("Recently Added", "recent", "desc"),
            // },
            // {
            //   title: "Price: Low to High",
            //   onClick: () => handleSort("Price: Low to High", "price", "asc"),
            // },
            // {
            //   title: "Price: High to Low",
            //   onClick: () => handleSort("Price: High to Low", "price", "desc"),
            // },
            // {
            //   title: "Most Viewed",
            //   onClick: () => handleSort("Most Viewed", "view", "desc"),
            // },
            // {
            //   title: "Recently Sold",
            //   onClick: () => handleSort("Recently Sold", "sold", "desc"),
            // },
            // {
            //   title: "Auction Ending Soon",
            //   onClick: () =>
            //     handleSort("Auction Ending Soon", "auction_time", "asc"),
            // },
          ]
        }
        selectedSort={selectedSort}
        listCount={`Found (${totalResult || 0} results)`}
        activeFiltersListCount={activeFiltersList?.length}
        onClickClear={onClickClear}
        tabsList={tabsList}
      >
        <SelectedFilterContainer>
          {!!activeFiltersList.length && (
            <ActiveFiltersWrapper ref={ActveFilterRefer}>
              <ClearFilter onClick={() => onClickClear()} className="clear-button" fontSize={['10px', '10px', '14px']}>
                Clear Filter
              </ClearFilter>
              {activeFiltersList.map((value) => (
                <SelectedFilterWrapper fontSize={['10px', '10px', '14px']}>
                  <Flex>
                    <div>
                      <Flex justifyContent="space-between">
                        <Text fontSize={'10px'} mr={2} mb={1} lineHeight={1}>
                          {value.from}{' '}
                        </Text>
                      </Flex>
                      <Text fontWeight={600} fontSize="12px" lineHeight={1}>
                        {value.avatar && <ActiveFilterAvatar avatarImage={value.avatar} />} {value.value}
                      </Text>
                    </div>
                    <Flex ml={2} alignItems="center">
                      <CrossIcon onClick={() => combineMethods(value)} />
                    </Flex>
                  </Flex>
                </SelectedFilterWrapper>
              ))}
              {ActveFilterRefer?.current?.scrollWidth > size?.width && (
                <div className="next-icon" onClick={scrollToRight}>
                  <RightIcon />
                </div>
              )}
            </ActiveFiltersWrapper>
          )}
        </SelectedFilterContainer>
        <InfiniteScroll dataLength={tokenList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
          <TokenGrid
            tokenList={tokenList}
            isFetching={isFetching}
            loadMore={{
              disabled: true,
              onClick: fetchNextPage,
            }}
            getTokenOptionsList={getTokenOptionsList}
            setGridCount={setGridCount}
            type={type}
          />
        </InfiniteScroll>
      </DiscoverLayout>
    )
  )
}

const StyledSearch = styled(Box)`
  input {
    padding: 10px 20px !important;
  }
`
const FilterTitle = styled(Text)`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 85%;
`

export default TokenListWithFilters
