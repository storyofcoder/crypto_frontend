import moment from 'moment'
import React from 'react'
import Datetime from 'react-datetime'
import styled, { css, DefaultTheme } from 'styled-components'
import { DatepickerProps, scales } from './types'

interface StyledDatepickerProps extends DatepickerProps {
  theme: DefaultTheme
}

const getInputStyles = ({ scale = scales.MD }: StyledDatepickerProps) => {
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

const StyledDatePicker = styled(Datetime)`
  input {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
    ${getInputStyles}
  }
`

const DatePicker = (props) => {
  const dateValidation = (currentDate) => {
    return currentDate.isAfter(moment())
  }
  return (
    <StyledDatePicker
      // isValidDate={dateValidation}
      {...props}
    />
  )
}

DatePicker.defaultProps = {
  scale: scales.MD,
}

export default DatePicker
