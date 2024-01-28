import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import { hideConffeti } from "../../state/Auth/actions";

const CustomConfetti = () => {
  const showConffeti = useSelector((state: any) => state.auth.showConffeti)
  const dispatch = useDispatch()
  useEffect(() => {
    if (showConffeti) {
      setTimeout(() => {
        dispatch(hideConffeti())
      }, 10000)
    }
  }, [showConffeti])
  if (!showConffeti) return null

  return (
    // @ts-ignore
    <Confetti width={window.screen.width} height={window.screen.height} />
  )
}

export default CustomConfetti
