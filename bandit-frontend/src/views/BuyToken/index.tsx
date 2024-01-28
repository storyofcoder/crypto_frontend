import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { ethers } from "ethers";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import { CONNECTOR_ID, CONNECTOR_TITLE } from "../../utils/storagekeys";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import { callWithEstimateGas } from "../../utils/callWithGasEstimation";
import { trackEvent } from "../../analytics";
import { EventsName } from "../../constant/actionEnums";
import { notify } from "../../components/atoms/Notification/Notify";
import { showConffeti } from "../../state/Auth/actions";
import { MODAL, showModal } from "../../modules/Modals";
import { stringifyErrorJson } from "../../utils";
import { BackIcon } from "../../components/atoms/svg";
import { useWOldContract } from "../../hooks/useContract";
import { BNB, WRX } from "../../constant/currencies";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";
import { useRouter } from "next/router";
import { PageMeta } from "../../components/molecules/AppLayout/PageMeta";
import { useNftDetail } from "../../state/nfts/hooks";

import API from "../../services/API";
import Button from "../../components/atoms/Button/Button";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import TokenCardSkeleton from "../../components/molecules/Token/skeletons/TokenCard";
import TokenCard from "../../components/molecules/Token/TokenCard2";
import useDecideContract from "../../hooks/useDecideContract";
import CollectorGuidelines from "../../modules/Guidelines/CollectorGuidelines";
import useWalletSource from "../../hooks/useWalletSource";
import { CardWrapper, Container } from "./styles";

