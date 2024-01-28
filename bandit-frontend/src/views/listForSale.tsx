import React, { useState } from "react";
import styled from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/atoms/Button/Button";
import Input from "../components/atoms/Form/CustomInput";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import TokenCard from "../components/molecules/Token/TokenCard2";
import PillFilled from "../components/atoms/Pill/PilllFilled";
import { useFormik } from "formik";
import { useQuery } from "react-query";
import API from "../services/API";
import TokenCardSkeleton from "../components/molecules/Token/skeletons/TokenCard";
import { notify } from "../components/atoms/Notification/Notify";
import useWalletSource from "../hooks/useWalletSource";
import { convertToUsd, decimalFix } from "../utils";
import SplitBreakupPopover from "../components/molecules/Token/SplitBreakPopover";
import useServiceCommission from "../hooks/useServiceCommission";
import useRoyalty from "../hooks/useRoyalty";
import Loader from "../components/atoms/Loader/Loader";
import { showConffeti } from "../state/Auth/actions";
import { BNB, WRX } from "../constant/currencies";
import SelectCurrency from "../modules/Currencies/SelectCurrency";
import {
  getAllowedDecimal,
  getListingFormValidationScheme,
  getMinPrice,
  getPriceFormValidationScheme
} from "../utils/formValidation";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import useDecideContract from "../hooks/useDecideContract";
import CustomSkeleton from "../components/atoms/Skeleton";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { useRouter } from "next/router";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

const BUY = 'buy'
const AUCTION = 'auction'

