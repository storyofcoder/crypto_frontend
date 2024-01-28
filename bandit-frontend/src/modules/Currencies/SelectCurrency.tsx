import React from "react";
import PillFilled from "../../components/atoms/Pill/PilllFilled";
import { Flex } from "../../components/atoms/StyledSystem";
import { BNB, WRX } from "../../constant/currencies";

const SelectCurrency = ({ currency, onChange }) => {
  return (
    <Flex>
      <PillFilled
        name={BNB.symbol}
        active={currency.symbol === BNB.symbol}
        onClick={() => onChange(BNB)}
        showIcons={false}
      />
      <PillFilled
        name={WRX.symbol}
        active={currency.symbol === WRX.symbol}
        onClick={() => onChange(WRX)}
        showIcons={false}
      />
    </Flex>
  )
}

export default SelectCurrency
