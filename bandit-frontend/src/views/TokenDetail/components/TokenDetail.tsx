import React from 'react'
import { Popover } from 'antd'
import ReadMoreAndLess from 'react-read-more-less'

import { shareOnFacebook, shareOntwitter, truncateUsername } from '../../../utils'
import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'
import { AvatarWrapper, CollectionDescription, CollectionWrapper, Details, ShareIcon } from './styles'
import { RefreshIcon, ReportIcon, ThreeDotIcon, VerifiedIcon } from '../../../components/atoms/svg'
import { EtherScanIcon, IPFSIcon, ShareIcon as ShareIconSvg } from '../../../components/atoms/svg/images2'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { NextLinkFromReactRouter } from '../../../components/atoms/NextLink'

import DropDown from '../../../components/atoms/Dropdown/Dropdown'
import locale from '../../../constant/locale'
import Avatar from '../../../components/atoms/Avatar/Avatar'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

const BidToken = ({ token, optionList, refreshToken, refreshLoading }: any) => {
  const { metaData, collection, tokenCreator, id } = token
  const { name, etherScan, ipfs } = metaData || {}
  const { username, isVerified } = collection || {}

  function reportContent() {
    Mixpanel.track(MixpanelEvents.REPORT_CONTENT_CLICKED, {
      tokenId: token.id,
      user_id: token?.username,
      creator_id: token.tokenCreator,
      owner_id: token.tokenOwner,
    })
    window.open(`${locale.REPORT_CONTENT}${window.location.href}`, '_blank')
  }

  function open(url, where) {
    Mixpanel.track(MixpanelEvents.VIEW_PROOF_OF_AUTHENCITY_CALLED, {
      tokenId: token.id,
      user_id: token?.username,
      creator_id: token.tokenCreator,
      owner_id: token.tokenOwner,
      type: where,
    })
    window.open(url)
  }

  return (
    <Details>
      <Flex justifyContent="space-between" flexDirection={['column-reverse', 'inherit']}>
        <Box>
          <h1 className="bid-token__details--title">{name}</h1>
        </Box>
        <Flex mb={[3, 0]}>
          {refreshToken && (
            <ShareIcon p={'10px !important'} mr={10} onClick={refreshToken}>
              <Flex className="align-items-center">
                <RefreshIcon className={refreshLoading ? 'rotate' : ''} />
              </Flex>
            </ShareIcon>
          )}
          <ShareIcon p={'10px !important'} mr={10}>
            <Flex className="align-items-center">
              <IPFSIcon
                className="verification-item--icon"
                width={20}
                height={20}
                onClick={() => {
                  Mixpanel.track(MixpanelEvents.VIEW_ON_IPFS)
                  open(ipfs, 'ipfs')
                }}
              />
            </Flex>
          </ShareIcon>
          <ShareIcon p={'10px !important'} mr={10}>
            <Flex className="align-items-center">
              <EtherScanIcon
                className="verification-item--icon"
                width={20}
                height={20}
                onClick={() => {
                  Mixpanel.track(MixpanelEvents.VIEW_ON_BSC_SCAN)
                  open(etherScan, 'bscscan')
                }}
              />
            </Flex>
          </ShareIcon>
          {!!optionList.length && (
            <Box mr={10}>
              <DropDown
                trigger={['click']}
                placement="bottomRight"
                optionList={optionList}
                customButton={() => (
                  <ShareIcon>
                    <ThreeDotIcon style={{ width: '15px', height: '15px' }} />
                  </ShareIcon>
                )}
              />
            </Box>
          )}
          <Popover
            content={() => <div style={{ padding: '10px', fontWeight: 600 }}>Report content</div>}
            placement="bottom"
          >
            <ShareIcon mr={10} onClick={reportContent}>
              <ReportIcon className="m-0" />
            </ShareIcon>
          </Popover>

          <DropDown
            trigger={['click']}
            placement="bottomRight"
            optionList={[
              {
                title: 'Share on Facebook',
                onClick: () =>
                  shareOnFacebook(`Check out this NFT by @${tokenCreator}`, `${window.origin}/${tokenCreator}/${id}`),
              },
              {
                title: 'Share on Twitter',
                onClick: () =>
                  shareOntwitter(`Check out this NFT by @${tokenCreator}`, `${window.origin}/${tokenCreator}/${id}`),
              },
            ]}
            customButton={() => (
              <ShareIcon>
                <ShareIconSvg mr={2} />
              </ShareIcon>
            )}
          />
        </Flex>
      </Flex>

      <Box mb={48}>
        {username && (
          <NextLinkFromReactRouter to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[collection?.chainId]}/${username}`}>
            <Text color="text" fontSize={14} fontWeight={700}>
              {truncateUsername(username)} {isVerified && <VerifiedIcon />}
            </Text>
          </NextLinkFromReactRouter>
        )}
      </Box>

      <Box mb={50}>
        <CollectionWrapper mb="16px">
          <AvatarWrapper flex="1">
            <Avatar
              avatarImage={collection?.profileImage ? `${collection?.profileImage}?h=100&auto=format,compress` : null}
              role="Collection"
              userName={`${collection?.name}`}
              navTo={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[collection?.chainId]}/${collection?.contractAddress}`}
              verified={collection?.isVerified}
            />
          </AvatarWrapper>

          <CollectionDescription>
            <ReadMoreAndLess
              className="read-more-content"
              charLimit={150}
              readMoreText=" Read more"
              readLessText=" Read less"
            >
              {collection?.bio || ''}
            </ReadMoreAndLess>
          </CollectionDescription>
        </CollectionWrapper>
      </Box>
    </Details>
  )
}

export default BidToken
