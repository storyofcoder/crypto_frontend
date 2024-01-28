import React from "react";
import styled from "styled-components";

import { Box, Flex, Text } from "../../../../components/atoms/StyledSystem";
import Button from "../../../../components/atoms/Button/Button";
import { makeFriendlyNumber } from "../../../../utils";
import { useRouter } from "next/router";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

export default function BannerSection(props) {
  const { banner } = props

  const router = useRouter()
  function gotoCollection(banner) {
    router.push(`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[banner?.chainId]}/${banner?.username}`)
  }
  return (
    <TopWrapper>
      <BannerImageWrapper className="launchpad-right">
        <img src={`${banner?.coverImage}`} alt="banner image" className={'launchpad-right'} />
      </BannerImageWrapper>
      <BannerDetails>
        <BannerDetailsWrapper
          // maxWidth={1220}
          margin={[0, 0, 0, 0, '0 auto']}
          zIndex={3}
        >
          <TopHeading fontSize={[16, 16, 16, 16, 18]}>Featured</TopHeading>
          <Flex
            justifyContent="space-between"
            flexDirection={['column', 'column', 'column', 'column', 'column', 'row']}
          >
            <Box flex={1}>
              <Heading>{banner?.name}</Heading>
            </Box>
            <Flex
              alignItems={['flex-start', 'flex-start', 'flex-start', 'flex-start', 'flex-start', 'center']}
              justifyContent="flex-end"
              flex={1}
              flexDirection={['column', 'column', 'column', 'column', 'column', 'row']}
            >
              <Flex
                mt={[10, 10, 10, 10, 10, 0]}
                mb={[10, 10, 10, 10, 10, 0]}
                mr={[0, 0, 0, 0, 0, 50]}
                style={{ whiteSpace: 'nowrap' }}
              >
                <Stats mr={[20, 20, 20, 20, 50]} fontSize={[16, 16, 16, 16, 18]}>
                  Price{' '}
                  <Text ml={'5px'} fontSize={[16, 16, 16, 16, 16, 24]}>
                    | {banner?.contract?.price}BNB
                  </Text>
                </Stats>
                <Stats fontSize={[16, 16, 16, 16, 18]}>
                  Total supply{' '}
                  <Text ml={'5px'} fontSize={[16, 16, 16, 16, 16, 24]}>
                    | {makeFriendlyNumber(banner?.contract?.totalSupply)}
                  </Text>
                </Stats>
              </Flex>
              <PrimaryButton
                variant="primary"
                type="submit"
                minWidth={130}
                onClick={() => gotoCollection(banner)}
              >
                View more
              </PrimaryButton>
            </Flex>
          </Flex>
          {/*<Description>{banner?.bio}</Description>*/}
        </BannerDetailsWrapper>
      </BannerDetails>
    </TopWrapper>
  )
}

const TopWrapper = styled(Box)`
  position: relative;
`

const BannerDetails = styled(Box)`
  //background: #010101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  //max-width: 1220px;
  //margin: 0 auto;
  ${(p) => p.theme.media.xs} {
    position: relative;
    background-color: #000000;
    padding: 20px;
  }
  ${(p) => p.theme.media.sm} {
    position: relative;
    background-color: #000000;
    padding: 20px;
  }
  ${(p) => p.theme.media.lg} {
    position: absolute;
    bottom: 0;
    padding: 25px 40px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    z-index: 2;
    background: linear-gradient(0deg, #000000, rgba(0, 0, 0, 0.27), rgba(255, 255, 255, 0));
    ${(p) => p.theme.media.xs} {
      top: -60px;
      left: 0;
      height: 60px;
    }
    ${(p) => p.theme.media.sm} {
      top: -60px;
      left: 0;
      height: 60px;
    }

    ${(p) => p.theme.media.lg} {
      bottom: 0;
      left: 0;
      top: 0;
      height: 130px;
    }
  }
`

const BannerDetailsWrapper = styled(Box)`
  width: 100%;
`

const BannerImageWrapper = styled(Box)`
  padding: 0;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  object-fit: contain;
  position: relative;
  margin: 0;
  min-width: 0;
  min-height: 500px;
  height: 400px;
  background-color: rgba(128, 128, 128, 0.2);

  ${(p) => p.theme.media.xs} {
    min-height: 200px;
    height: 200px;
  }

  ${(p) => p.theme.media.sm} {
    min-height: 200px;
    height: 200px;
  }
  ${(p) => p.theme.media.lg} {
    min-height: 500px;
    height: 400px;
  }

  img {
    //border-radius: 20px;
    object-fit: cover !important;
    height: 100%;
    width: 100%;
    ${(p) => p.theme.media.lg} {
      border-radius: 0;
    }
  }
`
const TopHeading = styled(Text)`
  font-weight: 600;
  width: fit-content;
  backdrop-filter: blur(30px);
  border-radius: 22px;
  padding: 0 10px;
`
const Heading = styled(Text)`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  ${(p) => p.theme.media.xs} {
    font-size: 22px;
    line-height: 27px;
  }
  ${(p) => p.theme.media.sm} {
    font-size: 22px;
    line-height: 27px;
  }
  ${(p) => p.theme.media.lg} {
    font-size: 42px;
    line-height: 51px;
  }
`
const Description = styled(Box)`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  text-align: justify;
  color: #ffffff;
  opacity: 0.6;
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  ${(p) => p.theme.media.xs} {
    font-size: 12px;
    line-height: 15px;
    margin-top: 0;
  }
`

const Stats = styled(Text)`
  font-weight: 600;
  display: flex;
  align-items: center;
`
const PrimaryButton = styled(Button)`
  font-size: 14px;
  border: 1px solid white !important;
  height: 48px;

  :hover {
    background-color: white;
    color: black;
  }
  ${(p) => p.theme.media.xs} {
    font-size: 10px;
    height: 32px;
    min-width: 60px;
  }
`
