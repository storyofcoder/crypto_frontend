import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

function Tabs({ children, defaultTab }: any) {
  const [activeTab, setActiveTab] = useState(children[0].props.label)
  const handleActiveTab = useCallback((label) => setActiveTab(label), [])

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab)
    }
  }, [])

  const tabs = children.map((child: any) => (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleActiveTab(child.props.label)
      }}
      className={child.props.label === activeTab ? ['tabs__tab', 'tabs__tab-active'].join(' ') : 'tabs__tab'}
      key={child.props.label}
    >
      {child.props.tabName}
    </button>
  ))
  const tabContent = children.filter((child: any) => child.props.label === activeTab)
  return (
    <div>
      <TabsBox>{tabs}</TabsBox>
      {tabContent}
    </div>
  )
}

function Tab(props: any) {
  return <>{props.children}</>
}

const TabsBox = styled.div`
  text-align: center;
  .tabs__tab {
    text-decoration: none;
    display: inline-block;
    padding: 5px 20px;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    color: var(--text-primary);
    margin: 4px;
    cursor: pointer;
    opacity: 0.6;
    border: 2px solid transparent;
  }
  .tabs__tab-active {
    color: var(--text-primary);
    background-color: transparent;
    border-radius: 60px;
    border: 2px solid #11110F;
    opacity: 1;
  }
`;

export { Tabs, Tab }
