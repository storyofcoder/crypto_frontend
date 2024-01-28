import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import queryString from "query-string";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import { useQuery } from "react-query";
import API from "../services/API";
import ProfileDetailsLayout from "../components/templates/Profile/ProfileDetailsLayout";
import ProfileDetailsLayoutSkeleton from "../components/templates/Profile/skeleton/ProfileDetailsLayoutSkeleton";
import TokenListWithFilters from "../components/templates/Token/TokenListWithFilters";
// import { DISCORD, FACEBOOK, INSTAGRAM, TWITTER } from "../constant/socialMedia";
import {
  ActivityIcon,
  DeployIcon,
  ItemsIcon,
  MintIcon,
  RevealNFTIcon,
  RightIcon,
  RoadmapIcon,
  SyncIcon,
  WithDrawFundsIcon
} from "../../components/atoms/svg";
import CollectionActivity from "../../modules/Collections/CollectionActivity";
import { MODAL, showModal } from "../../modules/Modals";
import { notify } from "../../components/atoms/Notification/Notify";
import { isMobile } from "react-device-detect";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import useDecideContract from "../../hooks/useDecideContract";
import Button from "../../components/atoms/Button/Button";
import locale from "../../constant/locale";
import axios from "axios";
import { getNftAddress, isExternalAddress } from "../../utils/addressHelpers";
import CollectionRoadmap from "../../modules/Collections/Roadmap";
import MintCollection from "../../modules/Collections/MintCollection";
import useERC721Contracts from "../../hooks/useERC721Contracts";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useRouter } from "next/router";
import usePreviousValue from "../../hooks/usePreviousValue";
import { PageMeta } from "../../components/molecules/AppLayout/PageMeta";

const TABS = {
  ITEMS: 'ITEMS',
  ACTIVITY: 'ACTIVITY',
  ROADMAP: 'ROADMAP',
  MINT: 'MINT',
}

