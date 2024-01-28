import React, { useEffect, useMemo, useState } from 'react'
import { Popover } from 'antd'
import styled from 'styled-components'
import Countdown from 'react-countdown'
import moment from 'moment'
import ReadMoreAndLess from 'react-read-more-less'

import { pad, shareOnFacebook, shareOntwitter, truncateUsername } from '../../../utils'
import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'
import { BackIcon, RefreshIcon, ReportIcon, ThreeDotIcon, VerifiedIcon } from '../../../components/atoms/svg'
import { EtherScanIcon, IPFSIcon, ShareIcon as ShareIconSvg } from '../../../components/atoms/svg/images2'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { NextLinkFromReactRouter } from '../../../components/atoms/NextLink'

import DisplayInput from '../../../components/atoms/Form/DisplayInput'
import Button from '../../../components/atoms/Button/Button'
import DropDown from '../../../components/atoms/Dropdown/Dropdown'
import locale from '../../../constant/locale'
import Avatar from '../../../components/atoms/Avatar/Avatar'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

const ShareIcon = styled(Box)`
  width: 40px;
  height: 40px;
  background-color: ${(p) => p.theme.colors.grey300};
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;

  &:hover {
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  // path,
  // circle {
  //   fill: black;
  // }

  svg {
    height: 100%;
    width: 100%;
  }

  .rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

const PrimaryButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  margin-right: 30px;
  width: 100%;
  border-radius: 10px;
  background: ${(p) => p.theme.colors.text};
`

const MakeOfferButton = styled(Button)`
  font-weight: 600;
  font-size: 16px;
  margin-right: 30px;
  right: 0;
  width: 100%;
  border-radius: 10px;
  background: ${(p) => p.theme.colors.text};
`

const AuctionContainer = styled(Box)`
  // padding-left: 22px;
  // ${(p) => p.theme.media.xxs} {
  //   padding-left: 0 !important;
  // }
`

const Details = styled.div`
  width: 100%;

  ${(p) => p.theme.media.xxs} {
    width: 100%;
    // padding: 20px;
  }
  .bid-token__details--title {
    font-size: 26px;
    font-weight: 600;
    color: ${(p) => p.theme.colors.text};
    margin-bottom: 6px;
    word-break: break-word;
    line-height: 100%;

    // ${(p) => p.theme.media.xxs} {
    //   font-size: 20px;
    // }
    span {
      margin-left: 10px;
    }
  }
`

const CollectionWrapper = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
  ${(p) => p.theme.media.md} {
    display: flex;
  }
`

const CollectionDescription = styled(Text)`
  .short-text {
    margin: 0;
    font-size: 12px;
    line-height: 5px;
    color: ${(p) => p.theme.colors.grey900};
    font-weight: 400;
    word-break: break-all;
  }
`

const AvatarWrapper = styled(Box)`
  display: flex;
  justify-content: start;
  flex-direction: column;
  min-width: 30%;
