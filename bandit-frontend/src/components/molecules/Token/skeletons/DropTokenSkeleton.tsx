import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

import { Col, Row } from "antd";
import { Box } from "../../../atoms/StyledSystem";

import CustomSkeleton from "../../../atoms/Skeleton";
import Avatar2Skeleton from "../../../atoms/Avatar/skeleton/Avatar2";

const StyledRow = styled(Row)<{ reverseContent: boolean }>`
  margin-bottom: 80px;

  ${(p) => p.theme.media.xs} {
    flex-direction: ${(props) => (!props.reverseContent ? `column` : `column-reverse`)};
    margin-bottom: 20px;
  }
`
const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Asset = styled(Box)``

const AssetWrapper = styled(Box)`
  height: 450px;
  width: 450px;
  border-radius: 2px;
  overflow: hidden;
  filter: drop-shadow(0 0 20px rgba('#000000' 0.5)));

  ${(p) => p.theme.media.xlg} {
    width: 100%;
  }

  .asset-wrapper--asset {
    height: 100%;
    width: 100%;
    position: relative;

    span{
      width: 100%;
      height: 100%;

      ${(p) => p.theme.media.lg} {
        height: 300px;
      }

    }
  }
`

const InfoWrapper = styled.div`
  ${(p) => p.theme.media.lg} {
    width: 90%;
    margin: 20px;
  }
`

const AssetTitle = styled.h2`
  font-size: 50px;
  font-weight: 700 !important;
  border-bottom: 3px solid;
  text-transform: capitalize;
  line-height: 55px !important;
  margin: 10px 0 20px 0 !important;
  padding-bottom: 10px;
  color: ${(p) => p.theme.colors.text};

  ${(p) => p.theme.media.lg} {
    width: 450px !important;
  }
`

const ActionsItems = styled.div`
  margin: 20px 0;

  span {
    height: 50px;
    width: 180px;
    border-radius: 25px !important;
  }
`

const Divider2 = styled.div`
  margin: 0 30px;
  border: 0.5px solid ${(p) => p.theme.colors.text};
  opacity: 0.1;
  margin-left: 0;
  margin-bottom: 20px;
  ${(p) => p.theme.media.lg} {
    margin: 10px 0;
  }
`

const AssetInfo = styled.div`
  display: flex;

  ${(p) => p.theme.media.lg} {
    flex-direction: column;
  }

  .divider {
    margin: 0 30px;
    border: 0.5px solid ${(p) => p.theme.colors.text};
    opacity: 0.1;

    ${(p) => p.theme.media.lg} {
      margin: 10px 0;
    }
  }
`

const DropTokenSkeleton = ({ reverseContent }: any) => {
  function renderAsset() {
    return (
      <AssetWrapper height={['100%', '100%', 450]} width={['100%', '100%', 450]} m={[20, 20, 0]}>
        <div className="asset-wrapper--asset">
          <CustomSkeleton />
        </div>
      </AssetWrapper>
    )
  }
  function renderInfo() {
    return (
      <InfoWrapper>
        {/* <AvatarSkeleton /> */}
        <AssetTitle>
          <CustomSkeleton />
        </AssetTitle>
        <ActionsItems>
          <CustomSkeleton />
        </ActionsItems>
        <Divider2 />
        <AssetInfo>
          <Avatar2Skeleton />
          <div className="divider" />
          <Avatar2Skeleton />
        </AssetInfo>
      </InfoWrapper>
    )
  }
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <StyledRow reverseContent={reverseContent}>
        <StyledCol xs={24} xl={12}>
          {reverseContent ? renderInfo() : renderAsset()}
        </StyledCol>
        <StyledCol xs={24} xl={12}>
          {reverseContent ? renderAsset() : renderInfo()}
        </StyledCol>
      </StyledRow>
    </SkeletonTheme>
  )
}

export default DropTokenSkeleton
