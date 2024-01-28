import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import { MODAL, showModal } from "./index";
import { notify } from "../../components/atoms/Notification/Notify";
import { useSelector } from "react-redux";
import { convertToUsd } from "../../utils";
import { useAuctionContract, useNftContract, useWOldContract } from "../../hooks/useContract";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { ethers } from "ethers";
import { callWithEstimateGas } from "../../utils/callWithGasEstimation";

const Bidding = ({ token, refreshTokenDetails, close }) => {
  const [bidValue, setBidValue] = useState<any>(0)
  const [balance, setBalance] = useState(0)
  const [minBid, setMinBid] = useState(0)
  const [loading, setLoading] = useState(false)
  const wOldContract = useWOldContract()
  const nftContract = useNftContract()
  const auctionContract = useAuctionContract()
  const { account } = useActiveWeb3React()
  const user = useSelector((state: any) => state.auth.user)
  const conversionRate = useSelector((state: any) => state.auth.conversionRate)

  function handleInput(e) {
    const re = /^\d*(\.\d{0,2})?$/
    if (e.target.value === '' || re.test(e.target.value)) {
      setBidValue(e.target.value)
    }
  }

  async function fetchWrxBalance() {
    let wrxBalance = await wOldContract.balanceOf(account)
    wrxBalance = wrxBalance.toString()
    setBalance(parseInt(wrxBalance) / 100000000)
  }

  useEffect(() => {
    fetchWrxBalance()
    const price = Number(token.price)
    if (token.auctionLive) {
      setMinBid(Number((price + price * 0.1).toFixed(2)))
    } else {
      setMinBid(price)
    }
  }, [])

  async function placeBid() {
    setLoading(true)
    let wrxBalance = await wOldContract.balanceOf(account)
    wrxBalance = wrxBalance.toString()

    const biddingValue = (bidValue * 100000000).toFixed()
    try {
      if (token.tokenOwnerAddress !== account) {
        if (parseInt(wrxBalance) >= parseInt(biddingValue)) {
          const encodedData = ethers.utils.defaultAbiCoder.encode(['uint256'], [token.id])
          const transaction = await callWithEstimateGas(wOldContract, 'approveAndCall', [
            auctionContract.address,
            biddingValue,
            encodedData,
          ])
          const receipt = await transaction.wait()

          await API.placeBid(token.id, biddingValue, user.username, user.signature)
          refreshTokenDetails()
          setLoading(false)
          close()
        } else {
          showModal(MODAL.NOT_ENOUGH_BALANCE, {})
          setLoading(false)
        }
      } else {
        setLoading(false)

        notify.error('Owner cannot place the bid', '')
      }
    } catch (e) {
      setLoading(false)
      notify.error('Something went wrong', e.response?.data?.data)
    }
  }
  const disable = bidValue > balance || bidValue < minBid
  return (
    <Box>
      <Text fontSize="largeMedium" fontWeight="600" textAlign="center" fontFamily="roc-grotesk">
        Place a bid
      </Text>
      <Text textAlign="center">
        you must bid at least <span>{minBid} WRX</span>
      </Text>
      <Flex flexDirection="column" alignItems="center" mt={20}>
        <input type="text" value={bidValue} onChange={handleInput} />
      </Flex>
      <Text textAlign="center" mt={'5px'}>
        {convertToUsd(bidValue, conversionRate.USD)} USD
      </Text>

      <Text textAlign="center" mt={20}>
        Balance <span>{balance} WRX</span>
      </Text>
      <Flex flexDirection="column" alignItems="center" mt={20}>
        <Button variant="secondary" onClick={placeBid} width={300} disabled={loading || disable}>
          {bidValue > balance
            ? 'You dont have enough balance'
            : bidValue < minBid
            ? `Your bid must be at least ${minBid} WRX`
            : loading
            ? 'Please wait...'
            : 'Place bid'}
        </Button>
      </Flex>
    </Box>
  )
}

export default Bidding
