import React from 'react'
import { Col, Row } from 'antd'

import {
  ContainerWrapper,
  Description,
  MemberName,
  MemberWrapper,
  SectionTitle,
  Socials,
  TeamBody,
  TeamContainer,
  TeamImage,
  TeamImageWrapper,
  TeamWrapper,
} from '../styles'
import { DiscordIcon, LinkedinIcon, People, TwitterIcon } from 'components/atoms/svg'
import { Box } from 'components/atoms/StyledSystem'
import Newsletter from '../../../components/molecules/Newsletter'

const teamMembers = [
  {
    name: 'Sandesh B Suvarna',
    description:
      "Built India's first & largest NFT marketplace(WazirX NFT). His previous startup 4Five labs has been acquired by WazirX, A Binance company. Sandesh envisions that NFTs have the potential to truly decentralize the Web 3.0.",
    twitter: 'sandeshsuvarna',
    linkedin: 'sandeshbsuvarna',
    discord: '',
    image: '/assets/images/SandeshSuvarna.png',
  },
  {
    name: 'Nischal Shetty (Investor)',
    description:
      'Founder of WazirX(A Binance company with a yearly trading volume of $43bn) and a steward of the cryptocurrency industry in India. Nischal aims to bring decentralization to billions of people around the world.',
    twitter: 'NischalShetty',
    linkedin: 'nischalshetty',
    discord: '',
    image: '/assets/images/NischalShetty.png',
  },
  {
    name: 'Community',
    description:
      "Members of the community will be important in ensuring that the platform is really decentralised. The majority of the ideas will be based on community members' collaboration.",
    twitter: '',
    linkedin: '',
    discord: 'WxwAHPRyUA',
    image: '/assets/images/NischalShetty.png',
  },
]

export const TeamMember: React.FC<{
  name: string
  description: string
  twitter: string
  linkedin: string
  discord: string
  image: string
}> = ({ name, description, twitter, linkedin, discord, image }) => {
  return (
    <Box mt={20}>
      <MemberWrapper>
        {!discord ? (
          <TeamImage width={150} height={150} src={image} alt={name} />
        ) : (
          <People width={150} height={150} mr={20} />
        )}
        <Box>
          <MemberName>{name}</MemberName>
          <Description>{description}</Description>
          <Socials>
            {!discord ? (
              <>
                <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
                  <TwitterIcon />
                </a>
                <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">
                  <LinkedinIcon />
                </a>
              </>
            ) : (
              <a href={`https://discord.gg/${discord}`} target="_blank" rel="noreferrer">
                <DiscordIcon />
              </a>
            )}
          </Socials>
        </Box>
      </MemberWrapper>
    </Box>
  )
}

const team = () => {
  return (
    <ContainerWrapper scale="sm" mt={50}>
      <SectionTitle>Team</SectionTitle>
      <TeamBody>
        <TeamContainer>
          <TeamWrapper>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                description={member.description}
                twitter={member.twitter}
                linkedin={member.linkedin}
                discord={member.discord}
                image={member.image}
              />
            ))}
          </TeamWrapper>
        </TeamContainer>
      </TeamBody>
      <Newsletter />
    </ContainerWrapper>
  )
}

export default team
