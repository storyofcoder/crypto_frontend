import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Box } from "../../components/atoms/StyledSystem";

const Wrapper = styled(Box)``

const VideoPlayer = ({ close, url }) => {
  return (
    <Wrapper>
      <ReactPlayer url={url} controls={true} playing={true} width={'100%'} height="70vh" />
    </Wrapper>
  )
}

export default VideoPlayer
