import { Cookies } from 'react-cookie'
import * as types from './types'
import API from '../../services/API'
import { notify } from '../../components/atoms/Notification/Notify'
import { Mixpanel, MixpanelEvents } from '../../analytics/Mixpanel'
import locale from '../../constant/locale'
import axios from 'axios'
import { INITIATED_CA } from '../../utils/storagekeys'
import { getProfile } from '../Profile/source'
import { SET_SELECTED_WALLET } from './types'
import { clearAuthLocalStorage } from 'utils'

const signIn = (walletAddress) => async (dispatch, getState) => {
  const {
    auth: { redirectCallback },
  } = getState()
  localStorage.setItem('walletAddress', walletAddress)
  try {
    const signinRes = await getProfile(walletAddress)
    const userDetails = {
      ...signinRes,
    }
    localStorage.setItem('user', JSON.stringify(userDetails))
    dispatch(setUser(userDetails))
    Mixpanel.track(MixpanelEvents.SIGN_IN, {
      walletAddress,
    })

    if (redirectCallback) {
      redirectCallback(userDetails)
    }
  } catch (e) {
    notify.error('Failed to signin', 'Please connect your wallet again')
  }
}

const initiateCheckCreatorAccess = async (address) => {
  const cookies = new Cookies()
  const hasInitiated = cookies.get(`${INITIATED_CA}_${address}`)
  const endPoint = locale.ADMIN_API_END_POINT
  let date: any = new Date()
  date.setTime(date.getTime() + 1440 * 60 * 1000)

  if (hasInitiated) return

  try {
    await axios.post(`${endPoint}/webhook`, {
      object: {
        className: 'checkCreatorAccess',
        address,
      },
    })

    cookies.set(`${INITIATED_CA}_${address}`, 'true', {
      path: '/',
      expires: date,
    })
  } catch (e) {
    console.log(e)
  }
}

const setUser = (payload) => (dispatch) => {
  localStorage.setItem('user', JSON.stringify(payload))
  dispatch({ type: types.SET_USER, payload })
}
const getUser = () => async (dispatch) => {
  // walletAddress, signature
  const signature = localStorage.getItem('signature')
  const wallet_address = localStorage.getItem('walletAddress')
  try {
    const user = await API.getProfile(wallet_address, signature)
    if (!user) {
      return clearAuthLocalStorage()
    }
    localStorage.setItem('user', JSON.stringify({ ...user, wallet_address, signature }))
    dispatch({
      type: types.SET_USER,
      payload: { ...user, wallet_address, signature },
    })
  } catch (e) {
    dispatch({ type: types.RESET_USER })
    localStorage.clear()
    notify.error('Failed to load your profile', 'Please connect your wallet again')
  }
}

const refreshUser = (wallet_address, signature) => async (dispatch) => {
  // walletAddress, signature
  // const signature = localStorage.getItem('signature')
  // const wallet_address = localStorage.getItem('walletAddress')
  try {
    const user = await API.getProfile(wallet_address, signature)
    if (!user) {
      return clearAuthLocalStorage()
    }
    localStorage.setItem('user', JSON.stringify({ ...user, wallet_address, signature }))
    dispatch({
      type: types.SET_USER,
      payload: { ...user, wallet_address, signature },
    })
  } catch (e) {}
}

const logoutUser = () => (dispatch) => {
  dispatch({ type: types.LOGOUT_USER })
  dispatch({ type: 'SET_FOLLOWERS', payload: [] })
  dispatch({ type: 'SET_FOLLOWINGS', payload: [] })
}
const showConffeti = () => (dispatch) => {
  dispatch({ type: types.SHOW_CONFFETI })
}
const setFbPages = (payload) => (dispatch) => {
  dispatch({ type: types.SET_USER_FB_PAGES, payload })
}
const hideConffeti = () => (dispatch) => {
  dispatch({ type: types.HIDE_CONFFETI })
}
const setConversionRate = (payload) => (dispatch) => {
  dispatch({ type: types.SET_CONVERSION_RATE, payload })
}
const setWalletBalance = (payload) => (dispatch) => {
  dispatch({ type: types.SET_WALLET_BALANCE, payload })
}

const setSelectedWallet = (selectedWallet) => async (dispatch) => {
  dispatch({ type: types.SET_SELECTED_WALLET, selectedWallet })
}
const setRedirectCallback = (callback) => async (dispatch) => {
  try {
    dispatch({ type: types.REDIRECT_CALLBACK, payload: callback })
  } catch (e) {
    console.log(e)
  }
}

const setWalletModal = (show, props) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_WALLET_MODAL,
      payload: {
        open: show,
        ...props,
      },
    })
  } catch (e) {
    console.log(e)
  }
}

export {
  signIn,
  refreshUser,
  setUser,
  logoutUser,
  hideConffeti,
  showConffeti,
  setConversionRate,
  setWalletBalance,
  getUser,
  setFbPages,
  setRedirectCallback,
  setWalletModal,
  setSelectedWallet,
}
