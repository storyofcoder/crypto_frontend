import { useInfiniteQuery, useQuery } from "../../hooks/useReactQuery";
import { CALENDAR, TOP_CALENDAR } from "../../constant/queryKeys";
import { flatten, map } from "lodash";
import { getTopRankingsData } from "../collections/helpers";
import { getTopCalendarData } from "./helpers";


export const useGetCalendar = (fetchData) => {
  const { data = { pages: [] }, ...rest } = useInfiniteQuery([CALENDAR], (props) => fetchData(props), {
    getNextPageParam: (lastPage, pages) => (lastPage?.length === 10 ? pages.length : undefined),
  })
  const { pages = [] } = data ?? {}

  const calendarList = flatten(map(pages))
  return { calendarList, ...rest }
}

export const useGetTopCalendar = (queryProps?: any) => {
  const { data, ...rest } = useQuery([TOP_CALENDAR], getTopCalendarData, {
    ...queryProps,
  })
  const calendarList = data ?? []
  return { calendarList, ...rest }
}