const ListForSale = () => {
  const [saleType, setSaleType] = useState<any>(BUY)
  const [currency, setCurrency] = useState<any>(BNB)

  const [loading, setLoading] = useState(false)
  const [grantingApprove, setGrantingApprove] = useState(false)
  const [tokenListed, setTokenListed] = useState(false)

  const { user, conversionRate } = useSelector((state: any) => state.auth)

  const { account } = useActiveWeb3React()

  const walletSource = useWalletSource()

  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch()

  const {
    error,
    data: token = {},
    isFetched,
    isFetching: isTokenFetching,
    refetch: refetchTokenDetail,
  } = useQuery('token-detail', fetchTokenDetail, {
    refetchOnWindowFocus: false,
    enabled: router.isReady,
    cacheTime: 0,
  })

  const { SERVICE_FEE, isLoading } = useServiceCommission({
    contractAddress: token?.contractAddress || '',
    saleType,
    creatorAddress: token?.tokenOwnerAddress || '',
  })
  const { ROYALTY, isLoading: isRoyaltyLoading } = useRoyalty({
    contractAddress: token?.contractAddress || '',
    tokenId: token?.id,
    internalRoyalty: token?.royalty,
  })

  const { initDecideContract } = useDecideContract()
  const { escrowAddress, nftContract, saleContract, auctionContract, isExternalContract, saleContractAddress } =
    initDecideContract(token.contractAddress)

  const needRoyalty =
    token.tokenCreator === token.tokenOwner && token.tokenCreator === user?.username && !isExternalContract

  const formik = useFormik({
    initialValues: {
      price: 0,
      royalty: 0,
    },
    validationSchema: needRoyalty
      ? getListingFormValidationScheme({
          price: {
            allowedDecimal: getAllowedDecimal(currency?.symbol),
            minPrice: getMinPrice(currency?.symbol),
          },
        })
      : getPriceFormValidationScheme({
          price: {
            allowedDecimal: getAllowedDecimal(currency?.symbol),
            minPrice: getMinPrice(currency?.symbol),
          },
        }),
    onSubmit: (values) => {
      handleSubmit()
    },
  })

  const tokenRoyaltyValue = needRoyalty ? formik.values.royalty : ROYALTY

  async function checkNftHasOffers() {
    try {
      const owner = await nftContract.ownerOf(token.id)
      return owner === escrowAddress
    } catch (e) {
      console.log(e)
    }
  }
  // TODO do it on server
  // useEffect(() => {
  //   if (!token?.id) return;
  //   if (
  //     !["mint", "sold"].includes(token.status) ||
  //     token.tokenOwner !== user?.username
  //   ) {
  //     history.push("/not-found");
  //   }
  // }, [token]);

  function fetchTokenDetail() {
    return API.fetchNFT(query.id, query.contractAddress, user?.username, user?.signature)
  }

  function cutCommission(price, fractionDigits = 2) {
    if (needRoyalty) {
      return Number((price * (1 - SERVICE_FEE / 100)).toFixed(fractionDigits))
    }
    return Number((price - price * ((tokenRoyaltyValue + SERVICE_FEE) / 100)).toFixed(fractionDigits))
  }

  const handleSubmit = async () => {
    setLoading(true)
    const hasOffersOnNft = await checkNftHasOffers()
    if (hasOffersOnNft) {
      return notify.error(
        'NFT cannot be listed because you have accepted an offer',
        'Please cancel the offer to list the NFT',
      )
    }
    try {
      const { price, royalty } = formik.values

      let tokenPrice = null

      if (currency.symbol === BNB.symbol) {
        tokenPrice = BNB.decimalFix(price)
      } else {
        tokenPrice = WRX.decimalFix(price)
      }

      const tokenRoyalty = needRoyalty ? parseInt((royalty * 100000000).toString()) : 0

      // const address = await nftContract.getApproved(token.id);
      // const owner = await nftContract.ownerOf(token.id);

      // if (owner !== escrowAddress && address !== escrowAddress) {
      //   const transaction = await callWithEstimateGas(nftContract, "approve", [
      //     escrowAddress,
      //     token.id,
      //   ]);
      //   await transaction.wait();
      // }

      const approveAddress = saleType === 'buy' ? saleContractAddress : escrowAddress

      const isApprovedForAll = await nftContract.isApprovedForAll(account, approveAddress)

      if (!isApprovedForAll) {
        setGrantingApprove(true)
        const approveTransaction = await nftContract.setApprovalForAll(approveAddress, true)
        await approveTransaction.wait()
        setGrantingApprove(false)
      }

      if (saleType === 'buy') {
        let txBuySale = null
        let args = [token.id, tokenPrice, tokenRoyalty, currency.code]
        if (isExternalContract) {
          args.splice(2, 1)
          args.splice(1, 0, token.contractAddress)
        }

        txBuySale = await saleContract.putOnBuySale(...args)

        await txBuySale.wait()
        await API.listTokenOnSale(
          token.id,
          token.contractAddress,
          tokenPrice,
          currency.code,
          user.username,
          user.signature,
          tokenRoyalty,
          walletSource,
        )
      } else {
        let txSale = null
        let args = [token.id, tokenPrice, currency.code]
        let method = 'createAuction(uint256,uint256,uint256)'

        if (isExternalContract) {
          method = 'createAuction(uint256,address,uint256,uint256)'
          args.splice(1, 0, token.contractAddress)
        }

        if (needRoyalty) {
          args.splice(2, 0, tokenRoyalty)
          txSale = await auctionContract['createAuction(uint256,uint256,uint256,uint256)'](...args)
        } else {
          txSale = await auctionContract[method](...args)
        }

        await txSale.wait()

        await API.listTokenOnAuction(
          token.id,
          token.contractAddress,
          tokenPrice,
          currency.code,
          user.username,
          user.signature,
          tokenRoyalty,
          walletSource,
        )
      }

      Mixpanel.track(MixpanelEvents.NFT_LISTED_ON_SALE, {
        tokenId: token.id,
        currency: currency.symbol,
        saleType,
        market: token.market,
      })

      setLoading(false)
      setTokenListed(true)
      dispatch(showConffeti())
      notify.success('Successfully listed for sale', '')
    } catch (e) {
      setLoading(false)
      setGrantingApprove(false)
      setTokenListed(false)

      console.log(e)
      notify.error('Something went wrong', e?.message)
    }
  }

  return (
    <>
      <PageMeta name={token?.metaData?.name} description={token?.metaData?.description} image={token?.metaData?.url} />
      <Container>
        <Flex flexDirection={['column', 'column', 'column', 'column', 'row']}>
          <Left flex="1" width="80%">
            {isTokenFetching ? (
              <TokenCardSkeleton />
            ) : (
              <TokenCard
                token={{
                  ...token,
                  unit: currency.symbol,
                  currency: currency,
                  price: formik.values.price,
                  localRate: convertToUsd(
                    formik.values.price,
                    currency.symbol === WRX.symbol ? conversionRate.USD : conversionRate.BNB_USD,
                  ),
                }}
              />
            )}
          </Left>
          <Right flex="2" minHeight={200}>
            {loading && (
              <Loading
                title={!grantingApprove ? 'Your NFT is being listed' : 'Please grant us approval to your NFTs'}
              />
            )}
            {!loading && tokenListed && <ListingSuccess contractAddress={token?.contractAddress} tokenId={token?.id} />}

            {!loading && !tokenListed && (
              <Box>
                <Text fontSize="22px" fontWeight="600" color="#292C36" mb={20}>
                  List for sale{' '}
                </Text>

                <Box>
                  <form onSubmit={formik.handleSubmit}>
                    <Flex mb={20}>
                      <PillFilled
                        name="Fixed Price"
                        active={saleType === BUY}
                        onClick={() => setSaleType(BUY)}
                        showIcons={false}
                      />
                      <PillFilled
                        name="Auction"
                        active={saleType === AUCTION}
                        onClick={() => setSaleType(AUCTION)}
                        showIcons={false}
                      />
                    </Flex>

                    <Box mb={20}>
                      <Text fontSize={[14]} mb={'5px'} fontWeight={[500]} color="text">
                        On Sale in
                      </Text>

                      <SelectCurrency currency={currency} onChange={(cur) => setCurrency(cur)} />
                    </Box>

                    <Box>
                      <Box mb={20}>
                        <Input
                          type="number"
                          label={`${saleType === 'buy' ? 'Price' : 'Reserve price'} (${currency.symbol})`}
                          placeholder={`Set the NFT price(${currency.symbol})`}
                          name="price"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                      {needRoyalty && (
                        <Box mb={20}>
                          <Input
                            type="number"
                            label="Royalty (MAX 15%)"
                            placeholder="Set your royalty percentage. Min 1, Max 15"
                            name="royalty"
                            errors={formik.errors}
                            touched={formik.touched}
                            value={formik.values.royalty}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box mb={20}>
                      {!needRoyalty && tokenRoyaltyValue > 0 && (
                        <StyledText>
                          Royalty {isRoyaltyLoading ? <NumberSkeletonPlaceholder /> : <b>{tokenRoyaltyValue || 0}%</b>}
                        </StyledText>
                      )}
                      <StyledText>
                        Service fee {isLoading ? <NumberSkeletonPlaceholder /> : <b>{SERVICE_FEE}%</b>}
                      </StyledText>

                      {saleType === 'buy' && (
                        <FinalBreakUp>
                          {!!token?.splits?.length && token.market === 'primary'
                            ? 'Creators will receive'
                            : 'You will receive'}{' '}
                          <b>
                            {cutCommission(formik.values.price, currency.symbol === BNB.symbol ? 6 : 2) || 0}{' '}
                            {currency.symbol}
                          </b>{' '}
                          {/*// @ts-ignore*/}
                          <small>
                            {cutCommission(
                              convertToUsd(
                                Number(formik.values.price),
                                currency.symbol === WRX.symbol ? conversionRate.USD : conversionRate.BNB_USD,
                              ),
                            ) || 0}{' '}
                            USD
                          </small>
                          {!!token?.splits?.length && token.market === 'primary' && (
                            <SplitBreakupPopover
                              usersList={token.splits.map((u) => ({
                                username: u.username,
                                price:
                                  Number(cutCommission(formik.values.price, currency.symbol === BNB.symbol ? 6 : 2)) *
                                  (decimalFix(u.percentage) / 100),
                                unit: currency.symbol,
                              }))}
                            />
                          )}
                        </FinalBreakUp>
                      )}
                    </Box>

                    <Flex justifyContent="flex-end" mt={20}>
                      <StyledSubmit variant="solid">
                        List for sale
                        <input type="submit" className="" value="Create" />
                      </StyledSubmit>
                    </Flex>
                  </form>
                </Box>
              </Box>
            )}
          </Right>
        </Flex>
      </Container>
    </>
  )
}

const Loading = ({ title }) => {
  return (
    <LoadingWrapper>
      <Box>
        <Loader />
      </Box>
      <Text fontSize={25} fontWeight={800} color="text">
        {title}
      </Text>
    </LoadingWrapper>
  )
}
const ListingSuccess = ({ tokenId, contractAddress }) => {
  const router = useRouter()
  function onClickView() {
    router.replace(`/assets/${contractAddress}/${tokenId}`)
  }
  return (
    <LoadingWrapper>
      <Text fontSize={25} fontWeight={800} color="text">
        Your NFT has been listed
      </Text>
      <Text mb={10}>Congratulations!, You have successfully listed your NFT.</Text>
      <Button variant="solid" minWidth={150} onClick={onClickView}>
        View NFT
      </Button>
      <NextLinkFromReactRouter to={``}></NextLinkFromReactRouter>
    </LoadingWrapper>
  )
}

const NumberSkeletonPlaceholder = () => {
  const StyledBox = styled.b`
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-left: 4px;

    span,
    div {
      height: 100%;
      width: 100%;
      line-height: 1.3;
    }
  `
  return (
    <StyledBox>
      <SkeletonTheme color="#808080" highlightColor="#444">
        <CustomSkeleton circle />
      </SkeletonTheme>
    </StyledBox>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 0 40px;
    max-width: var(--max-width);
    margin: 0 auto;
  }
`

const Left = styled(Box)`
  margin: 0 7% 20px 7%;
`
const Right = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 32px;
  padding: 3%;
  position: relative;
`
const StyledSubmit = styled(Button)`
  position: relative;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 30%;
    border: none;
    opacity: 0;
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 16px;

  b,
  small {
    color: ${(p) => p.theme.colors.text};
  }
`

const FinalBreakUp = styled(Flex)`
  align-items: baseline;
  font-weight: 600;
  font-size: 16px;
  b,
  small {
    color: ${(p) => p.theme.colors.text};
    margin-left: 5px;
  }
`

const LoadingWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${(p) => p.theme.colors.bg1};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export default ListForSale
