import React from "react";
import styled from "styled-components";

import { Box, Flex } from "components/atoms/StyledSystem";
import { useRouter } from "next/router";
import { NextLinkFromReactRouter } from "components/atoms/NextLink";

const Links = [
  {
    name: 'Items',
    link: '/explore',
  },
  {
    name: 'Activity',
    link: '/explore/activity',
  },
]

export default function Explore() {
  const router = useRouter()
  const { pathname } = router

  return (
    <TabWrapper>
      {Links.map((value, index) => (
        <NextLinkFromReactRouter key={index} to={value?.link}>
          <Tab active={[value?.link].includes(pathname)}>{value?.name}</Tab>
        </NextLinkFromReactRouter>
      ))}
    </TabWrapper>
  )
}

const TabWrapper = styled(Flex)`
  border: 1px solid #e2e4e8;
  border-radius: 16px;
  overflow: hidden;
`

const Tab = styled(Box)`
  padding: 10px 15px;
  font-size: 13px;
  cursor: pointer;
  opacity: ${(p) => (p.active === true ? '1' : '0.4')};
  background: ${(p) => (p.active === true ? '#F6F6F6' : 'transparent')};
`
