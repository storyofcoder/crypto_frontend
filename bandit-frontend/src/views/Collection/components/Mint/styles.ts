import { Box, Flex } from 'components/atoms/StyledSystem'
import styled from 'styled-components'

export const Container = styled(Flex)`
  padding-top: 30px;
  flex-direction: column-reverse;
  max-width: 800px;
  margin: 0 auto;
`
export const InfoContainer = styled(Box)``
export const MintingContainer = styled(Box)`
  margin-bottom: 60px;
`

export const PriceOffering = styled(Box)`
  /* background-color: ${(p) => p.theme.colors.backgroundAlt};
  padding: 4px 0;
  margin-top: 10px; */
`
