import React, { useEffect } from "react";
import styled from "styled-components";
import { flatten, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex } from "../components/atoms/StyledSystem";
import Button from "../components/atoms/Button/Button";
import API from "../services/API";
import { useInfiniteQuery, useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import moment from "moment";
import NotificationSkeleton from "../components/molecules/Token/skeletons/NotificationSkeleton";
import { isDefaultImage, truncateUsername } from "../utils";
import BoringAvatar from "../components/atoms/Avatar/BoringAvatar";
import { getNotificationCount, getNotificationUnRead, setNotificationsList } from "../state/Profile/actions";
// import "./notification.scss";
import {
  FollowingIcon,
  InviteIcon,
  NotificationBidIcon,
  OfferIcon,
  SettledIcon,
  SoldIcon,
  TransferIcon
} from "../components/atoms/svg";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { useRouter } from "next/router";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

const Container = styled(Box)`
  min-height: 80vh;
  margin: 0 20px;
  margin-top: 50px;
  button {
    padding: 0 35px;
    height: 42px;
    border: 1px solid #a3a3a3;
    font-size: 16px;
    font-weight: 400;
    :focus,
    :hover {
      border: 1px solid #a3a3a3;
    }
    ${(p) => p.theme.media.xs} {
      padding: 0 15px;
      font-size: 12px;
      height: 35px;
    }
  }

  ${(p) => p.theme.media.md} {
    margin: 0 10%;
    margin-top: 50px;
  }
  ${(p) => p.theme.media.lg} {
    margin: auto;
    margin-top: 70px;
    max-width: 900px;
  }
  ${(p) => p.theme.media.xs} {
    margin: 0 20px;
    margin-top: 30px;
  }
  ${(p) => p.theme.media.xxs} {
    /* margin: 0 20px; */
    margin-top: 30px;
  }
`

const StyledText = styled.div`
  color: ${(p) => p.theme.colors.textTertiary};
  font-weight: 600;
  font-size: 62px;
  line-height: 75px;
  ${(p) => p.theme.media.xs} {
    font-size: 30px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box !important;
  }
  ${(p) => p.theme.media.xxs} {
    /* font-size: 18px; */
    font-weight: 600;
    line-height: 50px;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  right: -5px;
  bottom: 0;
  height: 30px;
  width: 30px;
  background-color: #efeeea;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    min-height: 20px !important;
    min-width: 20px !important;
    height: 20px !important;
    width: 20px !important;
  }
  ${(p) => p.theme.media.xs} {
    right: -20px;
    bottom: -6px;
  }
  ${(p) => p.theme.media.xxs} {
    right: -10px;
    bottom: -10px;
    height: 30px;
    width: 30px;
    svg {
      min-height: 15px !important;
      min-width: 15px !important;
      height: 15px !important;
      width: 15px !important;
    }
  }
`
const TransferIconWrapper = styled.div`
  svg {
    min-height: 12px !important;
    height: 12px !important;
  }
`

export const MarkAllAsReadText = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  //color: #9a4ffa;
  opacity: 0.6;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: right;
  // width: 687px;
  ${(p) => p.theme.media.xs} {
    margin-right: 20px;
    // width: 90%;
  }
`

export const NotificationListWrapper = styled.div`
  // background: #fbfbf9;
  // box-shadow: 0px 5px 10px -2px #e7e5de;
  // border-radius: 10px;
  ${(p) => p.theme.media.xs} {
    // margin: 0 20px;
    // margin-right: 10px;
    // width: 90%;
  }
`

const EmptyNotifications = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
`

const NotificationBlock = styled.div`
  width: 100%;
  ${(p) => p.theme.media.xs} {
    width: 100%;
  }
`

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 12px 0px;
  margin: 5px 0px;
  cursor: pointer;
  position: relative;
  /* ${(p) => p.theme.media.xxs} {
    padding: 0;
  } */
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;

  img,
  svg {
    object-fit: cover;
    min-height: 70px;
    max-height: 70px;
    min-width: 70px;
    max-width: 70px;
    border-radius: 50%;
    /* ${(p) => p.theme.media.xs} {
      min-height: 50px;
      max-height: 50px;
      min-width: 50px;
      max-width: 50px;
    }
    ${(p) => p.theme.media.xxs} {
      min-height: 30px;
      max-height: 30px;
      min-width: 30px;
      max-width: 30px;
    } */
    ${(p) => p.theme.media.sm} {
      min-height: 50px;
      max-height: 50px;
      min-width: 50px;
      max-width: 50px;
    }
  }
`

export const DateText = styled.p`
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  opacity: 0.6;
  margin: 0px;
  margin-left: 30px;
  margin-right: 50px;
  margin-bottom: 5px;
  ${(p) => p.theme.media.xs} {
    font-size: 11px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box !important;
  }
  ${(p) => p.theme.media.xxs} {
    margin-left: 30px;
    margin-right: 10px;
  }
  ${(p) => p.theme.media.sm} {
    margin-left: 30px;
  }
`
export const NotificationMessage = styled.p`
  opacity: ${(p) => (p.read ? '0.6 !important' : '1 !important')};
  margin: 0px;
  margin-left: 30px;
  margin-right: 50px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 22px;
  font-weight: ${(p) => (p.read ? '600 !important' : '700 !important')};
  color: #000000;
  ${(p) => p.theme.media.xs} {
    font-size: 14px;
    margin-bottom: 0px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box !important;
    margin-left: 30px;
    margin-right: 50px;
  }
  ${(p) => p.theme.media.xxs} {
    font-size: 16px;
    margin-left: 30px;
    margin-right: 10px;
    line-height: 16px;
  }
  ${(p) => p.theme.media.sm} {
    font-size: 14px;
    margin-left: 30px;
    margin-bottom: 10px;
  }
`

export const NewNotification = styled.div`
  height: calc(100% - 20px);
  width: 5px;
  background: black;
  position: absolute;
  left: -25px;
  background: #9a4ffa;
`

export const NftImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 21px;
  object-fit: cover;
  /* ${(p) => p.theme.media.xs} {
    width: 50px;
    height: 50px;
    border-radius: 15px;
  }
  ${(p) => p.theme.media.xxs} {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  } */
  ${(p) => p.theme.media.sm} {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
`

export const NotificationDate = styled.p`
  margin-bottom: 0;
  padding-top: 15px;
  // margin-left: 30px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #292c36;
`

const NotificationPopup = (props) => {
  const router = useRouter()

  const showFollowButton = (following) => {
    return props.FollowingList.indexOf(following) === -1
  }
  const getLink = (notification, invite_code) => {
    let link = ''
    switch (notification.type) {
      case 'follower':
        link = `/${notification.following}`
        break
      case 'invite':
        link = `/referral/${invite_code}`
        console.log(link)
        break
      case 'offerReceived':
        link = `/${notification.username}?tab=offers-received`
        break
      case 'offerMade':
        link = `/${notification.username}?tab=offers-made`
        break
      case 'sold':
      case 'placeBid':
      case 'collab':
      case 'settleAuction':
      case 'transfer':
        link = `/assets/${notification.contractAddress}/${notification.nft_id}`
        break
      default:
        link = `/`
        break
    }
    return link
  }

  const getIcon = (type) => {
    switch (type) {
      case 'sold':
        return <SoldIcon />
      case 'placeBid':
        return <NotificationBidIcon />
      case 'settleAuction':
        return <SettledIcon />
      case 'collab':
        return <NotificationBidIcon />
      case 'transfer':
        return (
          <TransferIconWrapper>
            <TransferIcon />
          </TransferIconWrapper>
        )
      case 'offerReceived':
        return <OfferIcon />
      case 'offerMade':
        return <OfferIcon />
      case 'invite':
        return <InviteIcon />
      case 'follower':
        return <FollowingIcon />
      default:
        return <NotificationBidIcon />
    }
  }

  const _truncateUsername = (message) => {
    let message2 = message.split(' ')
    if (message2.length) {
      if (message2[0].includes('@')) {
        let username = '@' + truncateUsername(message2[0].substr(1))
        message2[0] = username
      }
      message2 = message2.join(' ')
      message = message2
    }
    return message
  }

  const renderNotification = (allNotifications) => {
    const NotifyList = []
    for (var key in allNotifications) {
      NotifyList.push(
        <div key={key}>
          <NotificationDate>{key}</NotificationDate>
          {allNotifications[key].map((notification, index) => {
            let message = notification.message
            let invite_code = ''
            if (notification.type === 'invite') {
              const tempMessage = notification.message
              message = tempMessage.split('#')[0]
              invite_code = tempMessage.split('#')[1]
            }
            message = _truncateUsername(message)
            return (
              <NotificationWrapper key={notification.id} onClick={() => props.updateReadNotification(notification.id)}>
                <NextLinkFromReactRouter to={getLink(notification, invite_code)}>
                  <AvatarWrapper>
                    <Box position="relative" minWidth={40}>
                      {!isDefaultImage(notification.profile_image) ? (
                        <img src={`${notification.profile_image}?h=100&q=80&auto=format`} alt="profile" />
                      ) : (
                        <BoringAvatar size={70} name={notification.following} />
                      )}
                      <IconWrapper>{getIcon(notification.type)}</IconWrapper>
                    </Box>
                    <div>
                      <NotificationMessage read={notification.is_read}>{message}</NotificationMessage>
                      <DateText read={notification.is_read}>
                        {moment(new Date(notification.notification_date)).from(new Date())}
                      </DateText>
                    </div>
                  </AvatarWrapper>
                </NextLinkFromReactRouter>
                {notification.type === 'follower' && showFollowButton(notification.following) ? (
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      props.followUser(notification.following)
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    Follow
                  </Button>
                ) : null}
                {['sold', 'placeBid', 'settleAuction', 'collab', 'transfer', 'offerReceived', 'offerMade'].includes(
                  notification.type,
                ) ? (
                  <NextLinkFromReactRouter to={getLink(notification, invite_code)}>
                    <NftImage src={`${notification.image_url}?h=100&auto=format,compress`} />
                  </NextLinkFromReactRouter>
                ) : null}
                {['invite'].includes(notification.type) && !notification.is_read && (
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      router.push(`/referral/${invite_code}`)
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    Accept
                  </Button>
                )}
              </NotificationWrapper>
            )
          })}
        </div>,
      )
    }

    return NotifyList
  }
  return <NotificationBlock>{renderNotification(props.allNotification)}</NotificationBlock>
}

const Notification = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { notifications, notificationsList, notificationCount } = useSelector((state: any) => state.profile)
  const { notificationsLoading: isLoading } = useSelector((state: any) => state.profile)
  const { user } = useSelector((state: any) => state.auth)

  function fetchFollowings() {
    return API.getUserFollowings(user.username)
  }

  const { data: FollowingList = [], refetch: refetchFollowing } = useQuery(
    'followings-notifications-list',
    fetchFollowings,
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )

  const {
    isLoading: isNotificationsLoading,
    error,
    data = { pages: [] },
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch: refetchNotifications,
  }: any = useInfiniteQuery('notifications', fetchNotifications, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    retry: false,
    enabled: !!user?.username,
    getNextPageParam: (lastPage, pages) => pages.length,
  })

  async function fetchNotifications({ pageParam = 0 }) {
    const offset = pageParam * 10
    return API.getNotification(user?.username, user?.signature, offset, 10)
  }

  useEffect(() => {
    const { pages } = data || {}
    if (pages.length) {
      const notificationList = flatten(map(pages))
      dispatch(setNotificationsList(notificationList))
    }
  }, [data])

  useEffect(() => {
    getNotificationData()
  }, [])

  const getNotificationData = async () => {
    // dispatch(getNotification(user.username));
    dispatch(getNotificationUnRead(user.username, user?.signature))
    dispatch(getNotificationCount(user.username, user?.signature))
  }

  const followUser = async (username) => {
    await API.followUser(user.username, username, user.signature)
    refetchFollowing()
  }

  const updateAllReadNotification = async () => {
    await API.updateAllReadNotification(user.username, user?.signature)
    getNotificationData()
    refetchNotifications()
  }

  const updateReadNotification = async (id) => {
    await API.updateReadNotification(user.username, user?.signature, id)
    dispatch(getNotificationUnRead(user.username, user?.signature))
  }

  const hasNotifications = !!Object.keys(notifications).length

  return (
    <>
      <PageMeta data="Notifications" />
      <Container>
        <Flex justifyContent="space-between" mb={10} mt={80} alignItems="center">
          <StyledText>Notifications</StyledText>
          {hasNotifications && (
            <Button variant="secondary" onClick={() => updateAllReadNotification()}>
              Mark all as read
            </Button>
          )}
        </Flex>
        <InfiniteScroll
          dataLength={notificationsList.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={null}
          style={{
            width: '100%',
          }}
        >
          <NotificationListWrapper>
            <NotificationPopup
              allNotification={notifications}
              FollowingList={FollowingList}
              followUser={followUser}
              updateReadNotification={updateReadNotification}
            />
            {isFetching && <NotificationSkeleton />}
          </NotificationListWrapper>
        </InfiniteScroll>

        {!isLoading && !isFetching && !hasNotifications && (
          <EmptyNotifications> There are no notifications yet. </EmptyNotifications>
        )}
      </Container>
    </>
  )
}

export default Notification
