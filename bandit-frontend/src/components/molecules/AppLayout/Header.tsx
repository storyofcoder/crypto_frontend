import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer, Layout } from 'antd'
import styled from 'styled-components'

import { Box, Flex, Text } from '../../atoms/StyledSystem'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { NextLinkFromReactRouter } from '../../atoms/NextLink'
import { logo_default, logo_white_default } from '../../../../public/assets/images'
import HeaderRightNav from '../../../modules/layout/HeaderRightNav'
import SideNav from '../../../modules/layout/SideNav'
import ThemeSwitch from '../../atomsV2/Theme/ThemeSwitch'
import useTheme from '../../../hooks/useTheme'
import Support from '../../atomsV2/Support'
import BannerMessage from './BannerMessage'

const { Header } = Layout

const Container = styled(Box)`
  background: ${(p) => p.theme.colors.headerBackground} !important;
  position: sticky;
  top: 0;
  width: 100%;
  //height: 64px;
  z-index: 50;
  //transition: box-shadow 0.2s ease 0s, background-color 0.2s ease 0s;
  box-shadow: ${(p) => p.theme.colors.headerBorderBottom};
  backdrop-filter: saturate(180%) blur(5px);
`

const StyledHeader = styled(Header)`
  z-index: ${(p) => p.theme.zIndexes[7]};
  padding: 0 20px;

  ${(p) => p.theme.media.md} {
    padding: 0 40px;
  }

  .active {
    opacity: 1;
  }
`

const StyledNavLink = styled.span<any>`
  font-size: 14px;
  padding: 5px 15px;
  margin-right: 10px;
  color: ${(p) => (p.active ? p.theme.colors.foreground : p.theme.colors.text)};
  font-weight: ${(p) => (p.active ? 600 : 400)};
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.colors.foreground};
  }
`
const StyledLink = styled.span<any>`
  font-size: 14px;
  padding: 5px 15px;
  color: ${(p) => (p.active === 'true' ? p.theme.colors.foreground : p.theme.colors.text)};
  margin-right: 10px;
  font-weight: 400;

  &:hover {
    color: ${(p) => p.theme.colors.foreground};
  }
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: auto;

  img {
    margin-right: 30px !important;
  }
`

const MenuIcon = styled(MenuOutlined)`
  color: ${(p) => p.theme.colors.text};
  font-size: 20px;
  margin-right: 10px;
  display: none;

  ${(p) => p.theme.media.xs} {
    display: block;
  }
  ${(p) => p.theme.media.sm} {
    display: block;
  }
  ${(p) => p.theme.media.md} {
    display: none;
  }
`
const Navs = styled.div`
  display: none;

  ${(p) => p.theme.media.md} {
    display: block;
  }
`

const Logo = styled(Text)`
  position: relative;

  span {
    position: absolute;
    right: -30px;
    top: -7px;
    font-size: 10px;
  }
`

const StyledDrawer = styled(Drawer)`
  .active-mobile-nav {
    background-color: ${(p) => p.theme.colors.bg1};
  }
`

const NotificationCount = styled.div`
  position: absolute;
  background: #f02849;
  line-height: 20px;
  border-radius: 50%;
  font-size: 12px;
  width: 15px;
  height: 15px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 12px;
  margin-left: 11px;
  display: none;

  ${(p) => p.theme.media.xs} {
    display: block;
  }
`

const HeaderCustom = () => {
  const [sideMenu, setSideMenu] = useState(false)
  const { isLoggedIn } = useSelector((state: any) => state.auth)
  const { isDark } = useTheme()

  const router = useRouter()
  const { pathname } = router
  const ref = useRef(null)

  useEffect(() => {
    // const user: any = JSON.parse(localStorage.getItem('user'))
    // if (!!user) {
    //   dispatch(getFollowings(user.username))
    //   dispatch(getFollowers(user.username))
    //   dispatch(getUser())
    // }
  }, [])

  useEffect(() => {
    ref.current.style.transform = 'translateY(0px)'
  }, [pathname])

  useEffect(() => {
    setSideMenu(false)
  }, [pathname])

  function handleSideMenu() {
    setSideMenu(true)
  }

  const onClose = () => {
    setSideMenu(false)
  }
  const goTo = (e, to) => {
    switch (to) {
      case '/rankings':
        Mixpanel.track(MixpanelEvents.NAV_LINK_CLICK, {
          id: e.target.innerText,
        })
        break
      case '/activity':
        Mixpanel.track(MixpanelEvents.NAV_LINK_CLICK, {
          id: e.target.innerText,
        })
        break
    }

    // if (to === "/rankings") {
    //   Mixpanel.track(MixpanelEvents.RANKINGS_CLICK);
    // } else {
    //   Mixpanel.track(MixpanelEvents.ACTIVITY_CLICK);
    // }

    router.push(to)
  }

  const onClickNav = (e) => {
    Mixpanel.track(MixpanelEvents.NAV_LINK_CLICK, {
      id: e.target.innerText,
    })
  }

  const { un_readnotifications } = useSelector((state: any) => state.profile)

  return (
    <Container ref={ref}>
      <BannerMessage />
      <StyledHeader className="header">
        <Flex alignItems="center" justifyContent="space-between" height={'100%'}>
          {/*<span onClick={handleSideMenu}>*/}
          {/*  <MenuIcon />*/}
          {/*</span>*/}

          <NextLinkFromReactRouter to="/" activeClassName="logo-active">
            <LogoWrapper style={{ position: 'relative' }}>
              <Link href="/">
                <Logo fontWeight={500} fontSize={24}>
                  Bandit
                  <span>BETA</span>
                </Logo>
              </Link>
              {/*<Image className="header--logo" src={isDark ? logo_white_default : logo_default} alt="logo" />*/}
              {/*<img src={logo_white} alt="logo" className="header--logo-white" />*/}
            </LogoWrapper>
          </NextLinkFromReactRouter>
          {
            <Navs id="nav-bar" style={{ position: 'relative' }}>
              {/*<NextLinkFromReactRouter to={'/explore'}>*/}
              {/*  <StyledLink active={['/explore', '/explore/activity'].includes(pathname).toString()}>*/}
              {/*    Explore*/}
              {/*  </StyledLink>*/}
              {/*</NextLinkFromReactRouter>*/}

              {/* <NextLinkFromReactRouter to="/collections">
                <StyledNavLink active={pathname == '/collections'} onClick={onClickNav}>
                  Collections
                </StyledNavLink>
              </NextLinkFromReactRouter>
              <NextLinkFromReactRouter to="/stats">
                <StyledNavLink active={pathname == '/stats'} onClick={onClickNav}>
                  Stats
                </StyledNavLink>
              </NextLinkFromReactRouter>
              <NextLinkFromReactRouter to="/about">
                <StyledNavLink active={pathname == '/about'} onClick={onClickNav}>
                  About
                </StyledNavLink>
              </NextLinkFromReactRouter> */}
            </Navs>
          }

          {/*<Search />*/}
          {/*{isLoggedIn && <Notification />}*/}
          <Flex alignItems="center">
            <ThemeSwitch />
            <Support />
            <HeaderRightNav />
          </Flex>
        </Flex>
      </StyledHeader>

      <StyledDrawer
        title={
          <NextLinkFromReactRouter to="/">
            <Image src={logo_default} alt="logo" width={145} height={33.01} />
          </NextLinkFromReactRouter>
        }
        placement="left"
        closable={true}
        onClose={onClose}
        visible={sideMenu}
      >
        <SideNav un_readnotifications={un_readnotifications} />
      </StyledDrawer>
    </Container>
  )
}

export default HeaderCustom
