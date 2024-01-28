import { Layout } from 'antd'
import styled from 'styled-components'


import Header from './Header'

const { Content } = Layout

const StyledLayout = styled(Layout)`
  background-color: ${(p) => p.theme.colors.background};
`
const AppLayout = ({ children }: any) => {


  return (
    <StyledLayout>
      <Header />
      <Content>{children}</Content>
    </StyledLayout>
  )
}


export default AppLayout
