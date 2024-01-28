import TokenIcon from 'components/atoms/svg/tokenIcon'
import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from '../../../../components/atoms/StyledSystem'
import { makeFriendlyNumber } from '../../../../utils'

const Wrapper = styled(Box)`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.shadows.small};;
  padding: 10px;
  margin: 20px 5px 0 5px;


  ${(p) => p.theme.media.md} {
    position: absolute;
    left: 40px;
    transform: translateY(-50%);
    display: flex;
    margin-top: 0;
    z-index: 1;

  }
`

const StyledStatsItem = styled(Flex)`
  align-items: center;
  margin-right: 20px;
  padding-right: 20px;
  display: inline-flex;

  ${(p) => p.theme.media.sm} {
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.colors.grey900};
    }
  }
`

const Stats = ({ chainId, maxMint, totalSupply, mintPercentage, price }) => {
  return (
    <Wrapper>
      <StatsItem title="Price" value={price} Icon={<TokenIcon width={16} height={16} chainId={chainId} mr="4px"/>} />
      <StatsItem title="Items" value={totalSupply} />
      <StatsItem title="Supply" value={maxMint} />
      <StatsItem title="Mint %" value={mintPercentage} />
    </Wrapper>
  )
}

const StatsItem = ({ title, value, Icon }: any) => {
  return (
    <StyledStatsItem>
      <Text color="text" fontSize="14px" fontWeight="400" mr={'5px'}>
        {title}:
      </Text>
      <Flex alignItems="center">
        {Icon && Icon}
        <Text fontSize="14px" fontWeight="600" title={value}>
          {isNaN(value) ? value : makeFriendlyNumber(value)}
        </Text>
      </Flex>
    </StyledStatsItem>
  )
}

export default Stats
