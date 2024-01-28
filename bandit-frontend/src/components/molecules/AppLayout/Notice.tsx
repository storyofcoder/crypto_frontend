import { Flex } from 'components/atoms/StyledSystem'
import React, { useRef } from 'react'
import styled from 'styled-components'
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints'
import useComponentMount from '../../../hooks/useComponentMount'

const Container = styled.div`
  transition: height 2s linear;
  overflow: hidden;

  @keyframes floatText {
    to {
      transform: translateX(-100%);
    }
  }
`
const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.backgroundAlt};
  color: ${(p) => p.theme.colors.bg2};
  text-align: center;
  position: relative;
  height: ${(p) => (p.open ? 'auto' : '0px')}; ;
`

const StyledText = styled.div`
  flex: 1;
  font-size: 14px;
  padding-left: ${(p) => (p.requireTextAnimation ? '100%' : '')};
  white-space: nowrap;
  animation: ${(p) => (p.requireTextAnimation ? 'floatText 15s infinite linear' : '')};
  color: ${(p) => p.theme.colors.foreground};
  &:hover {
    animation-play-state: paused;
  }
`

const Notice = () => {
  const { isDesktop } = useMatchBreakpoints()

  const { isMounted } = useComponentMount()

  const requireTextAnimation = isMounted && !isDesktop

  return (
    <Container>
      <Wrapper open={true}>
        <Flex alignItems="center" p={10}>
          <StyledText requireTextAnimation={requireTextAnimation}>
            We, as a platform, assist in the aggregation of the most recent projects for minting; nonetheless, please
            conduct your due diligence before minting.
          </StyledText>
        </Flex>
      </Wrapper>
    </Container>
  )
}

export default Notice
