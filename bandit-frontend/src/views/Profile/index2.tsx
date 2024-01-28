import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { PageMeta } from "../../components/molecules/AppLayout/PageMeta";

import API from "../../services/API";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import OffersReceived from "../../modules/profile/OffersReceived";
import OffersMade from "../../modules/profile/OffersMade";
import TokenListWithFilters from "../../components/templates/Token/TokenListWithFilters";
import { MODAL, showModal } from "../../modules/Modals";
import { getNftAddress, isExternalAddress } from "../../utils/addressHelpers";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import { notify } from "../../components/atoms/Notification/Notify";
import Button from "../../components/atoms/Button/Button";
import { getFollowings } from "../../state/Profile/actions";
import {
  ArrowBottomLeftIcon,
  ArrowTopRightIcon,
  CartIcon,
  CreatedIcon,
  EyeOffIcon,
  GalaryIcon,
  RightIcon,
  TimeIcon
} from "../../components/atoms/svg";
import Bids from "../bids";
import CollectionsList from "../collectionsList";
import TokenListWithoutFilters from "../../components/templates/Token/TokenListWithoutFilters";
import useDecideContract from "../../hooks/useDecideContract";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";
import useAuth from "../../hooks/useAuth";
import ProfileDetails from "./components/ProfileDetails/ProfileDetails";

const DEFAULT_DESCRIPTION =
  "I just love NFTs and that's the reason I joined this cool Marketplace. Looking forward to engaging with all of you guys. Cheers!"

