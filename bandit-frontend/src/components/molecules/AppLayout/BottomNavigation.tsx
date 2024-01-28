import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { Box, Flex, Text } from '../../atoms/StyledSystem'
import HomeIcon from '../../atoms/svg/navigation/home'
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints'
import useTheme from '../../../hooks/useTheme'
import ExploreIcon from '../../atoms/svg/navigation/explore'
import RankingsIcon from '../../atoms/svg/navigation/rankings'
import CollectionsIcon from '../../atoms/svg/navigation/collections'
import { useRouter } from 'next/router'
import LaunchpadIcon from '../../atoms/svg/navigation/launchpad'
import useComponentMount from '../../../hooks/useComponentMount'
import PeopleOutline from "../../atoms/svg/peopleOutline";

const Container = styled(Box)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  box-shadow: rgb(0, 0, 0, 0.09) 0 0 34px 0;
`

const BottomNavigation = () => {
  const { isDesktop } = useMatchBreakpoints()
  const { isMounted } = useComponentMount()
  const router = useRouter()
  const { pathname } = router

  if (isDesktop || !isMounted) return null

  return (
    <Container>
      <NavItem Icon={HomeIcon} title="Bandit" to="/" active={pathname === '/'} />
      {/*<NavItem*/}
      {/*  Icon={ExploreIcon}*/}
      {/*  title="Explore"*/}
      {/*  to="/explore"*/}
      {/*  active={['/explore', '/explore/activity'].includes(pathname)}*/}
      {/*/>*/}
      <NavItem Icon={LaunchpadIcon} title="Collections" to="/collections" active={pathname === '/collections'} />
      <NavItem Icon={RankingsIcon} title="Stats" to="/stats" active={pathname === '/stats'} />
      <NavItem Icon={PeopleOutline} title="About" to="/about" active={pathname === '/about'} />
    </Container>
  )
}

const NavItem = ({ Icon, title, to, active }) => {
  const { theme } = useTheme()
  return (
    <NextLink href={to}>
      <Flex flexDirection="column" alignItems="center" flex="1">
        {<Icon iconcolor={active ? theme.colors.foreground : theme.colors.text} />}
        <Text fontSize={12} color={active ? theme.colors.foreground : theme.colors.text} fontWeight={500}>
          {title}
        </Text>
      </Flex>
    </NextLink>
  )
}

export default BottomNavigation
