import React from 'react'
import styled from 'styled-components'

import { shareOntwitter } from 'utils'
import { Flex, Text } from '../../components/atoms/StyledSystem'
import { Button } from '../../components/atomsV2/Button'

import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import { TwitterIcon } from '../../components/atoms/svg'
import useTheme from '../../hooks/useTheme'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from '../../constant/chains'

const Wrapper = styled(Flex)``

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    color: ${({ theme }) => theme.colors.foreground} !important;
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
`

const ListForSale = ({ close, collectionDetails }) => {
  const { theme } = useTheme()
  const { name, contractAddress, chainId } = collectionDetails

  const shareOntwitter = () => {
    const message = `@OnBndit, I minted a fantastic item, from ${name} collection (${window.origin}/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[chainId]}/${contractAddress}). Don’t miss Bandit network’s interesting collections.`
    var href = `https://twitter.com/intent/tweet?text=${message}`
    window.open(href, '_blank')
  }

  return (
    <Wrapper flexDirection="column" alignItems="center" backgroundColor="backgroundAlt" mt={10}>
      <Text fontSize={[16, 20]} fontWeight="600" color="foreground" textAlign="center">
        Congratulations on successfully <br /> minting {name}
      </Text>
      <StyledButton
        mt={10}
        variant="primary"
        scale={'sm'}
        onClick={shareOntwitter}
        endIcon={<TwitterIcon width={20} height={20} iconcolor={theme.colors.foreground} />}
      >
        Share
      </StyledButton>
    </Wrapper>
  )
}

export default ListForSale
