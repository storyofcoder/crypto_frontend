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
      <Flex>
        <ProfileImage>
          <Skeleton />
        </ProfileImage>
        <StyledText>
          <Skeleton minHeight={13} height={12} width={'60%'} />
          <Skeleton minHeight={18} height={18} width={'100%'} mt={10} />
        </StyledText>
      </Flex>
      <Box mt={3}>
        <Skeleton minHeight={75} />
      </Box>
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
    min-height: 180px;
    border-radius: 0;
  }
`
const ProfileImage = styled(Box)`
  width: 96px;
  height: 96px;
  overflow: hidden;
  border-radius: 50%;
  margin: -25px 0px 0 15px;
  border: 2px solid ${(p) => p.theme.colors.background};
`

const StyledText = styled(Text)`
  margin: 10px auto 0 20px;
  width: 40%;
`

export default CollectionCardSkeleton
