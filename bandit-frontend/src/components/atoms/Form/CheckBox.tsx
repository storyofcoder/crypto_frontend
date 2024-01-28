import React from 'react'
import { Checkbox } from 'antd'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.colors.foreground};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.colors.foreground};
    background-color: ${({ theme }) => theme.colors.grey900};
  }

  .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.colors.foreground};
  }

  span {
    color: ${({ theme }) => theme.colors.foreground};
  }
`

const CheckBox = ({ children, onChange }: any) => {
  return <StyledCheckbox onChange={onChange}>{children}</StyledCheckbox>
}

export default CheckBox
