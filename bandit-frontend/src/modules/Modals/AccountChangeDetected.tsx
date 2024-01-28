import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import { truncateAddress } from "../../utils";

const AccountChangeDetected = ({ close }) => {
  const { account } = useWeb3React()

  function onClickRefresh() {
    close()
    window.location.reload()
  }
  return (
    <div>
      <Flex flexDirection="column" alignItems="center">
        <Text fontSize={22} fontWeight="600">
          Account has been changed to
        </Text>
        <Text fontSize={22} fontWeight="600" mb={10}>
          {truncateAddress(account, 8)}
        </Text>
        <Button variant="secondary" onClick={onClickRefresh}>
          Refresh
        </Button>
      </Flex>
    </div>
  )
}

export default AccountChangeDetected
