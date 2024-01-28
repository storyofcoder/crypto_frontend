import React from "react";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";

import { WarningOutlined } from "@ant-design/icons";
import { isFirefox } from "react-device-detect";

const WalletNotFound = () => {
  function install() {
    if (isFirefox) {
      window.open('https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/', '_blank')
    } else {
      window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank')
    }
  }
  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2">
      <Text fontSize="large" fontWeight="600" fontFamily="roc-grotesk">
        Wallet not found
      </Text>
      <WarningOutlined style={{ fontSize: '130px' }} />
      <Text textAlign="center" mt={20}>
        Please install Metamask wallet
      </Text>

      <Flex width="100%" justifyContent="space-evenly" mt={10}>
        <Button variant="primary" onClick={install}>
          Install metamask wallet
        </Button>
      </Flex>
    </Flex>
  )
}

export default WalletNotFound
