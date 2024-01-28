import React from 'react'
import { startCase } from 'lodash'
import styled from 'styled-components'

import { NextLinkFromReactRouter } from 'components/atoms/NextLink'
import { Box, Flex, Text } from 'components/atoms/StyledSystem'
import { DownIcon, UpIcon, VerifiedIcon } from 'components/atoms/svg'
import { getEventIcon } from 'views/activity'
import { truncateUsername } from 'utils'

import ActivityLayout from 'components/molecules/AppLayout/ActivityLayout'
import { useInfiniteQuery } from 'react-query'
import API from 'services/API'
import { useRouter } from 'next/router'

const TokenItem = styled.span`
  display: flex;
  align-items: center;
  .image-wrapper {
    border-radius: 5px;
    overflow-y: hidden;
    margin-right: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export default function Bids({ token }) {
  const router = useRouter()

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
      title: 'USD Price',
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
      title: 'Floor Difference',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/${record.from?.username}`} style={{ color: 'black' }}>
          {truncateUsername(record.from?.username ? record.from?.username : '---')}
        </NextLinkFromReactRouter>
      ),
    },
    {
      title: 'Expiration',
      dataIndex: 'expiration',
      key: 'expiration',
      ellipsis: true,
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/${record.to?.username}`} style={{ color: 'black' }}>
          {truncateUsername(record.to?.username ? record.to?.username : '---')}
        </NextLinkFromReactRouter>
      ),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      ellipsis: true,
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/${record.to?.username}`} style={{ color: 'black' }}>
          {truncateUsername(record.to?.username ? record.to?.username : '---')}
        </NextLinkFromReactRouter>
      ),
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
                style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {record.nft.name}
              </Text>
            </Box>
          </TokenItem>
        </NextLinkFromReactRouter>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      render: (text, record) => (
        <Flex flexDirection="column" alignItems="flex-end">
          <Text fontSize={'12px'}>
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

  const {
    isLoading,
    error,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery('collections-activity', fetchBids, {
    enabled: router.isReady,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage?.data?.length === 10 ? pages.length : undefined),
  })

  function fetchBids({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * limit
    const filter = []

    return API.fetchCollectionActivity(limit, offset, filter)
  }

  return (
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
      }}
    />
  )
}
