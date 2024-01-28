import React, { useEffect, useState } from "react";
import Button from "../../components/atoms/Button/Button";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import { SwapIcon } from "../../components/atoms/svg/images2";
import useWalletModal from "../../hooks/useWalletModal";

const WrongNetwork = ({ close }) => {
  const [networkName, setNetworkName] = useState('')
  const { onPresentConnectModal } = useWalletModal()
  useEffect(() => {
    if (['development', 'qa'].includes(process.env.NEXT_PUBLIC_NODE_ENV)) {
      setNetworkName('supported network')
    } else {
      setNetworkName('supported network')
    }
  }, [])
  async function switchNetwork() {
    try {
      await onPresentConnectModal()
      close()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2">
      <SwapIcon width={60} />
      <Text fontSize="large" fontWeight="600" fontFamily="roc-grotesk" marginY={10}>
        Wrong network
      </Text>
      <Text textAlign="center">
        Your wallet is currently connected to a different network. Please change it to the{' '}
        <strong>{networkName}</strong> to continue.
      </Text>
      <Flex width="100%" justifyContent="space-evenly" mt={20}>
        <Button variant="primary" onClick={switchNetwork}>
          Change
        </Button>
      </Flex>
    </Flex>
  )
}

export default WrongNetwork
