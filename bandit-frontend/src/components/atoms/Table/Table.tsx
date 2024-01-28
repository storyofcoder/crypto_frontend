import { Table } from "antd";
import React from "react";
import styled from "styled-components";
import { useVT } from "virtualizedtableforantd4";

const StyledTable = styled.div`
  .ant-table-wrapper {
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-table-cell {
    border: none;
    background-color: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text};
    font-weight: 500;
    font-size: 14px;
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 600;
    }
  }
`

const CustomTable = (props) => {
  function scroll() {
    if (props.fetchNextPage) {
      props.fetchNextPage()
    }
  }

  const [vt] = useVT(
    () => ({
      onScroll: ({ isEnd }) => {
        if (isEnd) {
          scroll()
        }
      },
      scroll: { y: 500 },
    }),
    [props.dataSource],
  )

  if (!props.infinite)
    return (
      <StyledTable>
        <Table {...props} />{' '}
      </StyledTable>
    )

  return (
    <StyledTable>
      <Table scroll={{ y: 600, x: true }} components={vt} {...props} />
    </StyledTable>
  )
}

export default CustomTable
