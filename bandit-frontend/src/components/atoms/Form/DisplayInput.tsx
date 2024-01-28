import React from 'react'
import styled from 'styled-components'

import { Flex, Text } from '../StyledSystem'

const FieldSet = styled.fieldset`
  display: inline-block;
  color: ${(p) => p.theme.colors.text};
`

const DisplayInput = ({ legend, text, sideText }: any) => {
  return (
    <FieldSet className="display-input">
      <Text mb={'8px'} fontSize={'14px'} fontWeight={400}>
        {legend}
      </Text>
      <Flex>
        <Text fontSize={26} fontWeight={700} fontFamily="roc-grotesk" lineHeight="100%">
          {text}
        </Text>{' '}
        &nbsp;
        <Text fontSize={15} fontFamily="roc-grotesk" fontWeight={400}>
          {sideText}
        </Text>
      </Flex>
    </FieldSet>
  )
}

export default DisplayInput
