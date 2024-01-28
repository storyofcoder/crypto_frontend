import { Typography } from 'antd'
import { Box, Flex } from 'components/atoms/StyledSystem'
import styled from 'styled-components'


export const PageWrapper = styled(Box)`
  justify-content: center;
  display: flex;
`

export const AuthCardWrapper = styled(Box)`
  width: 448px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  background-color: rgb(16, 16, 16);
  height: 840px;
  padding: 16px;
  flex-direction: column;
  justify-content: space-between;
  display: inline-flex;
  transform: scale(0.7);
  font-family: Montserrat, sans-serif;
  border: 2px solid #80808008;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
`

export const AuthCTAWrapper = styled(Box)`
  margin-top: auto;
  background: linear-gradient(0deg, #101010 7.05%, rgba(16, 16, 16, 0) 44.44%);
  z-index: 1;
`

export const AuthCTABox = styled(Box)`
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 8px;
  align-self: stretch;
  border-radius: var(--borer-radius-16, 16px);
  background: var(--surface-alpha-light-4, rgba(250, 250, 250, 0.04));
`

export const AuthButton = styled(Box)`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid var(--border-light-primary, rgba(250, 250, 250, 0.16));
  text-align: center;
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 120%; /* 19.2px */

  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 14px 0px rgba(255, 255, 255, 0.25) inset;
    transition: box-shadow 0.1s ease-in-out;
  }
`

export const AuthButtonGoogle = styled(AuthButton)`
  background: var(--Button-gradient, linear-gradient(111deg, #9f8bff 0%, #7053ff 100%));
  color: var(--text-light-primary, #FAFAFA);
  :hover {
    border: 2.727px solid var(--Button-gradient, #9f8bff);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
      linear-gradient(111deg, #9f8bff 0%, #7053ff 100%);
  }
`

export const AuthButtonOthers = styled(AuthButton)`
  background: var(--surface-alpha-light-8, rgba(250, 250, 250, 0.08));
`

export const AuthWalletWrapper = styled(Flex)`
  width: 100%;
  gap: 10px;
`

export const AuthWalletOthers = styled(AuthButton)`
  width: 100%;
  justify-content: center;
`

export const PoweredByWrapper = styled(Flex)`
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: fit-content;
  border-radius: 16px;
  margin: auto;
  margin-top: 12px;
  :hover {
    background-color: var(--surface-alpha-light-4, rgba(250, 250, 250, 0.04));
    transition: background-color 0.1s ease-in-out;
  }
  color: #808080;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`

export const CreateAccountWrapper = styled(Box)`
  text-align: left;
`

export const CreateTitle = styled(Typography)`
  color: var(--text-light-secondary, rgba(250, 250, 250, 0.7));
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 26.4px */
`

export const UsernameWrapper = styled(Flex)`
  margin-top: 24px;
  gap: 10px;
`

export const UsernameSuffixText = styled(Typography)`
  color: var(--text-light-tertiary, rgba(250, 250, 250, 0.3));
  text-align: right;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`

export const UsernameSubmit = styled(AuthButtonGoogle)`
  min-width: 120px;
  justify-content: center;

  color: var(--text-light-primary, #fafafa);
  font-feature-settings: 'clig' off, 'liga' off;

  /* Body/Regular/Bold */
  font-family: 'Neue Haas Grotesk Display Pro';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`

export const RecommendationWrapper = styled(Box)`
  margin-top: 12px;
`

export const RecommendationTitle = styled(Typography)`
  color: rgba(255, 255, 255, 0.5);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`

export const RecommendationValueWrapper = styled(Flex)`
  margin-top: 12px;
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
`

export const RecommendationValue = styled(Box)`
  border-radius: 20px;
  border: 1px solid var(--border-light-secondary, rgba(250, 250, 250, 0.08));
  background: ${(p) => (p.active ? "var(--surface-neutral-light-surface-125, #F2F2F2)" : "rgba(128, 128, 128, 0.05)")};
  display: flex;
  padding: 12px 16px;
  align-items: center;

  color: ${(p) => (p.active ? "#101010" : "var(--text-light-secondary, rgba(250, 250, 250, 0.7))")};
  text-align: center;
  leading-trim: both;

  text-edge: cap;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  mix-blend-mode: difference;
  cursor: pointer;

  
`

export const InfoWrapper = styled(Flex)`
  position: relative;
  overflow: hidden;

  align-items: center;
  margin-top: 16px;
  display: flex;
  width: 376px;
  padding: 16px;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid var(--border-light-secondary, rgba(250, 250, 250, 0.08));

  :before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0) 80%
    );
    top: 0;
    left: -100px;
    animation: shine 5s infinite linear; /* Animation */
  }

  @keyframes shine {
    0% {
      left: -100px;
    }
    20% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`

export const InfoText = styled(Typography)`
  color: var(--text-light-tertiary, rgba(250, 250, 250, 0.3));
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  mix-blend-mode: difference;
`

export const Heading = styled(Box)`
  color: var(--text-light-secondary, rgba(250, 250, 250, 0.7));
  text-align: center;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 27.5px */
  margin-top: 16px;
`

export const AvatarWrapper = styled(Flex)`
  height: ${(p) => (p.height ? p.height : 44)}px;
  width: ${(p) => (p.width ? p.width : 44)}px;
  border-radius: 50%;
  background: ${(p) => (p.background ? p.wibackgrounddth : 'white')};
  justify-content: center;
  align-items: center;
`

export const AvatarImage = styled.img<any>`
  height: ${(p) => (p.height ? p.height : 44)}px;
  width: ${(p) => (p.width ? p.width : 44)}px;
  border-radius: 50%;
`