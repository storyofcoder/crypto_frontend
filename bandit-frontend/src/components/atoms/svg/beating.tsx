import React from "react";
import styled from "styled-components";
import { Box } from "../StyledSystem";

const RingContainer = styled(Box)`
  position: relative;
`

const Ringing = styled(Box)`
  border: 3px solid ${({theme})=>theme.colors.primary};
  -webkit-border-radius: 30px;
  height: 25px;
  width: 25px;
  position: absolute;
  left: -12.5px;
  top: -12.5px;
  -webkit-animation: pulsate 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0.0
`

const Circle = styled(Box)`
  width: 15px;
  height: 15px;
  background-color: ${({theme})=>theme.colors.primary};
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

`


const BeatingIcon = () => {
  return (
    <RingContainer>
      <Ringing/>
      <Circle/>
    </RingContainer>
  );
};

export default BeatingIcon;
