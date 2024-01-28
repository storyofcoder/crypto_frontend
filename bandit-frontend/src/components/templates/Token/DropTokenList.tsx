import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Mixpanel, MixpanelEvents } from "../../../analytics/Mixpanel";
import { Box, Text } from "../../atoms/StyledSystem";

import DropToken from "../../molecules/Token/DropToken";
import DropTokenSkeleton from "../../molecules/Token/skeletons/DropTokenSkeleton";

const Container = styled(Box)`
  padding-top: 10px;

  ${(p) => p.theme.media.xlg} {
    width: 1040px;
    margin: 0 auto;
  }
`

const Title = styled(Text)`
  color: ${(p) => p.theme.colors.text};
  font-size: 14px;
  text-align: center;
  font-weight: 600;
`

const DropTokenList = ({ tokenList, isLoading }: any) => {
  const user = useSelector((state: any) => state.auth.user)

  function onClickView(tokenId) {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.PRODUCT_DETAIL_VIEW, {
      source: 'Drop page',
      tokenId,
    })
  }
  return (
    <Container>
      <Title textAlign="center" mb={[40]} color="text" opacity={0.5}>
        LATEST DROP
      </Title>
      <div>
        {tokenList.map((token: any, index: any) => (
          <DropToken
            key={index}
            token={token}
            reverseContent={index % 2 !== 0}
            onClickView={() => onClickView(token.id)}
          />
        ))}
        {isLoading && (
          <>
            <DropTokenSkeleton />
            <DropTokenSkeleton reverseContent={true} />
          </>
        )}
      </div>
    </Container>
  )
}

export default DropTokenList
