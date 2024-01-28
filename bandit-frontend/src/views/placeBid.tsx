import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import API from "../services/API";
import { useSelector } from "react-redux";
import TokenCard from "../components/molecules/Token/TokenCard2";
import { convertToUsd, makeFriendlyNumber } from "../utils";
import Button from "../components/atoms/Button/Button";
import { MODAL, showModal } from "../modules/Modals";
import { notify } from "../components/atoms/Notification/Notify";
import TokenCardSkeleton from "../components/molecules/Token/skeletons/TokenCard";
import moment from "moment";
import { Spin } from "antd";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { ethers } from "ethers";
import { callWithEstimateGas } from "../utils/callWithGasEstimation";
import { useWOldContract } from "../hooks/useContract";
import useWebSocket from "../hooks/useWebSocket";
import { BackIcon } from "../components/atoms/svg";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import CollectorGuidelines from "../modules/Guidelines/CollectorGuidelines";
import useWalletSource from "../hooks/useWalletSource";
import { BNB, WRX } from "../constant/currencies";
import useDecideContract from "../hooks/useDecideContract";
import { useRouter } from "next/router";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";
import { useNftDetail } from "../state/nfts/hooks";

function round(number) {
  const twoDecimal = (number * 100).toFixed(3)
  if (Number(twoDecimal) > parseInt(String(twoDecimal))) {
    return (parseInt(String(twoDecimal)) + 1) / 100
  } else {
    return number.toFixed(2)
  }
}

