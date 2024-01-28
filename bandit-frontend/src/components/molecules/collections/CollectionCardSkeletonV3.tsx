import React from 'react'
import styled from 'styled-components'

import { Box, Flex, Text } from '../../atoms/StyledSystem'
import { Skeleton } from '../../atomsV2/Skeleton'

const CollectionCardSkeletonV3 = () => {
  return (
    <CollectionCardWrapper>
      <CoverImage>
        <Skeleton className="collection-avatar" />
      </CoverImage>
      <Flex mt={'14px'}>
        <ProfileImage>
          <Skeleton />
        </ProfileImage>

        <Box width="100%" ml={'14px'}>
          <Skeleton minHeight={13} height={18} width={'80%'} />
          <Skeleton minHeight={18} height={12} width={'60%'} mt="2" />
          <Flex mt={14}>
            {['start', 'center', 'end'].map((value, index) => (
              <Box flex={1} key={index}>
                <Flex justifyContent={value}>
                  <Skeleton minHeight={13} height={12} width={'40%'} />
                </Flex>
                <Flex justifyContent={value} mt={'6px'}>
                  <Skeleton minHeight={13} height={12} width={'50%'} />
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
      <Box width="100%" mt={14}>
        <Flex>
          <Skeleton minHeight={10} height={10} width={'100%'} />
        </Flex>
        <Flex mt={1}>
          <Skeleton minHeight={10} height={10} width={'100%'} />
        </Flex>
        <Flex mt={1}>
          <Skeleton minHeight={10} height={10} width={'70%'} />
        </Flex>
      </Box>
    </CollectionCardWrapper>
  )
}

const CollectionCardWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.background};
  border-color: ${(p) => p.theme.colors.cardBorder};
  box-shadow: ${(p) => p.theme.colors.shadows.small};
  border-radius: 12px;
  overflow: hidden;
  padding: 13px;
`
const CoverImage = styled(Box)`
  width: 100%;
  overflow: hidden;
  border-radius: 10.95px 10.95px 0px 0px;
  .collection-avatar {
    min-height: 120px !important;
    border-radius: 0;
  }
`
const ProfileImage = styled(Box)`
  width: 95px;
  height: 95px;
  min-width: 95px;
  overflow: hidden;
  border-radius: 12%;
`

export default CollectionCardSkeletonV3
