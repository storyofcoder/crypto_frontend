import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWOldContract, useWrappedBNBContract } from "./useContract";
import useActiveWeb3React from "./useActiveWeb3React";
import { setWalletBalance } from "../state/Auth/actions";
import { BNB, WRX } from "../constant/currencies";

// TODO the below logic has to be rewritten as hook
const useAccountDetails = () => {
  const [loaded, setLoaded] = useState(false)

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)

  const { account, library } = useActiveWeb3React()
  const wOldContract = useWOldContract()
  const wbnbContract = useWrappedBNBContract()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      setLoaded(false)
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (!!library && account && !loaded) {
      fetchbalance()
    }
  }, [library, isLoggedIn])

  async function fetchbalance() {
    const bnbBalance = await library.getBalance(account)
    let wrxBalance = await wOldContract.balanceOf(account)
    let wbnbBalance = await wbnbContract.balanceOf(account)
    setLoaded(true)
    wrxBalance = wrxBalance.toString()
    const payload = {
      WRX: Number(WRX.convert(parseInt(wrxBalance))),
      BNB: Number(BNB.convert(parseInt(bnbBalance))),
      WBNB: Number(BNB.convert(parseInt(wbnbBalance))),
    }
    dispatch(setWalletBalance(payload))
  }
  return { fetchbalance }
}

export default useAccountDetails
