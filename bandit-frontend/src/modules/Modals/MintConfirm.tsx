import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from '../../components/atoms/StyledSystem'
import { Button } from '../../components/atomsV2/Button'

import { NotifyWarningIcon } from "../../components/atoms/svg";

const Wrapper = styled(Flex)``

const MintConfirm = ({ close, callback }) => {

  const onClickConfirm = () =>{
    callback()
    close()
  }

  return (
    <Wrapper flexDirection="column" alignItems="center" backgroundColor="backgroundAlt" mt={10}>
      <Flex>
        <NotifyWarningIcon/>
        <Text fontSize={[16, 20]} fontWeight="600" color="foreground" textAlign="center" ml={"5px"}>
          Caution
        </Text>
      </Flex>



      <Text fontSize="14px" textAlign="center">
        We, as a platform, assist in the aggregation of the most recent projects for minting;
        nonetheless, please conduct your due diligence before minting.
      </Text>

      <Flex mt={20}>
        <Button scale="sm" onClick={close}>Cancel</Button>
        <Button scale="sm" onClick={onClickConfirm} ml={20}>Confirm</Button>
      </Flex>
    </Wrapper>
  )
}

export default MintConfirm
