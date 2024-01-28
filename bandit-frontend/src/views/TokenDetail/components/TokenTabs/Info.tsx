import React from 'react'
import { useRouter } from 'next/router'
import ReadMoreAndLess from 'react-read-more-less'

import { Box, Flex, Text } from 'components/atoms/StyledSystem'
import {
  InfoKey,
  InfoValue,
  TokenInfoAvatarWrapper,
  TokenInfoDetailStyledCol,
  TokenInfoDetailStyledRow,
  WordWrapper,
} from '../styles'

import Collaborators from '../../../../components/atoms/Avatar/Collaborators'
import Avatar from '../../../../components/atoms/Avatar/Avatar'
import CopyAddress from 'components/atomsV2/CopyAddress'

export default function Info({ token }) {
  const { query } = useRouter()

  const { contractAddress, id } = query

  const { metaData, splits, owner, creator } = token || {}

  const { description } = metaData || {}


  return (
    <TokenInfoDetailStyledRow gutter={[40, 20]}>
      <TokenInfoDetailStyledCol xs={24} xl={9}>
        <Flex mb="16px">
          <TokenInfoAvatarWrapper flex="1">
            {splits?.length ? (
              <Collaborators userList={splits} />
            ) : (
              <Avatar
                avatarImage={creator?.profileImage ? `${creator?.profileImage}?h=100&auto=format,compress` : null}
                role="Creator"
                userName={`${creator?.name}`}
                navTo={`/${creator?.walletAddress}`}
                verified={creator?.isVerified}
              />
            )}
          </TokenInfoAvatarWrapper>
        </Flex>
        <Box>
          <Flex justifyContent="space-between" mb={16}>
            <InfoKey>Contract Address</InfoKey>
            <CopyAddress address={contractAddress} />
          </Flex>
          <Flex justifyContent="space-between" mb={16}>
            <InfoKey>Token ID</InfoKey>
            <InfoValue>{id}</InfoValue>
          </Flex>
          <Flex justifyContent="space-between" mb={16}>
            <InfoKey>Token Standard</InfoKey>
            <InfoValue>ERC721</InfoValue>
          </Flex>
          <Flex justifyContent="space-between" mb={16}>
            <InfoKey>Metadata</InfoKey>
            <InfoValue>IPFS</InfoValue>
          </Flex>
          <Flex justifyContent="space-between" mb={16}>
            <InfoKey>Blockchain</InfoKey>
            <InfoValue>Ethereum</InfoValue>
          </Flex>
        </Box>
      </TokenInfoDetailStyledCol>

      <TokenInfoDetailStyledCol isDescription={true} xs={24} xl={15}>
        <Flex mb="16px">
          <TokenInfoAvatarWrapper flex="1">
            <Avatar
              avatarImage={owner?.profileImage ? `${owner?.profileImage}?h=100&auto=format,compress` : null}
              role="Owner"
              userName={`${owner?.name}`}
              navTo={`/${owner?.walletAddress}`}
              verified={owner?.isVerified}
            />
          </TokenInfoAvatarWrapper>
        </Flex>
        <Box>
          <Text fontSize={14} fontWeight={500} lineHeight={'17px'} color="text">
            Description
          </Text>
          <div className="token-history--content">
            <WordWrapper>
              <ReadMoreAndLess
                className="read-more-content"
                charLimit={300}
                readMoreText="read more"
                readLessText="read less"
              >
                {description || ""}
              </ReadMoreAndLess>
            </WordWrapper>
          </div>
        </Box>
      </TokenInfoDetailStyledCol>
    </TokenInfoDetailStyledRow>
  )
}
