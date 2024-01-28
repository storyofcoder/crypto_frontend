import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { simpleRpcProvider } from '../utils/providers'
import BigNumber from "bignumber.js";

const useBalance = (props) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const { chainId } = props

  useEffect(() => {
    const fetchBalance = async () => {
      if (chainId && simpleRpcProvider[chainId] && account) {
        const _balance = await simpleRpcProvider[chainId].getBalance(account)
        setBalance(_balance)
      }
    }

    fetchBalance()
  }, [chainId, account])

  return { balance }
}

export default useBalance
