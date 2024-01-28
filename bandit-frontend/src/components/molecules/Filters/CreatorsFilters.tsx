import React from "react";
import { Box, Flex, Text } from "../../atoms/StyledSystem";
import Pill from "../../atoms/Pill/Pill";

const FiltersTemplate = ({ title, pillList }: any) => {
  return (
    <Box>
      <Text fontSize={14} fontWeight={600} mb={10} opacity={0.6} color="textTertiary" fontFamily="roc-grotesk">
        {title}
      </Text>
      <Flex flexWrap="wrap">
        {pillList.map((props) => (
          <Pill key={props.name} {...props} />
        ))}
      </Flex>
    </Box>
  )
}

const CreatorsFilters = ({ list, totalResult = 0, onClickClear }) => {
  return (
    <>
      <FiltersTemplate title="VERIFICATION STATUS" pillList={list} />
      <Box m={15} />
      <Flex justifyContent="space-between">
        <Text fontWeight={600} fontSize={14} color="textTertiary" opacity={0.6} fontFamily="roc-grotesk">
          FOUND {totalResult.toLocaleString()} CREATORS
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

export default CreatorsFilters
