import React from "react";
import { Switch } from "antd";
import styled from "styled-components";
import { Box } from "../StyledSystem";

const CustomSwitch = (props) => {
  return (
    <Wrapper>
      <Switch className="switch-ui" checked={props?.defaultChecked} onChange={props?.onChange} />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  min-width: 45px;
  .ant-switch-checked {
    background-color: ${(p) => p.theme.colors.text};
  }
`

export default CustomSwitch
