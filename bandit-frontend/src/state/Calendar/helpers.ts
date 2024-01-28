import { getCalendar } from "./source";

export const getCalendarData = async (offset, limit) => {
  try {
    const res = await getCalendar(offset, limit)
    return res
  } catch (error) {
    console.error('Failed to fetch calendar data', error)
    return []
  }
}
export const getTopCalendarData = async () => {
  try {
    const res = await getCalendar(0, 10)
    return res
  } catch (error) {
    console.error('Failed to fetch calendar data', error)
    return []
  }
}