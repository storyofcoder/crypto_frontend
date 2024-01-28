import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import transakSDK from "@transak/transak-sdk";
import styled from "styled-components";
import { hideModal, MODAL, showModal } from "./index";
import { useSelector } from "react-redux";
import { CryptoIcon } from "../../components/atoms/svg/images2";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import CloseIcon from "../../components/atoms/svg/images/close";
import { isMobile } from "react-device-detect";

const Link = styled(Text)`
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: ${(p) => p.theme.colors.text4};
  }
`
const Close = styled.div`
  position: absolute;
  right: -25px;

  path {
    color: #ffffff;
  }
`

const TextWrapper = styled(Text)`
  word-break: break-all;
`

const NotEnoughBalanceModal = ({ deposit = false, close }: any) => {
  const user = useSelector((state: any) => state.auth.user)
  const { account } = useActiveWeb3React()

  function openTransak() {
    hideModal()
    let transak = new transakSDK({
      apiKey: process.env.NEXT_PUBLIC_TRANSAK_KEY, // Your API Key (Required)
      environment: process.env.NEXT_PUBLIC_TRANSAK_ENV, // STAGING/PRODUCTION (Required)
      defaultCryptoCurrency: 'WRX',
      fiatCurrency: '',
      walletAddress: account, // Your customer wallet address
      themeColor: '000000', // App theme color in hex
      email: user.email, // Your customer email address (Optional)
      redirectURL: '',
      hostURL: window.location.origin, // Required field
      widgetHeight: '550px',
      widgetWidth: '450px',
    })

    transak.init()

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data)
    })

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
      transak.close()
    })

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData)
      transak.close()
    })
  }

  function openSimplex() {
    showModal(MODAL.SIMPLEX, {})
  }

  function playVideo() {
    close()
    showModal(
      MODAL.VIDEO_PLAYER,
      { url: 'https://youtu.be/PfhKLW741ho' },
      {
        width: isMobile ? '80%' : '60%',
        bodyStyle: { padding: 0 },
        closeIcon: (
          <Close>
            <CloseIcon />
          </Close>
        ),
      },
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2">
      <Text fontSize="large" fontWeight="600" fontFamily="roc-grotesk">
        {deposit ? 'Buy crypto with fiat' : 'Not enough balance'}
      </Text>
      {deposit ? <CryptoIcon width="100px" height="100px" /> : <WarningOutlined style={{ fontSize: '130px' }} />}
      <TextWrapper textAlign="center" mt="20px">
        Send WRX to your BSC wallet address <br />
        {account}
      </TextWrapper>
      <Text textAlign="center">or</Text>
      <Text textAlign="center">
        Use Transak to load your crypto wallet using any <br /> fiat currency{' '}
      </Text>

      <Flex width="100%" justifyContent="space-evenly" mt={20}>
        <Button variant="primary" onClick={openTransak}>
          Buy Crypto
        </Button>
        {/*<Button variant="primary" onClick={openSimplex} disabled={true}>*/}
        {/*  Open Simplex*/}
        {/*</Button>*/}
      </Flex>

      <Flex flexDirection="column" alignItems="center" mt={20}>
        <Text>New to crypto?</Text>
        <Link onClick={playVideo}>Learn more about how to buy WRX.</Link>
      </Flex>
    </Flex>
  )
}

export default NotEnoughBalanceModal
