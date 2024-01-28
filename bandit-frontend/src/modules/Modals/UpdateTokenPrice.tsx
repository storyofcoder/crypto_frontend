import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { notify } from "../../components/atoms/Notification/Notify";
import Loader from "../../components/atoms/Loader/Loader";
import { convertToUsd, decimalFix } from "../../utils";
import useWalletSource from "../../hooks/useWalletSource";
import SplitBreakupPopover from "../../components/molecules/Token/SplitBreakPopover";
import useServiceCommission from "../../hooks/useServiceCommission";
import CustomInput from "../../components/atoms/Form/CustomInput";
import { useFormik } from "formik";
import { BNB, WRX } from "../../constant/currencies";
import { getAllowedDecimal, getMinPrice, getPriceFormValidationScheme } from "../../utils/formValidation";
import useDecideContract from "../../hooks/useDecideContract";
import useRoyalty from "../../hooks/useRoyalty";
import CustomSkeleton from "../../components/atoms/Skeleton";

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  color: #677788;
  b,
  small {
    color: ${(p) => p.theme.colors.text};
  }
`

const FinalBreakUp = styled(Flex)`
  align-items: baseline;
  font-weight: 600;
  font-size: 16px;
  color: #677788;
  b,
  small {
    color: ${(p) => p.theme.colors.text};
    margin-left: 5px;
  }
`

const UpdateTokenPrice = ({ close, token, refresh }) => {
  const [loading, setLoading] = useState(false)
  const [tokenRoyaltyValue, setTokenRoyaltyValue] = useState(0)
  const { user, conversionRate } = useSelector((state: any) => state.auth)

  const { initDecideContract } = useDecideContract()
  const { saleContract, auctionContract, isExternalContract } = initDecideContract(token?.contractAddress)

  const walletSource = useWalletSource()

  const needRoyalty =
    token.tokenCreator === token.tokenOwner && token.tokenCreator === user?.username && !isExternalContract

  const { ROYALTY, isLoading: isRoyaltyLoading } = useRoyalty({
    contractAddress: token?.contractAddress || '',
    tokenId: token?.id,
    internalRoyalty: token?.royalty,
  })

  useEffect(() => {
    setTokenRoyaltyValue(ROYALTY)
  }, [ROYALTY])

  const { SERVICE_FEE, isLoading } = useServiceCommission({
    contractAddress: token?.contractAddress || '',
    saleType: token.saleType,
    creatorAddress: token?.tokenOwnerAddress || '',
  })

  const formik = useFormik({
    initialValues: {
      price: token.price,
    },
    validationSchema: getPriceFormValidationScheme({
      price: {
        allowedDecimal: getAllowedDecimal(token.currency.symbol),
        minPrice: getMinPrice(token.currency.symbol),
      },
    }),
    onSubmit: (values) => {
      handleSave()
    },
  })

  async function handleSave() {
    setLoading(true)

    try {
      let tokenPrice = null

      if (token.currency.symbol === BNB.symbol) {
        tokenPrice = BNB.decimalFix(formik.values.price)
      } else {
        tokenPrice = WRX.decimalFix(formik.values.price)
      }

      let args = [token.id, tokenPrice]

      if (isExternalContract) {
        args.splice(1, 0, token.contractAddress)
      }

      if (token.saleType === 'buy') {
        const tx = await saleContract.updateTokenPrice(...args)
        await tx.wait()
        await API.updateTokenSalePrice(
          token.id,
          token.contractAddress,
          tokenPrice.toString(),
          user.username,
          user.signature,
          walletSource,
        )
      } else if (token.saleType === 'auction') {
        const tx = await auctionContract.updateAuction(...args)
        await tx.wait()
        await API.updateTokenAuctionPrice(
          token.id,
          token.contractAddress,
          tokenPrice.toString(),
          user.username,
          user.signature,
          walletSource,
        )
      }

      notify.success('Successfully updated the price', '')
      setLoading(false)
      refresh()
      close()
    } catch (e) {
      setLoading(false)
      notify.error('Failed to update price', 'Please try again')
    }
  }

  function cutCommission(price, fractionDigits = 2) {
    if (needRoyalty) {
      return Number((price * (1 - SERVICE_FEE / 100)).toFixed(fractionDigits))
    }
    return Number((price - price * ((tokenRoyaltyValue + SERVICE_FEE) / 100)).toFixed(fractionDigits))
  }

  const splitEnabled = needRoyalty && token.splits && token.splits.length > 0

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading ? (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'5px'}>
            Update Price
          </Text>

          <Box mb={20} mt={20} width="100%">
            {/*<Input*/}
            {/*  type="number"*/}
            {/*  label={`Price (WRX)`}*/}
            {/*  placeholder={`Set the NFT price (WRX)`}*/}
            {/*  style={{ width: "100%" }}*/}
            {/*  name="price"*/}
            {/*  value={price}*/}
            {/*  max={MAX_PRICE}*/}
            {/*  step="0.01"*/}
            {/*  onChange={handleChange}*/}
            {/*/>*/}
            <CustomInput
              type="number"
              label={`${token.saleType === 'buy' ? 'Price' : 'Reserve price'} (${token.currency.symbol})`}
              placeholder={`Set the NFT price(${token.currency.symbol})`}
              name="price"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>

          {/*hello*/}

          <Box mb={20} alignSelf="flex-start">
            {!needRoyalty && (
              <StyledText>
                Royalty {isRoyaltyLoading ? <NumberSkeletonPlaceholder /> : <b>{tokenRoyaltyValue || 0}%</b>}
              </StyledText>
            )}

            <StyledText>Service fee {isLoading ? <NumberSkeletonPlaceholder /> : <b>{SERVICE_FEE}%</b>}</StyledText>

            {token.saleType === 'buy' && (
              <FinalBreakUp>
                {!!token?.splits?.length && token.market === 'primary' ? 'Creators will receive' : 'You will receive'}{' '}
                <b>
                  {cutCommission(formik.values.price, token?.currency?.symbol === BNB.symbol ? 6 : 2) || 0}{' '}
                  {token.currency.symbol}
                </b>{' '}
                {/*// @ts-ignore*/}
                <small>
                  {cutCommission(
                    convertToUsd(
                      Number(formik.values.price),
                      token.currency.symbol === WRX.symbol ? conversionRate.USD : conversionRate.BNB_USD,
                    ),
                  ) || 0}{' '}
                  USD
                </small>
                {!!token?.splits?.length && (
                  <SplitBreakupPopover
                    usersList={token.splits.map((u) => ({
                      username: u.username,
                      price:
                        Number(cutCommission(formik.values.price, token?.currency?.symbol === BNB.symbol ? 6 : 2)) *
                        (decimalFix(u.percentage) / 100),
                      unit: token?.currency?.symbol,
                    }))}
                  />
                )}
              </FinalBreakUp>
            )}
          </Box>

          {/*hello*/}

          <Button
            variant="secondary"
            onClick={handleSave}
            minWidth={100}
            disabled={Number(formik.values.price) === Number(token.price) || !!Object.keys(formik.errors).length}
          >
            Update
          </Button>
          <Text style={{ cursor: 'pointer' }} onClick={close} mt={10}>
            Cancel
          </Text>
        </>
      ) : (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600">
            Updating the price
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Flex>
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

export default UpdateTokenPrice
