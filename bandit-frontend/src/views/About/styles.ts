import styled from 'styled-components'

import Page from 'components/atomsV2/Page'
import { Button } from 'components/atomsV2/Button'
import Image from 'next/image'
import { Box } from 'components/atoms/StyledSystem'

export const ContainerWrapper = styled(Page)`
  /* display: flex;
  justify-content: center;
  flex-direction: column */
`

export const SectionTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 30px;
  color: ${(p) => p.theme.colors.foreground};
`

// Hero
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.h1`
  text-align: center;
  margin-top: 70px;
  line-height: 1.3;
  max-width: 800px;
  margin-bottom: 0;
  color: ${(p) => p.theme.colors.foreground};
  font-size: 26px;
  font-weight: 800;

  ${(p) => p.theme.media.xs} {
    font-size: 26px;
  }

  ${(p) => p.theme.media.md} {
    font-size: 48px;
  }
`

export const CTC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const SubTitle = styled.h4`
  font-size: 16px;
  display: flex;
  text-align: center;
  padding: 0;
  margin-top: 20px;
  justify-content: center;
  color: ${(p) => p.theme.colors.foreground};
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${(props) => props.theme.media.xs} {
    flex-direction: column;
  }

  ${(props) => props.theme.media.sm} {
    flex-direction: row;
  }
`

export const IconButton = styled(Button)`
  ${(props) => props.theme.media.xxs} {
    margin-top: 20px;
  }

  ${(props) => props.theme.media.sm} {
    margin: 20px;
  }

  p {
    margin-left: 6px;
  }
`

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

  svg {
    width: 100%;
    height: 80%;
  }
`

// Backer
export const BackersImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const BackerImage = styled(Image)`
  border-radius: 10%;
`

export const Name = styled.h3`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  margin-top: 10px;
  width: 100%;
  color: ${(p) => p.theme.colors.foreground};
`

export const SudoName = styled.h3`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  margin-top: -5px;
  width: 100%;
  color: ${(p) => p.theme.colors.foreground};
`

export const DesignationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Designation = styled.p<{
  length: number
}>`
  font-size: 14px;
  text-align: center;
  padding: 0;
  margin: 0;
  max-width: 250px;
  color: ${(p) => p.theme.colors.foreground};

  ${(props) => props.theme.media.xxs} {
    padding: ${(props) => {
      if (props.length < 30) {
        return '10px'
      }
      return '1px'
    }};
  }
`

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 80px;
  margin-top: 10px;
`

export const BackerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BackerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr) !important;
  gap: 0;

  ${(props) => props.theme.media.md} {
    grid-template-columns: repeat(3, 1fr) !important;
  }
`

export const BackerWrapper2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) !important;
  column-gap: 20px;

  ${(props) => props.theme.media.md} {
    grid-template-columns: repeat(4, 1fr) !important;
  }
`

// Bandit
export const BanditContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const BanditTitle = styled.h1`
  text-align: center;
  margin-top: 30px;
  color: ${(p) => p.theme.colors.foreground};
  font-size: 32px;
  font-weight: 700;
`

export const Info = styled.p`
  text-align: center;
  margin-top: 20px;
  max-width: 800px;
  color: ${(p) => p.theme.colors.foreground};

  ${(props) => props.theme.media.md} {
    max-width: 65%;
  }
`

export const BanditButton = styled(Button)`
  margin-top: 20px;
`

// Roadmap
export const PhaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`

export const Line = styled.div`
  width: 90px;
  height: 1px;
  transform: rotate(90deg);
  z-index: 0;
  background-color: ${(p) => p.theme.colors.foreground};
`

export const PhaseNumber = styled.div`
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.foreground};
`

export const P = styled.p`
  height: 50px;
  z-index: 9;
  font-size: 18px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.background};
  margin: 0;
  padding: 12px;
  text-align: center;
  align-items: center;
`

export const PhaseTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  padding: 0;
  margin-top: 15px;
  color: ${(p) => p.theme.colors.foreground};
  text-align: center;
`

export const PhaseDescription = styled.div`
  font-size: 16px;
  padding: 0;
  margin-top: 15px;
  text-align: center;
  max-width: 700px;
`

export const PhaseSubDescription = styled.div`
  font-size: 14px;
  padding: 0;
  margin-top: 8px;
  text-align: center;
  max-width: 700px;
`

// Team
export const MemberWrapper = styled.div`
  ${(props) => props.theme.media.md} {
    display: flex;
    flex-direction: row;
  }
`

export const TeamImage = styled.img`
  border-radius: 10%;
  margin-top: 20px;
  margin-right: 20px;
`

export const MemberName = styled.h3`
  color: ${(p) => p.theme.colors.foreground};
  font-size: 16px;
  font-weight: 800;
  margin-top: 20px;
`

export const Description = styled.p`
  color: ${(p) => p.theme.colors.foreground};
  margin-top: 4px;
`

export const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 70px;
  margin-top: 10px;
`

export const TeamBody = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
`

export const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TeamWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr) !important;
  gap: 40px;

  ${(props) => props.theme.media.md} {
    grid-template-columns: repeat(2, 1fr) !important;
  }
`
