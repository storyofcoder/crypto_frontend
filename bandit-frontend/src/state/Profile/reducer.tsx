import * as types from "./types";
import { groupByTimePeriod } from "./actions";

const defaultState = {
  followers: [],
  followings: [],
  notifications: {},
  notificationsList: [],
  un_readnotifications: [],
  notificationsLoading: false,
  notificationCount: {
    all_notif: 0,
    total_read: 0,
  },
  fixHeaderScroll: false,
}

export default function reducer(state = defaultState, action: any = {}) {
  switch (action.type) {
    case types.SET_FOLLOWERS:
      return { ...state, followers: action.payload }
    case types.SET_FOLLOWINGS:
      return { ...state, followings: action.payload }
    case types.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload }
    case types.SET_NOTIFICATIONS_LIST:
      return { ...state, notificationsList: action.payload }
    case types.SET_NOTIFICATIONS_UN_READ:
      return { ...state, un_readnotifications: action.payload }
    case types.MARK_NOTIFICATIONS_AS_READ:
      const updatedList = [...state.notificationsList].map((ele) => ({
        ...ele,
        is_read: true,
      }))
      return {
        ...state,
        notifications: groupByTimePeriod(updatedList),
        notificationsList: updatedList,
      }
    case types.SET_NOTIFICATIONS_COUNT:
      return { ...state, notificationCount: action.payload }
    case types.SET_NOTIFICATIONS_LOADING:
      return { ...state, notificationsLoading: action.payload }
    case types.PROFILE_SCROLL:
      return { ...state, fixHeaderScroll: action.payload }
    default:
      return state
  }
}
