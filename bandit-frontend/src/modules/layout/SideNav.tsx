import React from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button/Button";
import { Flex } from "../../components/atoms/StyledSystem";

import { useSelector } from "react-redux";
import useWalletModal from "../../hooks/useWalletModal";
import { isMobile } from "react-device-detect";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";

const StyledNavLink = styled.span`
  font-size: 14px;
  border-radius: 60px;
  padding: 10px 15px;
  color: ${(p) => p.theme.colors.text};
  margin-right: 20px;
  display: flex;
`
const StyledButton = styled(Button)`
  font-size: 14px;
  border-radius: 60px;
  padding: 10px 15px;
  color: ${(p) => p.theme.colors.text};
  margin-right: 20px;
  border: none;
  box-shadow: none;
`

const NotificatioCount = styled.div`
  background: #f02849;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
  color: white;
  width: 22px;
  height: 22px;
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`

const SideNav = (props) => {
  const { isLoggedIn, user } = useSelector((state: any) => state.auth)
  const { onPresentConnectModal } = useWalletModal()

  function becomeCreator() {
    window.open('https://forms.gle/Ko8Ucipukz6B5hyF9')
  }

  return (
    <Flex flexDirection="column" height="100%">
      <NextLinkFromReactRouter to="/nfts" activeClassName="active-mobile-nav">
        <StyledNavLink>Discover</StyledNavLink>
      </NextLinkFromReactRouter>
      <NextLinkFromReactRouter to="/creators" activeClassName="active-mobile-nav">
        <StyledNavLink>Creators</StyledNavLink>
      </NextLinkFromReactRouter>
      <NextLinkFromReactRouter to="/collectors" activeClassName="active-mobile-nav">
        <StyledNavLink>Collectors</StyledNavLink>
      </NextLinkFromReactRouter>
      <NextLinkFromReactRouter to="/rankings" activeClassName="active-mobile-nav">
        <StyledNavLink>Rankings</StyledNavLink>
      </NextLinkFromReactRouter>
      <NextLinkFromReactRouter to="/activity" activeClassName="active-mobile-nav">
        <StyledNavLink>Activity</StyledNavLink>
      </NextLinkFromReactRouter>

      {isMobile && isLoggedIn ? (
        <NextLinkFromReactRouter to="/notification" activeClassName="active-mobile-nav">
          <StyledNavLink>
            Notifications{' '}
            {props.un_readnotifications.length ? (
              <NotificatioCount>{props.un_readnotifications.length}</NotificatioCount>
            ) : null}
          </StyledNavLink>
        </NextLinkFromReactRouter>
      ) : null}
      {isLoggedIn && (
        <NextLinkFromReactRouter to="/feed" activeClassName="active-mobile-nav">
          <StyledNavLink>Feed</StyledNavLink>
        </NextLinkFromReactRouter>
      )}
      {!isLoggedIn && (
        <Button variant="secondary" mt="auto" width="100%" onClick={onPresentConnectModal}>
          Connect Wallet
        </Button>
      )}
    </Flex>
  )
}

export default SideNav
