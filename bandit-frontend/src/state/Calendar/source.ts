import axios from "axios";
import { API } from "../../constant/endpoints";

export const getCalendar = async ( offset, limit) => {
  try {
    const res = await axios.get(
      `${API}/collection/calendar?offset=${offset}&limit=${limit}`,
    )
    return res.data
  } catch (e) {
    throw new Error(e)
  }
}