`

const BidToken = ({
  token,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  showClaim,
  claimButton,
  onAuctionComplete,
  isUserOwner,
  makeOffer,
  isLoggedIn,
  optionList,
  refreshToken,
  refreshLoading,
}: any) => {
  const [difference, setDifference] = useState<any>(null)
  const [auctionEndingSoon, setAuctionEndingSoon] = useState<any>(null)
  const [auctionEndingVerySoon, setAuctionEndingVerySoon] = useState<any>(null)
  const [auctionEnded, setAuctionEnded] = useState<any>(false)
  const [count, setCount] = useState<any>(1)
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'

  useEffect(() => {
    // @ts-ignore
    setDifference(
      // @ts-ignore
      moment.utc(token.auctionEndTime).toDate() - moment().toDate(),
    )
  }, [count, token.auctionEndTime])

  useEffect(() => {
    const auctionEndingSoon = difference > 0 && difference < 900000
    const auctionEndingVerySoon = difference > 0 && difference < 120000
    const auctionEnded = difference <= 0

    setAuctionEnded(auctionEnded)
    setAuctionEndingSoon(auctionEndingSoon)
    setAuctionEndingVerySoon(auctionEndingVerySoon)
  }, [difference])

  const {
    metaData,
    collection,
    tokenCreator,
    price,
    unit,
    onSale,
    highestOffer,
    localRate,
    id,
    auctionLive = true,
    saleType,
    auctionEndTime,
  } = token

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

  function setAuctionComplete() {
    setAuctionEnded(true)
  }

  function onComplete() {
    setAuctionComplete()
    if (onAuctionComplete) onAuctionComplete()
  }

  const legend =
    !onSale && !!highestOffer?.value
      ? 'Highest Offer'
      : !onSale && price
      ? 'Price'
      : saleType == 'buy'
      ? 'Price'
      : auctionLive
      ? 'Current bid'
      : 'Reserve price'

  const text =
    !onSale && !!highestOffer?.value
      ? `${highestOffer.value} ${highestOffer.unit}`
      : price
      ? `${price} ${unit}`
      : `Not for sale`
  const sideText =
    !onSale && !!highestOffer?.value
      ? `($${parseFloat(highestOffer.localRate).toLocaleString()})`
      : price
      ? `($${parseFloat(localRate).toLocaleString()})`
      : ''

  const showPriceSection = Number(price) > 0 || !!highestOffer?.value

  const isForSale = saleType === 'buy' && onSale && price
  const showMakeOffer = !auctionLive
  const showBid = saleType === 'auction' && onSale && (auctionLive ? !auctionEnded : true) && !isUserOwner

  const noButtons =
    !(isForSale && !isUserOwner) && !(showBid && !showClaim) && !showClaim && !(isUserOwner && tertiaryButton)

  const actionsFiller = () => {
    let result = []
    if (isForSale && !isUserOwner)
      result.push({
        type: 'button',
        view: (
          <PrimaryButton variant={'solid'} height={50} {...primaryButton} width={180}>
            {primaryButton.caption}
          </PrimaryButton>
        ),
      })
    else if (showBid && !showClaim)
      result.push({
        type: 'button',
        view: (
          <PrimaryButton variant={'solid'} height={50} {...secondaryButton} width={180}>
            {secondaryButton.caption}
          </PrimaryButton>
        ),
      })
    else if (showClaim)
      result.push({
        type: 'button',
        view: (
          <PrimaryButton variant={'solid'} height={50} {...claimButton} width={180}>
            {claimButton.caption}
          </PrimaryButton>
        ),
      })
    else if (isUserOwner && tertiaryButton)
      result.push({
        type: 'button',
        view: (
          <PrimaryButton variant={'solid'} height={50} {...tertiaryButton} width={180}>
            {tertiaryButton.caption}
          </PrimaryButton>
        ),
      })

    if (noButtons && showMakeOffer && !isUserOwner && isLoggedIn)
      result.unshift({
        type: 'button',
        view: (
          <MakeOfferButton variant={result.length ? 'primary' : 'solid'} width={180} height={50} onClick={makeOffer}>
            Make offer
          </MakeOfferButton>
        ),
      })
    else if (!noButtons && showMakeOffer && !isUserOwner && isLoggedIn)
      result.unshift({
        type: 'button',
        view: (
          <MakeOfferButton variant={result.length ? 'primary' : 'solid'} width={180} height={50} onClick={makeOffer}>
            Make offer
          </MakeOfferButton>
        ),
      })

    if (auctionLive)
      result.push({
        type: 'timer',
        view: (
          <AuctionContainer ml={result?.length ? 3 : 0}>
            <Text
              // mb={'8px'}
              fontSize={'14px'}
              fontWeight={400}
              color={(auctionEndingSoon || auctionEndingVerySoon) && !auctionEnded ? 'danger' : 'grey900'}
            >
              {auctionEnded
                ? 'Auction ended'
                : auctionEndingVerySoon
                ? 'Auction ends soon'
                : auctionEndingSoon
                ? 'Auction ends soon'
                : 'Auction ending in'}
            </Text>
            <Countdown
              date={moment.utc(auctionEndTime).toDate()}
              renderer={(props) => renderer(props, auctionEndTime)}
              onTick={() => setCount(count + 1)}
              onComplete={onComplete}
            />
          </AuctionContainer>
        ),
      })
    return result
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

  const actionsVariable = actionsFiller()

  return (
    <Details>
      <Flex justifyContent="space-between" flexDirection={['column-reverse', 'column-reverse', 'inherit']}>
        {/* <span onClick={router.back} style={{ cursor: 'pointer' }}>
          <BackIcon />
        </span> */}
        <Box>
          <h1 className="bid-token__details--title">{name}</h1>
        </Box>
        <Flex mb={[3, 3, 0]}>
          {refreshToken && (
            <Popover content={() => <div style={{ padding: '10px' }}>Refresh metadata</div>}>
              <ShareIcon p={'10px !important'} mr={10} onClick={refreshToken}>
                <Flex className="align-items-center">
                  <RefreshIcon className={refreshLoading ? 'rotate' : ''} />
                </Flex>
              </ShareIcon>
            </Popover>
          )}
          <Popover content={() => <div style={{ padding: '10px' }}>View metadata</div>}>
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
          </Popover>
          <Popover
            content={() => <div style={{ padding: '10px' }}>View on {isProduction ? 'Etherscan' : 'Rinkyby'}</div>}
          >
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
          </Popover>
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
          <Popover content={() => <div style={{ padding: '10px' }}>Report</div>}>
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
              <Popover content={() => <div style={{ padding: '10px' }}>Share</div>}>
                <ShareIcon>
                  <ShareIconSvg mr={2} />
                </ShareIcon>
              </Popover>
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

      {/* <Box mb={50}>
        <Flex
          style={{
            position: 'relative',
          }}
          justifyContent={'space-between'}
        >
          {showPriceSection && (
            <Box maxWidth={180} flex="1">
              <DisplayInput legend={legend} text={text} sideText={sideText} />
            </Box>
          )}

          {auctionLive && actionsVariable.length > 2 && (
            <Box maxWidth={180} flex="1">
              {actionsVariable[2].view}
            </Box>
          )}

          {actionsVariable.length > 1 && (
            <Box maxWidth={180} flex="1">
              {actionsVariable[1].view}
            </Box>
          )}
          {actionsVariable.length == 1 && actionsVariable[0].type === 'timer' && (
            <Box maxWidth={180} flex="1">
              {actionsVariable[0].view}
            </Box>
          )}

          {actionsVariable.length > 0 && actionsVariable[0].type === 'button' && (
            <Box maxWidth={180} flex="1">
              {actionsVariable[0].view}
            </Box>
          )}
        </Flex>
        {actionsVariable.length >= 2 && (
          <Box>
            <Text fontSize={14} fontWeight={400} lineHeight={'17px'} textAlign={'right'} color="text">
              You can also{' '}
              <Text display={'inline'} fontWeight={500}>
                Make offer
              </Text>{' '}
              for this item.
            </Text>
            {showBid && auctionEndingSoon && !auctionEndingVerySoon && !auctionEnded && (
              <Text fontSize={14} fontWeight={400} lineHeight={'17px'} textAlign={'right'} color="text" opacity={0.6}>
                Any bids placed in the last 15 minutes will extend the auction for another 15 minutes.
              </Text>
            )}
            {showBid && auctionEndingVerySoon && !auctionEnded && (
              <Text fontSize={14} fontWeight={400} lineHeight={'17px'} textAlign={'right'} color="text" opacity={0.6}>
                If you bid at this moment, there is a high chance that it would result in an error.
              </Text>
            )}
          </Box>
        )}
      </Box> */}
    </Details>
  )
}

const renderer = ({ hours, minutes, seconds, completed }, auctionEndTime) => {
  if (completed)
    return (
      <Box>
        <Text fontSize={26} fontWeight={700} lineHeight="100%" color="text">
          {moment.utc(auctionEndTime).local().format('ll')}
        </Text>
      </Box>
    )
  return (
    <Flex color="textTertiary">
      {hours > 0 && (
        <Box mr={10}>
          <Text fontSize={24} fontWeight={700} lineHeight="28px">
            {pad(hours, 2)}
          </Text>
          <Text>Hours</Text>
        </Box>
      )}
      <Box mr={10}>
        <Text fontSize={24} fontWeight={700} lineHeight="28px">
          {pad(minutes, 2)}
        </Text>
        <Text>Minutes</Text>
      </Box>
      <Box mr={10}>
        <Text fontSize={24} fontWeight={700} lineHeight="28px">
          {pad(seconds, 2)}
        </Text>
        <Text>Seconds</Text>
      </Box>
    </Flex>
  )
}

export default BidToken
