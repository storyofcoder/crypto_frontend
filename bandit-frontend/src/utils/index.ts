import { ethers } from 'ethers'
import { NextRouter } from 'next/router'
import isEqual from 'lodash/isEqual'
import { Mixpanel, MixpanelEvents } from '../analytics/Mixpanel'
import { DECIMAL_FIX } from '../constant/values'

export const ISSERVER = typeof window === 'undefined'

const pagesWeNeedToTrackfromFbPixel = ['creators', 'marketplace', 'drop']

export const getHashFromRouter = (router: NextRouter) => router.asPath.match(/#([a-z0-9]+)/gi)

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function validateUserName(username) {
  const re = /^[a-zA-Z0-9]+$/
  return re.test(String(username).toLowerCase())
}

export const isValidAddress = (address) => {
  return ethers.utils.isAddress(address)
}

export const isAddressEqual = (add1, add2) => {
  if (isValidAddress(add1) && isValidAddress(add2)) {
    return isEqual(add1.toLowerCase(), add2.toLowerCase())
  }

  return false
}

export const truncateUsername = (username = '') => {
  if (isValidAddress(username)) {
    return truncateAddress(username, 5)
  }
  return username
}

export const truncateAddress = (address, digits) => {
  if (address) {
    return address.length > digits
      ? address.substr(0, digits - 1) + '...' + address.substr(address.length - (digits - 1), address.length - 1)
      : address
  } else {
    return ''
  }
}

export function capitalizeFirstLetter(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const shareOnFacebook = (title, url) => {
  Mixpanel.identify()
  Mixpanel.track(MixpanelEvents.SHARE_ON_FACEBOOK)

  var href = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`
  window.open(href, '_blank')
  return false
}

export const shareOntwitter = (title, url) => {
  Mixpanel.identify()
  Mixpanel.track(MixpanelEvents.SHARE_ON_TWITTER)

  var href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
  const TwitterWindow = window.open(href, '_blank')
  return false
}

export const isDefaultImage = (url = '') => {
  return url.includes('profile/default-profile.png')
}
export const convertToUsd = (price = 0, conversionRate) => {
  return (price * conversionRate).toFixed(2)
}

export const makeFriendlyNumber = (number) => {
  return new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number)
}

export const decimalFix = (number) => {
  return Number(number) / DECIMAL_FIX
}

export const isWarmUser = (userFbPages) => {
  for (var i = 0; i < pagesWeNeedToTrackfromFbPixel.length; i++) {
    if (userFbPages.indexOf(pagesWeNeedToTrackfromFbPixel[i]) == -1) {
      return false
    }
  }
  return true
}
export const pad = (number, width) => {
  const value = number + ''
  return value.length >= width ? value : new Array(width - value.length + 1).join('0') + value
}

export function roundToTwo(num) {
  return +(Math.round(Number(num + 'e+2')) + 'e-2')
}

export function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function stringifyErrorJson(obj) {
  return JSON.stringify(obj, Object.getOwnPropertyNames(obj))
}

export const getBlockExplorer = (chainId) => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV
  let url = 'https://etherscan.io/'
  switch (env) {
    case 'production':
    case 'staging':
      url = 'https://etherscan.io/'
      break
    default:
      url = 'https://rinkeby.etherscan.io/'
  }
  return url
}

export const getWebsiteRegex = () => {
  return /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
}

export const getImageUrl = (url: string, { height, quality }) => {
  return `${url}/height=${height},quality=${quality}`
}

export const clearAuthLocalStorage = () => {
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('walletAddress')
  window.localStorage.removeItem('CONNECTOR_ID')
  window.localStorage.removeItem('connectotTitle')
  window.localStorage.removeItem('connectorId')
  return true
}