const PlaceBid = () => {
  const conversionRate = useSelector((state: any) => state.auth.conversionRate)

  const { user, walletBalance } = useSelector((state: any) => state.auth)

  const [bidValue, setBidValue] = useState<any>(0)
  const [minBid, setMinBid] = useState<any>(0)
  const [loading, setLoading] = useState(false)
  const [bidPlaced, setBidPlaced] = useState(false)
  const [balance, setBalance] = useState<any>({})
  const [bidExist, setBidExist] = useState(false)

  const { account } = useActiveWeb3React()
  const wOldContract = useWOldContract()

  const { lastMessage } = useWebSocket()

  // const query: any = useParams();
  const router = useRouter()
  const { query } = router

  const walletSource = useWalletSource()

  const { nftDetail: token, isLoading, refetch: refetchTokenDetail } = useNftDetail(query.id, query.contractAddress)

  const { initDecideContract } = useDecideContract()
  const { auctionContract, isExternalContract } = initDecideContract(token?.contractAddress)

  useEffect(() => {
    checkUserBidStatus()
  }, [])

  useEffect(() => {
    if (isLoading) return

    // @ts-ignore
    const auctionEnded =
      // @ts-ignore
      moment.utc(token.auctionEndTime).toDate() - moment().toDate() <= 0

    if (token.saleType !== 'auction' || (auctionEnded && !!token.auctionEndTime)) return router.replace('/not-found')

    let fixDecimal = 2

    if (token?.unit === BNB.symbol) {
      fixDecimal = 4
    }

    setBidValue(Number(Number(token.minimumBid).toFixed(fixDecimal)))
    setMinBid(Number(Number(token.minimumBid).toFixed(fixDecimal)))
    // TODO: page error if you dont return anything hence returning token
    return token
  }, [token])

  useEffect(() => {
    setBalance(walletBalance)
  }, [walletBalance])

  useEffect(() => {
    if (!token) return
    Mixpanel.track(MixpanelEvents.PLACE_BID_PAGE_VIEW, {
      tokenOwnerAddress: token.tokenOwnerAddress,
      tokenId: token.id,
      username: user.username,
    })
  }, [token])

  useEffect(() => {
    const { token_id, method } = lastMessage || {}

    if (token_id && token_id === query.id && method === 'refresh') {
      setLoading(false)
      setBidPlaced(true)
      notify.success('Successfully placed the bid', '')
      refetchTokenDetail()
    }
  }, [lastMessage])

  function handleInput(e) {
    let re = /^\d*(\.\d{0,2})?$/

    if (token?.unit === BNB.symbol) {
      re = /^\d*(\.\d{0,4})?$/
    }

    Mixpanel.track(MixpanelEvents.PLACE_BID_INPUT_CHANGE, {
      tokenOwnerAddress: token.tokenOwnerAddress,
      tokenId: token.id,
      currency: token.unit,
      username: user.username,
      inputValue: e.target.value,
    })
    if (e.target.value === '' || re.test(e.target.value)) {
      setBidValue(e.target.value)
    }
  }

  function fetchTokenDetail() {
    return API.fetchNFT(query.id, query.contractAddress)
  }

  function goToTokenDetail() {
    router.push(`/assets/${token.contractAddress}/${token.id}`)
  }

  async function checkUserBidStatus() {
    try {
      const res = await API.checkUserBidStatus(query.id, user?.username)
      setBidExist(res.bidExist)
    } catch (e) {
      console.log(e)
    }
  }

  async function placeBid() {
    setLoading(true)

    let balanceValue = null
    let biddingValue = null
    if (token.unit === BNB.symbol) {
      biddingValue = BNB.decimalFix(bidValue)
      balanceValue = BNB.decimalFix(balance.BNB)
    } else {
      biddingValue = WRX.decimalFix(bidValue)
      balanceValue = WRX.decimalFix(balance.WRX)
    }
    //
    // const biddingValue = (bidValue * 100000000).toFixed();
    try {
      if (token.tokenOwnerAddress !== account) {
        if (parseInt(String(balanceValue)) >= parseInt(biddingValue)) {
          const tokenDetail = await fetchTokenDetail()
          Mixpanel.track(MixpanelEvents.PLACE_BID, {
            biddingValue,
            currency: token.unit,
            tokenOwnerAddress: token.tokenOwnerAddress,
            minimumBid: tokenDetail.minimumBid,
            tokenId: token.id,
            username: user.username,
          })

          if (tokenDetail.auctionEnded) {
            notify.error('Auction has ended', '')
            setLoading(false)
            Mixpanel.track(MixpanelEvents.PLACE_BID_FAILURE, {
              biddingValue,
              currency: token.unit,
              tokenOwnerAddress: token.tokenOwnerAddress,
              tokenId: token.id,
              username: user.username,
              reason: `Auction has ended`,
            })
            return
          }

          if (!(Number(bidValue) >= Number(tokenDetail.minimumBid))) {
            notify.warning(
              'Minimum bid updated',
              `The bid has been placed by another user for ${tokenDetail.price} WRX`,
            )
            refetchTokenDetail()
            setLoading(false)
            Mixpanel.track(MixpanelEvents.PLACE_BID_FAILURE, {
              biddingValue,
              currency: token.unit,
              tokenOwnerAddress: token.tokenOwnerAddress,
              tokenId: token.id,
              username: user.username,
              contractAddress: token.contractAddress,
              reason: `The bid has been placed by another user for ${tokenDetail.price} WRX`,
            })
            return
          }
          let transaction = null
          if (token.unit === WRX.symbol) {
            let types = ['uint256']
            let values = [token.id]

            if (isExternalContract) {
              types = ['uint256', 'address']
              values = [token.id, token.contractAddress]
            }

            const encodedData = ethers.utils.defaultAbiCoder.encode(types, values)
            transaction = await callWithEstimateGas(wOldContract, 'approveAndCall', [
              auctionContract.address,
              biddingValue,
              encodedData,
            ])
          } else if (token.unit === BNB.symbol) {
            let bnbArgs = [token.id, { value: biddingValue }]

            if (isExternalContract) {
              bnbArgs.splice(1, 0, token.contractAddress)
            }

            transaction = await auctionContract.placeBid(...bnbArgs)
          } else {
            return
          }

          const receipt = await transaction.wait()

          await API.placeBid(
            token.id,
            token.contractAddress,
            biddingValue,
            user.username,
            user.signature,
            walletSource,
            transaction.hash,
          )
          Mixpanel.track(MixpanelEvents.PLACE_BID_SUCCESS, {
            biddingValue,
            currency: token.unit,
            tokenOwnerAddress: token.tokenOwnerAddress,
            minimumBid: tokenDetail.minimumBid,
            tokenId: token.id,
            username: user.username,
            contractAddress: token.contractAddress,
          })
          if (!bidPlaced) {
            notify.success('Successfully placed the bid', '')
          }
          refetchTokenDetail()
          setLoading(false)
          setBidPlaced(true)
        } else {
          Mixpanel.track(MixpanelEvents.PLACE_BID_FAILURE, {
            biddingValue,
            currency: token.unit,
            tokenOwnerAddress: token.tokenOwnerAddress,
            tokenId: token.id,
            username: user.username,
            reason: 'NOT_ENOUGH_BALANCE',
            contractAddress: token.contractAddress,
          })
          showModal(MODAL.NOT_ENOUGH_BALANCE, {})
          setLoading(false)
        }
      } else {
        setLoading(false)
        Mixpanel.track(MixpanelEvents.PLACE_BID_FAILURE, {
          biddingValue,
          currency: token.unit,
          tokenOwnerAddress: token.tokenOwnerAddress,
          tokenId: token.id,
          username: user.username,
          reason: 'Owner cannot place the bid',
          contractAddress: token.contractAddress,
        })
        notify.error('Owner cannot place the bid', '')
      }
    } catch (e) {
      setLoading(false)
      refetchTokenDetail()
      Mixpanel.track(MixpanelEvents.PLACE_BID_FAILURE, {
        biddingValue,
        currency: token.unit,
        tokenOwnerAddress: token.tokenOwnerAddress,
        tokenId: token.id,
        username: user.username,
        reason: e.response?.data?.data,
        contractAddress: token.contractAddress,
      })
      notify.error('Something went wrong', e?.data?.message || e?.message)
    }
  }
  const disable =
    (token?.unit === WRX.symbol && Number(bidValue) > balance.WRX) ||
    (token?.unit === BNB.symbol && Number(bidValue) > balance.BNB) ||
    Number(bidValue) < Number(minBid) ||
    loading ||
    bidExist

  return (
    <Container>
      <PageMeta name={token?.metaData?.name} description={token?.metaData?.description} image={token?.metaData?.url} />
      <CollectorGuidelines proceedButtonCaption="Proceed to bid">
        <BiddingContainer>
          <div className="wrapper">
            {!bidPlaced ? (
              <>
                {!loading ? (
                  <Box alignSelf="center">
                    <span onClick={router.back} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                      <BackIcon />
                    </span>

                    <Text
                      fontSize={[40, 40, 60]}
                      fontWeight={600}
                      fontFamily="roc-grotesk"
                      lineHeight="100%"
                      color="textTertiary"
                      mb={20}
                    >
                      Place your bid
                    </Text>
                    <Box mb={30}>
                      <Text mb={'8px'} fontSize={'14px'}>
                        You must bid at least
                      </Text>
                      <Flex>
                        <Text fontSize={[22]} fontWeight={600} mb={'0px'} fontFamily="roc-grotesk" lineHeight="100%">
                          {minBid} {token?.unit}{' '}
                        </Text>
                        <Text fontSize={15} fontFamily="roc-grotesk" fontWeight={500} ml={10}>
                          {convertToUsd(
                            minBid,
                            token?.unit === WRX.symbol ? conversionRate.USD : conversionRate.BNB_USD,
                          )}{' '}
                          USD
                        </Text>
                      </Flex>
                    </Box>
                    <InputBalanceWrapper width="100%">
                      <Box className="input-wrapper">
                        <Input type="text" value={bidValue} onChange={handleInput} placeholder={0} />
                        <span>{token?.unit}</span>
                      </Box>
                      <Balance>
                        <Text mb={'8px'} fontSize={'14px'}>
                          Your Balance
                        </Text>
                        <Text fontSize={[22]} fontWeight={600} mb={'0px'} fontFamily="roc-grotesk" lineHeight="100%">
                          {token?.unit === BNB.symbol ? (
                            <>{makeFriendlyNumber(balance.BNB)} BNB</>
                          ) : (
                            <>{makeFriendlyNumber(balance.WRX)} WRX</>
                          )}
                        </Text>
                      </Balance>
                    </InputBalanceWrapper>
                    <Text
                      fontSize={15}
                      fontWeight={500}
                      fontFamily="roc-grotesk"
                      lineHeight="100%"
                      color="textTertiary"
                      mt={13}
                      opacity={0.6}
                    >
                      {' '}
                      {convertToUsd(
                        bidValue,
                        token?.unit === WRX.symbol ? conversionRate.USD : conversionRate.BNB_USD,
                      )}{' '}
                      USD
                    </Text>

                    <Text fontSize={14} fontWeight={500} lineHeight="160%" color="text" mt={30} opacity={0.6}>
                      {!token?.auctionLive && 'By placing this bid, you are initiating a 24-hour auction for the NFT.'}{' '}
                      A bid cannot be withdrawn once it is placed.
                    </Text>

                    <Flex alignItems="center" mt={15}>
                      <Button
                        variant="primary"
                        minWidth={300}
                        height={50}
                        disabled={disable}
                        onClick={!disable ? placeBid : () => {}}
                      >
                        {(token?.unit === 'WRX' && bidValue > balance.WRX) ||
                        (token?.unit === 'BNB' && bidValue > balance.BNB_USD)
                          ? "You don't have enough balance"
                          : Number(bidValue) < Number(minBid)
                          ? `Your bid must be at least ${minBid} ${token?.unit}`
                          : loading
                          ? 'Placing your bid...'
                          : 'Place bid'}
                      </Button>
                    </Flex>
                  </Box>
                ) : (
                  <Box alignSelf="center">
                    <Box mb={10}>
                      <Spin size="large" />
                    </Box>
                    <Text
                      fontSize={[30, 40, 60]}
                      fontWeight={600}
                      fontFamily="roc-grotesk"
                      lineHeight="100%"
                      color="textTertiary"
                      mb={20}
                    >
                      Waiting for Confirmation
                    </Text>
                    <Text>
                      Confirm the request that appeared just now. If you are unable to see a request, open your MetaMask
                      wallet.
                    </Text>
                  </Box>
                )}
              </>
            ) : (
              <Box alignSelf="center">
                <Text
                  fontSize={[30, 40, 60]}
                  fontWeight={600}
                  fontFamily="roc-grotesk"
                  lineHeight="100%"
                  color="textTertiary"
                  mb={20}
                >
                  Bid Placed Successfully
                </Text>
                <Button variant="primary" height={50} minWidth={250} onClick={goToTokenDetail}>
                  View your bid
                </Button>
              </Box>
            )}

            <Box>{isLoading ? <TokenCardSkeleton /> : <TokenCard token={token} />}</Box>
          </div>
        </BiddingContainer>
      </CollectorGuidelines>
    </Container>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 40px 20px 20px 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 40px 20px 20px 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 40px 20px 20px 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 40px 20px 20px 20px;
    width: 1040px;
    margin: 0 auto;
  }
`

const BiddingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  .wrapper {
    display: grid;

    gap: 86px;
    color: var(--text-primary);

    ${(p) => p.theme.media.lg} {
      grid-template-columns: 430px 312px;
    }
    ${(p) => p.theme.media.xlg} {
      grid-template-columns: 430px 312px;
    }
  }

  .input-wrapper {
    position: relative;
    width: 60%;
    ${(p) => p.theme.media.xs} {
      width: 100%;
    }
    span {
      position: absolute;
      top: 50%;
      right: 8%;
      transform: translateY(-50%);
      font-size: 16px;
      font-weight: 600;
      color: #929292;
    }
  }

  .ant-spin-dot-item {
    background-color: ${(p) => p.theme.colors.text};
  }
`

const Input = styled.input`
  font-size: 32px;
  border: 4px solid ${(p) => p.theme.colors.textTertiary};
  background-color: #fbfbf9;
  box-sizing: border-box;
  box-shadow: 0 5px 10px -2px #e7e5de;
  border-radius: 70px;
  padding: 10px 56px 6px 20px;
  font-weight: 600;
  outline: none;
  line-height: 100%;
  width: 100%;
  position: relative;

  &:after {
    content: 'WRX';
    position: absolute;
  }

  &:focus,
  &:active {
    outline: none;
  }
`

const Balance = styled.div`
  border-radius: 11px;
  background-color: #fbfbf9;
  box-shadow: 0px 5px 10px -2px #e7e5de;
  padding: 10px 15px;
  margin-left: 10px;
  ${(p) => p.theme.media.xs} {
    margin-left: 0;
  }
`
const InputBalanceWrapper = styled(Flex)`
  ${(p) => p.theme.media.xs} {
    flex-direction: column;
  }
`

export default PlaceBid
