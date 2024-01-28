import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import queryString from "query-string";
import CustomAreaChart from "../../../../components/atoms/Charts/AreaChart";
import { Box, Flex, Text } from "../../../../components/atoms/StyledSystem";
import DiscoverLayout from "../../../../components/molecules/AppLayout/DiscoverLayout";
import FiltersTemplate from "../../../../components/molecules/Filters/FiltersTemplate";
import CustomSelect from "../../../../components/atoms/Form/Select";
import { useInfiniteQuery, useQuery } from "react-query";
import API from "../../../../services/API";
import moment from "moment";
import { flatten, map, startCase } from "lodash";
import { DownIcon, UpIcon, VerifiedIcon } from "../../../../components/atoms/svg";
import { getEventIcon } from "../../../../views/activity";
import { truncateUsername } from "../../../../utils";
import { useSelector } from "react-redux";
import { NextLinkFromReactRouter } from "../../../../components/atoms/NextLink";
import { useRouter } from "next/router";
import ActivityLayout from "components/molecules/AppLayout/ActivityLayout";

const CollectionActivity = ({ tabsList }) => {
  const columns = [
    {
      title: 'Events',
      dataIndex: 'event',
      key: 'event',
      width: 130,
      ellipsis: true,
      render: (text, record) => (
        <Flex alignItems="center">
          <Box mr="5px" opacity="0.7">
            {getEventIcon(record.event)}
          </Box>
          {record.event === 'buy' || record.event === 'winner' || record.event === 'offer'
            ? 'Sale'
            : startCase(record.event)}
        </Flex>
      ),
    },
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      ellipsis: true,
      width: '30%',
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/assets/${record.nft.contractAddress}/${record.nft.tokenId}`}>
          <TokenItem>
            <Box minWidth={40} height={40} width={40} className="image-wrapper">
              <img src={`${record.nft.thumbnail}?h=100&q=80`} />
            </Box>
            <Box>
              <Text
                ml={'5px'}
                mr={'5px'}
                fontWeight={400}
                fontSize={14}
                color="text"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {startCase(record?.collection?.name)} {record?.collection?.isVerified && <VerifiedIcon />}
              </Text>
              <Text
                ml={'5px'}
                mr={'5px'}
                fontWeight={400}
                fontSize={14}
                color="text"
                style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
              >
                {record.nft.name}
              </Text>
            </Box>
          </TokenItem>
        </NextLinkFromReactRouter>
      ),
    },
    // {
    //   title: "from",
    //   key: "from",
    //   render: (text, record) => (
    //     <Link to={`/${record.from}`}>{record.from}</Link>
    //   ),
    // },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      render: (text, record) => (
        <Box>
          {Number(record.PriceByUnit?.value) ? `${record.PriceByUnit?.value} ${record.PriceByUnit?.unit}` : '---'}
        </Box>
      ),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      ellipsis: true,
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/${record.from?.username}`} style={{ color: 'black' }}>
          {truncateUsername(record.from?.username ? record.from?.username : '---')}
        </NextLinkFromReactRouter>
      ),
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      ellipsis: true,
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/${record.to?.username}`} style={{ color: 'black' }}>
          {truncateUsername(record.to?.username ? record.to?.username : '---')}
        </NextLinkFromReactRouter>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      ellipsis: true,
    },
  ]
  const smallViewColumns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      ellipsis: true,
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/assets/${record.nft.contractAddress}/${record.nft.tokenId}`}>
          <TokenItem>
            <Box minWidth={40} height={40} width={40} className="image-wrapper">
              <img src={`${record.nft.thumbnail}?h=100&q=80`} />
            </Box>
            <Box>
              <Text
                ml={'5px'}
                mr={'5px'}
                fontWeight={400}
                fontSize={14}
                color="text"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {startCase(record?.collection?.name)} {record?.collection?.isVerified && <VerifiedIcon />}
              </Text>
              <Text
                ml={'5px'}
                mr={'5px'}
                fontWeight={400}
                fontSize={14}
                color="text"
                style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
              >
                {record.nft.name}
              </Text>
            </Box>
          </TokenItem>
        </NextLinkFromReactRouter>
      ),
    },
    // {
    //   title: "from",
    //   key: "from",
    //   render: (text, record) => (
    //     <Link to={`/${record.from}`}>{record.from}</Link>
    //   ),
    // },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      render: (text, record) => (
        <Flex flexDirection="column" alignItems="flex-end">
          <Text fontSize={'12px'}>
            {' '}
            {record.event === 'buy' || record.event === 'winner' || record.event === 'offer'
              ? 'Sale'
              : startCase(record.event)}
          </Text>
          <Text fontSize={'14px'}>
            {Number(record.PriceByUnit?.value) ? `${record.PriceByUnit?.value} ${record.PriceByUnit?.unit}` : '---'}
          </Text>
          <Text fontSize={'12px'}> {record.time}</Text>
        </Flex>
      ),
    },
  ]
  const [parsingUrl, setParsingUrl] = useState(true)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [duration, setDuration] = useState('90')

  const conversionRate = useSelector((state: any) => state.auth.conversionRate)
  const router = useRouter()
  const { asPath, pathname } = useRouter()
  const search = asPath?.replace(pathname, '')
  const { query } = router

  const {
    isLoading,
    error,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery('collection-activity', fetchCollectionActivity, {
    enabled: !parsingUrl,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.data.length === 10 ? pages.length : undefined),
  })

  const { data: activityStats, refetch: refetchChartData } = useQuery(
    'collection-activity-chart-data',
    fetchActivityChartData,
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )

  useEffect(() => {
    setParsingUrl(true)
    const parsed = queryString.parse(decodeURIComponent(search), {
      arrayFormat: 'comma',
    })
    const { status }: any = parsed || {}

    if (status) {
      const statusData = Array.isArray(status) ? status : [status]
      setSelectedTypes(statusData)
    }

    setParsingUrl(false)
  }, [])

  useEffect(() => {
    if (!parsingUrl) {
      handleFilters()
      refetch()
    }
  }, [selectedTypes])

  useEffect(() => {
    if (!parsingUrl) {
      refetchChartData()
    }
  }, [duration, selectedTypes])

  function fetchActivityChartData() {
    const filter = [
      {
        type: 'list',
        field: 'event',
        operator: 'contains',
        values: selectedTypes.length > 0 ? selectedTypes : ['list', 'bid', 'buy', 'transfer', 'offer_made'],
      },
      ...(duration !== 'all_time_volume'
        ? [
            {
              type: 'date',
              field: 'created_at',
              operator: 'in_the_last',
              unit: 'day',
              value: Number(duration),
            },
          ]
        : []),
      {
        type: 'list',
        field: 'collection',
        operator: 'contains',
        values: [query?.username],
      },
    ]
    return API.fetchActivityChartData(filter)
  }

  function fetchCollectionActivity({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * limit
    const filter = [
      {
        type: 'list',
        field: 'collection',
        operator: 'contains',
        values: [query?.username],
      },
      {
        type: 'list',
        field: 'event',
        operator: 'contains',
        values: selectedTypes.length > 0 ? selectedTypes : ['list', 'bid', 'buy', 'transfer', 'offer_made'],
      },
    ]

    return API.fetchCollectionActivity(limit, offset, filter)
  }

  function handleFilters() {
    let parsed = queryString.parse(decodeURIComponent(search))

    if (!!selectedTypes.length) {
      parsed.status = selectedTypes
    } else {
      delete parsed.status
    }
    const stringify = queryString.stringify(parsed, { arrayFormat: 'comma' })
    // const encoded = encodeURIComponent(stringify);
    router.replace({
      search: `?${stringify}`,
    })
  }

  function onClickNftState(state) {
    if (selectedTypes.includes(state)) {
      setSelectedTypes(selectedTypes.filter((c) => c !== state))
    } else {
      setSelectedTypes([...selectedTypes, state])
    }
  }

  const handleDurationChange = (value) => {
    setDuration(value)
  }

  const collectionsActivity = useMemo(() => flatten(map(data?.pages, 'data')), [data?.pages])

  const activityTableData = collectionsActivity.map(
    ({ event, collection, nft, from, to, price, createdAt, contractAddress, PriceByUnit }, index) => ({
      key: index + 1,
      event,
      collection,
      nft,
      from,
      to,
      price,
      PriceByUnit,
      contractAddress,
      time: moment.utc(createdAt).fromNow(),
    }),
  )

  function makeChartData(data) {
    if (!data) return []
    return data.map((item) => ({
      name: moment(item.start).format('MM/DD'),
      quantity: item.totalNft,
      avgPrice: Number(Number(item.AvgVolumeByUnit.value).toFixed(4)),
      volume: Number(Number(item.TotalVolumeByUnit.value).toFixed(4)),
      amt: 2400,
    }))
  }

  function getPriceTitle() {
    let prefix = `${duration} Day`
    const suffix = 'Avg. Price'
    if (duration === '365') {
      prefix = 'Yearlong'
    }
    if (duration === 'all_time_volume') {
      prefix = 'All Time'
    }

    return prefix + ' ' + suffix
  }
  function getVolumeTitle() {
    let prefix = `${duration} Day `
    const suffix = 'Volume'
    if (duration === '365') {
      prefix = 'Yearlong'
    }
    if (duration === 'all_time_volume') {
      prefix = 'All Time'
    }

    return prefix + ' ' + suffix
  }

  return (
    <Box>
      <DiscoverLayout
        showFrameView={false}
        filterList={[
          {
            title: 'Event Type',
            render: () => (
              <FiltersTemplate
                pillList={[
                  {
                    name: 'Listing',
                    onClick: () => onClickNftState('list'),
                    active: selectedTypes.includes('list'),
                  },
                  {
                    name: 'Sales',
                    onClick: () => onClickNftState('buy'),
                    active: selectedTypes.includes('buy'),
                  },
                  {
                    name: 'Bids',
                    onClick: () => onClickNftState('bid'),
                    active: selectedTypes.includes('bid'),
                  },
                  {
                    name: 'Transfers',
                    onClick: () => onClickNftState('transfer'),
                    active: selectedTypes.includes('transfer'),
                  },
                  {
                    name: 'Offers',
                    onClick: () => onClickNftState('offer_made'),
                    active: selectedTypes.includes('offer_made'),
                  },
                ]}
              />
            ),
          },
        ]}
        tabsList={tabsList}
      >
        <Flex flexDirection={['column', 'column', 'row']} mt={30}>
          <Box minWidth={[200, 200, 300]} marginRight="auto">
            <CustomSelect
              showSearch={false}
              allowClear={false}
              defaultValue={duration}
              optionList={[
                { key: 'Last 7 Days', value: '7' },
                { key: 'Last 14 Days', value: '14' },
                { key: 'Last 30 Days', value: '30' },
                { key: 'Last 60 Days', value: '60' },
                { key: 'Last 90 Days', value: '90' },
                { key: 'Last Year', value: '365' },
                { key: 'All Time', value: 'all_time_volume' },
              ]}
              onChange={handleDurationChange}
            />
          </Box>
          <Flex>
            <Box mr={20}>
              <StatsBox
                title={getPriceTitle()}
                subTitle={`${
                  activityStats?.data?.AvgVolumeByUnit?.value ? activityStats?.data?.AvgVolumeByUnit?.value : '0.00'
                } ${activityStats?.data?.AvgVolumeByUnit?.unit ? activityStats?.data?.AvgVolumeByUnit?.unit : 'BNB'}`}
              />
            </Box>
            <StatsBox
              title={getVolumeTitle()}
              subTitle={`${
                activityStats?.data?.TotalVolumeByUnit?.value ? activityStats?.data?.TotalVolumeByUnit?.value : '0.00'
              } ${activityStats?.data?.AvgVolumeByUnit?.unit ? activityStats?.data?.AvgVolumeByUnit?.unit : 'BNB'} `}
            />
          </Flex>
        </Flex>
        <Box height={400} width="100%" mb={50} marginTop={50}>
          <CustomAreaChart data={makeChartData(activityStats?.data?.Stats)} />
        </Box>
        <ActivityLayout 
            data={data}
            fetchNextPage={fetchNextPage}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
            columns={columns}
            smallViewColumns={smallViewColumns}
            expandable={{
              expandedRowRender: (record) => (
                <Flex justifyContent="space-between">
                  <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                    <Text fontSize={12}>From</Text>
                    <Text
                      fontSize={14}
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {' '}
                      <NextLinkFromReactRouter to={`/${record.from?.username}`} style={{ color: 'black' }}>
                        {truncateUsername(record.from?.username ? record.from?.username : '---')}
                      </NextLinkFromReactRouter>
                    </Text>
                  </Flex>
                  <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                    <Text fontSize={12}>To</Text>
                    <Text
                      fontSize={14}
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {' '}
                      <NextLinkFromReactRouter to={`/${record.to?.username}`} style={{ color: 'black' }}>
                        {truncateUsername(record.to?.username ? record.to?.username : '---')}
                      </NextLinkFromReactRouter>
                    </Text>
                  </Flex>
                </Flex>
              ),
              expandIcon: (props) => {
                return !props.expanded ? (
                  <span
                    onClick={(e) => {
                      // @ts-ignore
                      props.onExpand(props.record, e)
                    }}
                  >
                    <DownIcon />
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      // @ts-ignore
                      props.onExpand(props.record, e)
                    }}
                  >
                    <UpIcon />
                  </span>
                )
              },
            }} />
      </DiscoverLayout>
    </Box>
  )
}

