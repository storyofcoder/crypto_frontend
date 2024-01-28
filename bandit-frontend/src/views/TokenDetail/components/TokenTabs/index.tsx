import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import { Box } from 'components/atoms/StyledSystem'
import { ButtonMenu, ButtonMenuItem } from 'components/atomsV2/ButtonMenu'
import { NextLinkFromReactRouter } from 'components/atoms/NextLink'

import Info from './Info'
import Bids from './Bids'
import Activity from './Activity'
import { getHashFromRouter } from 'utils'

export const getTabList = (id, contract, active) => [
  {
    title: 'Info',
    to: `/assets/${contract}/${id}#info`,
    active: active === 'Info',
  },
  // {
  //   title: 'Bids',
  //   to: `/assets/${contract}/${id}#bids`,
  //   active: active === 'Bids',
  // },
  {
    title: 'Activities',
    to: `/assets/${contract}/${id}#activities`,
    active: active === 'Activities',
  },
]

export default function Tabs({ token }) {
  const [activeTab, setactiveTab] = useState('Info')
  const router = useRouter()
  const { id, contractAddress } = router.query
  const hash = useMemo(() => getHashFromRouter(router)?.[0], [router])
  const tabsList = useMemo(() => getTabList(id, contractAddress, activeTab), [id, contractAddress, activeTab])

  useEffect(() => {
    let index = tabsList.findIndex((item) => hash == `#${item.title?.toLowerCase()}`)
    if (index !== -1) {
      setactiveTab(tabsList[index].title)
    } else {
      setactiveTab(tabsList[0].title)
    }
  }, [hash])

  return (
    <>
      <Box mb={16}>
        <ButtonMenu activeIndex={tabsList.findIndex((item) => item.active)} scale="sm">
          {tabsList.map(({ to, title }) => (
            <ButtonMenuItem as={NextLinkFromReactRouter} to={to}>
              {title}
            </ButtonMenuItem>
          ))}
        </ButtonMenu>
      </Box>
      {(() => {
        switch (activeTab) {
          case 'Info':
            return <Info token={token} />
          case 'Bids':
            return <Bids token={token} />
          case 'Activities':
            return <Activity token={token} />
          default:
            return <Info token={token} />
        }
      })()}
    </>
  )
}
