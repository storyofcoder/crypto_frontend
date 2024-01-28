import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'

import { Skeleton } from '../../../components/atomsV2/Skeleton'

import { Box, Flex } from 'components/atoms/StyledSystem'

const StyledRow = styled(Row)`
  margin: 0 !important;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  ${(p) => p.theme.media.xlg} {
    flex-direction: row;
  }
`
const StyledCol = styled(Col)``

const HistoryRow = styled(Flex)`
  border: 1px solid #E2E4E8;
  border-radius: 6px;
  padding 10px 16px;
  justify-content: space-between;
  margin-top: 8px;
`

const DetailStyledRow = styled(Row)`
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
const DetailStyledCol = styled(Col)`
  justify-content: center;
  padding: ${(props) => (!props.isDescription ? `0 0 10px 0 !important` : `20px 0 0 0 !important`)};
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

const AvatarWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  ${(p) => p.theme.media.xxs} {
    margin-right: 15px;
  }
`

const BidTokenSkeleton = () => {
  return (
    <StyledRow gutter={[40, 40]}>
      <StyledCol xs={24} xl={8}>
        <Skeleton minHeight={400} height={400} />
        <Box>
          {[1, 2, 3, 4].map((value) => (
            <HistoryRow>
              <Box width={'50%'}>
                <Skeleton minHeight={12} height={12} width={'30%'} />
                <Skeleton minHeight={16} height={16} width={'50%'} mt={1} />
              </Box>
              <Flex width={'50%'} alignItems="center" justifyContent="end">
                <Skeleton minHeight={18} height={18} width={'40%'} />
              </Flex>
            </HistoryRow>
          ))}
        </Box>
      </StyledCol>
      <StyledCol xs={24} xl={16}>
        <Flex mb={5}>
          <Box width={'50%'}>
            <Skeleton minHeight={26} height={26} width={'70%'} />
            <Skeleton minHeight={16} height={16} width={'50%'} mt={1} />
          </Box>
          <Flex width={'50%'} alignItems="center" justifyContent="end">
            <Box borderRadius={'50%'} overflow="hidden">
              <Skeleton minHeight={40} height={40} width={40} />
            </Box>
            <Box borderRadius={'50%'} overflow="hidden" ml={2}>
              <Skeleton minHeight={40} height={40} width={40} />
            </Box>
            <Box borderRadius={'50%'} overflow="hidden" ml={2}>
              <Skeleton minHeight={40} height={40} width={40} />
            </Box>
          </Flex>
        </Flex>

        <Box mb={5}>
          <Flex>
            <Box width={'50%'}>
              <Skeleton minHeight={20} height={20} width={'30%'} />
              <Skeleton minHeight={35} height={35} width={'50%'} mt={1} />
            </Box>
            <Flex width={'50%'} alignItems="center" justifyContent="end">
              <Skeleton minHeight={50} height={50} width={'40%'} />
            </Flex>
          </Flex>
          <Flex justifyContent="end" mt={1}>
            <Skeleton minHeight={15} height={15} width={'35%'} />
          </Flex>
        </Box>
        <Box mb={2}>
          <Skeleton minHeight={40} height={40} width={'60%'} maxWidth={270} />
        </Box>

        <DetailStyledRow gutter={[40, 40]}>
          <DetailStyledCol xs={24} xl={9}>
            <Flex mb="16px">
              <AvatarWrapper flex="1">
                <Avatar />
              </AvatarWrapper>
            </Flex>
            <Box>
              {[1, 2, 3, 4, 5].map((value) => (
                <Flex justifyContent="space-between" mb={16}>
                  <Box width={'30%'}>
                    <Skeleton minHeight={18} height={18} width={'100%'} />
                  </Box>
                  <Box width={'40%'}>
                    <Skeleton minHeight={18} height={18} width={'100%'} />
                  </Box>
                </Flex>
              ))}
            </Box>
          </DetailStyledCol>
          <DetailStyledCol isDescription={true} xs={24} xl={15}>
            <Flex mb="16px">
              <AvatarWrapper flex="1">
                <Avatar />
              </AvatarWrapper>
            </Flex>
            <Box>
              <Skeleton minHeight={26} height={26} width={'50%'} />
              <Box mt={2}>
                <Skeleton minHeight={120} height={120} width={'90%'} />
              </Box>
            </Box>
          </DetailStyledCol>
        </DetailStyledRow>
      </StyledCol>
    </StyledRow>
  )
}

const Avatar = () => {
  return (
    <Flex>
      <Box height={45} width={45} overflow="hidden" borderRadius="50%">
        <Skeleton minHeight={45} height={45} width={'100%'} />
      </Box>
      <Box width={'50%'} ml={15}>
        <Skeleton minHeight={16} height={16} width={'100%'} maxWidth={100} />
        <Box mt={2}>
          <Skeleton minHeight={18} height={18} width={'100%'} maxWidth={140} />
        </Box>
      </Box>
    </Flex>
  )
}

export default BidTokenSkeleton
