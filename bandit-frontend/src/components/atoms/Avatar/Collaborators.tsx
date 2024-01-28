import React from "react";
import styled from "styled-components";

import { SplitIcon } from "../../../components/atoms/svg";
import { Box, Text } from "../StyledSystem";
import { isDefaultImage } from "../../../utils";
import { NextLinkFromReactRouter } from "../NextLink";

import BoringAvatar from "./BoringAvatar";

const Container = styled(Box)`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colors.text};
  padding: 5px 22px 5px 5px;
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 30px;
  max-width: fit-content;
`

const Profiles = styled(Box)`
  display: flex;
`

const StyledLink = styled(Box)`
  img,
  svg {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid ${(p) => p.theme.colors.bg2};
    background-color: ${(p) => p.theme.colors.bg1};
    cursor: pointer;
    margin-left: ${(p) => (p.first ? 0 : '-20px')};
    box-sizing: content-box;
    object-fit: cover;
  }
`

const Collaborators = ({ userList=[] }) => {
  if (!userList) return null
  return (
    <Container>
      <Profiles>
        {userList.map(({ username, profileImage }, index) => (
          <NextLinkFromReactRouter to={`/${username}`}>
            <StyledLink first={index === 0}>
              {!isDefaultImage(profileImage) ? (
                <img src={`${profileImage}?q=80&auto=format&h=100`} alt="profile" />
              ) : (
                <BoringAvatar size={62} name={username} />
              )}
            </StyledLink>
          </NextLinkFromReactRouter>
        ))}
      </Profiles>
      <Box ml={12}>
        <SplitIcon />
      </Box>
      <Text ml={12} fontSize={14} fontWeight={500}>
        Split
      </Text>
    </Container>
  )
}

export default Collaborators
