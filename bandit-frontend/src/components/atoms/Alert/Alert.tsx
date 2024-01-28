import React from "react";
import styled from "styled-components";
import { Alert } from "antd";

import { Box } from "../StyledSystem";

const Container = styled(Box)`
  //background-color: ${(p) => p.theme.colors.bg1};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`

const CustomAlert = ({ title }) => {
  return (
    <Container>
      <Alert message={title} type="info" closable />
    </Container>
  )
}

export default CustomAlert
