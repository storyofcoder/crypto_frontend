import React from "react";
import Button from "../Button/Button";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  border-radius: 10px;
  padding: 8px;
`
const StyleItem = styled(Menu.Item)`
  border-radius: 12px;
  color: ${(p) => p.theme.colors.text};
  font-size: 14px;
  padding: 7px 15px;
  font-weight: 600;
  &:hover {
    background-color: ${(p) => p.theme.colors.backgroundAlt};
  }
`

const DropDown = ({ placement, customButton, caption, trigger, optionList = [], ...rest }: any) => {
  const menu = (
    <StyledMenu>
      {optionList.map(({ title, disabled, customComponent, onClick, ...rest }: any, i: any) => (
        <StyleItem
          key={i}
          onClick={(e) => {
            if (!disabled) {
              onClick(e.domEvent)
            }
          }}
          disabled={disabled}
        >
          <div {...rest}> {customComponent ? customComponent() : title}</div>
        </StyleItem>
      ))}
    </StyledMenu>
  )

  return (
    <Dropdown overlay={menu} placement={placement || 'bottom'} trigger={trigger || ['click']} {...rest}>
      {customButton ? customButton() : <Button>{caption}</Button>}
    </Dropdown>
  )
}

export default DropDown
