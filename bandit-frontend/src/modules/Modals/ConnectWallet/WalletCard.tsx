import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'
import styled from 'styled-components'

const Card = styled(Box)`
  border: 1.5px solid ${(p) => p.theme.colors.border};
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.backgroundAlt};
  }

  .not-available {
    font-size: 11px;
    margin-left: 10px;
  }
`

const WalletCard = ({ header, icon: Icon, onClick }: any) => {
  return (
    <Card paddingX={20} paddingY={10} mb={10} onClick={onClick}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize={14} fontWeight={600}>
          {header}
        </Text>
        <Box width={30} height={30}>
          <Icon height={30} width={30} />
        </Box>
      </Flex>
    </Card>
  )
}

export default WalletCard
