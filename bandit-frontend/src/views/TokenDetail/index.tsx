import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'
import axios from 'axios'

import { MODAL, showModal } from '../../modules/Modals'
import { Mixpanel, MixpanelEvents } from '../../analytics/Mixpanel'
import { setSingleNotification } from '../../state/Profile/actions'
import { getNftAddress, isExternalAddress } from '../../utils/addressHelpers'
import { notify } from '../../components/atoms/Notification/Notify'
import { PageMeta } from '../../components/molecules/AppLayout/PageMeta'
import { useNftDetail } from '../../state/nfts/hooks'

import TokenDetailContainer from './components/TokenDetailContainer'
import useDecideContract from '../../hooks/useDecideContract'
import API from '../../services/API'
import locale from '../../constant/locale'
import useWebSocket from '../../hooks/useWebSocket'
import usePreviousValue from '../../hooks/usePreviousValue'
import Page from 'components/atomsV2/Page'

const TokenDetail = () => {
  const router = useRouter()
  const { query, isReady } = router
  const { id, contractAddress }: any = query

  const [refreshLoading, setRefreshLoading] = useState(false)
  const { isLoggedIn, user } = useSelector((state: any) => state.auth)

  const { initDecideContract } = useDecideContract()
  const previousQuery: any = usePreviousValue(query)
  const { nftContract, escrowAddress } = initDecideContract(contractAddress)

  const { lastMessage } = useWebSocket()
  const dispatch = useDispatch()

  const {
    nftDetail: data,
    isLoading,
    refetch: refetchTokenDetail,
  } = useNftDetail(id, contractAddress, { enabled: isReady })


  function refresh() {
    refetchTokenDetail()
  }

  const cancelSale = async (e, token, refreshType) => {
    e.stopPropagation()
    e.preventDefault()

    showModal(MODAL.CANCEL_SALE, {
      token,
      refreshProfile: refresh,
      cancelOnly: true,
    })
  }

  const burnToken = async (e, token, refreshType) => {
    e.stopPropagation()
    e.preventDefault()

    const { id } = token
    const currentOwnerAddress = await nftContract.ownerOf(id)
    if (token.hasOffers) {
      showModal(MODAL.CANCEL_ACCEPTED_OFFER, {}, {})
    } else if (currentOwnerAddress === user?.wallet_address) {
      showModal(MODAL.BURN_CONFIRMATION, {
        tokenId: id,
        token,
        refreshProfile: refresh,
      })
    } else {
      showModal(MODAL.CANCEL_SALE, {
        token,
        refreshProfile: refresh,
      })
    }
  }

  const transferToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    const { id, hasOffers } = token

    const currentOwnerAddress = await nftContract.ownerOf(id)
    if (hasOffers) {
      showModal(MODAL.CANCEL_ACCEPTED_OFFER, {}, {})
    } else if (currentOwnerAddress === escrowAddress) {
      showModal(MODAL.CANCEL_SALE, {
        token,
        refreshProfile: refresh,
        showTransfer: true,
      })
    } else {
      showModal(MODAL.TRANSFER_TOKEN, {
        tokenId: id,
        token,
        transferNFT: refresh,
        user,
      })
    }
  }

  const moveToCollection = async (e, token) => {
    showModal(
      MODAL.MOVE_TOKEN_TO_COLLECTION,
      { token, refresh: refetchTokenDetail },
      {
        width: isMobile ? '80%' : 700,
        bodyStyle: {
          backgroundColor: 'var(--bg-2)',
        },
      },
    )
  }

  const hideToken = async (e, token) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      await API.hideToken(user?.username, user?.signature, token.id, token.contractAddress)
      refetchTokenDetail()
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
      refetchTokenDetail()
    } catch (e) {
      notify.error('Failed to unhide NFT', '')
    }
  }

  const removeToCollection = async (e, token) => {
    showModal(
      MODAL.TX_LOADING,
      {
        title: 'Are you sure you want to remove the token from this collection?',
        callback: async () => {
          try {
            const res = await API.removeTokenFromCollection(user?.username, user?.signature, token.id)
            refetchTokenDetail()
            notify.success('NFT removed successfully', '')
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
      { token, refresh: refetchTokenDetail },
      {
        width: isMobile ? '80%' : 700,
        bodyStyle: {
          backgroundColor: 'var(--bg-2)',
        },
      },
    )
  }

  function getOptionList(token) {
    let options = []
    const isOwner = token.tokenOwner === user?.username
    const isCreator = token.tokenCreator === user?.username
    const isDelisted = !!token.delisted
    const isCollectionOwner = user?.username === token?.collection?.owner?.username
    if (token.tokenOwner === user?.username && !token.auctionEnded && !token.auctionLive && !isDelisted) {
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
        onClick: (e) => burnToken(e, token, 'collection'),
      })
    }

    if (isOwner && ['sale'].includes(token.status) && !token.auctionEnded && !token.auctionLive) {
      options.push({
        title: 'Cancel sale',
        onClick: (e) => cancelSale(e, token, 'creation'),
      })
    }

    if (
      ((isOwner && isCreator && token.market === 'primary') || (isCreator && token.editable)) &&
      !token.collection.username &&
      !isExternalAddress(token?.contractAddress)
    ) {
      options.push({
        title: 'Move to collection',
        onClick: (e) => moveToCollection(e, token),
      })
    }
    if (isOwner && !token?.isHidden && !token.auctionEnded && !token.auctionLive && !isDelisted) {
      options.push({
        title: 'Hide',
        onClick: (e) => hideToken(e, token),
      })
    }
    if (isOwner && token?.isHidden && !token.auctionEnded && !token.auctionLive && !isDelisted) {
      options.push({
        title: 'Unhide',
        onClick: (e) => unHideToken(e, token),
      })
    }
    if (
      ((isOwner && isCollectionOwner && token.market === 'primary') || (isCreator && token.editable)) &&
      token.collection.username &&
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
      ((isOwner && isCollectionOwner && token.market === 'primary') || (isCreator && token.editable)) &&
      token.collection.username &&
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

  function needRefresh() {
    if (data?.contractAddress === getNftAddress() || data?.isRevealed) {
      return null
    }

    return refreshToken
  }

  async function refreshToken() {
    try {
      setRefreshLoading(true)
      const endPoint = locale.ADMIN_API_END_POINT
      const res = await axios.post(`${endPoint}/webhook`, {
        object: {
          className: 'revealNFT',
          tokenId: data?.id,
          address: data?.contractAddress,
        },
      })

      refetchTokenDetail()
      setTimeout(() => {
        setRefreshLoading(false)
      }, 2000)
    } catch (e) {
      setRefreshLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    const isSecondary = data.market === 'secondary'

    Mixpanel.track(MixpanelEvents.NFT_VIEWED, {
      tokenId: data.id,
      user_id: user?.username,
      creator_id: data.tokenCreator,
      owner_id: data.tokenOwner,
      secondary_market: isSecondary,
    })
  }, [])

  // useEffect(() => {
  //   if (previousQuery?.id !== query.id || previousQuery?.contractAddress !== query.contractAddress) {
  //     refetchTokenDetail()
  //   }
  // }, [query.id])

  useEffect(() => {
    const { token_id, method } = lastMessage || {}

    if (token_id && token_id === query.id && method === 'refresh') {
      refetchTokenDetail()
    }

    if (lastMessage && !!Object.keys(lastMessage).length && lastMessage?.method === 'notification') {
      dispatch(setSingleNotification(lastMessage))
    }
  }, [lastMessage])

  return (
    <>
      <PageMeta
        tokenName={data?.metaData?.name}
        collectionName={data?.collection?.name}
        description={data?.metaData?.description}
        image={data?.metaData?.url}
      />
      <Page scale="lg">
        <TokenDetailContainer
          token={data}
          isLoading={isLoading}
          optionList={isLoggedIn ? getOptionList(data) : []}
          refreshToken={needRefresh}
          refreshLoading={refreshLoading}
        />
      </Page>
    </>
  )
}

export default TokenDetail
