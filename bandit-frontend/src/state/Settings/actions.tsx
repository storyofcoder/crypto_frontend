import * as types from "./types";

export const showScrollToTop = () => async (dispatch) => {
  dispatch({ type: types.SHOW_SCROLL_TO_TOP })
}
export const hideScrollToTop = () => async (dispatch) => {
  dispatch({ type: types.HIDE_SCROLL_TO_TOP })
}
export const toggleFilterOpen = () => async (dispatch) => {
  dispatch({ type: types.TOGGLE_FILTER })
}
export const setCardsDisplayFrame = (isSmallFrame) => async (dispatch) => {
  dispatch({
    type: types.SET_CARD_DISPLAY_FRAME,
    payload: isSmallFrame,
  })
}
