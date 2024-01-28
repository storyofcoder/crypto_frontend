import API from "../../services/API";
import * as types from "./types";

export var groupByTimePeriod = function (obj) {
  var objPeriod = {}
  for (var i = 0; i < obj.length; i++) {
    let key =
      new Date(obj[i].notification_date).toLocaleString('en-US', {
        month: 'long',
      }) +
      ' ' +
      new Date(obj[i].notification_date).getFullYear()
    objPeriod[key] = objPeriod[key] || []
    objPeriod[key].push(obj[i])
  }
  return objPeriod
}

export const getFollowers = (username) => async (dispatch) => {
  try {
    const list = await API.getUserFollowers(username)
    dispatch(setFollowers(list))
  } catch (e) {
    console.log(e)
  }
}

export const setFollowers = (list) => (dispatch) => {
  dispatch({
    type: types.SET_FOLLOWERS,
    payload: list,
  })
}

export const getFollowings = (username) => async (dispatch) => {
  try {
    const list = await API.getUserFollowings(username)
    dispatch({ type: types.SET_FOLLOWINGS, payload: list })
  } catch (e) {
    console.log(e)
  }
}

export const setFollowings = (list) => (dispatch) => {
  dispatch({
    type: types.SET_FOLLOWINGS,
    payload: list,
  })
}

export const followUser = (username, user) => async (dispatch, getState) => {
  const {
    profile: { followings },
  } = getState()
  try {
    dispatch(setFollowings([...followings, username]))
    await API.followUser(user.username, username, user.signature)
  } catch (e) {
    console.log(e)
  }
}

export const unfollowUser = (username, user) => async (dispatch, getState) => {
  const {
    profile: { followings },
  } = getState()
  try {
    dispatch(setFollowings(followings.filter((item) => item !== username)))
    await API.unFollowUser(user.username, username, user.signature)
  } catch (e) {
    console.log(e)
  }
}

export const setNotificationsList = (list) => async (dispatch) => {
  try {
    // dispatch(setNotificationLoading(true));
    // const list = await API.getNotification(username);
    var objPeriodMonth = groupByTimePeriod(list)
    dispatch(setNotificationList(list))
    // dispatch(setNotificationLoading(false));
    dispatch(setNotification(objPeriodMonth))
  } catch (e) {
    console.log(e)
  }
}

export const setSingleNotification = (notification) => (dispatch, getState) => {
  const {
    profile: { notificationsList },
  } = getState()
  var objPeriodMonth = groupByTimePeriod([
    notification,
    ...notificationsList.filter((item) => item.id !== notification.id),
  ])

  dispatch(setNotification(objPeriodMonth))
  dispatch(setSingleUnreadNotification(notification))
}
export const setSingleUnreadNotification = (notification) => (dispatch, getState) => {
  const {
    profile: { un_readnotifications },
  } = getState()
  var list = [notification, ...un_readnotifications.filter((item) => item.id !== notification.id)]
  dispatch(setNotificationUnRead(list))
}

export const setNotification = (list) => (dispatch) => {
  dispatch({
    type: types.SET_NOTIFICATIONS,
    payload: list,
  })
}
export const setNotificationList = (list) => (dispatch) => {
  dispatch({
    type: types.SET_NOTIFICATIONS_LIST,
    payload: list,
  })
}

export const getNotificationUnRead = (username, signature) => async (dispatch) => {
  try {
    const list = await API.getNotificationUnRead(username, signature)

    dispatch(setNotificationUnRead(list))
  } catch (e) {
    console.log(e)
  }
}

export const setNotificationUnRead = (list) => (dispatch) => {
  dispatch({
    type: types.SET_NOTIFICATIONS_UN_READ,
    payload: list,
  })
}

export const getNotificationCount = (username, signature) => async (dispatch) => {
  try {
    const list = await API.getNotificationCount(username, signature)
    dispatch(setNotificationCount(list))
  } catch (e) {
    console.log(e)
  }
}

export const setNotificationLoading = (value) => (dispatch) => {
  dispatch({
    type: types.SET_NOTIFICATIONS_LOADING,
    payload: value,
  })
}

export const setNotificationCount = (list) => (dispatch) => {
  dispatch({
    type: types.SET_NOTIFICATIONS_COUNT,
    payload: list,
  })
}
export const markNotificationsAsRead = () => (dispatch) => {
  dispatch({
    type: types.MARK_NOTIFICATIONS_AS_READ,
  })
}

export const updateProfileScroll = (value) => (dispatch) => {
  dispatch({
    type: types.PROFILE_SCROLL,
    payload: value,
  })
}
