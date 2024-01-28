import { Hero } from 'components/atoms/svg'
import { Button } from 'components/atomsV2/Button'
import React from 'react'
import {
  CTC,
  ContainerWrapper,
  ImageWrapper,
  Title,
  TitleWrapper,
  BanditTitle,
  SectionTitle,
  BackerContainer,
  BackerWrapper,
  TeamWrapper,
  TeamContainer,
  BackerWrapper2,
  Name,
  Description,
  BanditButton,
  BanditContainer,
  BackersImageWrapper,
  BackerImage,
  DesignationWrapper,
  Designation,
  SudoName,
} from 'views/About/styles'
import styled from 'styled-components'
import { Phase, phases } from 'views/About/components/roadmap'
import { Box } from 'components/atoms/StyledSystem'
import { Backer } from 'views/About/components/backers'
import { TeamMember } from 'views/About/components/team'
import Accordion from 'components/atoms/Accordion/Accordion'
import { Mixpanel, MixpanelEvents } from 'analytics/Mixpanel'
import MouseDown from 'components/atoms/svg/mouseDown'

const Top = styled(Box)`
  margin-top: 50px;
`

const AccordionText = styled.p`
  color: ${(p) => p.theme.colors.textSubtle};
  margin-left: 10px;
  font-size: 14px;
`

const Info = styled.h3`
  max-width: 600px;
  font-size: 16px;
  display: flex;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  margin-top: 20px;
  justify-content: center;
  color: ${(p) => p.theme.colors.foreground};
  margin-bottom: 20px;
`

const Point = styled(Description)`
  text-align: center;
  color: ${(p) => p.theme.colors.textSubtle};
`

const SubTitle = styled.h4`
  font-size: 16px;
  display: flex;
  text-align: center;
  padding: 0;
  margin-top: 20px;
  justify-content: center;
  color: ${(p) => p.theme.colors.foreground};
  margin-bottom: -10px;
`

const Designation2 = styled(Designation)`
  margin-top: -10px;
`

const MouseWrapper = styled.div`
  ${(props) => props.theme.media.xxs} {
    margin-top: 10px;
  }

  ${(props) => props.theme.media.sm} {
    margin-top: 60px;
  }
`

const Mouse = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  svg {
    ${(props) => props.theme.media.xxs} {
      width: 5%;
      height: 5%;
    }

    ${(props) => props.theme.media.sm} {
      width: 2%;
      height: 2%;
    }
  }
`

const Member: React.FC<{
  name: string
  image: StaticImageData
  designation: string
}> = ({ name, image, designation }) => {
  return (
    <Box mt={20}>
      <BackersImageWrapper>
        <BackerImage width={150} height={150} src={image} alt={name} />
      </BackersImageWrapper>
      <SudoName>{name}</SudoName>
      <DesignationWrapper>
        <Designation2 length={designation.length}>{designation}</Designation2>
      </DesignationWrapper>
    </Box>
  )
}

const foundersList = [
  {
    name: 'Sandesh B Suvarna (Led by)',
    description:
      "Built India's first & largest NFT marketplace(WazirX NFT). His previous startup 4Five labs has been acquired by WazirX, A Binance company. Sandesh envisions that NFTs have the potential to truly decentralize the Web 3.0.",
    twitter: 'sandeshsuvarna',
    linkedin: 'sandeshbsuvarna',
    discord: '',
    image: '/assets/images/SandeshSuvarna.png',
  },
  {
    name: 'Arjun Shetty (CTO)',
    description:
      '14 years of experience in software engineering. Dir of engg of India’s First & Largest NFT Marketplace - WazirX NFT. His work experience include being a principal software architect at Dell & Accenture.',
    twitter: 'noobbadger',
    linkedin: 'karjunshetty',
    discord: '',
    image: '/assets/images/ArjunShetty.png',
  },
  {
    name: 'Nischal Shetty (Investor)',
    image: '/assets/images/NischalShetty.png',
    description:
      'Founder of WazirX(A Binance company with a yearly trading volume of $43bn) and a steward of the cryptocurrency industry in India. Nischal aims to bring decentralization to billions of people around the world.',
    twitter: 'NischalShetty',
    linkedin: 'nischalshetty',
  },
  {
    name: 'Siddharth Menon (Advisor)',
    image: '/assets/images/SiddharthMenon.png',
    description:
      "Expert in quantitative markets, liquidity & economic systems. Co-founded WazirX. India's largest crypto exchange. 18 years of entrepreneurship experience.",
    twitter: 'BuddhaSource',
    linkedin: 'siddharthmenon',
  },
]

const teamList = [
  { name: 'Arjun', sudoName: 'badShetty' },
  { name: 'Arul', sudoName: 'badMan' },
  { name: 'Deepak', sudoName: 'badDad' },
  { name: 'Imran', sudoName: 'badKhan' },
  { name: 'Jatin', sudoName: 'badPicture' },
  { name: 'Jyotishwar', sudoName: 'badMafia' },
  { name: 'Madhusudhan', sudoName: 'badMash' },
  { name: 'Meraj', sudoName: 'badMak' },
  { name: 'Mohit', sudoName: 'badBoy' },
  { name: 'Munny', sudoName: 'badKumar' },
  { name: 'Paritosh', sudoName: 'badRito' },
  { name: 'Puneeth', sudoName: 'badGod' },
  { name: 'Ratneshwar', sudoName: 'badTripsy' },
  { name: 'Saicharan', sudoName: 'badBlood' },
  { name: 'Sandesh', sudoName: 'badSand' },
  { name: 'Shreetheja', sudoName: 'badRequest400' },
]

const faqs = [
  {
    title: '​What is the Mint price?',
    render: () => (
      <AccordionText>
        <p>If you buy 1 NFT, it would cost you 0.25ETH.</p>
        <p>If you buy 15 NFTs or more, each NFT would cost you 0.225ETH.</p>
        <p>If you buy 25 NFTs or more, each NFT would cost you 0.2ETH.</p>
        <p>
          Additionally, as gratitude, we shall airdrop 1 NFT from the upcoming exclusive NFT launches of your choice.
        </p>
      </AccordionText>
    ),
  },
  {
    title: 'Will there be any extra benefits for the early supporters?',
    render: () => <AccordionText>{'We believe in under promise & over delivery :)​'}</AccordionText>,
  },
  {
    title: 'What would NFT look like in phase 1?',
    render: () => (
      <AccordionText>
        It will be just a placeholder as we will be designing the NFT along with the community!​
      </AccordionText>
    ),
  },
  {
    title: 'How many NFTs will I be able to mint?',
    render: () => (
      <AccordionText>
        As it's a public mint, keeping a limit doesn`t make sense as collectors can use different wallets. Hence NO
        LIMITS in phase 1!​​
      </AccordionText>
    ),
  },
  {
    title: 'Is there an allowlist?',
    render: () => <AccordionText>No. It's a public mint in phase 1.​​​</AccordionText>,
  },
]

