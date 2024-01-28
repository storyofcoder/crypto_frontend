import React from "react";
import { Box, Flex, Text } from "../../atoms/StyledSystem";
import FiltersTemplate from "./FiltersTemplate";

const Filters = ({ categories, nftState, totalResult = 0, onClickClear, nftMarket }: any) => {
  return (
    <>
      <FiltersTemplate title="CATEGORIES" pillList={categories} />
      <Box m={15} />
      <FiltersTemplate title="NFT STATE" pillList={nftState} />
      <Box m={15} />
      <FiltersTemplate title="MARKET" pillList={nftMarket} />
      <Box m={15} />
      <Flex justifyContent="space-between">
        <Text fontWeight={600} fontSize={14} opacity={0.6} fontFamily="roc-grotesk" color="textTertiary">
          FOUND {totalResult.toLocaleString()} NFTs
        </Text>
        <Text
          fontWeight={500}
          fontSize={14}
          color="textTertiary"
          style={{ cursor: 'pointer' }}
          opacity={0.6}
          onClick={onClickClear}
        >
          Clear filters
        </Text>
      </Flex>
    </>
  )
}

export default Filters
