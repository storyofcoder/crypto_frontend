import Accordion from 'components/atoms/Accordion/Accordion'
import React from 'react'
import styled from 'styled-components'
import { ContainerWrapper } from '../styles'

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
`

const AccordionWrapper = styled(Accordion)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`

const P1 = styled.p`
  color: ${(props) => props.theme.text.primary};
`

const P2 = styled.p`
  color: ${(props) => props.theme.text.primary};
  margin-left: 20px;
`

const FAQs = ({ faqs }) => {
  return (
    <ContainerWrapper scale="sm" mt={50}>
      <Title>FAQs</Title>
    </ContainerWrapper>
  )
}

export default FAQs
