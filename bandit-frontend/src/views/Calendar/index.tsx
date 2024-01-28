import React, { useMemo } from 'react'
import { PageMeta } from '../../components/molecules/AppLayout/PageMeta'
import Page from '../../components/atomsV2/Page'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LargeRankingsTable, SmallRankingsTable } from '../Rankings/components/RankingsTable'
import { DurationSelection, RANKINGS_LOADING_DATA } from '../Rankings'
import useComponentMount from '../../hooks/useComponentMount'
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints'
import { Box } from 'components/atoms/StyledSystem'
import { useGetRankings } from '../../state/collections/hooks'
import { getRankings } from '../../state/collections/source'
import { useGetCalendar } from '../../state/Calendar/hooks'
import { getCalendarData } from '../../state/Calendar/helpers'
import { LargeCalendarTable, SmallCalendarTable } from './components/CalendarTable'

const CalendarView = () => {
  const { isMounted } = useComponentMount()

  const { isDesktop } = useMatchBreakpoints()

  const { calendarList, isFetching, hasNextPage, fetchNextPage, refetch, isFetchingNextPage } =
    useGetCalendar(fetchCalendar)

  async function fetchCalendar({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * limit
    return getCalendarData(offset, limit)
  }


  const data = useMemo(() => {
    let calendar = []

    calendar = calendarList.map(({ contract, name, profileImage, username, chainId }, index) => ({
      key: index + 1,
      mintPercentage: contract.mintPercentage,
      launchDate: contract.startDate,
      totalSupply: contract.maxMint,
      mintPrice: contract.price,
      name,
      username,
      profileImage,
      chainId,
      isLoading: false,
    }))
    if (isFetching) {
      calendar = [...calendar, ...RANKINGS_LOADING_DATA]
    }

    return calendar
  }, [calendarList.length, isFetching])

  return (
    <>
      <PageMeta data="Calendar" />
      <Page mt={30} scale="lg">
        <Box minHeight="60vh">
          {isMounted && (
            <>
              {isDesktop ? (
                <InfiniteScroll
                  dataLength={calendarList.length}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={null}
                >
                  <LargeCalendarTable data={data} />
                </InfiniteScroll>
              ) : (
                <InfiniteScroll
                  dataLength={calendarList.length}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={null}
                >
                  <SmallCalendarTable data={data} />
                </InfiniteScroll>
              )}
            </>
          )}
        </Box>
      </Page>
    </>
  )
}

export default CalendarView
