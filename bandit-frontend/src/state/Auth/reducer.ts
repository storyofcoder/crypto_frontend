import * as types from "./types";

const defaultState = {
  user: null,
  isLoggedIn: false,
  showConffeti: false,
  conversionRate: {
    USD: 1.2,
  },
  walletBalance: {
    WRX: 0,
    BNB: 0,
    WBNB: 0,
  },
  userFbPages: [],
  becomeCreatorForm: null,
  redirectCallback: null,
  walletModal: {
    open: false,
  },
  selectedWallet: undefined
}

export default function reducer(state = defaultState, action: any = {}) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.payload, isLoggedIn: true }
    case types.RESET_USER:
      return { ...state, user: null, isLoggedIn: false }
    case types.LOGOUT_USER:
      return { ...state, user: {}, isLoggedIn: false }
    case types.SHOW_CONFFETI:
      return { ...state, showConffeti: true }
    case types.HIDE_CONFFETI:
      return { ...state, showConffeti: false }
    case types.SET_WALLET_BALANCE:
      return { ...state, walletBalance: action.payload }
    case types.SET_USER_FB_PAGES:
      return { ...state, userFbPages: [...state.userFbPages, action.payload] }
    case types.SET_BECOME_CREATOR_FORM:
      return { ...state, becomeCreatorForm: action.payload }
    case types.SET_CONVERSION_RATE:
      return {
        ...state,
        conversionRate: {
          ...state.conversionRate,
          ...action.payload,
        },
      }
    case types.REDIRECT_CALLBACK:
      return { ...state, redirectCallback: action.payload }
    case types.SET_SELECTED_WALLET:
      return { ...state, selectedWallet: action.selectedWallet }
    case types.SET_WALLET_MODAL:
      return {
        ...state,
        walletModal: {
          ...action.payload,
        },
      }
    default:
      return state
  }
}
