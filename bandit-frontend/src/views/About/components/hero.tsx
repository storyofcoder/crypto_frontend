import React from 'react'

import { Buttons, ContainerWrapper, CTC, IconButton, ImageWrapper, SubTitle, Title, TitleWrapper } from '../styles'
import { Button } from 'components/atomsV2/Button'
import { DiscordIcon, Hero, TwitterIcon } from 'components/atoms/svg'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'

const hero = () => {
  const onClickButton = (url, linkName) => {
    Mixpanel.track(MixpanelEvents.WEBSITE_LINKS, {
      linkName: linkName,
    })
    window.open(url, '_blank')
  }
  return (
    <>
      <ContainerWrapper scale="sm">
        <TitleWrapper>
          <Title>
            Building the billion-dollar decentralized <s>startup</s> community!
          </Title>
        </TitleWrapper>
        <CTC>
          <SubTitle>Win a chance get whitelisted to our Bandit genesis NFT drop?👇</SubTitle>
          <Buttons>
            <IconButton onClick={() => onClickButton('https://discord.gg/WxwAHPRyUA', 'discord')}>
              <DiscordIcon />
              <p>Join our Discord</p>
            </IconButton>
            <IconButton
              onClick={(e) =>
                onClickButton(
                  'https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EOnBndit&region=follow_link&screen_name=OnBndit',
                  'twitter',
                )
              }
            >
              <TwitterIcon />
              <p>Follow @OnBndit</p>
            </IconButton>
          </Buttons>
        </CTC>
      </ContainerWrapper>
      <ImageWrapper>
        <Hero />
      </ImageWrapper>
    </>
  )
}

export default hero
