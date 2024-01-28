import React, { Children, cloneElement, ReactElement } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { space } from 'styled-system'
import { scales } from '../Button/types'
import { ButtonMenuProps } from './types'

interface StyledButtonMenuProps extends ButtonMenuProps {
  theme: DefaultTheme
}

const getBackgroundColor = ({ theme }: StyledButtonMenuProps) => {
  return theme.colors.invertGrey['grey300']
}

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.border};
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 2px;
  height: fit-content;

  ${(p) => p.theme.media.md} {
    margin-left: 0;
  }

  & > button,
  & > a {
    flex: ${({ fullWidth }) => (fullWidth ? 1 : 'auto')};
  }

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }

  & > button,
  & a {
    box-shadow: none;
  }

  & > button:first-child,
  & a:first-child {
    border-radius: 12px 0 0 12px;
  }
  & > button:last-child,
  & a:last-child {
    border-radius: 0 12px 12px 0 ;
  }

  ${({ disabled, theme, variant }) => {
    if (disabled) {
      return `
        opacity: 0.5;

        & > button:disabled {
          background-color: transparent;
          color: ${theme.colors.textSubtle};
        }
    `
    }
    return ''
  }}
  ${space}
`

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  onItemClick,
  disabled,
  children,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButtonMenu disabled={disabled} fullWidth={fullWidth} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          ...child.props,
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
        })
      })}
    </StyledButtonMenu>
  )
}

export default ButtonMenu
