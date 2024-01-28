import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../atoms/Modal/Modal";

const DialogView = () => {
  const { open, Component, componentProps, callback, ...rest } = useSelector((state: any) => state.dialog)
  const dispatch = useDispatch()
  const onCancel = () => {
    dispatch(hide())
    if (callback) callback()
  }
  if (!open) return null
  return (
    <CustomModal onCancel={onCancel} visible={open} {...rest}>
      {Component && <Component {...componentProps} close={onCancel} />}
    </CustomModal>
  )
}

const initialState = {
  open: false,
}

function dialogReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'SHOW_DIALOG':
      return {
        ...state,
        open: true,
        ...action.payload,
      }
    case 'HIDE_DIALOG':
      return {
        open: false,
      }
    default:
      return state
  }
}

function show(props: any) {
  return { type: 'SHOW_DIALOG', payload: props }
}
function hide() {
  return { type: 'HIDE_DIALOG' }
}

const actions = {
  show,
  hide,
}

export const dialog = {
  dialogReducer,
  actions,
  DialogView,
}
