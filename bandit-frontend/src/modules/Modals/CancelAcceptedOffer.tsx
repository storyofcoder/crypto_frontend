import React from "react";
import { Flex, Text } from "../../components/atoms/StyledSystem";

const CancelAcceptedOffer = () => {
  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      <Text fontSize="20px" fontWeight="600" mb={'5px'} textAlign="center">
        You have an accepted offer on this NFT, Please cancel it before burning.
      </Text>
    </Flex>
  )
}

export default CancelAcceptedOffer
