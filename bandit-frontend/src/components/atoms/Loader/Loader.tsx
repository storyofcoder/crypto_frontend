import React from "react";
import { Spin } from "antd";
import styled from "styled-components";
import LoaderV2 from "../../atomsV2/Loader"

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .ant-spin-dot-item {
    background-color: ${(p) => p.theme.colors.text};
  }
`

const Loader = () => {
  return (
    <Container>
      <LoaderV2/>
    </Container>
  )
}

export default Loader
