import * as types from "./types";

const defaultState = {
  showScrollToTop: false,
  // isSmallFrame: JSON.parse(localStorage.getItem("view-grid") || 'false'),
  // filterOpen: JSON.parse(localStorage.getItem("open-filter") || 'false'),
  isSmallFrame: false,
  filterOpen: false,
}

export default function reducer(state = defaultState, action: any = {}) {
  switch (action.type) {
    case types.SHOW_SCROLL_TO_TOP:
      return { ...state, showScrollToTop: true }
    case types.HIDE_SCROLL_TO_TOP:
      return { ...state, showScrollToTop: false }
    case types.TOGGLE_FILTER:
      localStorage.setItem('open-filter', JSON.stringify(!state.filterOpen))
      return { ...state, filterOpen: !state.filterOpen }
    case types.SET_CARD_DISPLAY_FRAME:
      localStorage.setItem('view-grid', action.payload.isSmall)
      return { ...state, isSmallFrame: action.payload.isSmall }
    default:
      return state
  }
}
