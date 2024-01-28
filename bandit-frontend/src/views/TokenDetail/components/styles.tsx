import { Col, Row } from 'antd'
import styled from 'styled-components'

import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'

import Asset from '../../../components/atoms/Image/Asset'

export const Container = styled(Box)`
  ${(p) => p.theme.media.xlg} {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 20px 40px;
  }
`

export const DetailStyledRow = styled(Row)`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  margin: 0 !important;
  ${(p) => p.theme.media.xs} {
    margin-bottom: 20px;
  }
  ${(p) => p.theme.media.xlg} {
    flex-direction: row;
  }
`
export const DetailStyledCol = styled(Col)`
  display: ${(p) => (p.isDetailSection ? 'block' : 'flex')};
  justify-content: center;
  padding: ${(p) => (p.isDetailSection ? '15px ' : '15px 0')} !important;

  ${(p) => p.theme.media.md} {
    padding: ${(p) => (p.isDetailSection ? '20px ' : '20px 0')} !important;
  }
  ${(p) => p.theme.media.lg} {
    padding: ${(p) => (p.isDetailSection ? '20px' : '20px 0')} !important;
  }
`

export const AssetWrapper1 = styled.div`
  margin: 0 20px;
  margin-bottom: 16px;
`

export const AssetWrapper = styled.div`
  width: 100%;
  max-height: 80vh;
  cursor: zoom-in;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  min-height: 250px;

  ${(p) => p.theme.media.xs} {
    width: 100%;

    height: auto;
    max-height: 100% !important;
  }
`

export const HistoryWrapper = styled.div`
  width: 100%;
  grid-gap: 4px;
  display: grid;
  margin-top: 16px;
  height: 40vh;
  max-height: 250px;
  height: auto;
  overflow: auto;
  padding-right: 10px;
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  ${(p) => p.theme.media.lg} {
    min-width: 350px;
  }
  grid-template-columns: repeat(${(p) => (p.isMobile ? 1 : 2)}, 1fr);
`
export const HistoryRow = styled(Flex)`
  border: 1px solid #E2E4E8;
  border-radius: 6px;
  padding 10px 16px;
  justify-content: space-between;
`

export const AssetFit = styled(Asset)`
  max-height: 100%;
  max-width: 100%;
  height: auto !important;
  width: auto !important;
`

export const TokenBadgeWrapper = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  cursor: pointer;
  margin-top: -7px;
  z-index: 1;
`

export const ShareIcon = styled(Box)`
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

export const Details = styled.div`
  width: 100%;

  ${(p) => p.theme.media.xxs} {
    width: 100%;
  }
  .bid-token__details--title {
    font-size: 26px;
    font-weight: 600;
    color: ${(p) => p.theme.colors.text};
    margin-bottom: 6px;
    word-break: break-word;
    line-height: 100%;
    span {
      margin-left: 10px;
    }
  }
`

export const CollectionWrapper = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
  ${(p) => p.theme.media.md} {
    display: flex;
  }
`

export const CollectionDescription = styled(Text)`
  .short-text {
    margin: 0;
    font-size: 12px;
    line-height: 5px;
    color: ${(p) => p.theme.colors.grey900};
    font-weight: 400;
    word-break: break-all;
  }
`

export const AvatarWrapper = styled(Box)`
  display: flex;
  justify-content: start;
  flex-direction: column;
  min-width: 30% !important;
`

export const TokenInfoDetailStyledRow = styled(Row)`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  margin: 0 !important;
  ${(p) => p.theme.media.xs} {
    margin-bottom: 20px;
  }

  ${(p) => p.theme.media.xlg} {
    flex-direction: row;
  }
`
export const TokenInfoDetailStyledCol = styled(Col)`
  justify-content: center;
  padding: ${(props) => (!props.isDescription ? `0 0 10px 0 !important` : `0 0 0 0 !important`)};
  border-bottom: ${(props) => (!props.isDescription ? `2px solid ${props.theme.colors.grey400}` : `0`)};
  border-right: none;

  .short-text {
    font-weight: 300;
    font-size: 12px;
    line-height: 12px;
    color: ${(p) => p.theme.colors.grey900};
  }

  ${(p) => p.theme.media.lg} {
    padding: ${(props) => (!props.isDescription ? `0 20px 0 0px !important` : `0 0 0 20px !important`)};
    border-right: ${(props) => (!props.isDescription ? `2px solid ${props.theme.colors.grey400}` : `0`)};
    border-bottom: none;
  }
`

export const TokenInfoAvatarWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  ${(p) => p.theme.media.xxs} {
    margin-right: 15px;
  }
`

export const InfoKey = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${(p) => p.theme.colors.grey900};
`

export const InfoValue = styled(Box)`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${(p) => p.theme.colors.text};
`

export const WordWrapper = styled(Text)`
  word-break: break-word;
`

export const ActivityContainer = styled(Box)`
  min-height: 70vh;
  .fiat-icon {
    height: 15px;
    position: relative;
    top: 3px;
  }
`

export const CollectionNameLink = styled.span`
  display: flex;
  align-items: center;
`

export const StyledTable = styled.div`
  .ant-table,
  .ant-table-sticky-holder {
    background-color: transparent;
  }
  .ant-table-wrapper {
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-table-cell {
    border: none;
    background-color: transparent !important;
    color: ${(p) => p.theme.colors.text};
    font-weight: 500;
    font-size: 14px;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
    padding: 16px;
  }

  .ant-table-row {
    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 500;
      font-size: 14px !important;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      font-size: 12px;
      font-weight: 600;
    }
  }

  .ant-spin-dot {
    .ant-spin-dot-item {
      background-color: ${(p) => p.theme.colors.text};
    }
  }
`

export const MediaLarge = styled(Box)`
  display: none;
  transition: all 0.3s ease;
  ${(p) => p.theme.media.xlg} {
    display: flex;
    justify-content: flex-end;
  }
`
export const MediaSmall = styled(Box)`
  display: flex;
  ${(p) => p.theme.media.xlg} {
    display: none;
  }
`
