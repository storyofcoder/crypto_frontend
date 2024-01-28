import React from "react";
import { Tabs as AntTabs } from "antd";
import styled from "styled-components";

import { Box } from "../StyledSystem";

const { TabPane } = AntTabs

const Container = styled(Box)`
  .ant-tabs {
    // ${(p) => p.theme.media.xs} {
    //   padding: 0 20px;
    // }
  }
  .ant-tabs-nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 0;
  }
  .ant-tabs-tab-btn {
    font-weight: 700;
    opacity: 0.6;

    &:hover {
      color: ${(p) => p.theme.colors.text};
    }
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    font-weight: 700 !important;
    opacity: 1 !important;
  }
  .ant-tabs-tab {
    padding: 15px 15px;
    &:hover {
      color: ${(p) => p.theme.colors.text};
    }
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
`

function Tabs({ children, defaultTab, onChange }: any) {
  const tabs = children.map((child: any, index) => (
    <TabPane tab={child.props.label} key={child.props.value} forceRender={false}>
      {child}
    </TabPane>
  ))

  const onChangeTab = (key) => {
    onChange && onChange(key)
  }
  return (
    <Container>
      <AntTabs defaultActiveKey={defaultTab} onTabClick={onChangeTab}>
        {tabs}
      </AntTabs>
    </Container>
  )
}

function Tab(props: any) {
  return <>{props.children}</>
}

export { Tabs, Tab }
