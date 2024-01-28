import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConversionRate } from "../state/Auth/actions";

const FetchUsd = () => {
  const dispatch = useDispatch()

  async function getWrxPrice() {
    try {
      let res: any = await fetch('https://min-api.cryptocompare.com/data/price?fsym=WRX&tsyms=USD')
      res = await res.json()
      dispatch(setConversionRate({ USD: res.USD }))
    } catch (e) {
      console.log(e)
    }
  }
  async function getBNBPrice() {
    try {
      let res: any = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD')
      res = await res.json()
      dispatch(setConversionRate({ BNB_USD: res.USD }))
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getWrxPrice()
    getBNBPrice()
  }, [])
  return null
}

export default FetchUsd
