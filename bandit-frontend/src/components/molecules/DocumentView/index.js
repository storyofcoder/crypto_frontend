import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Element } from "react-scroll";

import { RightIcon } from "../../../components/atoms/svg";
import { useWindowSize } from "../../../services/hooks";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

const Wrapper = styled.div`
  display: flex;
  position: relative;

  .leftNavItemLink {
    color: #000000 !important;
    .number {
      color: #ffffff !important;
      background-color: #000000 !important;
    }
    .text {
    }
    .icon {
      display: block;
    }
  }
`
const SmallDevice = styled.div`
  h3 {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 10px;
  }
  h6 {
    font-weight: 600;
    font-size: 12px;
  }

  p {
    color: #000000;
    margin: 20px 0;
  }
`

const SmallDeviceContent = styled.div`
  background-color: ${(p) => p.theme.colors.bg5};
  border-radius: 18px;
  padding: 20px;
`

const LeftNav = styled.div`
  flex: 1;
  background-color: ${(p) => p.theme.colors.bg5};
  border-radius: 18px;
  padding: 20px;
  margin-right: 40px;
  max-height: 85vh;
  overflow-y: auto;
  position: sticky;
  top: 100px;
`

const RightContent = styled.div`
  flex: 3;
  margin-bottom: 20px;
  min-width: 0;
`
const MainTitles = styled.div`
  h3 {
    font-weight: 600;
    font-size: 42px;
    margin-bottom: 10px;
  }
  h6 {
    font-weight: 600;
    font-size: 18px;
  }

  p {
    color: #000000;
    margin-top: 40px;
  }
`
const ContentWrapper = styled.div`
  color: #000000;
  padding-bottom: 50vh;
  p {
    font-size: 14px;
  }
`
const StyledNavItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
`

const Number = styled.div`
  min-width: 40px;
  min-height: 40px;
  background-color: #c4c4c4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  background-color: ${(p) => (p.active ? '#000000' : '#c4c4c4')};
  color: ${(p) => (p.active ? '#ffffff' : '#677788')}; ;
`
const Text = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-left: 10px;
  color: ${(p) => (p.active ? '#000000' : '#677788')}; ;
`

const IconWrapper = styled.div`
  margin-left: auto;
  display: none;
`
const IconWrapper2 = styled.div`
  margin-left: auto;

  svg {
    transform: rotate(${(p) => (p.active ? '90deg' : '0')});
  }
`
const StyledTitleWithDivider = styled.div`
  margin-left: auto;
  margin-top: 40px;
  h4 {
    position: relative;
    font-weight: 600;
    font-size: 22px;
    overflow: hidden;
    color: #000000 !important;
    opacity: 1;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.6);
      bottom: 5px;
      margin-left: 15px;
      opacity: 0.6;
    }
  }
`

const DocumentView = (props) => {
  const { document, contentList, hideContentTitle } = props
  const leftNav = useRef()
  const size = useWindowSize()

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleScroll(e) {
    const element = window.document.getElementsByClassName('leftNavItemLink')[0]

    if (!element || !leftNav || !leftNav.current) return
    const cTop = leftNav.current?.scrollTop
    const cBottom = cTop + leftNav.current.clientHeight

    let eTop = element.offsetTop
    let eBottom = eTop + element.clientHeight

    if (eTop < cTop) {
      if (leftNav && leftNav.current && leftNav.current.scrollTop) {
        leftNav.current.scrollTop -= cTop - eTop + 60
      }
    } else if (eBottom > cBottom) {
      if (leftNav && leftNav.current && leftNav.current.scrollTop) {
        leftNav.current.scrollTop += eBottom - cBottom + 60
      }
    }
  }

  return (
    <>
      {size.width < 786 ? (
        <SmallDevice>
          <h3>{document.title}</h3>
          <h6>{document.lastUpdate}</h6>
          <p>{document.description}</p>
          <SmallDeviceContent>
            {contentList.map((item, i) => (
              <SmallContentItem key={i} index={i} data={item} />
            ))}
          </SmallDeviceContent>
        </SmallDevice>
      ) : (
        <Wrapper>
          <LeftNav ref={leftNav}>
            {contentList.map((item, i) => (
              <NextLinkFromReactRouter
                key={i}
                activeClass="leftNavItemLink"
                to={`#${item.scrollId}`}
                spy={true}
                // offset={-200}
                offset={-120}
                duration={500}
              >
                <NavItem number={i + 1} title={item.title} />
              </NextLinkFromReactRouter>
            ))}
          </LeftNav>
          <RightContent>
            <MainTitles>
              <h3>{document.title}</h3>
              <h6>{document.lastUpdate}</h6>
              <p>{document.description}</p>
            </MainTitles>
            <ContentWrapper>
              {contentList.map((item, i) => (
                <Element key={i} name={item.scrollId} className="">
                  <div>
                    {!hideContentTitle && <TitleWithDivider title={item.title} />}
                    {item.renderContent()}
                  </div>
                </Element>
              ))}
            </ContentWrapper>
          </RightContent>
        </Wrapper>
      )}
    </>
  )
}

const SmallContentItem = ({ data, index }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div onClick={() => setShow(!show)}>
        <StyledNavItem>
          <Number active={show}>{index + 1}</Number>
          <Text active={show}>{data.title}</Text>
          <IconWrapper2 active={show}>
            <RightIcon />
          </IconWrapper2>
        </StyledNavItem>
      </div>
      {show && <div style={{ marginBottom: '24px' }}>{data.renderContent()}</div>}
    </div>
  )
}

const NavItem = ({ number, title }) => {
  return (
    <StyledNavItem>
      <Number className="number">{number}</Number>
      <Text className="text">{title}</Text>
      <IconWrapper className="icon">
        <RightIcon />
      </IconWrapper>
    </StyledNavItem>
  )
}

const TitleWithDivider = ({ title }) => {
  return (
    <StyledTitleWithDivider>
      <h4>{title}</h4>
    </StyledTitleWithDivider>
  )
}

export default DocumentView
