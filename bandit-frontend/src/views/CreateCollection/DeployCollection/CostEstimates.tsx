import React from 'react'
import { Flex, Text, Box } from '../../../components/atoms/StyledSystem'
import Switch from '../../../components/atoms/Switch/Switch'
import styled from 'styled-components'

const CostEstimates = () => {
  return (
    <Box>
      <Flex color="text" mb={10}>
        <Text fontSize={18} fontWeight={600} color="text">
          Cost Estimates
        </Text>
        <Flex ml={'auto'}>
          ETH
          <Box ml={10} mr={10}>
            <Switch onChange={(e) => {}} />
          </Box>
          USD
        </Flex>
      </Flex>
      <Box>
        <Title>
          CONTRACT <span />
        </Title>
        <StyledValue>
          Contract deploy <span>0.04ETH</span>
        </StyledValue>
      </Box>
      <Box>
        <Title>
          MINTING <span />
        </Title>
        <StyledValue>
          Mint one ERC721 <span>0.002ETH</span>
        </StyledValue>
        <StyledValue>
          Mint one ERC1155 <span>0.003ETH</span>
        </StyledValue>
      </Box>

    </Box>
  )
}

const Title = styled(Flex)`
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 10px;

  span {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
  }
`

const StyledValue = styled(Flex)`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  span{
    margin-left: auto;
  }
`

export default CostEstimates
