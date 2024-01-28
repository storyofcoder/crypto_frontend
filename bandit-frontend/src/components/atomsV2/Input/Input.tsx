import styled, { css, DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { InputProps, scales } from "./types";
import React from "react";

interface StyledInputProps extends InputProps {
  theme: DefaultTheme
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.shadows.error
  }

  if (isSuccess) {
    return theme.shadows.success
  }

  return ''
}

/**
 * Priority: Warning --> Success
 */
const getBorderColor = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.colors.error
  }

  if (isSuccess) {
    return theme.colors.success
  }

  return theme.colors.inputSecondary
}

const getInputStyles = ({ scale = scales.MD }: StyledInputProps) => {
  switch (scale) {
    case scales.SM:
      return css`
        height: 32px;
        font-size: 12px;
      `
    case scales.LG:
      return css`
        height: 48px;
        font-size: 16px;
      `
    case scales.MD:
    default:
      return css`
        height: 40px;
        font-size: 14px;
      `
  }
}

const Input = styled.input<InputProps>`
  background-color: ${({ theme }) => theme.colors.input};
  border: 0;
  border-radius: 4px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  ${getInputStyles};
  outline: 0;
  padding: 0 16px;
  width: 100%;
  border: 1px solid;
  border-color: ${getBorderColor};
  ${space}

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`


Input.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
}

export default Input
