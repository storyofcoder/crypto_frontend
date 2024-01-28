import React from "react";
import styled from "styled-components";
import { Box } from "../StyledSystem";
import Loader from "../../atomsV2/Loader";

const Wrapper = styled(Box)`
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageLoader = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  )
}

export default PageLoader
