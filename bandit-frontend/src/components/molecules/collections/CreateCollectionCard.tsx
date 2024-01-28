import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../atoms/StyledSystem";
import { ImageAddIcon } from "../../../components/atoms/svg";

const CollectionCard = ({ onClick }) => {
  return (
    <CollectionCardWrapper onClick={onClick}>
      <IconWrapper>
        <ImageAddIcon />
      </IconWrapper>
      <Text fontSize={18} fontWeight={600} color="text" mt={10}>
        Create Collection
      </Text>
    </CollectionCardWrapper>
  )
}

const CollectionCardWrapper = styled(Box)`
  padding: 14px;
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  height: 100%;
  min-height: 282px;
`
const IconWrapper = styled(Box)`
  height: 60px;
  width: 60px;

  svg {
    width: 100%;
    height: 100%;
  }
`

export default CollectionCard
