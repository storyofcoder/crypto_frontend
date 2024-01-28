import React from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "../StyledSystem";

const IconWrapper = styled(Box)`
  min-width: 20px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
`
const Container = styled(Flex)`
  align-items: center;
  margin-bottom: 10px;
  width: 100% !important;
  border-radius: 4px;
  padding: 0 16px !important;
  outline: none;
  border: 1px solid;
  border-color: ${(p) => p.theme.colors.inputSecondary};
`

const TextWrapper = styled(Text)`
  ${(p) => p.theme.media.xs} {
    display: none;
  }
`

const CustomInputIcon = ({ space = 0, prefixIcon, prefixText, type, errors, touched, ...rest }: any) => {
  return (
    <Box mb={space}>
      <Container className="customInputIcon">
        <IconWrapper mr={10}>{prefixIcon}</IconWrapper>
        <TextWrapper fontSize={14}>{prefixText}</TextWrapper>
        <Input {...rest} />
      </Container>
      {errors && errors[rest.name] && touched && touched[rest.name] && (
        <div className="text-danger">{errors[rest.name]}</div>
      )}
    </Box>
  )
}

export default CustomInputIcon
