import { Box } from "components/atoms/StyledSystem";
import styled from "styled-components";

export const MediaLarge = styled(Box)`
  display: none;
  transition: all 0.3s ease;
  ${(p) => p.theme.media.xlg} {
    display: flex;
    justify-content: flex-end;
  }

  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`

export const MediaSmall = styled(Box)`
  display: flex;
  ${(p) => p.theme.media.xlg} {
    display: none;
  }
`

export const StyledTable = styled.div`
  .ant-table,
  .ant-table-sticky-holder {
    background-color: transparent;
  }
  .ant-table-wrapper {
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-table-cell {
    border: none;
    background-color: transparent !important;
    color: ${(p) => p.theme.colors.text};
    font-weight: 700;
    font-size: 14px;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
  }

  .ant-table-row {
    &:hover {
      box-shadow: rgba(4, 7, 9, 0.25) 0px 0px 8px 0px;
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 400;
      font-size: 14px !important;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .ant-spin-dot {
    .ant-spin-dot-item {
      background-color: ${(p) => p.theme.colors.text};
    }
  }
`