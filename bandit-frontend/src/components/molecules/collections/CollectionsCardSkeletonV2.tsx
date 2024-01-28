import React from "react";
import styled from "styled-components";

import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { Skeleton } from "../../atomsV2/Skeleton";

const CollectionCardSkeleton = () => {
  return (
    <CollectionCardWrapper>
      <CoverImage>
        <Skeleton className="collection-avatar" />
      </CoverImage>
      <Flex justifyContent="center">
        <ProfileImage>
          <Skeleton />
        </ProfileImage>
      </Flex>
      <Flex mt={10} mb={10}>
      <Right flex={1}>
        <Flex mr={2} justifyContent="flex-end">
          <Skeleton minHeight={13} height={12} width={'30%'} />
        </Flex>
      </Right>
      <Box flex={1}>
        <Flex ml={2}>
          <Skeleton minHeight={13} height={12} width={'30%'} />
        </Flex>
      </Box>
    </Flex>
      <Flex m={0.5} justifyContent="center">
        <Skeleton minHeight={13} height={18} width={'60%'} />
      </Flex>
      <Flex m={1} mb={20} justifyContent="center">
        <Skeleton minHeight={18} height={12} width={'40%'} />
      </Flex>
    </CollectionCardWrapper>
  )
}

const CollectionCardWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 12px;
  overflow: hidden;
`
const CoverImage = styled(Box)`
  width: 100%;
  overflow: hidden;
  .collection-avatar {
    min-height: 130px;
    border-radius: 0;
  }
`
const ProfileImage = styled(Box)`
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 12%;
  margin: -25px 0px 0 15px;
  border: 2px solid ${(p) => p.theme.colors.background};
`

const StyledText = styled(Text)`
  margin: 10px auto 0 20px;
  width: 40%;
`

const Right = styled(Box)`
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: ${(p) => p.theme.colors.text};
`;

export default CollectionCardSkeleton
