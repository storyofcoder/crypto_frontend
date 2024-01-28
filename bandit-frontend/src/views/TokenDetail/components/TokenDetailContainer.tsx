import React, { useRef, useState } from 'react'

import {
  AssetFit,
  AssetWrapper,
  AssetWrapper1,
  Container,
  DetailStyledCol,
  DetailStyledRow,
  HistoryRow,
  HistoryWrapper,
  TokenBadgeWrapper,
} from './styles'
import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'

import TokenBadge from '../../../components/atoms/Badge/Badge'
import BidTokenSkeleton from './TokenDetailSkeleton'
import TokenDetail from './TokenDetail'
import Tabs from './TokenTabs'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'

const TokenDetailContainer = ({ token, isLoading, optionList, refreshToken, refreshLoading }: any) => {
  const { metaData, badge } = token
  const { url, type, thumbnail } = metaData || {}
  const [badgeLoading, setBadgeLoading] = useState<any>(true)
  const { isDesktop } = useMatchBreakpoints()

  const assetRef: any = useRef()
  const videoRef: any = useRef()

  function openFullscreen() {
    if (assetRef.current.requestFullscreen) {
      assetRef.current.requestFullscreen()
    } else if (assetRef.current.webkitRequestFullscreen) {
      /* Safari */
      assetRef.current.webkitRequestFullscreen()
    } else if (assetRef.current.msRequestFullscreen) {
      /* IE11 */
      assetRef.current.msRequestFullscreen()
    }
  }

  function assetLoaded() {
    setBadgeLoading(false)
  }

  return (
    <>
      <Container overflow="hidden">
        {isLoading ? (
          <BidTokenSkeleton />
        ) : (
          <DetailStyledRow gutter={[40, 40]}>
            <DetailStyledCol xs={24} xl={8}>
              <AssetWrapper1>
                <AssetWrapper ref={assetRef} onClick={openFullscreen}>
                  <AssetFit
                    imageSrc={url}
                    imageSizes="(max-width: 75rem) 95vw, (max-width: 100rem) 60vw, 536px"
                    videoRef={videoRef}
                    type={type}
                    videoSrc={url}
                    thumbnail={`${thumbnail}?h=500&q=10&auto=format`}
                    objectFit="contain"
                    controls={true}
                    assetLoadCallBack={assetLoaded}
                  />
                  {!badgeLoading && (
                    <TokenBadgeWrapper>
                      <TokenBadge batch={badge} />
                    </TokenBadgeWrapper>
                  )}
                </AssetWrapper>
                {isDesktop && <TokenHistory properties={token?.properties || []} />}
              </AssetWrapper1>
            </DetailStyledCol>
            <DetailStyledCol isDetailSection={true} xs={24} xl={16}>
              <TokenDetail
                token={token}
                optionList={optionList}
                refreshToken={refreshToken}
                refreshLoading={refreshLoading}
              />
              {!isDesktop && <TokenHistory properties={token?.properties || []} />}
              <Tabs token={token} />
            </DetailStyledCol>
          </DetailStyledRow>
        )}
      </Container>
    </>
  )
}

function TokenHistory({ properties }) {
  const { isMobile } = useMatchBreakpoints()
  return (
    <HistoryWrapper isMobile={isMobile}>
      {properties.map((value) => (
        <HistoryRow>
          <Box>
            <Text fontWeight={500} fontSize={10} lineHeight={'15px'}>
              {value.key}
            </Text>
            <Text fontWeight={700} fontSize={13} lineHeight={'15px'} color="text">
              {value.value}
            </Text>
          </Box>
          <Flex alignItems="center">
            <Text fontSize={12} lineHeight={'18px'} color="text">
              1
            </Text>
            &nbsp;
            <Text fontSize={10} fontWeight={400} color="grey900">
              ({value.rarity}%)
            </Text>
          </Flex>
        </HistoryRow>
      ))}
    </HistoryWrapper>
  )
}

export default TokenDetailContainer