const BuyToken = () => {
  const [hasBought, setHasBought] = useState(false)
  const [loading, setBuyProcessing] = useState(false)

  const { walletBalance, user } = useSelector((state: any) => state.auth)
  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch()

  const wOldContract = useWOldContract()

  const { account } = useActiveWeb3React()

  const walletSource = useWalletSource()

  const { nftDetail: token, isLoading, refetch: refetchTokenDetail } = useNftDetail(query.id, query.contractAddress)

  const { initDecideContract } = useDecideContract()
  const { saleContract, isExternalContract } = initDecideContract(token?.contractAddress)

  async function buyToken() {
    const data = token
    const connectorId = window.localStorage.getItem(CONNECTOR_ID)
    const wallet = localStorage.getItem(CONNECTOR_TITLE)

    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.BUY_NFT_CLICK, {
      tokenId: data.id,
      currency: token.currency.symbol,
      user_id: user?.username,
      creator_id: data.tokenCreator,
      owner_id: data.tokenOwner,
      connectorId: connectorId,
      wallet: isMobile ? wallet + ' Mobile app' : wallet,
      walletSource,
    })
    try {
      setBuyProcessing(true)
      const token = data

      let tokenPrice = null

      if (token.currency.symbol === BNB.symbol) {
        tokenPrice = BNB.decimalFix(token.price)
      } else {
        tokenPrice = WRX.decimalFix(token.price)
      }

      let tokenSaleArgs = [token.id]

      if (isExternalContract) {
        tokenSaleArgs.push(token.contractAddress)
      }

      const tokenSale = await saleContract.getTokenSale(...tokenSaleArgs)

      if (tokenSale && tokenSale.onSale) {
        if (token.tokenOwnerAddress !== account) {
          if (
            (token.currency.symbol === WRX.symbol && parseInt(walletBalance.WRX) >= parseInt(token.price)) ||
            (token.currency.symbol === BNB.symbol && parseInt(walletBalance.BNB) >= parseInt(token.price))
          ) {
            try {
              let transaction = null
              if (token.currency.symbol === WRX.symbol) {
                let types = ['uint256', 'bool']
                let values = [token.id, false]

                if (isExternalContract) {
                  types = ['uint256', 'address', 'bool']
                  values = [token.id, token.contractAddress, false]
                }

                const encodedData = ethers.utils.defaultAbiCoder.encode(types, values)
                // const transaction = await wOldContract.approveAndCall(saleContract.address, tokenPrice, encodedData)
                transaction = await callWithEstimateGas(wOldContract, 'approveAndCall', [
                  saleContract.address,
                  tokenPrice,
                  encodedData,
                ])
              } else if (token.currency.symbol === BNB.symbol) {
                let bnbArgs = [token.id, { value: tokenPrice }]

                if (isExternalContract) {
                  bnbArgs.splice(1, 0, token.contractAddress)
                }

                transaction = await saleContract.buyToken(...bnbArgs)
              } else {
                return
              }

              const receipt = await transaction.wait()
              // const transaction = await web3Context.buyAToken(
              //   token.id,
              //   tokenPrice
              // );
              if (receipt) {
                await API.buyToken(
                  token.id,
                  token.contractAddress,
                  tokenPrice,
                  user.username,
                  user.signature,
                  walletSource,
                  transaction.hash,
                )
                //this.getTokenDetails(this.props.contract);
                /*let currentToken = token;
                              currentToken.tokenOwner = web3Context.walletAddress;
                              this.setState({
                                token: currentToken
                              })*/
                trackEvent({
                  action: EventsName.NFT_DETAILS_BUY_TOKEN_CLICK,
                  value: 'Buy token success',
                })

                Mixpanel.track(MixpanelEvents.NFT_PURCHASED, {
                  tokenId: data.id,
                  currency: token.currency.symbol,
                  user_id: user?.username,
                  creator_id: data.tokenCreator,
                  owner_id: data.tokenOwner,
                  purchase_amount: tokenPrice,
                  connectorId: connectorId,
                  wallet: isMobile ? wallet + ' Mobile app' : wallet,
                  contractAddress: token.contractAddress,
                  walletSource,
                })
                notify.success('NFT purchased successfully!', '')

                dispatch(showConffeti())
                // refresh token
                await refetchTokenDetail()
                // refresh history
                // await refetchTokenHistory();
                // this.setState({
                //   toastTitle: "Token Purchased Successfully"
                // });
                setHasBought(true)
              } else {
                setBuyProcessing(false)
                throw Error('Buy operation failed')
              }
            } catch (error) {
              console.log(error)
              Mixpanel.track(MixpanelEvents.ERROR_WHILE_BUYING, {
                tokenId: data.id,
                currency: token.currency.symbol,
                connectorId: connectorId,
                wallet: wallet,
                walletSource,
                contractAddress: token.contractAddress,
                error: stringifyErrorJson(error),
              })
              if (error.code === -32603) {
                notify.error(
                  'Please enable Contract data on the Ethereum app Settings',
                  error?.data?.message || error?.message,
                )
              } else {
                notify.error('User Declined Trasaction', error?.data?.message || error?.message)
              }

              setBuyProcessing(false)
            }
          } else {
            Mixpanel.track(MixpanelEvents.BUY_NFT_LOW_BALANCE, {
              tokenId: data.id,
              currency: token.currency.symbol,
              user_id: user?.username,
              creator_id: data.tokenCreator,
              owner_id: data.tokenOwner,
              purchase_amount: tokenPrice,
              connectorId: connectorId,
              wallet: isMobile ? wallet + ' Mobile app' : wallet,
              walletSource,
              contractAddress: token.contractAddress,
            })
            setBuyProcessing(false)
            showModal(MODAL.NOT_ENOUGH_BALANCE, {})
          }
        } else {
          setBuyProcessing(false)
          trackEvent({
            action: EventsName.NFT_DETAILS_BUY_TOKEN_CLICK,
            value: 'Owner cannot purchase the Token',
          })
          notify.error('Owner cannot purchase the Token', '')
        }
      } else {
        notify.error('Token is already bought', '')
        await refetchTokenDetail()
        // refresh history
        // await refetchTokenHistory();
        setBuyProcessing(false)
      }
    } catch (e) {
      console.log(e)
      setBuyProcessing(false)
      Mixpanel.track(MixpanelEvents.ERROR_WHILE_BUYING, {
        tokenId: data.id,
        currency: token.currency.symbol,
        connectorId: connectorId,
        wallet: wallet,
        walletSource,
        error: stringifyErrorJson(e),
        contractAddress: token.contractAddress,
      })
      notify.error('Something went wrong', e?.data?.message || e?.message)
    }
  }

  return (
    <Container>
      <PageMeta name={token?.metaData?.name} description={token?.metaData?.description} image={token?.metaData?.url} />
      <CollectorGuidelines proceedButtonCaption="Proceed to buy">
        <CardWrapper>
          <div className="wrapper">
            {!hasBought ? (
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
                      Buy NFT
                    </Text>
                    <Box mb={30}>
                      <Text mb={'8px'} fontSize={'14px'}>
                        A transaction of {token?.price} {token?.currency?.symbol} will be initiated. Once the
                        transaction is completed, NFT will be transferred to your address.
                      </Text>
                    </Box>

                    <Flex alignItems="center" mt={15}>
                      <Button variant="primary" width={300} height={50} onClick={buyToken}>
                        Buy NFT
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
                  NFT Purchased Successfully
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
export default BuyToken
