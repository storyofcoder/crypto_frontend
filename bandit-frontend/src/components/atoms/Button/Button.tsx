import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { color, layout, space, typography, variant } from "styled-system";
import { buttons } from "../../../config/styleSystem";

const StyledButton: any = styled(Button)(
  {},
  color,
  space,
  typography,
  layout,
  variant({
    variants: {
      ...buttons,
    },
  }),
)

StyledButton.defaultProps = {
  width: 'fit-content',
  height: 'fit-content',
}

const CustomButton = ({ type, children, size = 'large', ...rest }: any) => {
  return (
    <StyledButton type={type} size={size} {...rest}>
      {children}
    </StyledButton>
  )
}

export default CustomButton
