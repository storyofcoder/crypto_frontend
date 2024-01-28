import React from 'react'

import { ContainerWrapper, BanditTitle, Info, BanditContainer, BanditButton } from '../styles'
import { Mixpanel, MixpanelEvents } from "../../../analytics/Mixpanel";

const bandit = () => {
  const onClickButton = (url, linkName) => {
    Mixpanel.track(MixpanelEvents.WEBSITE_LINKS, {
      linkName: linkName,
    })
    window.open(url, '_blank')
  }
  return (
    <ContainerWrapper scale="sm">
      <BanditContainer>
        <BanditTitle>What is Bandit?</BanditTitle>
        <Info>
          Bandit will be a community-centric brand that will enable and build platforms that will pave the way for a
          genuinely decentralised future. In addition, we will promote and act as a springboard for INO projects that
          will help us achieve our common aim.
        </Info>
        <BanditButton
          onClick={() =>
            onClickButton(
              'https://mirror.xyz/0x5fE9C54645073c6eaBaa74044c2842AeF9692712/DmA_ROkBypuRqa2Dn0ZhPlZWTgj4P_DAOGpaKCE7Txk',
              "lightPaper",
            )
          }
        >
          <p>Lite Paper</p>
        </BanditButton>
      </BanditContainer>
    </ContainerWrapper>
  )
}

export default bandit
