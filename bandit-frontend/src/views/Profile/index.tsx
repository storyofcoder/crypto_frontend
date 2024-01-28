import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'

import { useGetProfile } from '../../state/Profile/hooks'
import { PageMeta } from '../../components/molecules/AppLayout/PageMeta'
import { Box } from 'components/atoms/StyledSystem'
import { MARKETPLACE } from 'constant/queryKeys'

import ProfileDetails from './components/ProfileDetails/ProfileDetails'
import TokenListWithFilters from '../../components/templates/Token/TokenListWithFilters'
import { getExplore } from '../../state/nfts/source'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { getHashFromRouter } from '../../utils'
import CollectionList from './components/CollectionList'

export const getTabList = (username, hash) => [
  {
    title: 'Owned',
    to: `/${username}#owned`,
    active: typeof hash === 'undefined' || hash === '#owned',
  },
  {
    title: 'Collections',
    to: `/${username}#collections`,
    active: hash === '#collections',
  },
]

const UserProfile = () => {
  const  [content, setContent] = useState(null)
  const { query, isReady } = useRouter()
  const { account } = useActiveWeb3React()
  const { profileData }: any = useGetProfile(query.username, { enabled: isReady })

  const router = useRouter()

  const hash = useMemo(() => getHashFromRouter(router)?.[0], [router])

  const tabList = useMemo(() => getTabList(profileData.walletAddress, hash), [hash, profileData.walletAddress])

  async function fetchTokens(offset, limit, sort, filters) {
    return getExplore(offset, limit, sort, filters)
  }

  const showChat = account && account?.toLowerCase() !== profileData.walletAddress?.toLowerCase();

  useEffect(()=>{
    let _content = <TokenListWithFilters fetchData={fetchTokens} type={MARKETPLACE} tabsList={tabList} />

    if (hash === '#collections') {
      _content = <CollectionList tabsList={tabList}/>
    }
    setContent(_content)
  },[hash, profileData.walletAddress])

  return (
    <>
      <PageMeta />
      <ProfileDetails {...profileData} showChat={showChat} />
      <Box margin={['20px 15px 0 15px', '20px 15px 0 15px', '20px 40px 0 40px']}>{content}</Box>
    </>
  )
}

export default UserProfile
