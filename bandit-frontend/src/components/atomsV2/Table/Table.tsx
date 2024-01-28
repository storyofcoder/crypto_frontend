import { Table } from "antd";
import { Box } from "components/atoms/StyledSystem";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MediaLarge, MediaSmall, StyledTable } from "./StyledTable";
import { TableProps } from "./types";

const CustomTable: React.FC<TableProps> = (props) => {
  return (
    <Box>
      <MediaLarge>
        <InfiniteScroll
          dataLength={props.dataSource.length}
          next={props.fetchNextPage}
          hasMore={!!props.hasNextPage}
          loader={props.loader}
        >
          <StyledTable>
            <Table
              loading={props.isFetching}
              pagination={props.pagination}
              bordered={props.bordered}
              columns={props.columns}
              dataSource={props.dataSource}
            />
          </StyledTable>
        </InfiniteScroll>
      </MediaLarge>
      <MediaSmall>
        <InfiniteScroll
          dataLength={props.dataSource.length}
          next={props.fetchNextPage}
          hasMore={!!props.hasNextPage}
          loader={props.loader}
        >
          <StyledTable>
            <Table
              loading={props.isFetching}
              pagination={props.pagination}
              bordered={props.bordered}
              columns={props.smallViewColumns}
              dataSource={props.dataSource}
              expandable={props.expandable}
            />
          </StyledTable>
        </InfiniteScroll>
      </MediaSmall>
    </Box>
  )
}

export default CustomTable
