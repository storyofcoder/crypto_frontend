import React, { useMemo } from "react";
import { Table } from "components/atomsV2/Table";
import { flatten, map } from "lodash";
import moment from "moment";

const ActivityLayout = (props) => {
  const activity = useMemo(() => flatten(map(props.data?.pages, 'data')), [props.data?.pages])

  const activityTableData = activity.map(
    ({ event, collection, nft, from, to, price, createdAt, contractAddress, PriceByUnit }, index) => ({
      key: index + 1,
      event,
      collection,
      nft,
      from,
      to,
      price,
      PriceByUnit,
      contractAddress,
      time: moment.utc(createdAt).fromNow(),
    }),
  )
  return (
    <div>
      <Table
        dataSource={activityTableData}
        fetchNextPage={props.fetchNextPage} 
        hasNextPage={props.hasNextPage}
        isFetching={props.isFetching}
        columns={props.columns}
        smallViewColumns={props.smallViewColumns}
        loader={null}
        pagination={false}
        bordered={false}
        expandable={props.expandable} />
    </div>
  )
}

export default ActivityLayout