import React, { useEffect, useState } from "react";
import NotificationIcon from "../../components/atoms/svg/images/Bell";
import styled from "styled-components";
import { Popover } from "antd";
import Button from "../../components/atoms/Button/Button";
import BoringAvatar from "../../components/atoms/Avatar/BoringAvatar";
import API from "../../services/API";
import { useQuery } from "react-query";
import {
  getNotificationCount,
  getNotificationUnRead,
  markNotificationsAsRead,
  setSingleNotification
} from "../../state/Profile/actions";
import moment from "moment";
import { isDefaultImage, truncateUsername } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "../../hooks/useWebSocket";
import { isMobile } from "react-device-detect";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";
import { useRouter } from "next/router";

const IconWrapper = styled.div`
  position: relative;
  min-width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.bg2};
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, .1);


  ${(p) => p.theme.media.xlg} {
    margin-left: 0;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const NotificationBlock = styled.div`
  min-width: 450px;
  max-width: 450px;
  max-height: 400px;
  overflow-y: auto;
  padding-bottom: 40px;

  ${(p) => p.theme.media.xs} {
    min-width: 340px;
    max-width: 340px;
  }
`
const ViewAll = styled.span`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${(p) => p.theme.colors.bg2};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const NotificationPopOverContent = styled.div`
  position: relative;
`

const NoticationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 12px 0px;
  margin: 5px 16px;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid rgba(120, 119, 117, 0.6);
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0px;
    margin-left: 10px;
    margin-right: 50px;
    color: black;
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 20px;
  }
`

const DateView = styled.p`
  font-size: 13px;
  line-height: 15px;
  font-weight: 500;
  color: #8e8e8e !important;
`

const NotificationCount = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #f02849;
  line-height: 20px;
  border-radius: 50%;
  font-size: 12px;
  width: 15px;
  height: 15px;
  text-align: center;
  font-weight: bold;
`

export const NewNotification = styled.div`
  height: calc(100% - 20px);
  width: 5px;
  position: absolute;
  left: -25px;
  background: ${(p) => p.theme.colors.text4};
`

export const Text = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: ${(p) => p.theme.colors.text};
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
`

export const NotificationTitleText = styled.p`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin-top: 10px;
  margin-bottom: 10px;
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
`

export const NotificationTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NftImage = styled.img`
  width: 56px;
  height: 40px;
  border-radius: 5px;
  object-fit: cover;
`

export const NoNewNotification = styled.p`
  font-size: 16px;
  font-weight: 500;
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #677788 !important;
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

  return (
    <NotificationPopOverContent>
      <NotificationBlock>
        {props?.allNotification?.length ? (
          props.allNotification.map((notification) => {
            let message = notification.message
            let invite_code = ''
            if (notification.type === 'invite') {
              const tempMessage = notification.message
              message = tempMessage.split('#')[0]
              invite_code = tempMessage.split('#')[1]
            }
            message = _truncateUsername(message)
            return (
              <NextLinkFromReactRouter to={getLink(notification, invite_code)} key={notification.id}>
                <NoticationWrapper
                  onClick={() => {
                    props.toggleNotification(false)
                    if (!notification.is_read) {
                      props.updateReadNotification(notification.id)
                    }
                  }}
                >
                  <AvatarWrapper>
                    {!isDefaultImage(notification.profile_image) ? (
                      <img src={`${notification.profile_image}?h=100&q=80&auto=format`} alt="profile" />
                    ) : (
                      <BoringAvatar size={40} name={notification.following} />
                    )}
                    <div>
                      <p>{message}</p>
                      <DateView>{moment(new Date(notification.notification_date)).from(new Date())}</DateView>
                    </div>
                  </AvatarWrapper>
                  {notification.type === 'follower' && showFollowButton(notification.following) ? (
                    <Button variant="secondary" onClick={(e) => props.followUser(e, notification.following)}>
                      Follow
                    </Button>
                  ) : null}
                  {['sold', 'placeBid', 'settleAuction', 'collab', 'transfer', 'offerReceived', 'offerMade'].includes(
                    notification.type,
                  ) ? (
                    <NftImage src={`${notification.image_url}?h=100&auto=format,compress`} />
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
                </NoticationWrapper>
              </NextLinkFromReactRouter>
            )
          })
        ) : (
          <NoNewNotification>No new notifications</NoNewNotification>
        )}
      </NotificationBlock>
      <NextLinkFromReactRouter to="/notification">
        <ViewAll>
          <Text onClick={() => props.toggleNotification(false)}>View all notifications</Text>
        </ViewAll>
      </NextLinkFromReactRouter>
    </NotificationPopOverContent>
  )
}

const NotificationTitle = (props) => {
  return (
    <NotificationTitleWrapper>
      <NotificationTitleText>Notifications</NotificationTitleText>
      {props.showReadAll ? (
        <MarkAllAsReadText onClick={() => props.updateAllReadNotification()}>Mark all as read</MarkAllAsReadText>
      ) : null}
    </NotificationTitleWrapper>
  )
}

const Notification = () => {
  const dispatch = useDispatch()

  const { lastMessage, sendMessage, readyState } = useWebSocket()

  const { user } = useSelector((state: any) => state.auth)
  const { un_readnotifications } = useSelector((state: any) => state.profile)
  const { notificationCount } = useSelector((state: any) => state.profile)

  const { data: FollowingList = [], refetch: refetchFollowing } = useQuery(
    'followings-notifications-list',
    fetchFollowings,
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )

  const followUser = async (e, username) => {
    e.stopPropagation()
    e.preventDefault()
    await API.followUser(user.username, username, user.signature)
    refetchFollowing()
  }
  const [showNotification, toggleNotification] = useState(false)

  const getNotificationData = async () => {
    dispatch(getNotificationUnRead(user.username, user?.signature))
    dispatch(getNotificationCount(user.username, user?.signature))
  }

  useEffect(() => {
    if (lastMessage && !!Object.keys(lastMessage).length && lastMessage?.method === 'notification') {
      dispatch(setSingleNotification(lastMessage))
    }
  }, [lastMessage])

  useEffect(() => {
    getNotificationData()
  }, [])

  useEffect(() => {
    if (readyState === 1) {
      sendMessage({ method: 'login', username: user?.username })
    }
  }, [readyState])

  function fetchFollowings() {
    return API.getUserFollowings(user.username)
  }

  const updateReadNotification = async (id) => {
    await API.updateReadNotification(user.username, user?.signature, id)
    getNotificationData()
  }
  const updateAllReadNotification = async () => {
    await API.updateAllReadNotification(user.username, user?.signature)
    dispatch(markNotificationsAsRead())
    getNotificationData()
  }
  if (isMobile) {
    return null
  }
  return (
    <React.Fragment>
      <Popover
        content={
          <NotificationPopup
            allNotification={un_readnotifications}
            FollowingList={FollowingList}
            followUser={followUser}
            toggleNotification={toggleNotification}
            updateReadNotification={updateReadNotification}
          />
        }
        title={
          <NotificationTitle
            updateAllReadNotification={updateAllReadNotification}
            showReadAll={!!un_readnotifications.length}
          />
        }
        trigger="click"
        placement="bottomRight"
        visible={showNotification}
        onVisibleChange={(visible) => {
          toggleNotification(visible)
        }}
      >
        <IconWrapper onClick={() => toggleNotification(!showNotification)}>
          <NotificationIcon />
          {!!un_readnotifications.length && <NotificationCount />}
        </IconWrapper>
      </Popover>
    </React.Fragment>
  )
}

export default Notification