const StatsBox = ({ title, subTitle }) => {
  return (
    <Box>
      <Text fontSize={[12, 12, 14]} fontWeight={500} color="text" opacity={0.6}>
        {title}
      </Text>
      <Text fontSize={[12, 12, 16]} fontWeight={700} color="text" opacity={0.6}>
        {subTitle}
      </Text>
    </Box>
  )
}

const TokenItem = styled.span`
  display: flex;
  align-items: center;
  .image-wrapper {
    border-radius: 10px;
    overflow-y: hidden;
    margin-right: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const MediaLarge = styled(Box)`
  display: none;
  transition: all 0.3s ease;
  ${(p) => p.theme.media.xlg} {
    display: flex;
    justify-content: flex-end;
  }

  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`
const MediaSmall = styled(Box)`
  display: flex;
  ${(p) => p.theme.media.xlg} {
    display: none;
  }
`

const StyledTable = styled.div`
  .ant-table,
  .ant-table-sticky-holder {
    background-color: transparent;
  }
  .ant-table-wrapper {
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-table-cell {
    border: none;
    background-color: transparent !important;
    color: ${(p) => p.theme.colors.text};
    font-weight: 700;
    font-size: 14px;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
  }

  .ant-table-row {
    &:hover {
      box-shadow: rgba(4, 7, 9, 0.25) 0px 0px 8px 0px;
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 400;
      font-size: 14px !important;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .ant-spin-dot {
    .ant-spin-dot-item {
      background-color: ${(p) => p.theme.colors.text};
    }
  }
`

export default CollectionActivity
