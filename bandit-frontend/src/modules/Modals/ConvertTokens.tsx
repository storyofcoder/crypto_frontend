import React, { useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import Loader from "../../components/atoms/Loader/Loader";
import { BNB, WBNB } from "../../constant/currencies";
import Input from "../../components/atoms/Form/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { BNBIcon, SwapIcon } from "./../../components/atoms/svg";
import { BNBIcon, SwapIcon } from "./../../components/atoms/svg";
import { useSelector } from "react-redux";
import { useWrappedBNBContract } from "../../hooks/useContract";
import useAccountDetails from "../../hooks/useAccountDetails";

const { Option } = Select

const TokenWrapper = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`

const Icon = styled.img`
  margin-right: 10px;
  width: 18px;
  height: 18px;
`

const Footer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
  align-items: center;
  width: 100%;
`

const StyledButton = styled(Button)`
  font-size: 14px;
`

const InputWrapper = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  .custom-input-wrapper {
    width: 100%;
  }

  input {
    padding-right: 80px !important;
  }
`

const StyledText = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  opacity: 0.6;
  margin-top: 10px;
  margin-right: 20px;
`

const SwapIconWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg1};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  &:after {
    position: absolute;
  }

  &:hover {
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const getSchema = (fromMax) => {
  const Schema = Yup.object().shape({
    from: Yup.number()
      .typeError('Invalid amount')
      .required('Required')
      .min(0.0001, 'Value cannot be lesser than 0.0001')
      .max(fromMax, `Insufficient balance`),
  })

  return Schema
}

const ConvertTokens = ({ close, onClickCancel }) => {
  const { walletBalance, conversionRate } = useSelector((state: any) => state.auth)

  const [loading, setLoading] = useState(false)
  const [transactionComplete, setTransactionComplete] = useState(false)
  const [tokens, setTokens] = useState({
    from: {
      ...BNB,
      balance: walletBalance.BNB,
    },
    to: {
      ...WBNB,
      balance: walletBalance.WBNB,
    },
  })

  const wbnbContract = useWrappedBNBContract()
  const { fetchbalance } = useAccountDetails()

  const formik = useFormik({
    initialValues: {
      from: null,
      to: null,
    },
    validationSchema: getSchema(tokens.from.balance),
    onSubmit: (values) => {
      convertTokens()
    },
  })

  const swapTokens = () => {
    setTokens({
      from: tokens.to,
      to: tokens.from,
    })
  }

  const convertTokens = async () => {
    setLoading(true)

    try {
      let tx = null
      const price = BNB.decimalFix(formik.values.from)
      if (tokens.to.symbol === WBNB.symbol) {
        tx = await wbnbContract.deposit({
          value: price,
        })
      } else if (tokens.to.symbol === BNB.symbol) {
        tx = await wbnbContract.withdraw(price)
      }

      await tx.wait()
      setTransactionComplete(true)
      fetchbalance()
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  const getBalance = (balance) => {
    return `${balance.toFixed(4)}`
  }

  const handleCancel = () => {
    close()
    if (onClickCancel) onClickCancel()
  }

  if (transactionComplete) {
    return (
      <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
        <Text fontSize="20px" fontWeight="600" mb={'30px'} textAlign="center">
          Convert tokens
        </Text>
        <Text fontSize="20px" fontWeight="600" mb={'10px'} textAlign="center">
          Transaction complete!
        </Text>
        <Text textAlign="center">
          Your {formik.values.from} {tokens.to.symbol} has been added to your account and will appear in your wallet
          shortly.
        </Text>

        <Button variant="primaryLight" mt={20} minWidth={100} onClick={handleCancel}>
          Close
        </Button>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading ? (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'30px'}>
            Convert tokens
          </Text>

          <Box width="100%">
            <InputWrapper>
              <Input
                type="text"
                label=""
                placeholder="Enter Amount"
                name="from"
                errors={formik.errors}
                touched={formik.touched}
                value={formik.values.from}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                suffix={() => (
                  <TokenWrapper>
                    <BNBIcon mr={2} />
                    {tokens.from.symbol}
                  </TokenWrapper>
                )}
              />
            </InputWrapper>

            <StyledText textAlign="end">Balance: {getBalance(tokens.from.balance)}</StyledText>
          </Box>

          <SwapIconWrapper width="100%">
            <span onClick={swapTokens} style={{ cursor: 'pointer' }}>
              <SwapIcon />
            </span>
          </SwapIconWrapper>

          <Box width="100%">
            <InputWrapper>
              <Input
                type="text"
                label=""
                placeholder="Enter Amount"
                name="to"
                value={formik.values.from}
                disabled={true}
                suffix={() => (
                  <TokenWrapper>
                    <BNBIcon mr={2} />
                    {tokens.to.symbol}
                  </TokenWrapper>
                )}
              />
            </InputWrapper>
            <StyledText textAlign="end">Balance: {getBalance(tokens.to.balance)}</StyledText>
          </Box>

          <Footer>
            <StyledButton variant="primaryLight" minWidth={100} mr={10} onClick={handleCancel}>
              Back
            </StyledButton>
            <StyledButton
              variant="solid"
              minWidth={100}
              onClick={convertTokens}
              disabled={!!Object.keys(formik.errors).length || !formik.values.from}
            >
              Convert
            </StyledButton>
          </Footer>
        </>
      ) : (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600" textAlign="center">
            Swapping {tokens.from.symbol} to {tokens.to.symbol}...
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20} textAlign="center">
            Your {tokens.to.symbol} will be added to your account once the transaction is processed.
          </Text>
        </>
      )}
    </Flex>
  )
}

export default ConvertTokens
