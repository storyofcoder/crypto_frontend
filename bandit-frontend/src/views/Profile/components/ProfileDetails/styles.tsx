import { Box, Flex } from 'components/atoms/StyledSystem'
import styled from 'styled-components'

export const ProfileContainer = styled(Box)``
export const CoverImageWrapper = styled(Box)`
  position: relative;
  &:before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.colors.backgroundAlt} 17%, rgba(255,255,255,0.2) 100%)`};
    z-index: 1;
  }
`
export const CoverImage = styled(Box)`
  background-image: url('${({ src }) => src}');
  height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  ${(p) => p.theme.media.xs} {
    height: 250px;
  }
`
export const DetailsWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 20px 15px;
  display: block;

  ${(p) => p.theme.media.xs} {
    display: flex;
    padding: 20px 40px;
  }
`
export const ProfileImage = styled(Box)`
  border-radius: 50%;
  overflow: hidden;
  width: 96px;
  height: 96px;
  border: 2px solid ${(p) => p.theme.colors.background};
  background: ${(p) => p.theme.colors.background};

  ${(p) => p.theme.media.md} {
    width: 120px;
    height: 120px;
    border: none;
    background: none;
  }
`

export const ActionButtonWrapper = styled(Flex)`
  position: absolute;
  right: 0;
  bottom: 10px;

  ${(p) => p.theme.media.xs} {
    position: initial;
  }
`

export const EditIconWrapper = styled(Box)`
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.grey100};
  padding: 5px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border: 2px solid ${(p) => p.theme.colors.background};

  svg {
    height: 20px;
    width: 20px;
  }
`