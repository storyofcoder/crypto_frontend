import React, { useState } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Input from "../../components/atoms/Form/Input";
import CustomInput from "../../components/atoms/Form/CustomInput";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../components/atoms/Notification/Notify";
import Loader from "../../components/atoms/Loader/Loader";
import { convertToUsd, makeFriendlyNumber } from "../../utils";
import { refreshUser } from "../../state/Auth/actions";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import { useFormik } from "formik";
import { BNB, WBNB } from "../../constant/currencies";
import { MODAL, showModal } from "./index";
import { useWrappedBNBContract } from "../../hooks/useContract";
import { callWithEstimateGas } from "../../utils/callWithGasEstimation";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useDecideContract from "../../hooks/useDecideContract";
import * as Yup from "yup";
import { theme } from "../../config/styleSystem";

const InputStyled = styled(Input)`
  width: 100%;
  background: #efeeea;
  border-radius: 26.5px;
  padding: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #11110f;
  opacity: 0.6;
`

const StyledButton = styled(Button)`
  //background: #11110f;
  //border-radius: 26.5px;
  font-size: 14px;
  //line-height: 19px;
  //color: #ffffff;
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 14px;

  b,
  small {
    color: ${(p) => p.theme.colors.text4};
  }
`

const PriceWrapper = styled(Box)``

const InputWrapper = styled(Box)`
  flex: 1;
`

const PriceBox = styled(Box)`
  background: #efeeea;
  border-radius: 26.5px;
  min-height: 100%;
  margin-left: 15px;
  width: 120px;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`

const PickerWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .ant-picker {
    border: 1px solid #efeeea;
    background: #f5f5f1;
    padding: 15px;
    background: #efeeea;
    border-radius: 26.5px;
    width: 100%;
    margin-top: 12px;
  }
`

const TimePickerWrapper = styled(Box)`
  width: 48%;
`

const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  align-items: center;
  width: 100%;

  ${(p) => p.theme.media.xs} {
    flex-direction: column;
    align-items: flex-start;

    div {
      margin: 5px 0;
    }
  }
`

const getSchema = (currency, maxPrice) => {
  return Yup.object().shape({
    price: Yup.number()
      .typeError('Invalid price')
      .required('Required')
      .min(0.0001, 'Offer price cannot be lesser than 0.0001')
      .max(maxPrice, 'Not enough balance'),
  })
}

const MakeAnOffer = ({ close, token, getTokenOffers }) => {
  const [loading, setLoading] = useState(false)
  const { user, conversionRate, walletBalance } = useSelector((state: any) => state.auth)

  const [currency] = useState<any>(WBNB)

  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const wbnbContract = useWrappedBNBContract()
  const { initDecideContract } = useDecideContract()
  const { saleContractAddress } = initDecideContract(token.contractAddress)

  const formik = useFormik({
    initialValues: {
      price: null,
    },
    validationSchema: getSchema(currency, walletBalance.WBNB),
    onSubmit: (values) => {
      handleSave()
    },
  })

  const price = formik.values.price

  const openSwapping = () => {
    showModal(MODAL.CONVERT_TOKENS, { onClickCancel }, {})
  }

  const onClickCancel = () => {
    showModal(
      MODAL.MAKE_OFFER,
      {
        token: token,
        getTokenOffers,
      },
      {
        bodyStyle: {
          backgroundColor: theme.colors.bg2,
        },
      },
    )
  }

  async function handleSave() {
    let tokenPrice = BNB.decimalFix(formik.values.price)

    const balance = await wbnbContract.balanceOf(account)

    // if (currency.symbol === BNB.symbol) {
    //   tokenPrice = BNB.decimalFix(formik.values.price);
    // } else {
    //   tokenPrice = WRX.decimalFix(formik.values.price);
    // }
    setLoading(true)
    try {
      const tx = await callWithEstimateGas(wbnbContract, 'approve', [saleContractAddress, balance.toString()])
      await tx.wait()

      const res = await API.makeOffer(
        user.username,
        user.signature,
        token.id,
        token.contractAddress,
        tokenPrice,
        currency.code,
      )
      notify.success('Successfully made the offer', '')

      Mixpanel.track(MixpanelEvents.MAKE_OFFER_CLICK, {
        tokenId: token.id,
        username: user?.username,
        offerPrice: price,
        currency: currency.symbol,
      })

      setLoading(false)
      dispatch(refreshUser())
      getTokenOffers()
      close()
    } catch (e) {
      console.log(e)
      setLoading(false)
      notify.error('Something went wrong', e.response?.data?.data)
    }
  }

  const notEnoughBalance = price && Number(price) > walletBalance.WBNB

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading ? (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'5px'}>
            Make an offer
          </Text>

          <PriceWrapper mb={20} mt={20} width="100%">
            <Text fontSize={[14]} mb={10} fontWeight={[500]} color="text">
              Price (WBNB)
            </Text>
            <Flex>
              <InputWrapper>
                <CustomInput
                  type="text"
                  label=""
                  placeholder="Enter amount in WBNB"
                  name="price"
                  errors={formik.errors}
                  touched={formik.touched}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={12}
                />
              </InputWrapper>
              <PriceBox>${makeFriendlyNumber(convertToUsd(Number(price), conversionRate.BNB_USD))}</PriceBox>
            </Flex>
          </PriceWrapper>
          <Flex width="100%">
            <Text fontWeight="600">Balance : {Number(walletBalance.WBNB.toFixed(4))} WBNB</Text>
          </Flex>
          <Footer>
            <Text fontSize="14px">Remaining offers: {user?.remainingOffers}</Text>
            <Flex>
              <StyledButton variant="primaryLight" onClick={openSwapping} mr={10}>
                Convert BNB
              </StyledButton>
              <StyledButton
                onClick={handleSave}
                minWidth={118}
                variant="solid"
                disabled={
                  price === null ||
                  Number(price) === 0 ||
                  notEnoughBalance ||
                  !user?.remainingOffers ||
                  !Number(formik.values.price) ||
                  formik.values.price <= 0 ||
                  !!Object.keys(formik.errors).length
                }
              >
                {'Make Offer'}
              </StyledButton>
            </Flex>
          </Footer>
        </>
      ) : (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600">
            Making Offer
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Flex>
  )
}

export default MakeAnOffer
