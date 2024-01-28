import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Text } from "../components/atoms/StyledSystem";
import { useQuery } from "react-query";
import API from "../services/API";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/atoms/Button/Button";
import { notify } from "../components/atoms/Notification/Notify";
import TokenCardSkeleton from "../components/molecules/Token/skeletons/TokenCard";
import moment from "moment";
import { Spin } from "antd";
import SettleAuctionCard from "../components/molecules/Token/SettleAuctionCard";
import { showConffeti } from "../state/Auth/actions";
import useWalletSource from "../hooks/useWalletSource";
import useDecideContract from "../hooks/useDecideContract";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import { stringifyErrorJson } from "../utils";
import { useRouter } from "next/router";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

const PlaceBid = () => {
  const conversionRate = useSelector((state: any) => state.auth.conversionRate)
  const { user } = useSelector((state: any) => state.auth)

  const [loading, setLoading] = useState(false)
  const [settled, setSettled] = useState(false)

  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch()

  const walletSource = useWalletSource()

  const {
    isLoading,
    error,
    data: token = {},
    isFetched,
    isFetching: isTokenFetching,
    refetch: refetchTokenDetail,
  } = useQuery('settle-auction', fetchTokenDetail, {
    refetchOnWindowFocus: false,
    enabled: router.isReady,
    cacheTime: 0,
  })

  const { initDecideContract } = useDecideContract()
  const { auctionContract, isExternalContract } = initDecideContract(token?.contractAddress)

  useEffect(() => {
    if (error) {
      return router.replace('/not-found')
    }
    // TODO
    return user
  }, [error])

  useEffect(() => {
    if (isLoading) return

    // @ts-ignore
    const auctionEnded =
      // @ts-ignore
      moment.utc(token.auctionEndTime).toDate() - moment().toDate() <= 0

    if (
      token.status === 'sold' ||
      (!token.onSale && !token.auctionLive && token.saleType === 'auction' && !!token.auctionEndTime) ||
      ![token.topBidBy, token.tokenCreator, token.tokenOwner].includes(user?.username)
    )
      return router.replace('/not-found')
    // TODO
    return token
  }, [token])

  async function settleToken() {
    try {
      setLoading(true)
      let args = [token.id]

      if (isExternalContract) {
        args.splice(1, 0, token.contractAddress)
      }

      const tx = await auctionContract.finalizeAuction(...args)
      await tx.wait()

      await API.claimToken(token.id, token.contractAddress, user.username, user.signature, walletSource)

      Mixpanel.track(MixpanelEvents.SETTLE_AUCTION, {
        tokenId: token.id,
        username: user?.username,
        contractAddress: token.contractAddress,
      })

      setLoading(false)
      setSettled(true)
      dispatch(showConffeti())
    } catch (e) {
      Mixpanel.track(MixpanelEvents.SETTLE_AUCTION_ERROR, {
        tokenId: token.id,
        username: user?.username,
        contractAddress: token.contractAddress,
        error: stringifyErrorJson(e),
      })
      setLoading(false)
      notify.error('Something went wrong', e?.data?.message || e?.message)
    }
  }

  function fetchTokenDetail() {
    return API.fetchSingleBids(query.id, query.contractAddress, user.username, user.signature)
  }

  function viewAuctionWinnerProfile() {
    router.push(`/${token?.topBidBy}`)
  }
  function goToHome() {
    router.push('/')
  }

  const isAuctionCreator = [token?.tokenCreator].includes(user?.username)
  const isAuctionWinner = [token?.topBidBy].includes(user?.username)

  return (
    <Container>
      <PageMeta name={token?.metaData?.name} description={token?.metaData?.description} image={token?.metaData?.url} />
      <SettleContainer>
        <div className="wrapper">
          {!settled ? (
            <>
              {loading ? (
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
                    Settle Auction
                  </Text>
                  <Text mb={20}>
                    {isAuctionWinner ? (
                      <>
                        Congratulations!
                        <br /> You have won the auction and bagged this NFT. Click on claim to add it to your
                        collections.
                      </>
                    ) : (
                      <>
                        Congratulations!
                        <br /> Your NFT has got the highest bid. Click on the below button to settle the auction.
                      </>
                    )}
                  </Text>
                  <Button variant="primary" height={50} minWidth={250} onClick={settleToken}>
                    {isAuctionWinner ? 'Claim NFT' : 'Settle'}
                  </Button>
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
                {isAuctionWinner ? 'Successfully Claimed' : 'Successfully Settled'}
              </Text>
              <Button
                variant="primary"
                height={50}
                minWidth={250}
                onClick={isAuctionWinner ? viewAuctionWinnerProfile : goToHome}
              >
                {isAuctionWinner ? 'View your profile' : 'Go to home'}
              </Button>
            </Box>
          )}

          <Box>{isLoading || !token?.id ? <TokenCardSkeleton /> : <SettleAuctionCard token={token} />}</Box>
        </div>
      </SettleContainer>
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

const SettleContainer = styled(Box)`
  display: flex;
  justify-content: center;
  .wrapper {
    display: grid;
    gap: 86px;
    color: ${(p) => p.theme.colors.text};

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

export default PlaceBid
