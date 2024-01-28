import React from "react";
import { Box, Flex, Text } from "../../../components/atoms/StyledSystem";
import { Button } from "../../../components/atomsV2/Button";

const RequireSignature = ({ requireSignature, close, signing }) => {
  return (
    <Box>
      <Text fontSize={[16, 18, 24]} fontWeight={600} lineHeight={'120%'} textAlign="center" mt={20} color="text">
        Sign the message in your wallet to continue
      </Text>
      <Text fontSize={[12, 12, 16]} fontWeight={400} lineHeight={'120%'} textAlign="center" mt={10} color="text">
        This signature is used to verify that you are the owner of this address.
      </Text>
      <Flex justifyContent="center" width="100%" mt={30}>
        <Button variant="tertiary" scale="sm" mr={20} onClick={close} minWidth="140px">
          Disconnect
        </Button>
        <Button variant="primary" scale="sm" onClick={requireSignature} loading={signing} minWidth="140px">
          {signing ? 'Waiting...' : 'Continue'}
        </Button>
      </Flex>
    </Box>
  )
}

export default RequireSignature
