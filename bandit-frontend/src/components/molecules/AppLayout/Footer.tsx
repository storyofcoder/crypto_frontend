import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { NextLinkFromReactRouter } from 'components/atoms/NextLink'
import Link from 'next/link'

import { Box, Flex, Text } from '../../atoms/StyledSystem'
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../../../components/atoms/svg'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { setRedirectCallback } from '../../../state/Auth/actions'
import { useDispatch, useSelector } from 'react-redux'

import useWalletModal from '../../../hooks/useWalletModal'
import useTheme from '../../../hooks/useTheme'
import { DISCORD, FACEBOOK, INSTAGRAM, LINKEDIN, TELEGRAM, TWITTER, YOUTUBE, MIRROR } from 'constant/companySocialLinks'
import Page from 'components/atomsV2/Page'
import Mirror from '../../atoms/svg/social-media/mirror'

const Container = styled.div`
  background-color: ${(p) => p.theme.colors.backgroundAlt};
  position: relative;
  margin-top: 50px;
  padding-bottom: 60px;

  ${(p) => p.theme.media.md} {
    padding-bottom: 0;
  }
`

const Content = styled.div`
  ${(p) => p.theme.media.xs} {
    padding: 0 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 0 20px;
  }
  ${(p) => p.theme.media.md} {
  }
  ${(p) => p.theme.media.xlg} {
    //max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 20px;
  }
`

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 20px;
  margin-top: 10px;

  svg {
  }
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
  margin-bottom: 20px;
  ${(p) => p.theme.media.sm} {
    flex-direction: row;
  }
`

const StyledBox = styled(Box)`
  margin: 16px 0;
  ${(p) => p.theme.media.xs} {
    /* margin-bottom: 40px; */
  }
`

const Title = styled(Text)`
  color: ${(p) => p.theme.colors.bg2};
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 16px;
`

const LinkText = styled.span`
  color: ${(p) => p.theme.colors.bg2};
  margin-bottom: 10px;
  opacity: 0.8;

  &:hover {
    color: ${(p) => p.theme.colors.bg2} !important;
  }
`
const AnchorLink = styled.a`
  color: ${(p) => p.theme.colors.text};
  opacity: 0.8;
  font-size: 12px;

  &:hover {
    color: ${(p) => p.theme.colors.text} !important;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-right: 30px !important;
  }
`

const LogoWrapper = styled(NextLinkFromReactRouter)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 20px;

  ${(p) => p.theme.media.sm} {
    padding-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const IconsWrapper = styled(Flex)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

  ${(p) => p.theme.media.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SocialMediaList = [
  {
    name: 'Discord',
    Icon: DiscordIcon,
    link: DISCORD,
  },
  {
    name: 'Instagram',
    Icon: InstagramIcon,
    link: INSTAGRAM,
  },
  {
    name: 'Twitter',
    Icon: TwitterIcon,
    link: TWITTER,
  },
  {
    name: 'Telegram',
    Icon: TelegramIcon,
    link: TELEGRAM,
  },
  // {
  //   name: 'Clubhouse',
  //   Icon: ClubhouseIcon ,
  //   link: '',
  // },
  {
    name: 'Facebook',
    Icon: FacebookIcon,
    link: FACEBOOK,
  },
  {
    name: 'Linkedin',
    Icon: LinkedinIcon,
    link: LINKEDIN,
  },
  {
    name: 'Youtube',
    Icon: YoutubeIcon,
    link: YOUTUBE,
  },
  {
    name: 'Mirror',
    Icon: Mirror,
    link: MIRROR,
  },
]

const Footer = () => {
  const { isLoggedIn, user, becomeCreatorForm } = useSelector((state: any) => state.auth)
  const history = useRouter()
  const dispatch = useDispatch()
  const { onPresentConnectModal } = useWalletModal()

  const { theme } = useTheme()

  function handleClick(e) {
    Mixpanel.track(MixpanelEvents.FOOTER_LINKS_CLICK, {
      id: e.target.id,
    })
  }
  function handleSocialMediaClick(name) {
    Mixpanel.track(MixpanelEvents.SOCIAL_MEDIA_LINK_CLICK, {
      name,
    })
  }

  function createNft(e) {
    e.preventDefault()
    Mixpanel.track(MixpanelEvents.HOME_PAGE_CREATE_NFT_CLICK, {
      loggedIn: isLoggedIn,
      mintable: !!user?.is_mintable,
      from: 'FOOTER',
    })

    if (isLoggedIn) {
      if (user?.is_mintable) {
        history.push('/create-nft')
      } else {
        window.open(becomeCreatorForm)
      }
    } else {
      dispatch(
        setRedirectCallback((userDetails) => {
          if (userDetails?.is_mintable) {
            history.push('/create-nft')
          } else {
            window.open(becomeCreatorForm)
          }
        }),
      )
      onPresentConnectModal()
    }
  }

  return (
    <Container>
      <Page>
        <StyledFlex justifyContent="space-between">
          <LogoWrapper to="/" activeClassName="logo-active">
            <Logo style={{ position: 'relative' }}>
              <Link href="/">
                <Text fontWeight={500} fontSize={24}>
                  Bandit
                </Text>
              </Link>
              {/*<Image className="header--logo" src={isDark ? logo_white_default : logo_default} alt="logo" />*/}
              {/*<img src={logo_white} alt="logo" className="header--logo-white" />*/}
            </Logo>
          </LogoWrapper>
          <StyledBox>
            <IconsWrapper>
              {SocialMediaList.map(({ link, Icon, name }, index) => (
                <SocialMediaIcon key={index} href={link} target="_blank" onClick={() => handleSocialMediaClick(name)}>
                  {<Icon iconcolor={theme.colors.text} />}
                </SocialMediaIcon>
              ))}
            </IconsWrapper>
          </StyledBox>
        </StyledFlex>
        <Flex
          flexDirection={['column', 'column', , , 'row']}
          justifyContent="space-between"
          alignItems="center"
          py={20}
          borderTop="1px solid"
          borderColor="#dfdfdf"
        >
          <Text fontSize={[12]} textAlign="center" color="text" mb={[20, 0]}>
            ©{new Date().getFullYear()} Bandit. All rights reserved
          </Text>
          <Box>
            <Flex flexWrap="wrap">
              <AnchorLink href="/legal/privacy.pdf" target="_blank" id="privacy" onClick={handleClick}>
                Privacy Policy
              </AnchorLink>
              <AnchorLink href="/legal/termsOfUse.pdf" target="_blank" id="terms" onClick={handleClick}>
                Terms of Use
              </AnchorLink>
              <AnchorLink href="/legal/TermsOfSale.pdf" target="_blank" id="terms" onClick={handleClick}>
                Terms of Sale
              </AnchorLink>
            </Flex>
          </Box>
        </Flex>
      </Page>
    </Container>
  )
}

export default Footer
