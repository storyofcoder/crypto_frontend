import { TablePaginationConfig } from "antd";
import { ColumnGroupType, ColumnsType } from "antd/lib/table";
import { ExpandableConfig } from "antd/lib/table/interface";

;

type Record = {
  key: number;
  event: any;
  collection: any;
  nft: any;
  from: any;
  to: any;
  price: any;
  PriceByUnit: any;
  contractAddress: any;
  time: string;
}

export interface TableProps {
  dataSource: Record[];
  columns: ColumnsType<Record> | ColumnGroupType<Record>[];
  smallViewColumns: ColumnsType<Record> | ColumnGroupType<Record>[];
  pagination: false | TablePaginationConfig;
  loader: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  bordered: boolean;
  expandable: ExpandableConfig<Record>;
}