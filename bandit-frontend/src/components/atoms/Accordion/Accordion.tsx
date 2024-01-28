import React from 'react'
import upperCase from 'lodash/upperCase'
import { Collapse } from 'antd'
import styled from 'styled-components'
import DownIcon from '../../atoms/svg/angle-down'
import AngelUp from '../../atoms/svg/angle-up'
import useTheme from '../../../hooks/useTheme'

const { Panel } = Collapse

const Accordion = ({ list }) => {
  const { theme } = useTheme()
  function callback() {}
  return (
    <Wrapper>
      <Collapse
        defaultActiveKey={['1']}
        onChange={callback}
        expandIconPosition="right"
        expandIcon={(props: any) =>
          props.isActive ? (
            <AngelUp width={20} height={20} iconcolor={theme.colors.text} />
          ) : (
            <DownIcon iconcolor={theme.colors.text} />
          )
        }
      >
        {list.map((l, index) => (
          <Panel header={upperCase(l.title)} key={index + 1} extra={l.extra}>
            {l.render && l.render()}
          </Panel>
        ))}
      </Collapse>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
  .ant-collapse-header {
    background-color: transparent;
    border-color: transparent;
    padding-bottom: 6px !important;
    padding-left: 0 !important;
    color: ${({ theme }) => theme.colors.foreground} !important;
    font-size: 14px !important;
    font-weight: 600;
  }

  .ant-collapse-item {
    border: none;
  }

  .ant-collapse-content {
    border: none;
    background-color: transparent;
    user-select: none;
  }
  .ant-collapse {
    border: none !important;
    background: transparent;
    font-size: 12px;
  }
  .ant-collapse-arrow {
    right: 0 !important;
  }
`

export default Accordion