const CollectionOld = () => {
  const [activeTab, setActiveTab] = useState(TABS.ITEMS)
  const [parsing, setParsing] = useState(true)
  const [askRefresh, setAskRefresh] = useState(0)
  const [contractRevealed, setContractRevealed] = useState(true)
  const [syncLoading, setSyncLoading] = useState(false)

  const { library } = useActiveWeb3React()
  const tabsContainer: any = useRef()

  const { user, isLoggedIn } = useSelector((state: any) => state.auth)

  const router = useRouter()
  const { query, asPath, pathname } = router
  const search = asPath?.replace(pathname, '')

  const previousCollectionUsername = usePreviousValue(query['username'])

  const { initDecideContract } = useDecideContract()
  const { getContract } = useERC721Contracts()

  useEffect(() => {
    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.COLLECTION_PROFILE_VIEW, {
      collectionUsername: query?.username,
    })
  }, [])

  useEffect(() => {
    let parsed = queryString.parse(decodeURIComponent(search))
    const { tab } = parsed
    if (tab) {
      setActiveTab(`${tab}`)
    } else {
      setActiveTab(TABS.ITEMS)
    }

    setParsing(false)
  }, [])

  useEffect(() => {
    if (query['username'] && !!previousCollectionUsername && router.isReady) {
      refetchCollectionDetail()
      refetchCollectionProperties()
    }
  }, [query['username']])

  const {
    isLoading,
    error,
    data: collectionDetails = {},
    isFetching: isCollectionFetching,
    refetch: refetchCollectionDetail,
  } = useQuery(['collection-profile', query['username']], fetchCollection, {
    enabled: !!query['username'] && router.isReady,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })
  const {
    isLoading: isCollectionPropertiesLoading,
    data: collectionProperties = [],
    isFetching: isTokenFetching,
    refetch: refetchCollectionProperties,
  } = useQuery(['collection-properties', query['username']], fetchCollectionProperties, {
    enabled: !!query['username'] && router.isReady,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  useEffect(() => {
    const fetchBaseUrl = async () => {
      const contract = getContract(collectionDetails?.contract?.ContractType, collectionDetails.contractAddress)

      try {
        const baseUrl = await contract.baseURI()
        setContractRevealed(!!baseUrl)
      } catch (e) {
        console.log(e)
      }
    }

    if (!!collectionDetails.isExternalCollection && library) {
      fetchBaseUrl()
    }
  }, [collectionDetails?.isExternalCollection, library])

  function refetchCollectionTokens() {
    setAskRefresh(askRefresh + 1)
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    switch (tab) {
      case TABS.ACTIVITY: {
        const _query = queryString.stringify({ tab: TABS.ACTIVITY })
        router.push(`/collection/${query['username']}?${_query}`, undefined, { shallow: true })
        break
      }
      case TABS.MINT: {
        const _query = queryString.stringify({ tab: TABS.MINT })
        router.push(`/collection/${query['username']}?${_query}`, undefined, { shallow: true })
        break
      }
      case TABS.ROADMAP: {
        const _query = queryString.stringify({ tab: TABS.ROADMAP })
        router.push(`/collection/${query['username']}?${_query}`, undefined, { shallow: true })
        break
      }
      default: {
        const _query = queryString.stringify({ tab: TABS.ITEMS })
        router.push(`/collection/${query['username']}?${_query}`, undefined, { shallow: true })
        break
      }
    }
  }

  function fetchCollection() {
    return API.getCollectionProfile(query['username'])
  }
  function fetchCollectionProperties() {
    return API.getCollectionProperties(query['username'])
  }
  function fetchCollectionTokens(offset, limit, sort, filter, propertyFilter) {
    return API.getCollectionTokens(query['username'], offset, limit, filter, sort, propertyFilter)
  }

  function getStats(stats) {
    if (!stats) return []
    return [
      {
        title: 'Items',
        value: stats.items,
      },
      {
        title: 'Floor Price',
        value: !stats.floorPrice.value || stats.floorPrice.value <= 0 ? '---' : stats.floorPrice.value,
        unit: !stats.floorPrice.value || stats.floorPrice.value <= 0 ? '' : stats.floorPrice.unit,
        friendly: false,
      },
      {
        title: 'Owners',
        value: stats.owners,
      },
      {
        title: 'Volume Traded',
        value: !!stats.volumeTraded.value ? stats.volumeTraded.value : 0,
        unit: stats.volumeTraded.unit,
        friendly: false,
      },
    ]
  }

  const updateTokenPrice = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()
    showModal(
      MODAL.UPDATE_TOKEN_PRICE,
      {
        token,
        refresh: refetchCollectionTokens,
      },
      { width: 350 },
    )
  }

  const removeToCollection = async (e, token) => {
    showModal(
      MODAL.TX_LOADING,
      {
        title: 'Are you sure you want to remove the token from this collection?',
        callback: async () => {
          try {
            const res = await API.removeTokenFromCollection(user?.username, user?.signature, token.id)
            notify.success('NFT removed successfully', '')
            refetchCollectionTokens()
            refetchCollectionDetail()
            refetchCollectionProperties()
          } catch (e) {
            notify.error('Failed to remove', '')
            console.log(e)
          }
        },
      },
      {},
    )
  }

  const editNFT = async (e, token) => {
    showModal(
      MODAL.EDIT_NFT,
      {
        token,
        refresh: () => {
          refetchCollectionProperties()
          refetchCollectionTokens()
        },
      },
      {
        width: isMobile ? '80%' : 700,
        bodyStyle: {
          backgroundColor: 'var(--bg-2)',
        },
      },
    )
  }

  const burnToken = async (e, token, refreshType) => {
    e.stopPropagation()
    e.preventDefault()

    const { id, contractAddress } = token

    // const whatToRefresh = refreshType === 'creation' ?

    const { nftContract } = initDecideContract(contractAddress)

    const currentOwnerAddress = await nftContract.ownerOf(id)

    if (token.hasOffers) {
      showModal(MODAL.CANCEL_ACCEPTED_OFFER, {}, {})
    } else if (currentOwnerAddress === user?.wallet_address) {
      showModal(MODAL.BURN_CONFIRMATION, {
        tokenId: id,
        token,
        refreshProfile: refetchCollectionTokens,
      })
    } else {
      showModal(MODAL.CANCEL_SALE, {
        token,
        refreshProfile: refetchCollectionTokens,
      })
    }
  }

  const transferToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    const { id, hasOffers, contractAddress } = token

    const { nftContract, escrowAddress } = initDecideContract(contractAddress)

    const currentOwnerAddress = await nftContract.ownerOf(id)

    if (hasOffers) {
      showModal(MODAL.CANCEL_ACCEPTED_OFFER, {}, {})
    } else if (currentOwnerAddress === escrowAddress) {
      showModal(MODAL.CANCEL_SALE, {
        token,
        refreshProfile: refetchCollectionTokens,
        showTransfer: true,
      })
    } else {
      showModal(MODAL.TRANSFER_TOKEN, {
        tokenId: id,
        token,
        transferNFT: refetchCollectionTokens,
        user,
      })
    }
  }

  const hideToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      await API.hideToken(user?.username, user?.signature, token.id, token.contractAddress)
      refetchCollectionTokens()
      notify.success('NFT hidden from your profile', '')
    } catch (e) {
      notify.error('Failed to hide NFT', '')
    }
  }

  const unHideToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      await API.unHideToken(user?.username, user?.signature, token.id, token.contractAddress)
      notify.success('NFT unhidden from your profile', '')
      refetchCollectionTokens()
    } catch (e) {
      notify.error('Failed to unhide NFT', '')
    }
  }

  function getOptionList(token) {
    let options = []
    const isOwner = token.tokenOwner === user?.username && user?.username === collectionDetails?.owner?.username

    const isCreator = token.tokenCreator === user?.username
    if (isOwner && !token.auctionEnded && !token.auctionLive) {
      options.push({
        title: 'Transfer NFT',
        onClick: (e) => transferToken(e, token),
      })
    }
    if (
      isOwner &&
      ['mint', 'sale', 'sold'].includes(token.status) &&
      !token.auctionEnded &&
      !token.auctionLive &&
      token.contractAddress === getNftAddress()
    ) {
      options.push({
        title: 'Burn',
        onClick: (e) => burnToken(e, token, 'creation'),
      })
    }
    if (isOwner && ['mint', 'sold'].includes(token.status)) {
      options.push({
        title: 'List for sale',
        onClick: (e) => router.push(`/list-for-sale/${token.contractAddress}/${token.id}`),
      })
    }

    if (isOwner && token.onSale && !token.auctionEnded && !token.auctionLive) {
      options.push({
        title: 'Update price',
        onClick: (e) => updateTokenPrice(e, token),
      })
    }

    if (isOwner && !token?.isHidden && !token.auctionEnded && !token.auctionLive) {
      options.push({
        title: 'Hide',
        onClick: (e) => hideToken(e, token),
      })
    }
    if (isOwner && token?.isHidden && !token.auctionEnded && !token.auctionLive) {
      options.push({
        title: 'Unhide',
        onClick: (e) => unHideToken(e, token),
      })
    }

    if (
      (isOwner || (isCreator && token.editable)) &&
      !token.auctionEnded &&
      !token.auctionLive &&
      !isExternalAddress(token?.contractAddress)
    ) {
      options.push({
        title: 'Edit NFT',
        onClick: (e) => editNFT(e, token),
      })
    }

    if (
      (isOwner || (isCreator && token.editable)) &&
      !token.auctionEnded &&
      !token.auctionLive &&
      !isExternalAddress(token?.contractAddress)
    ) {
      options.push({
        title: 'Remove from collection',
        onClick: (e) => removeToCollection(e, token),
      })
    }

    return options
  }

  const syncExternalContract = async () => {
    setSyncLoading(true)

    const endPoint = locale.ADMIN_API_END_POINT
    try {
      const res = await axios.get(`${endPoint}/webhook?address=${collectionDetails?.contractAddress}`)
      setTimeout(() => {
        setSyncLoading(false)
      }, 2000)
    } catch (e) {
      setSyncLoading(false)
    }
  }
  const revealContract = async () => {
    showModal(MODAL.REVEAL_CONTRACT, {
      collectionDetails,
      refresh: refetchCollectionDetail,
    })
  }

  const withDrawFunds = async () => {
    showModal(MODAL.WITHDRAW_FUNDS, {
      collectionDetails,
    })
  }

  const openDeployModel = () => {
    showModal(MODAL.DEPLOY_COLLECTION, { collectionDetails }, { callback: refetchCollectionDetail })
  }

  function scrollToRight() {
    if (tabsContainer?.current) {
      const width = tabsContainer?.current?.scrollWidth
      tabsContainer.current.scrollTo({
        left: width,
        behavior: 'smooth',
      })
    }
  }

  const { statistics, ...rest } = collectionDetails
  const isPrivate = user?.username === collectionDetails?.owner?.username

  const isExternalContractCollection = !!collectionDetails?.isExternalCollection
  const internalCollectionContract = collectionDetails?.contractAddress === getNftAddress()

  return (
    <>
      <PageMeta
        collectionName={collectionDetails?.username}
        username={collectionDetails?.owner?.username}
        description={collectionDetails?.bio}
        image={collectionDetails?.profileImage}
      />
      <Container>
        {isLoading ? (
          <ProfileDetailsLayoutSkeleton />
        ) : (
          <ProfileDetailsLayout
            details={rest}
            showEdit={isPrivate}
            editLink={`/edit-collection/${collectionDetails?.username}`}
            stats={getStats(statistics)}
            renderSettings={() => {}}
            type="collection"
            renderSync={() => {
              if (internalCollectionContract && isExternalContractCollection) {
                return (
                  <ActionButton variant="primary" mr={10} onClick={openDeployModel} Icon={DeployIcon}>
                    <Text fontSize={14} fontWeight={500} color="text">
                      Deploy
                    </Text>
                  </ActionButton>
                )
              } else {
                return (
                  <>
                    {isExternalContractCollection &&
                      collectionDetails?.contract?.revealableContract &&
                      !contractRevealed && (
                        <ActionButton variant="primary" mr={10} onClick={revealContract} Icon={RevealNFTIcon}>
                          <Text fontSize={14} fontWeight={500} color="text">
                            Reveal NFTs
                          </Text>
                        </ActionButton>
                      )}

                    {isExternalContractCollection && !internalCollectionContract && (
                      <ActionButton variant="primary" mr={10} onClick={withDrawFunds} Icon={WithDrawFundsIcon}>
                        <Text fontSize={14} fontWeight={500} color="text">
                          Withdraw funds
                        </Text>
                      </ActionButton>
                    )}

                    {!internalCollectionContract && (
                      <ActionButton variant="primary" mr={10} onClick={syncExternalContract} Icon={SyncIcon}>
                        <span className={syncLoading ? 'rotate' : ''}>
                          <SyncIcon />
                        </span>

                        <Text fontSize={14} fontWeight={500} color="text">
                          Sync
                        </Text>
                      </ActionButton>
                    )}
                  </>
                )
              }
            }}
          />
        )}
        <Flex width="100%" justifyContent="center" mb={40} mt={30}>
          <SwapOrderWrapper ref={tabsContainer}>
            <NavTab
              icon={() => <ItemsIcon />}
              title="Items"
              active={activeTab === TABS.ITEMS}
              onClick={() => handleTabClick(TABS.ITEMS)}
            />
            {isExternalContractCollection && (
              <>
                <NavTab
                  icon={() => <RoadmapIcon />}
                  title="Roadmap"
                  active={activeTab === TABS.ROADMAP}
                  onClick={() => handleTabClick(TABS.ROADMAP)}
                />
                <NavTab
                  icon={() => <MintIcon />}
                  title="Mint"
                  active={activeTab === TABS.MINT}
                  onClick={() => handleTabClick(TABS.MINT)}
                />
              </>
            )}

            <NavTab
              icon={() => <ActivityIcon />}
              title="Activity"
              active={activeTab === TABS.ACTIVITY}
              onClick={() => handleTabClick(TABS.ACTIVITY)}
            />
            <NextScrollIconWrapper onClick={scrollToRight}>
              <RightIcon />
            </NextScrollIconWrapper>
          </SwapOrderWrapper>
        </Flex>
        <Box margin={'40px 0'}>
          {(() => {
            if (parsing) return null
            switch (activeTab) {
              case TABS.ACTIVITY:
                return <CollectionActivity />
              case TABS.ROADMAP:
                return <CollectionRoadmap isPrivate={isPrivate} />
              case TABS.MINT:
                return <MintCollection collectionDetails={collectionDetails} />
              default:
                return (
                  <TokenListWithFilters
                    fetchData={fetchCollectionTokens}
                    type={isExternalAddress(collectionDetails?.contractAddress) ? 'external-collection' : 'collections'}
                    customFiltersList={collectionProperties}
                    // getTokenOptionsList={(token) => getOptionList(token)}
                    askRefresh={askRefresh}
                  />
                )
            }
          })()}
        </Box>
      </Container>
    </>
  )
}

