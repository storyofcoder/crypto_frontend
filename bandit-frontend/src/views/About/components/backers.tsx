import React from 'react'
import { StaticImageData } from 'next/image'

import {
  BackerContainer,
  BackerImage,
  BackersImageWrapper,
  BackerWrapper,
  ContainerWrapper,
  Designation,
  DesignationWrapper,
  Icons,
  IconsWrapper,
  Name,
  SectionTitle,
} from '../styles'
import { LinkedinIcon, TwitterIcon, Users } from 'components/atoms/svg'
import { Box } from 'components/atoms/StyledSystem'

const backersList = [
  {
    name: 'Nischal Shetty',
    image: '/assets/images/NischalShetty.png',
    designation: 'Committer @Shardeum & Founder at WazirX',
    twitter: 'NischalShetty',
    linkedin: 'nischalshetty',
  },
  {
    name: 'Siddharth Menon',
    image: '/assets/images/SiddharthMenon.png',
    designation: 'Cofounder at Tegro & WazirX',
    twitter: 'BuddhaSource',
    linkedin: 'siddharthmenon',
  },
  {
    name: '- - -',
    image: '',
    designation: 'More soon...',
    twitter: '',
    linkedin: '',
  },
]

export const Backer: React.FC<{
  name: string
  image: StaticImageData
  designation: string
  twitter: string
  linkedin: string
}> = ({ name, image, designation, twitter, linkedin }) => {
  return (
    <Box mt={20}>
      <BackersImageWrapper>
        {image ? <BackerImage width={150} height={150} src={image} alt={name} /> : <Users width={150} height={150} />}
      </BackersImageWrapper>
      <Name>{name}</Name>
      <DesignationWrapper>
        <Designation length={designation.length}>{designation}</Designation>
      </DesignationWrapper>
      <IconsWrapper>
        <Icons>
          {twitter && (
            <a target="_blank" href={`https://twitter.com/${twitter}`} rel="noreferrer">
              <TwitterIcon />
            </a>
          )}
          {linkedin && (
            <a target="_blank" href={`https://linkedin.com/in/${linkedin}`} rel="noreferrer">
              <LinkedinIcon />
            </a>
          )}
        </Icons>
      </IconsWrapper>
    </Box>
  )
}

const backers = () => {
  return (
    <ContainerWrapper scale="sm">
      <SectionTitle>Backed By</SectionTitle>
      <BackerContainer>
        <BackerWrapper>
          {backersList.map((backer, index) => (
            <Backer
              key={index}
              name={backer.name}
              image={backer.image}
              designation={backer.designation}
              twitter={backer.twitter}
              linkedin={backer.linkedin}
            />
          ))}
        </BackerWrapper>
      </BackerContainer>
    </ContainerWrapper>
  )
}

export default backers
