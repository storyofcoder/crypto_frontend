import styled from 'styled-components'
import { Box } from '../../atoms/StyledSystem'

const StyledPage = styled(Box)`
  padding: 10px 20px 0 20px;

  ${(p) => p.theme.media.md} {
    max-width: ${({ theme, scale }) =>
      scale === 'sm' ? `${theme.siteWidthSmall}px` : scale === 'lg' ? `${theme.siteWidthLarge}px` : '100%'};
    margin: 0 auto;
    padding: 20px 40px 0 40px;
  }
`

const Page = ({ children, ...props }) => {
  return (
    <>
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}


export default Page
