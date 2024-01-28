import React from "react";
import styled from "styled-components";
import { layout, space, variant } from "styled-system";
import { scaleVariants, styleVariants } from "./theme";

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 16px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  ${variant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}
`

// StyledButton.defaultProps = {
//   width: 'fit-content',
//   height: 'fit-content',
// }

const Button = ({ type, children, size = 'md', ...rest }: any) => {
  return (
    <StyledButton type={type} size={size} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
