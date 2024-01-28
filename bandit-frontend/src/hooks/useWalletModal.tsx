import React from "react";
import { useDispatch } from "react-redux";
import { setWalletModal } from "../state/Auth/actions";

const useWalletModal = () => {
  const dispatch = useDispatch()
  const onPresentConnectModal = (props?) => {
    dispatch(setWalletModal(true, { ...props }))
  }
  return { onPresentConnectModal }
}

export default useWalletModal
