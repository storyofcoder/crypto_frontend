import React from 'react'
import styled, { css, DefaultTheme } from 'styled-components'
import { space } from 'styled-system'
import { InputProps, scales } from './types'
import { Box, Text } from '../../atoms/StyledSystem'
import Input from './Input'

interface StyledInputProps extends InputProps {
  theme: DefaultTheme
}

const getLabelStyles = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return css`
        font-size: 10px;
      `
    case scales.LG:
      return css`
        font-size: 14px;
      `
    case scales.MD:
    default:
      return css`
        font-size: 12px;
      `
  }
}

const StyledLabel = styled(Text)`
  font-weight: 600;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.text};
  ${getLabelStyles}
`
const InputWrapper = styled(Box)`
  width: 100%;
  ${space}
`
const Required = styled.span`
  color: ${(p) => p.theme.colors.error};
`

const InputHybrid = ({ label, required, scale, error, touched, space, customInput = null, ...props }: any) => {
  return (
    <InputWrapper {...props} {...space}>
      {label && (
        <StyledLabel scale={scale}>
          {label}
          {required && <Required>*</Required>}
        </StyledLabel>
      )}
      {customInput ? customInput : <Input {...props} scale={scale} isWarning={touched && error} />}

      {error && touched && (
        <Text color="error" fontSize={12} mt={'5px'}>
          {error}
        </Text>
      )}
    </InputWrapper>
  )
}

export default InputHybrid
