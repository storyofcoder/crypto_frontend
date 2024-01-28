import React from "react";
import styled from "styled-components";
import { Box, Text } from "../components/atoms/StyledSystem";
import Button from "../components/atoms/Button/Button";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";

const Container = styled(Box)`
  padding-top: 10px;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${(p) => p.theme.media.xlg} {
    width: 1040px;
    margin: 0 auto;
  }
`

const StyledText = styled.div`
  color: ${(p) => p.theme.colors.textTertiary};
  opacity: 0.6;
  //color: #595959;
  font-size: 15vw;
  text-align: center;
  line-height: 1;
  font-weight: 700;
  text-shadow: 10px 6px 8px rgb(117 117 117 / 80%);

  ${(p) => p.theme.media.xs} {
    font-size: 140px;
  }
`

const NotFound = () => {
  return (
    <>
      <Container>
        <StyledText>404</StyledText>
        <Text color="textTertiary" textAlign="center" fontSize={[14, 14, 20]}>
          Oops, an error has occurred. Page not found!
        </Text>
        <Button variant="secondary" mt={30}>
          <NextLinkFromReactRouter to="/">Go to home</NextLinkFromReactRouter>
        </Button>
      </Container>
    </>
  )
}

export default NotFound
