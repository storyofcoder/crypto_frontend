import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { capitalize } from 'lodash'
import { Table } from 'antd'
import moment from 'moment'

import { Box, Flex, Text } from '../../../../components/atoms/StyledSystem'
import { NextLinkFromReactRouter } from '../../../../components/atoms/NextLink'
import { DownIcon, UpIcon, VerifiedIcon } from '../../../../components/atoms/svg'
import { Mixpanel, MixpanelEvents } from '../../../../analytics/Mixpanel'
import { COLLECTION_1K } from '../../../../constant/badgesNames'
import { truncateUsername } from 'utils'
import { useNftActivity } from 'state/nfts/hooks'
import { getTokenActivity } from 'state/nfts/source'

import TokenIcon from 'components/atoms/svg/tokenIcon'
import { ActivityContainer, CollectionNameLink, MediaLarge, MediaSmall, StyledTable } from '../styles'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

const Rankings = () => {
  const [duration, setDuration] = useState(null)
  const [parsingUrl, setParsingUrl] = useState(true)

  const router = useRouter()
  const { id, contractAddress } = router.query

  useEffect(() => {
    setParsingUrl(true)
    const { sortBy }: any = router.query
    if (sortBy) {
      setDuration(sortBy)
    } else {
      setDuration('all')
    }
    setParsingUrl(false)
  }, [])

  const {
    list: rankingsList,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useNftActivity('ACTIVITY', fetchRankings, {
    enabled: !parsingUrl,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length >= 10 ? pages.length : undefined),
  })

  async function fetchRankings({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * limit
    return getTokenActivity(contractAddress, id, offset, limit)
  }

  useEffect(() => {
    if (!parsingUrl) {
      refetch()
    }
  }, [duration])

  const columns = [
    {
      title: 'Event',
      dataIndex: 'activity',
      key: 'activity',
      render: (activity) => (
        <Text fontWeight={400} fontSize={14} color="text">
          {activity ? capitalize(activity) : null}
        </Text>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Text fontWeight={400} fontSize={14} color="text">
          {price?.value} {price?.unit}
          {price?.value ? <TokenIcon className="fiat-icon" /> : '--'}
        </Text>
      ),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (from) => {
        const link = from?.walletAddress
        return (
          <NextLinkFromReactRouter to={link}>
            <CollectionNameLink>
              <Text fontWeight={400} fontSize={14} color="text">
                {truncateUsername(from?.username) || '--'}
              </Text>
              {from.isVerified && <VerifiedIcon />}
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (to) => {
        const link = to?.walletAddress
        return (
          <NextLinkFromReactRouter to={link}>
            <CollectionNameLink>
              <Text ml={'5px'} mr={'5px'} fontWeight={400} fontSize={14} color="text">
                {truncateUsername(to?.username) || '--'}
              </Text>
              {to.isVerified && <VerifiedIcon />}
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        <Text fontWeight={400} fontSize={14} color="text">
          {moment(createdAt).fromNow(true)} ago
        </Text>
      ),
    },
  ]
  const smallViewColumns = [
    {
      title: 'Event',
      dataIndex: 'activity',
      key: 'activity',
      ellipsis: true,
      render: (activity) => (
        <Text fontWeight={400} fontSize={14} color="text">
          {activity ? capitalize(activity) : null}
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      render: (createdAt) => (
        <Text fontWeight={400} fontSize={14} color="text">
          {moment(createdAt).fromNow(true)} ago
        </Text>
      ),
    },
  ]

  const data = rankingsList.map((value, index) => {
    return { ...value, key: index + 1 }
  })

  return (
    <>
      <ActivityContainer mt={16}>
        {/* <Flex mb={0}>
          <Box width={'100%'}>
            <CustomSelect
              key={duration}
              showSearch={false}
              allowClear={false}
              defaultValue={duration}
              onChange={handleDurationChange}
              optionList={[
                { key: 'All', value: 'all' },
                { key: 'Last 30 Days', value: 'thirty_day_volume' },
                { key: 'All Time', value: 'all_time_volume' },
              ]}
            />
          </Box>
        </Flex> */}
        <Box>
          <MediaLarge>
            <InfiniteScroll dataLength={rankingsList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
              <StyledTable>
                <Table
                  loading={isFetching}
                  pagination={false}
                  bordered={false}
                  columns={columns}
                  dataSource={data}
                  sticky
                  tableLayout={'fixed'}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        Mixpanel.track(MixpanelEvents.VIEW_COLLECTION_CLICK, {
                          from: 'rankings',
                          collectionUsername: record?.collection?.username,
                        })
                        if (record?.collection?.username === COLLECTION_1K) {
                          router.push(`/discover?nftBadge=1`)
                        } else {
                          router.push(`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[record?.collection?.chainId]}/${record?.collection?.username}`)
                        }
                      },
                    }
                  }}
                />
              </StyledTable>
            </InfiniteScroll>
          </MediaLarge>

          <MediaSmall>
            <InfiniteScroll dataLength={rankingsList.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
              <StyledTable>
                <Table
                  loading={isFetching}
                  pagination={false}
                  bordered={false}
                  columns={smallViewColumns}
                  dataSource={data}
                  sticky
                  tableLayout={'fixed'}
                  expandable={{
                    expandedRowRender: (record) => (
                      <Flex justifyContent="space-between" width="100%" overflow="auto" pb={'5px'}>
                        <Flex flexDirection="column" alignItems="center" textAlign="center">
                          <Text fontSize={10}>Price</Text>
                          <Text fontSize={12}>
                            {record?.price?.value} {record?.price?.unit}
                            {record?.price?.value ? <TokenIcon className="fiat-icon" /> : '--'}
                          </Text>
                        </Flex>
                        <Flex flexDirection="column" alignItems="center" textAlign="center">
                          <Text fontSize={10}>From</Text>
                          <Text
                            fontSize={12}
                            style={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <NextLinkFromReactRouter to={record?.from?.walletAddress}>
                              <CollectionNameLink>
                                <Text ml={'5px'} mr={'5px'} fontWeight={400} fontSize={14} color="text">
                                  {truncateUsername(record?.from?.username) || '--'}
                                </Text>
                                {record?.from?.isVerified && <VerifiedIcon />}
                              </CollectionNameLink>
                            </NextLinkFromReactRouter>
                          </Text>
                        </Flex>
                        <Flex flexDirection="column" alignItems="center" textAlign="center">
                          <Text fontSize={10}>To</Text>
                          <Text
                            fontSize={12}
                            style={{
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <NextLinkFromReactRouter to={record?.to?.walletAddress}>
                              <CollectionNameLink>
                                <Text ml={'5px'} mr={'5px'} fontWeight={400} fontSize={14} color="text">
                                  {truncateUsername(record?.to?.username) || '--'}
                                </Text>
                                {record?.to?.isVerified && <VerifiedIcon />}
                              </CollectionNameLink>
                            </NextLinkFromReactRouter>
                          </Text>
                        </Flex>
                      </Flex>
                    ),
                    expandIcon: (props) => {
                      return !props.expanded ? (
                        <DownIcon
                          height={15}
                          onClick={(e) => {
                            props.onExpand(props.record, e)
                          }}
                        />
                      ) : (
                        <UpIcon
                          height={15}
                          onClick={(e) => {
                            props.onExpand(props.record, e)
                          }}
                        />
                      )
                    },
                  }}
                />
              </StyledTable>
            </InfiniteScroll>
          </MediaSmall>
        </Box>
      </ActivityContainer>
    </>
  )
}

export default Rankings
