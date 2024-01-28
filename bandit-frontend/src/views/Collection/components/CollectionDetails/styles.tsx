import { Box, Text } from 'components/atoms/StyledSystem'
import styled from 'styled-components'

export const ProfileContainer = styled(Box)`
  position: relative;
`
export const CoverImageWrapper = styled(Box)`
  position: relative;
  &:before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: none;

    ${(p) => p.theme.media.md} {
      background: ${({ theme }) =>
              `linear-gradient(90deg, ${theme.colors.backgroundAlt} 17%, rgba(255,255,255,0.2) 100%)`};
      z-index: 1;
    }
  }
`
export const CoverImage = styled(Box)`
  background-image: url('${({ src }) => src}');
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  ${(p) => p.theme.media.md} {
    height: 250px;
  }
`

export const DetailsWrapper = styled(Box)`
  position: relative;
  top: -48px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(p) => p.theme.media.md} {
    position: absolute;
    padding: 20px 40px;
    top: 0;
  }
`
export const ProfileImage = styled(Box)`
  width: 96px;
  height: 96px;
  min-width: 96px !important;
  border-radius: 12px;
  overflow: hidden;
  div {
    border: 2px solid ${({ theme }) => theme.colors.background};
    border-radius: 12px;
  }
  ${(p) => p.theme.media.md} {
    width: 120px;
    height: 120px;
    min-width: 120px !important;
    div {
      border: none;
      border-radius: 50%;
    }
`
export const Description = styled(Text)`
  max-width: 20%;
`