const index = () => {
  const onClickButton = (url, linkName) => {
    Mixpanel.track(MixpanelEvents.WEBSITE_LINKS, {
      linkName: linkName,
    })
    window.open(url, '_blank')
  }
  const scrollTo = () =>
    window.parent.scroll({
      top: 1400,
      left: 0,
      behavior: 'smooth',
    })

  return (
    <>
      <ContainerWrapper scale="sm">
        <TitleWrapper>
          <Title>
            Building the billion-dollar decentralized <s>startup</s> community!
          </Title>
        </TitleWrapper>
        <BanditContainer>
          <SubTitle>Read our</SubTitle>
          <BanditButton
            scale="sm"
            onClick={() =>
              onClickButton(
                'https://mirror.xyz/0x5fE9C54645073c6eaBaa74044c2842AeF9692712/DmA_ROkBypuRqa2Dn0ZhPlZWTgj4P_DAOGpaKCE7Txk',
                'lightPaper',
              )
            }
          >
            <p>Lite Paper</p>
          </BanditButton>
        </BanditContainer>
        <MouseWrapper>
          <Mouse onClick={scrollTo}>
            <MouseDown />
          </Mouse>
        </MouseWrapper>
      </ContainerWrapper>
      <ImageWrapper>
        <Hero />
      </ImageWrapper>
      <ContainerWrapper scale="sm">
        {/* <SectionTitle>Roadmap</SectionTitle>
        <Phase
          number={1}
          title=""
          description="Build Bad Bandits club, a community of people who believe in true decentralization.
 As part of this initiative, we will Launch the Bad Bandits club NFT collection.
 A truly decentralized NFT PFP project which will be in the top 10 NFT projects globally."
          subDescriptions={[
            'Funds would reside in the community wallet (Foundation).',
            'NFTs are designed by the community instead of a few influential individuals. (Similar to our community-led logo creation)',
          ]}
        />
        <Phase
          number={2}
          title=""
          description="Build platforms/tools that will truly decentralize Web 3.0."
          subDescriptions={[
            'The first initiative is to build World’s largest truly decentralized INO(Initial NFT offering) platform to help builders build a truly decentralized ecosystem by providing them easy access to web 3.0 community & community funds!',
          ]}
        />
        <Phase
          number={3}
          title=""
          description="A decentralization handbook/playbook for the web3 builders signed by the Bad Bandits!"
        /> */}
        <BanditTitle>Roadmap</BanditTitle>
        <div>
          {phases.map((phase) => (
            <Phase key={phase.number} {...phase} />
          ))}
        </div>
        <Top>
          <BanditTitle>Who is behind it?</BanditTitle>
        </Top>
        <TeamContainer>
          <TeamWrapper>
            {foundersList.map((member, index) => (
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
        <SubTitle>A team of 16 members</SubTitle>
        <BackerContainer>
          <BackerWrapper2>
            {teamList.map((member) => (
              <Member
                designation={member.name}
                image={'/assets/images/Bad.png'}
                linkedin=""
                name={member.sudoName}
                twitter=""
                key={member.name}
              />
            ))}
          </BackerWrapper2>
        </BackerContainer>
        <Top>
          <BanditTitle>What are the utilities?</BanditTitle>
        </Top>
        <Info>
          The major utility is to be a part of the inclusive community that's going to truly decentralize the web3! And,
          also the following!
        </Info>
        <Point>Greenlist for upcoming exclusive NFT launches.</Point>
        <Point>Access to the events Bandit hosts.</Point>
        <Point>Discounts for events that Bandit sponsors.</Point>
        <Point>For Communities: Possible collaboration opportunity for upcoming exclusive NFT launches.</Point>
        <Point>
          For Creators: Possible collaboration opportunity to design the NFTs for upcoming exclusive NFT launches.
        </Point>
        <Point>Exclusive/Variable rewards on Platform.</Point>
        <Top>
          <BanditTitle>FAQs</BanditTitle>
        </Top>
        <Accordion list={faqs} />
      </ContainerWrapper>
    </>
  )
}

export default index
