import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons/lib/icons";
import { Popover } from "antd";
import styled from "styled-components";
import { Flex } from "../../atoms/StyledSystem";
import { truncateUsername } from "../../../utils";

const SplitBreakupPopover = ({ usersList }) => {
  return (
    <Popover
      content={() => (
        <div style={{ padding: '10px' }}>
          {usersList.map((u) => (
            <SplitBreakUp key={u.username} username={u.username} price={u.price} unit={u.unit} />
          ))}
        </div>
      )}
    >
      <InfoCircleOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} />
    </Popover>
  )
}

const SplitBreakUp = ({ username, price, unit }) => {
  return (
    <SplitBreakUpWrapper>
      <div className="name">{truncateUsername(username)}</div>
      <div className="price">
        {price.toFixed(unit === 'BNB' ? 4 : 2)} {unit}
      </div>
    </SplitBreakUpWrapper>
  )
}

const SplitBreakUpWrapper = styled(Flex)`
  justify-content: space-between;

  .price {
    margin-left: 20px;
  }

  .name {
    text-transform: capitalize;
  }
`

export default SplitBreakupPopover
