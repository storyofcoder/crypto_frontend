import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Flex } from '../../../components/atoms/StyledSystem'
import { BANNER_MESSAGE, READ_BANNER_MESSAGE } from '../../../utils/storagekeys'

import CloseIcon from '../../../components/atoms/svg/images/close'
import API from '../../../services/API'
import { useGetBanner } from '../../../state/hooks'
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints'
import useComponentMount from '../../../hooks/useComponentMount'
import { useWindowSize } from '../../../services/hooks'

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
  background-color: #fcf9c2;
  text-align: center;
  position: relative;
  height: ${(p) => (p.open ? 'auto' : '0px')}; ;
`
const CloseIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcf9c2;

  svg {
    width: 15px;
    height: 15px;

    path {
      stroke: ${(p) => p.theme.colors.black} !important;
    }
  }
`
const StyledText = styled.div`
  flex: 1;
  font-size: 14px;
  padding-left: ${(p) => (p.requireTextAnimation ? '100%' : '')};
  white-space: nowrap;
  animation: ${(p) => (p.requireTextAnimation ? 'floatText 15s infinite linear' : '')};
  color: ${(p) => p.theme.colors.black};
  margin-right: 50px;
  &:hover {
    animation-play-state: paused;
  }
`
const StyledLink = styled.a`
  color: ${(p) => p.theme.colors.black};
  padding-bottom: 4px;
  border-bottom: 1px solid ${(p) => p.theme.colors.black};
  border-bottom-style: dashed;
  &:hover {
    color: ${(p) => p.theme.colors.black};
  }
`

const BannerMessage = () => {
  const [message, setMessage]: any = useState({})
  const [open, setOpen] = useState(false)

  const textRef = useRef()

  const { width } = useWindowSize()

  const bannerData: any = useGetBanner()

  const { isDesktop } = useMatchBreakpoints()

  const { isMounted } = useComponentMount()

  function decideToShowMessage(message) {
    const readBannerMessage = localStorage.getItem(READ_BANNER_MESSAGE)
    const bannerMessage = localStorage.getItem(BANNER_MESSAGE)

    if (!message?.length) {
      return setOpen(false)
    }

    if (readBannerMessage !== 'read' || message !== bannerMessage) {
      localStorage.removeItem(READ_BANNER_MESSAGE)
      setOpen(true)
    }
  }

  useEffect(() => {
    if (bannerData) {
      setMessage(bannerData)
      decideToShowMessage(bannerData.message)
      localStorage.setItem(BANNER_MESSAGE, bannerData.message)
    }
  }, [bannerData])

  const requireTextAnimation = textRef?.current?.offsetWidth > width

  function closeBanner() {
    localStorage.setItem(READ_BANNER_MESSAGE, 'read')
    setOpen(false)
  }

  return (
    <Container>
      <Wrapper open={open}>
        <Flex alignItems="center" p={10}>
          <StyledText requireTextAnimation={requireTextAnimation} ref={textRef}>
            {message?.message} &nbsp;{' '}
            {!!message?.clickText?.length && (
              <StyledLink href={message?.Link} target={message?.openNewTab ? '_blank' : ''}>
                {message?.clickText}
              </StyledLink>
            )}
          </StyledText>
          <CloseIconWrapper onClick={closeBanner}>
            <CloseIcon />
          </CloseIconWrapper>
        </Flex>
      </Wrapper>
    </Container>
  )
}

export default BannerMessage
