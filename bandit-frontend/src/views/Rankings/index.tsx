import React, { useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'

import { Box, Flex } from '../../components/atoms/StyledSystem'
import { PageMeta } from '../../components/molecules/AppLayout/PageMeta'
import { useGetRankings } from '../../state/collections/hooks'
import { getRankings } from '../../state/collections/source'
import { LargeRankingsTable, SmallRankingsTable } from './components/RankingsTable'
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints'
import { ButtonMenu, ButtonMenuItem } from '../../components/atomsV2/ButtonMenu'
import useComponentMount from '../../hooks/useComponentMount'
import Page from '../../components/atomsV2/Page'
import usePreviousValue from '../../hooks/usePreviousValue'

export const DURATION = [
  { key: '24H', value: 'one_day_volume' },
  { key: '7D', value: 'seven_day_volume' },
  { key: '30D', value: 'thirty_day_volume' },
  { key: 'All Time', value: 'all_time_volume' },
]

export const RANKINGS_LOADING_DATA = Array.from(Array(10).keys()).map((item) => ({
  isLoading: true,
  key: `bandit${item}`,
}))

const Rankings = () => {
  const [duration, setDuration] = useState(DURATION[0].value)
  const [durationChanging, setDurationChanging] = useState(false)

  const { isMounted } = useComponentMount()

  const { isDesktop } = useMatchBreakpoints()


  const { rankings, isFetching, hasNextPage, fetchNextPage, refetch, isFetchingNextPage } = useGetRankings(fetchRankings)

  async function fetchRankings({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * limit
    return getRankings(offset, limit, duration)
  }

  const handleDurationChange = (itemIndex) => {
    const _duration = DURATION.find((item, index) => index === itemIndex)
    setDurationChanging(true)
    setDuration(_duration.value)
  }

  useEffect(() => {
    refetch()
  }, [duration])

  useEffect(() => {
    if(!isFetching){
      setDurationChanging(false)
    }
  }, [isFetching])

  const data = useMemo(() => {
    let rankingList = []

    if (!durationChanging) {
      rankingList = rankings.map(({ collection, changes, statistics, isVerified }, index) => ({
        key: index + 1,
        volume: collection.statistics.volumeTraded,
        floorPrice: collection.statistics.floorPrice,
        owners: collection.statistics.owners,
        items: collection.statistics.items,
        collection,
        isVerified,
        dailyPercentage: changes.dailyPercentage,
        weekPercentage: changes.weekPercentage,
        isLoading: false,
      }))
    }

    if (isFetching) {
      rankingList = [...rankingList, ...RANKINGS_LOADING_DATA]
    }

    return rankingList
  }, [rankings, isFetching, isFetchingNextPage])

  return (
    <>
      <PageMeta data="Rankings" />
      <Page mt={30}>
        <Flex mb={20}>
          <Box>
            <DurationSelection isLoading={isFetching} handleDurationChange={handleDurationChange} duration={duration} />
          </Box>
        </Flex>
        <Box>
          {isMounted && (
            <>
              {isDesktop ? (
                <InfiniteScroll dataLength={rankings.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
                  <LargeRankingsTable data={data} />
                </InfiniteScroll>
              ) : (
                <InfiniteScroll dataLength={rankings.length} next={fetchNextPage} hasMore={!!hasNextPage} loader={null}>
                  <SmallRankingsTable data={data} />
                </InfiniteScroll>
              )}
            </>
          )}
        </Box>
      </Page>
    </>
  )
}

export const DurationSelection = ({ handleDurationChange, duration, isLoading }) => {
  return (
    <ButtonMenu
      activeIndex={DURATION.findIndex((item, index) => item.value === duration)}
      scale="xs"
      onItemClick={handleDurationChange}
      disabled={isLoading}
    >
      {DURATION.map(({ key, value }) => (
        <ButtonMenuItem key={value}>{key}</ButtonMenuItem>
      ))}
    </ButtonMenu>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  padding: 0 20px;
  ${(p) => p.theme.media.xlg} {
    padding: 0 40px;
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
    font-weight: 500;
    font-size: 14px;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
    padding: 16px;
  }

  .ant-table-row {
    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 500;
      font-size: 14px !important;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      font-size: 12px;
      font-weight: 600;
    }
  }

  .ant-spin-dot {
    .ant-spin-dot-item {
      background-color: ${(p) => p.theme.colors.text};
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
`
const MediaSmall = styled(Box)`
  display: flex;
  ${(p) => p.theme.media.xlg} {
    display: none;
  }
`

export default Rankings
