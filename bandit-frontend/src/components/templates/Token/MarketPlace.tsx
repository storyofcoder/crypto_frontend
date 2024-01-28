import React from "react";

import { Flex, Text } from "../../atoms/StyledSystem";
import { useSelector } from "react-redux";
import { Mixpanel, MixpanelEvents } from "../../../analytics/Mixpanel";

import FeedList from "../../../modules/Feed/FeedList";

const MarketPlace = ({ tokenList = [], isLoading, isFetching, getTokenOptionsList, getGridCount, type }: any) => {
  const user = useSelector((state: any) => state.auth.user)

  function onClickToken(tokenId) {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.PRODUCT_DETAIL_VIEW, {
      source: type,
      tokenId,
    })
  }

  return (
    <>
      <FeedList
        isLoading={isLoading}
        feedList={tokenList}
        onClick={onClickToken}
        isFetching={isFetching}
        getTokenOptionsList={getTokenOptionsList}
        getGridCount={getGridCount}
        isCollectionToken={type === 'collections'}
      />

      {!isFetching && !tokenList.length && (
        <Flex justifyContent="center" alignItems="center" height="30vh">
          <Text fontSize="16px" color="text">No items to display</Text>
        </Flex>
      )}
    </>
  )
}

export default MarketPlace
