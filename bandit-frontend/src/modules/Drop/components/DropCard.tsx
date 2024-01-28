import React from "react";
import styled from "styled-components";
import { Box } from "../../../components/atoms/StyledSystem";
import Asset from "../../../components/atoms/Image/Asset";
import Avatar from "../../../components/atoms/Avatar/Avatar";
import { NextLinkFromReactRouter } from "../../../components/atoms/NextLink";

const DropCardContainer = styled(Box)`
  //width: 433px;
  position: relative;
  box-sizing: border-box;
  padding: 15px;
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 22px;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.01);
  }

  .link {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .avatar {
    position: relative;
    z-index: 2;
  }
`

const AssetWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  height: 404px;
  width: 404px;

  ${(p) => p.theme.media.xs} {
    height: 304px;
    width: 304px;
  }
  ${(p) => p.theme.media.sm} {
    height: 304px;
    width: 304px;
    flex-direction: column;
    align-items: center;
  }
  ${(p) => p.theme.media.lg} {
    flex-direction: row;
    height: 404px;
    width: 404px;
  }

  img,
  video {
    border-radius: 22px;
    height: 100%;
    width: 100%;
  }
`

const DropCard = ({ token }) => {
  const {
    metaData: { url, preview, thumbnail, type },
    tokenCreator,
    creatorProfileImage,
    creatorVerified,
    id,
  } = token
  return (
    <DropCardContainer>
      <NextLinkFromReactRouter className="link" to={`/${tokenCreator}/${id}`} />
      <AssetWrapper>
        <Asset
          type={type}
          imageSrc={url}
          videoSrc={url}
          previewVideo={preview}
          thumbnail={`${thumbnail}?h=50&q=1&auto=format`}
          objectFit="cover"
        />
      </AssetWrapper>
      {/*<Text*/}
      {/*  fontFamily="roc-grotesk"*/}
      {/*  fontSize={18}*/}
      {/*  fontWeight={600}*/}
      {/*  paddingX={"5px"}*/}
      {/*  paddingY={10}*/}
      {/*  color="textTertiary"*/}
      {/*>*/}
      {/*  {token.metaData.name}*/}
      {/*</Text>*/}

      <Box pt={'15px'} pl={'15px'} pr="15px">
        <Avatar
          avatarImage={`${creatorProfileImage}?h=100&auto=format,compress`}
          role="Creator"
          userName={`${tokenCreator}`}
          navTo={`/${tokenCreator}`}
          verified={creatorVerified}
        />
      </Box>
    </DropCardContainer>
  )
}

export default DropCard
