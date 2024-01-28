import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { getCollectionAssetsData } from '../../state/collections/helpers'
import { PageMeta } from '../../components/molecules/AppLayout/PageMeta'
import { useGetCollectionDetails } from '../../state/collections/hooks'
import { getHashFromRouter, getImageUrl, isAddressEqual, isValidAddress } from 'utils'
import { COLLECTION } from 'constant/queryKeys'

import CollectionDetails from './components/CollectionDetails/CollectionDetails'
import CollectionActivity from './components/CollectionDetails/CollectionActivity'
import TokenListWithFilters from '../../components/templates/Token/TokenListWithFilters'
import Page from '../../components/atomsV2/Page'
import Roadmap from 'modules/Collections/Roadmap'
import MintPage from './components/Mint'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { Box } from 'components/atoms/StyledSystem'
import useComponentMount from '../../hooks/useComponentMount'
import { Mixpanel, MixpanelEvents } from 'analytics/Mixpanel'
import { useSelector } from 'react-redux'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'
export const getTabList = (collection, mintEnabled = false, hash) => {
  // let list = [
  //   {
  //     title: 'Items',
  //     to: `/collection/${username}#items`,
  //     active: typeof hash === 'undefined' || hash === '#items',
  //   },
  //   {
  //     title: 'Activity',
  //     to: `/collection/${username}#activity`,
  //     active: hash === '#activity',
  //   },
  // ]

  let list = [
    {
      title: 'Roadmap',
      to: `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[collection.chainId]}/${collection?.contractAddress}#roadmap`,
      active: typeof hash === 'undefined' || hash === '#roadmap',
    },
    {
      title: 'Mint',
      to: `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[collection.chainId]}/${collection?.contractAddress}#mint`,
      active: hash === '#mint',
      disabled: !mintEnabled,
    },
  ]

  // if (!isExternal) {
  //   list.push(
  //     ...[
  //       {
  //         title: 'Roadmap',
  //         to: `/collection/${username}#roadmap`,
  //         active: hash === '#roadmap',
  //       },
  //     ],
  //   )
  // }
  //
  // if (isValidAddress(username) && !isExternal) {
  //   list.push({
  //     title: 'Mint',
  //     to: `/collection/${username}#mint`,
  //     active: hash === '#mint',
  //   })
  // }
  return list
}

const Collection = () => {
  const { account } = useActiveWeb3React()
  const { query, isReady }: any = useRouter()
  const { collectionDetails }: any = useGetCollectionDetails(
    { username: query.username, accessToken: encodeURIComponent(query.access_token) },
    { enabled: isReady },
  )
  const { user } = useSelector((state: any) => state.auth)

  const { contractAddress, contract } = collectionDetails

  const router = useRouter()

  const { isMounted } = useComponentMount()

  const hash = useMemo(() => getHashFromRouter(router)?.[0], [router])

  const isOwner = isAddressEqual(account, contractAddress)

  const getCollectionAssets = (offset, limit, sort, filters) => {
    return getCollectionAssetsData(query.username, { offset, limit, sort, filters })
  }

  useEffect(() => {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.COLLECTION_PROFILE_VIEW, {
      collectionUsername: query?.username,
    })
  }, [])

  useEffect(() => {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.COLLECTION_PROFILE_SELECTED_TAB, {
      collectionUsername: query?.username,
      tab: hash,
    })
  }, [hash])

  const tabList = useMemo(
    () => getTabList(collectionDetails, collectionDetails.mintEnabled, hash),
    [hash, collectionDetails],
  )
  // let content = <TokenListWithFilters fetchData={getCollectionAssets} type={COLLECTION} tabsList={tabList} />
  let content = (
    <Roadmap
      username={collectionDetails?.username}
      tabsList={tabList}
      ownerWalletAddress={collectionDetails?.owner?.walletAddress}
    />
  )

  // if (hash === '#activity') {
  //   content = <CollectionActivity tabsList={tabList} />
  // }
  if (hash === '#mint') {
    content = (
      <MintPage
        contractDetails={contract}
        tabsList={tabList}
        contractType={contract?.contractType}
        contractAddress={contractAddress}
        chainId={collectionDetails.chainId}
        collectionDetails={collectionDetails}
        isPrivate={collectionDetails?.isPrivate}
      />
    )
  }
  if (hash === '#roadmap') {
    content = (
      <Roadmap
        username={collectionDetails?.username}
        tabsList={tabList}
        ownerWalletAddress={collectionDetails?.owner?.walletAddress}
      />
    )
  }

  return (
    <>
      <PageMeta
        collectionName={collectionDetails?.name}
        username={collectionDetails?.contractAddress}
        image={getImageUrl(collectionDetails?.coverImage, { height: 250, quality: 80 })}
        description={collectionDetails?.bio}
      />
      <CollectionDetails {...collectionDetails} canEdit={isOwner} />
      <Page>{isMounted && <Box mt={'20px'}>{content}</Box>}</Page>
    </>
  )
}

export default Collection