const UserProfile = () => {
  const [askRefresh, setAskRefresh] = useState(0)
  const { user } = useSelector((state: any) => state.auth)
  const { isLoggedIn, loading: isAuthLoading }: any = useAuth()

  const router = useRouter()
  let { query, pathname } = router
  const tabsContainer: any = useRef()

  const dispatch = useDispatch()

  const { initDecideContract } = useDecideContract()

  const { data: FollowersList = [], refetch: refetchFollowers } = useQuery('followers', fetchFollowers, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: router.isReady,
  })

  const { data: FollowingList = [], refetch: refetchFollowing } = useQuery('followings', fetchFollowings, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: router.isReady,
  })

  const {
    isLoading,
    error,
    isFetched: isProfileFetched,
    data = {},
    isFetching,
    refetch: refetchProfile,
  } = useQuery('profile', fetchUserDetails, {
    retry: false,
    cacheTime: 0,
    enabled: router.isReady,
    refetchOnWindowFocus: false,
  })

  const {
    bio,
    coverImage,
    name,
    username,
    profileImage,
    is_verified,
    collected,
    hidden,
    bids,
    collections,
    creations,
    splits,
    offerMade,
    offerReceived,
    default_user_page,
    referredBy,
  } = data

  const isPrivate = user?.username === query?.username
  const isFollowing = FollowersList.indexOf(user?.username) >= 0

  useEffect(() => {
    // TODO: handle validation on server
    // if (isProfileFetched && !data.username) {
    //   router.replace("/not-found");
    // }
  }, [isProfileFetched])

  useEffect(() => {
    if (query.username) {
      refetchFollowers()
      refetchFollowing()
      refreshProfile()
    }
  }, [query.username])

  useEffect(() => {
    if (!(user?.username === query?.username)) {
      Mixpanel.identify(user?.username)
      Mixpanel.track(MixpanelEvents.PROFILE_VIEW_SELF, {
        username: query?.username,
      })
    } else {
      Mixpanel.track(MixpanelEvents.PROFILE_VIEW_OTHER_USER, {
        username: user?.username,
        other_user_name: query?.username,
      })
    }
  }, [])

  function fetchUserDetails() {
    return API.fetchUserProfile(query.username)
  }

  function fetchCollections(offset, limit, sort, filters) {
    return API.fetchMyCollections(query.username, offset, limit, sort, filters)
  }
  function fetchCreations(offset, limit, sort, filters) {
    return API.fetchMyCreations(query.username, offset, limit, sort, filters)
  }
  function fetchHiddenTokens(offset, limit) {
    return API.fetchHiddenTokens(query.username, user?.signature, offset, limit)
  }
  function fetchSplits(offset, limit, sort, filters) {
    return API.fetchMySplits(query.username, offset, limit, sort, filters)
  }

  function fetchFollowings() {
    return API.getUserFollowings(query.username)
  }

  function fetchFollowers() {
    return API.getUserFollowers(query.username)
  }

  function getStats(stats) {
    if (!stats) return []
    return [
      {
        title: 'Followers',
        value: stats.followers,
        onClick: () => showStats('Followers', isPrivate),
      },
      {
        title: 'Followings',
        value: stats.followings,
        onClick: () => showStats('Followings', isPrivate),
      },
    ]
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

  const swapOrder = () => {
    const linkArray = [
      <NavTab
        to={`/${query.username}?tab=created`}
        title={`Created ${creations > 0 ? creations : ''}`}
        icon={() => <CreatedIcon />}
        query={query}
        tab={'created'}
      />,
      <NavTab
        to={`/${query.username}?tab=collected`}
        title={`Collected ${collected > 0 ? collected : ''}`}
        icon={() => <CartIcon />}
        query={query}
        tab={'collected'}
      />,
      <NavTab
        to={`/${query.username}?tab=collections`}
        title={`Collections ${collections > 0 ? collections : ''}`}
        icon={() => <GalaryIcon />}
        query={query}
        tab={'collections'}
      />,

      <NavTab
        to={`/${query.username}?tab=offers-received`}
        title={`Offers received ${offerReceived > 0 ? offerReceived : ''}`}
        icon={() => <ArrowBottomLeftIcon />}
        query={query}
        tab={'offers-received'}
      />,
      <NavTab
        to={`/${query.username}?tab=offers-made`}
        title={`Offers made ${offerMade > 0 ? offerMade : ''}`}
        icon={() => <ArrowTopRightIcon />}
        query={query}
        tab={'offers-made'}
      />,
    ]

    if (isLoggedIn && user?.username === query?.username) {
      linkArray.push(
        <NavTab
          to={`/${query.username}?tab=bids`}
          title={`Bids ${bids > 0 ? bids : ''}`}
          icon={() => <TimeIcon />}
          query={query}
          tab={'bids'}
        />,
      )
      linkArray.push(
        <NavTab
          to={`/${query.username}?tab=hidden`}
          title={`Hidden ${hidden > 0 ? hidden : ''}`}
          icon={() => <EyeOffIcon />}
          query={query}
          tab={'hidden'}
        />,
      )
    }

    if (default_user_page === 'created') {
      return linkArray
    }

    if (default_user_page === 'collected') {
      return [linkArray[1], linkArray[0], linkArray[2], linkArray[3], linkArray[4], linkArray[5], linkArray[6]]
    }

    if (default_user_page === 'collections') {
      return [linkArray[2], linkArray[0], linkArray[1], linkArray[3], linkArray[4], linkArray[5], linkArray[6]]
    }

    return linkArray
  }

  function refreshProfile() {
    if (pathname?.split('/')[2] === 'collections') {
      // refetchCollectionList();
    } else if (pathname?.split('/')[2] === 'splits') {
      // refetchSplitsList();
    } else {
      // refetchCreationList();
    }

    refetchProfile()
    setAskRefresh(askRefresh + 1)
  }

  function showStats(defaultTab, isPrivate) {
    if (!isLoggedIn && !isAuthLoading) return
    showModal(MODAL.PROFILE_STATS, { defaultTab, refetchFollowing, isPrivate }, { callback: refetchFollowing })
  }

  const updateTokenPrice = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()
    showModal(MODAL.UPDATE_TOKEN_PRICE, { token, refresh: refreshProfile }, { width: 350 })
  }
  const hideToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      await API.hideToken(user?.username, user?.signature, token?.id, token.contractAddress)
      refreshProfile()
      notify.success('NFT hidden from your profile', '')
    } catch (e) {
      notify.error('Failed to hide NFT', '')
    }
  }
  const unHideToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      await API.unHideToken(user?.username, user?.signature, token?.id, token.contractAddress)
      notify.success('NFT unhidden from your profile', '')
      refreshProfile()
    } catch (e) {
      notify.error('Failed to unhide NFT', '')
    }
  }
  const moveToCollection = async (e, token) => {
    showModal(
      MODAL.MOVE_TOKEN_TO_COLLECTION,
      { token, refresh: refreshProfile },
      {
        width: isMobile ? '80%' : 700,
        bodyStyle: {
          backgroundColor: 'var(--bg-2)',
        },
      },
    )
  }

  const cancelSale = async (e, token, refreshType) => {
    e.stopPropagation()
    e.preventDefault()

    showModal(MODAL.CANCEL_SALE, {
      token,
      refreshProfile,
      cancelOnly: true,
    })
  }

  const burnToken = async (e, token, refreshType) => {
    e.stopPropagation()
    e.preventDefault()

    const { id, contractAddress } = token

    const { nftContract } = initDecideContract(contractAddress)

    const currentOwnerAddress = await nftContract.ownerOf(id)

    if (token?.hasOffers) {
      showModal(MODAL.CANCEL_ACCEPTED_OFFER, {}, {})
    } else if (currentOwnerAddress === user?.wallet_address) {
      showModal(MODAL.BURN_CONFIRMATION, {
        tokenId: id,
        token,
        refreshProfile,
      })
    } else {
      showModal(MODAL.CANCEL_SALE, {
        token,
        refreshProfile,
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
        refreshProfile,
        showTransfer: true,
      })
    } else {
      showModal(MODAL.TRANSFER_TOKEN, {
        tokenId: id,
        token,
        transferNFT: refreshProfile,
        user,
      })
    }
  }

  const removeToCollection = async (e, token) => {
    showModal(
      MODAL.TX_LOADING,
      {
        title: 'Are you sure you want to remove the token from this collection?',
        callback: async () => {
          try {
            const res = await API.removeTokenFromCollection(user?.username, user?.signature, token?.id)
            notify.success('NFT removed successfully', '')
            refreshProfile()
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
      { token, refresh: refreshProfile },
      {
        width: isMobile ? '80%' : 700,
        bodyStyle: {
          backgroundColor: 'var(--bg-2)',
        },
      },
    )
  }

  function getOptionList(token, tab) {
    let options = []
    const isOwner = token?.tokenOwner === user?.username && user?.username === query?.username
    const isCreator = token?.tokenCreator === user?.username && user?.username === query?.username
    const isCollectionOwner = user?.username === token?.collection?.owner?.username
    const isDelisted = !!token.delisted
    if (isOwner && !token.auctionEnded && !token.auctionLive && !isDelisted) {
      options.push({
        title: 'Transfer NFT',
        onClick: (e) => transferToken(e, token),
      })
    }
    if (
      isOwner &&
      ['mint', 'sale', 'sold', 'delist'].includes(token.status) &&
      !token.auctionEnded &&
      !token.auctionLive &&
      token.contractAddress === getNftAddress()
    ) {
      options.push({
        title: 'Burn',
        onClick: (e) => burnToken(e, token, 'creation'),
      })
    }
    if (isOwner && ['sale'].includes(token.status) && !token.auctionEnded && !token.auctionLive) {
      options.push({
        title: 'Cancel sale',
        onClick: (e) => cancelSale(e, token, 'creation'),
      })
    }

    if (isOwner && ['mint', 'sold'].includes(token.status) && tab !== 'hidden' && !isDelisted) {
      options.push({
        title: 'List for sale',
        onClick: (e) => router?.push(`/list-for-sale/${token.contractAddress}/${token.id}`),
      })
    }

    if (isOwner && token.onSale && !token.auctionEnded && !token.auctionLive && !isDelisted) {
      options.push({
        title: 'Update price',
        onClick: (e) => updateTokenPrice(e, token),
      })
    }
    if (isOwner && ['collected', 'created'].includes(tab) && !token.auctionEnded && !token.auctionLive && !isDelisted) {
      options.push({
        title: 'Hide',
        onClick: (e) => hideToken(e, token),
      })
    }

    if (isOwner && tab === 'hidden' && !token.auctionEnded && !token.auctionLive && !isDelisted) {
      options.push({
        title: 'Unhide',
        onClick: (e) => unHideToken(e, token),
      })
    }

    if (
      tab === 'created' &&
      !token.collection.username &&
      ((isOwner && isCreator && token.market === 'primary') || (isCreator && token.editable)) &&
      !isDelisted &&
      !isExternalAddress(token?.contractAddress)
    ) {
      options.push({
        title: 'Move to collection',
        onClick: (e) => moveToCollection(e, token),
      })
    }

    if (
      ((isOwner && isCollectionOwner && token.market === 'primary') || (isCreator && token.editable)) &&
      token.collection.username &&
      !token.auctionEnded &&
      !token.auctionLive &&
      !isDelisted &&
      !isExternalAddress(token?.contractAddress)
    ) {
      options.push({
        title: 'Edit NFT',
        onClick: (e) => editNFT(e, token),
      })
    }
    if (
      ((isOwner && isCollectionOwner && token.market === 'primary') || (isCreator && token.editable)) &&
      token.collection.username &&
      !token.auctionEnded &&
      !token.auctionLive &&
      !isDelisted &&
      !isExternalAddress(token?.contractAddress)
    ) {
      options.push({
        title: 'Remove from collection',
        onClick: (e) => removeToCollection(e, token),
      })
    }

    return options
  }

  const renderCreated = () => {
    return (
      <TokenListWithFilters
        fetchData={fetchCreations}
        type="created"
        key="created"
        getTokenOptionsList={(token) => getOptionList(token, 'created')}
        askRefresh={askRefresh}
        customSorts={{
          names: {
            'created-desc': 'Date Created: Newest',
            'created-asc': 'Date Created: Oldest',
          },
          actions: [
            {
              title: 'Date Created: Newest',
              query: ['Date Created: Newest', 'created', 'desc'],
            },
            {
              title: 'Date Created: Oldest',
              query: ['Date Created: Oldest', 'created', 'asc'],
            },
          ],
        }}
        defaultSelectedSort="Date Created: Newest"
        defaultSort={{ name: 'created', order: 'desc' }}
      />
    )
  }
  const renderCollections = () => {
    return <CollectionsList isPrivate={isPrivate} profileDetails={data} />
  }
  const renderHidden = () => {
    if (user?.username !== query?.username) return router.push('/')
    return (
      <TokenListWithoutFilters
        fetchData={fetchHiddenTokens}
        type="hidden"
        key="hidden"
        getTokenOptionsList={(token) => getOptionList(token, 'hidden')}
        askRefresh={askRefresh}
      />
    )
  }

  const renderCollected = () => {
    return (
      <TokenListWithFilters
        fetchData={fetchCollections}
        type="collected"
        key="collected"
        getTokenOptionsList={(token) => getOptionList(token, 'collected')}
        askRefresh={askRefresh}
        customSorts={{
          names: {
            'sold-desc': 'Date Collected: Newest',
            'sold-asc': 'Date Collected: Oldest',
          },
          actions: [
            {
              title: 'Date Collected: Newest',
              query: ['Date Collected: Newest', 'sold', 'desc'],
            },
            {
              title: 'Date Collected: Oldest',
              query: ['Date Collected: Oldest', 'sold', 'asc'],
            },
          ],
        }}
        defaultSelectedSort="Date Collected: Newest"
        defaultSort={{ name: 'sold', order: 'desc' }}
      />
    )
  }

  const renderBids = () => {
    if (user?.username !== query?.username) return router.push('/')
    return <Bids />
  }

  const shareOntwitter = () => {
    Mixpanel.track(MixpanelEvents.SHARE_CONTENT_CLICKED, {
      username: user?.username,
      other_user_name: query?.username,
      Platform: 'Twitter',
      type: 'Profile',
    })
    var url = `https://twitter.com/intent/tweet?text=Check out this NFT Here ${window.location.origin}/${username}`
    const TwitterWindow = window.open(url, 'TwitterWindow')
    return false
  }

  const shareOnFacebook = () => {
    Mixpanel.track(MixpanelEvents.SHARE_CONTENT_CLICKED, {
      username: user?.username,
      other_user_name: query?.username,
      Platform: 'Facebook',
      type: 'Profile',
    })
    var url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/${username}&t=Check out this NFT Here`
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  }
  const copyLink = () => {
    const el = document.createElement('textarea')
    el.value = window.location.origin + `/${username}`
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    notify.success('Link copied', '')
  }

  async function toggleFollow() {
    try {
      if (FollowersList.indexOf(user.username) == -1) {
        await API.followUser(user.username, query.username, user.signature)
        // notify.success("Follow successfully", "");
      } else {
        await API.unFollowUser(user.username, query.username, user.signature)
        // notify.success("Unfollow successfully", "");
      }
      dispatch(getFollowings(user.username))
      refetchFollowers()
    } catch (e) {
      notify.error('Something went wrong please try again later', '')
    }
  }

  function onClickInvite() {
    showModal(MODAL.INVITE_USER)
  }

  const _handleTabView = (tab) => {
    if (!router.isReady) return null
    switch (tab) {
      case 'created':
        return renderCreated()
      case 'collected':
        return renderCollected()
      case 'collections':
        return renderCollections()
      case 'hidden':
        return renderHidden()
      case 'offers-received':
        return <OffersReceived />
      case 'offers-made':
        return <OffersMade />
      case 'bids':
        return renderBids()
      default: {
        // return default_user_page === "collected"
        //   ? renderCollected()
        //   : default_user_page === "collections"
        //   ? renderCollections()
        //   : renderCreated();
        default_user_page === 'collected'
          ? router.replace(`/${query.username}?tab=collected`)
          : default_user_page === 'collections'
          ? router.replace(`/${query.username}?tab=collections`)
          : router.replace(`/${query.username}?tab=created`)
        return null
      }
    }

    //TODO handle swithc redirect

    /* <Switch>
            {default_user_page && (
              <Redirect
                to={
                  default_user_page === "collected"
                    ? `/:username?tab=collected`
                    : default_user_page === "collections"
                    ? "/:username/collections"
                    : "/:username?tab=created"
                }
              />
            )}
          </Switch> */
  }
  const handleTabView = _handleTabView(query?.tab)

  return (
    <>
      <PageMeta name={name} description={data?.bio} image={data?.profileImage} />
      <Container>
        <ProfileDetails/>
        {/*{isLoading ? (*/}
        {/*  <ProfileDetailsLayoutSkeleton />*/}
        {/*) : (*/}
        {/*  <ProfileDetailsLayout*/}
        {/*    details={{*/}
        {/*      ...data,*/}
        {/*      bio: !data.bio ? DEFAULT_DESCRIPTION : data.bio,*/}
        {/*    }}*/}
        {/*    stats={getStats({*/}
        {/*      followers: FollowersList.length,*/}
        {/*      followings: FollowingList.length,*/}
        {/*    })}*/}
        {/*    showEdit={isPrivate}*/}
        {/*    editLink="/edit-profile"*/}
        {/*    type="profile"*/}
        {/*    renderSettings={() => {*/}
        {/*      return (*/}
        {/*        <Flex>*/}
        {/*          {isLoggedIn && !isPrivate && (*/}
        {/*            <ActionButton*/}
        {/*              onClick={toggleFollow}*/}
        {/*              variant={'secondary'}*/}
        {/*              minWidth={100}*/}
        {/*              justifyContent="center"*/}
        {/*              mr={10}*/}
        {/*            >*/}
        {/*              <Text fontSize={14} fontWeight={500}>*/}
        {/*                {isFollowing ? 'Unfollow' : 'Follow'}{' '}*/}
        {/*              </Text>*/}
        {/*            </ActionButton>*/}
        {/*          )}*/}
        {/*          <DropDown*/}
        {/*            optionList={[*/}
        {/*              {*/}
        {/*                title: 'Share on Facebook',*/}
        {/*                onClick: shareOnFacebook,*/}
        {/*              },*/}
        {/*              {*/}
        {/*                title: 'Share on Twitter',*/}
        {/*                onClick: shareOntwitter,*/}
        {/*              },*/}
        {/*              { title: 'Copy link', onClick: copyLink },*/}
        {/*            ]}*/}
        {/*            customButton={() => (*/}
        {/*              <ActionButton variant={'secondary'}>*/}
        {/*                /!*<img src={ShareIcon} />*!/*/}
        {/*                <Text fontSize={14} fontWeight={500}>*/}
        {/*                  Share*/}
        {/*                </Text>*/}
        {/*              </ActionButton>*/}
        {/*            )}*/}
        {/*          />*/}
        {/*          {isPrivate && (*/}
        {/*            <ActionButton variant={'secondary'} onClick={onClickInvite} ml={30}>*/}
        {/*              /!*<img src={InviteIcon} />*!/*/}
        {/*              <Text fontSize={14} fontWeight={500}>*/}
        {/*                Invite{' '}*/}
        {/*              </Text>*/}
        {/*            </ActionButton>*/}
        {/*          )}*/}
        {/*        </Flex>*/}
        {/*      )*/}
        {/*    }}*/}
        {/*    renderSettingsSmall={() => {*/}
        {/*      return (*/}
        {/*        <SmallActionWrapper justifyContent="center" mt={10}>*/}
        {/*          {isLoggedIn && !isPrivate && (*/}
        {/*            <ActionButton*/}
        {/*              // variant="primary"*/}
        {/*              variant={'secondary'}*/}
        {/*              // mr="auto"*/}
        {/*              onClick={toggleFollow}*/}
        {/*              minWidth={100}*/}
        {/*              justifyContent="center"*/}
        {/*            >*/}
        {/*              <Text fontSize={14} fontWeight={500}>*/}
        {/*                {isFollowing ? 'Unfollow' : 'Follow'}{' '}*/}
        {/*              </Text>*/}
        {/*            </ActionButton>*/}
        {/*          )}*/}

        {/*          <DropDown*/}
        {/*            optionList={[*/}
        {/*              {*/}
        {/*                title: 'Share on Facebook',*/}
        {/*                onClick: shareOnFacebook,*/}
        {/*              },*/}
        {/*              {*/}
        {/*                title: 'Share on Twitter',*/}
        {/*                onClick: shareOntwitter,*/}
        {/*              },*/}
        {/*              { title: 'Copy link', onClick: copyLink },*/}
        {/*            ]}*/}
        {/*            customButton={() => (*/}
        {/*              // <Share>*/}
        {/*              //   <img src={ShareIcon} />*/}
        {/*              // </Share>*/}
        {/*              <ActionButton variant={'secondary'}>*/}
        {/*                /!*<img src={ShareIcon} />*!/*/}
        {/*                <Text fontSize={14} fontWeight={500}>*/}
        {/*                  Share*/}
        {/*                </Text>*/}
        {/*              </ActionButton>*/}
        {/*            )}*/}
        {/*          />*/}
        {/*          {isPrivate && (*/}
        {/*            <ActionButton variant={'secondary'} onClick={onClickInvite}>*/}
        {/*              <Text fontSize={14} fontWeight={500}>*/}
        {/*                Invite*/}
        {/*              </Text>*/}
        {/*            </ActionButton>*/}
        {/*          )}*/}
        {/*        </SmallActionWrapper>*/}
        {/*      )*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        <Box>
          <Flex mb={20} className="mt-2" justifyContent="center">
            <SwapOrderWrapper ref={tabsContainer}>
              {swapOrder()}
              <NextScrollIconWrapper onClick={scrollToRight}>
                <RightIcon />
              </NextScrollIconWrapper>
            </SwapOrderWrapper>
          </Flex>

          <Box>{handleTabView}</Box>
        </Box>
      </Container>
    </>
  )
}

const NavTab = ({ title, icon, to, query, tab }) => {
  return (
    <NextLinkFromReactRouter to={to} shallow={true}>
      <ActiveTab className={query.tab === tab && 'active-tab-link'}>
        <Box>{icon()}</Box>
        {/*<Text fontSize="16px" color="text" fontWeight={700}>{count}</Text>*/}
        <Text color="text">{title}</Text>
      </ActiveTab>
    </NextLinkFromReactRouter>
  )
}
const Container = styled(Box)`
  min-height: 70vh;
  // padding: 0 20px;
  // ${(p) => p.theme.media.xlg} {
  //   padding: 0 40px;
  // }

  .active-tab-link {
    border-bottom: 2px solid ${(p) => p.theme.colors.text};
    opacity: 1;
  }
`

const ActiveTab = styled.div`
  cursor: pointer;
  border-bottom: 2px solid transparent;
  padding: 20px 0;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

const TabNavLink = styled.div`
  cursor: pointer;
  border-bottom: 2px solid transparent;
  padding: 20px 0;
  margin: 0 10px;
  color: var(--text-primary);
  min-width: 100px;
  display: inline-block;
  text-align: center;

  //text-decoration: none;
  //display: inline-block;
  //padding: 5px 20px;
  //outline: none;
  //font-size: 14px;
  //font-weight: 500;
  //background: transparent;
  //color: var(--text-primary);
  //margin: 4px;
  //cursor: pointer;
  //opacity: 0.6;
  //border: 2px solid transparent;
  //
  &:hover {
    color: var(--text-primary);
  }
`

const SmallActionWrapper = styled(Flex)`
  grid-gap: 10px;
`

const Share = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.bg2};
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    margin-right: 2px;
  }
`

const ActionButton = styled(Button)`
  display: flex;
  // background: transparent;
  justify-content: center;
  border-radius: 22px;
  //padding: 4px 8px;
  cursor: pointer;
  align-items: center;
  border: 1px solid ${(p) => p.theme.colors.textLight} !important;
  min-width: 90px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  div {
    color: ${(p) => p.theme.colors.textLight};
  }
`

const SwapOrderWrapper = styled(Flex)`
  ${(p) => p.theme.media.xs} {
    display: flex;
    white-space: nowrap;
    overflow: auto;
    padding-bottom: 10px;
  }

  ${(p) => p.theme.media.sm} {
    overflow: auto;
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

export default UserProfile
