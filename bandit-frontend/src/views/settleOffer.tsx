import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import queryString from "query-string";

import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import TokenCardSkeleton from "../components/molecules/Token/skeletons/TokenCard";
import TokenCard from "../components/molecules/Token/TokenCard2";
import { stringifyErrorJson } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { BackIcon } from "../components/atoms/svg";
import Button from "../components/atoms/Button/Button";
import { Spin } from "antd";
import { useWOldContract } from "../hooks/useContract";
import useActiveWeb3React from "../hooks/useActiveWeb3React";

import CollectorGuidelines from "../modules/Guidelines/CollectorGuidelines";
import useWalletSource from "../hooks/useWalletSource";
import API from "../services/API";
import { ethers } from "ethers";
import { callWithEstimateGas } from "../utils/callWithGasEstimation";
import { notify } from "../components/atoms/Notification/Notify";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import { BNB, WRX } from "../constant/currencies";
import useDecideContract from "../hooks/useDecideContract";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { useRouter } from "next/router";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";
import useAuth from "../hooks/useAuth";

const SettleOffer = () => {
  const [settled, setSettled] = useState(false)
  const [loading, setLoading] = useState(false)

  const { conversionRate, user } = useSelector((state: any) => state.auth)

  // const params: any = useParams();
  const router = useRouter()
  const { asPath, pathname } = useRouter()
  const search = asPath?.replace(pathname, '')
  const dispatch = useDispatch()

  const wOldContract = useWOldContract()

  const { account } = useActiveWeb3React()

  const walletSource = useWalletSource()

  const queryParams = queryString.parse(decodeURIComponent(search))
  const { tokenId, offerId, price, unit, contractAddress }: any = queryParams || {}

  const { initDecideContract } = useDecideContract()
  const { saleContract, isExternalContract } = initDecideContract(contractAddress)
  const { isLoggedIn, loading: isAuthLoading }: any = useAuth()

  const {
    isLoading,
    error,
    data: token,
    isFetched,
    isFetching: isTokenFetching,
    refetch: refetchTokenDetail,
  } = useQuery('token-detail-settle-offer', fetchTokenDetail, {
    enabled: router.isReady,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  useEffect(() => {
    if (!isLoggedIn && !isAuthLoading) {
      return router.push('/')
    }
    return isLoggedIn
  }, [isLoggedIn, isAuthLoading])

  function fetchTokenDetail() {
    return API.fetchNFT(tokenId, contractAddress)
  }

  async function settleOffer() {
    setLoading(true)
    try {
      let tokenPrice = null
      let transaction = null

      if (unit === BNB.symbol) {
        tokenPrice = BNB.decimalFix(price)
      } else {
        tokenPrice = WRX.decimalFix(price)
      }

      if (unit === WRX.symbol) {
        let types = ['uint256', 'bool']
        let values = [tokenId, true]

        if (isExternalContract) {
          types = ['uint256', 'address', 'bool']
          values = [tokenId, contractAddress, true]
        }

        const encodedData = ethers.utils.defaultAbiCoder.encode(types, values)
        transaction = await callWithEstimateGas(wOldContract, 'approveAndCall', [
          saleContract.address,
          tokenPrice,
          encodedData,
        ])
      } else {
        let bnbArgs = [tokenId, { value: tokenPrice }]

        if (isExternalContract) {
          bnbArgs.splice(1, 0, contractAddress)
        }

        transaction = await saleContract.settleOffer(...bnbArgs)
      }

      const receipt = await transaction.wait()

      const res = await API.settleOffer(
        Number(offerId),
        tokenId,
        token.contractAddress,
        user?.username,
        user?.signature,
        tokenPrice,
        walletSource,
      )

      Mixpanel.track(MixpanelEvents.SETTLE_OFFER, {
        tokenId,
        username: user?.username,
        offerId,
        price,
        contractAddress,
      })

      setSettled(true)
      setLoading(false)
      refetchTokenDetail()
      notify.success('Successfully settled the offer', '')
    } catch (e) {
      setLoading(false)
      notify.error('Something went wrong', e?.data?.message || e?.message)
      Mixpanel.track(MixpanelEvents.SETTLE_OFFER_ERROR, {
        tokenId,
        username: user?.username,
        offerId,
        price,
        contractAddress,
        error: stringifyErrorJson(e),
      })
    }
  }

  return (
    <Container>
      <PageMeta name={token?.metaData?.name} description={token?.metaData?.description} image={token?.metaData?.url} />
      <CollectorGuidelines proceedButtonCaption="Proceed to settle">
        <CardWrapper>
          <div className="wrapper">
            {!settled ? (
              <>
                {!loading ? (
                  <Box alignSelf="center">
                    <span onClick={router.back} style={{ cursor: 'pointer', marginBottom: '20px' }}>
                      <BackIcon />
                    </span>

                    <Text
                      fontSize={[30, 40, 60]}
                      fontWeight={600}
                      fontFamily="roc-grotesk"
                      lineHeight="100%"
                      color="textTertiary"
                      mb={20}
                    >
                      Settle Offer
                    </Text>
                    <Box mb={30}>
                      <Text mb={'8px'} fontSize={'14px'}>
                        A transaction of {price} {unit} will be initiated. Once the transaction is completed, NFT will
                        be transferred to your address.
                      </Text>
                    </Box>

                    <Flex alignItems="center" mt={15}>
                      <Button variant="primary" minWidth={300} height={50} onClick={settleOffer}>
                        Settle Offer
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
                  Offer Settled Successfully
                </Text>
                <NextLinkFromReactRouter to={`/${user.username}?tab=collected`}>
                  <Button variant="primary" height={50} width={250} maxWidth={'100%'}>
                    Go to collected
                  </Button>
                </NextLinkFromReactRouter>
              </Box>
            )}
            <Box>{isLoading ? <TokenCardSkeleton /> : <TokenCard token={token} />}</Box>
          </div>
        </CardWrapper>
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

  .guidelines-image {
    width: 100%;
    height: 100%;
  }
`

const DocumentContainer = styled(Box)`
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  ${(p) => p.theme.media.xlg} {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 10px 40px 0 40px;
  }
`

const CardWrapper = styled(Box)`
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

  .ant-spin-dot-item {
    background-color: ${(p) => p.theme.colors.text};
  }
`
export default SettleOffer
