import React from 'react'

import {
  Line,
  PhaseWrapper,
  PhaseNumber,
  P,
  PhaseTitle,
  PhaseDescription,
  ContainerWrapper,
  SectionTitle,
  PhaseSubDescription,
} from '../styles'

export const phases = [
  {
    number: 1,
    title: 'Community Building',
    description: `We'll create an open community where anyone may join and help us achieve our goal of making web3 a reality. We will ask some of the important OG's from the web3 field who have previously made real contributions to assist us develop guardrails.`,
  },
  {
    number: 2,
    title: 'Launch a truly decentralized NFT PFP project',
    description: `Launch a completely decentralised NFT PFP project that will be the forerunner of the web3 revolution and gain access to community governance powers.`,
  },
  {
    number: 3,
    title: 'Decentralised INO Platform',
    description: `Create systems for Web 3.0 that are truly decentralised. The first initiative is to create the world's largest genuinely decentralised INO (Initial NFT offering) platform, which will assist builders in creating a truly decentralised ecosystem by allowing them access to community and community funding!`,
  },
  {
    number: 4,
    title: 'Handbook',
    description: `A decentralization handbook signed by the bandits!`,
  },
  // {
  //   number: 5,
  //   title: 'Tools and Utilities',
  //   description: `TBD. The utilities will be determined by the framework that is finalised by the community.`,
  // },
]

export const Phase: React.FC<{
  title: string
  description: string
  number: number
  subDescriptions?: string[]
}> = ({ title, description, number, subDescriptions }) => {
  return (
    <PhaseWrapper>
      <Line />
      <PhaseNumber>
        <P>{number}</P>
      </PhaseNumber>
      <PhaseTitle>{title}</PhaseTitle>
      <PhaseDescription>{description}</PhaseDescription>
      {subDescriptions?.map((subDescription) => (
        <PhaseSubDescription>{subDescription}</PhaseSubDescription>
      ))}
    </PhaseWrapper>
  )
}

const roadmap = () => {
  return (
    <ContainerWrapper scale="sm" mt={50}>
      <SectionTitle>Roadmap</SectionTitle>
      <div>
        {phases.map((phase) => (
          <Phase key={phase.number} {...phase} />
        ))}
      </div>
    </ContainerWrapper>
  )
}

export default roadmap