const NavTab = ({ title, icon, active, onClick }) => {
  return (
    <ActiveTab active={active} flexDirection="column" alignItems="center" minWidth="150px" onClick={onClick}>
      <Box>{icon()}</Box>
      <Text color="text">{title}</Text>
    </ActiveTab>
  )
}

const ActionButton = ({ children, Icon, ...props }) => {
  return (
    <>
      <StyledButton {...props}>{children}</StyledButton>
      <StyledButtonSmall {...props}>
        <Icon />
      </StyledButtonSmall>
    </>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  padding: 0 20px;
  ${(p) => p.theme.media.xlg} {
    padding: 0 40px;
  }
`

const ActiveTab = styled(Flex)`
  cursor: pointer;
  border-bottom: ${(p) => (p.active ? '2px solid' + p.theme.colors.text : '')};
  opacity: ${(p) => (p.active ? 1 : 0.7)};
  padding-bottom: 20px;
  margin: 0 10px;

  &:hover {
    opacity: 1;
  }
`

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  padding: 4px 8px;

  ${(p) => p.theme.media.lg} {
    display: flex !important;
  }
  ${(p) => p.theme.media.xs} {
    display: none !important;
  }

  .rotate {
    animation: rotation 2s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`

const StyledButtonSmall = styled.div`
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.bg2};
  padding: 5px;
  width: 30px;
  height: 30px;
  margin-top: 10px;

  ${(p) => p.theme.media.lg} {
    display: none !important;
  }
  ${(p) => p.theme.media.xs} {
    display: flex !important;
  }

  img {
    width: 20px;
    height: 20px;
  }
`

const SwapOrderWrapper = styled(Flex)`
  ${(p) => p.theme.media.xs} {
    display: flex;
    white-space: nowrap;
    overflow: auto;
    padding-bottom: 10px;
  }
`

const NextScrollIconWrapper = styled(Box)`
  display: none;
  ${(p) => p.theme.media.xs} {
    position: sticky;
    right: -2px;
    width: 20px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(239, 238, 234, 1) 62%);
    display: inline-block;
    padding: 8px 20px;
  }

  svg {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`

export default CollectionOld
