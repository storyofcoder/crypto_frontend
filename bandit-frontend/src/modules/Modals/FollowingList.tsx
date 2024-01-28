import React, { useEffect, useState } from "react";
import { flatten, map, startCase } from "lodash";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import API from "../../services/API";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import { Tab, Tabs } from "../../components/atoms/Tabs/Tabs";
import { isDefaultImage, truncateUsername } from "../../utils";
import BoringAvatar from "../../components/atoms/Avatar/BoringAvatar";
import { VerifiedIcon } from "../../components/atoms/svg";
import Button from "../../components/atoms/Button/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import Loader from "../../components/atoms/Loader/Loader";
import { followUser, unfollowUser } from "../../state/Profile/actions";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";

const ProfileStats = ({ close, defaultTab, isPrivate }: any) => {
  return (
    <Box>
      <Tabs defaultTab={defaultTab}>
        <Tab label={'Followers'} tabName={`Followers`}>
          <FollowersList isPrivate={isPrivate} />
        </Tab>
        <Tab label={'Followings'} tabName={`Followings`}>
          <FollowingList isPrivate={isPrivate} />
        </Tab>
      </Tabs>
    </Box>
  )
}

const FollowingList = ({ isPrivate }) => {
  const { user } = useSelector((state: any) => state.auth)
  const followings = useSelector((state: any) => state.profile.followings)

  const dispatch = useDispatch()
  const router = useRouter()
  const { query } = router

  const { isLoading, data, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'following-details',
    fetchFollowingDetails,
    {
      retry: false,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => pages.length,
    },
  )
  const { username } = query

  function fetchFollowingDetails({ pageParam = 0 }) {
    const offset = pageParam * 9
    return API.getUserFollowingsDetails(username, offset, 9)
  }

  function handleFollow(isFollowing, username) {
    if (isFollowing) {
      dispatch(unfollowUser(username, user))
    } else {
      dispatch(followUser(username, user))
    }
  }

  const followingsDetailList = flatten(map(data?.pages))

  return (
    <Box id="scrollableFollowing" height={500} minHeight={400} overflow="auto" mt={20}>
      <InfiniteScroll
        dataLength={followingsDetailList.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
        scrollableTarget="scrollableFollowing"
      >
        {!isLoading &&
          followingsDetailList.map((props) => (
            <UserItem
              key={props.username}
              {...props}
              following={followings.includes(props.username)}
              hideButton={props.username === user.username}
              handleFollow={handleFollow}
            />
          ))}
      </InfiniteScroll>
      {!isLoading && !followingsDetailList.length && (
        <Flex justifyContent="center" alignItems="center" height="100%">
          {isPrivate ? 'You are not following anyone yet' : 'User is not following anyone yet'}
        </Flex>
      )}
      {isLoading && <Loader />}
    </Box>
  )
}

const FollowersList = ({ isPrivate }) => {
  const { user } = useSelector((state: any) => state.auth)

  const followings = useSelector((state: any) => state.profile.followings)

  const dispatch = useDispatch()
  const router = useRouter()
  const { query } = router

  const { isLoading, data, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'followers-details',
    fetchFollowersDetails,
    {
      retry: false,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => pages.length,
    },
  )

  const { username } = query

  function fetchFollowersDetails({ pageParam = 0 }) {
    const offset = pageParam * 9
    return API.getUserFollowersDetails(username, offset, 9)
  }

  function handleFollow(isFollowing, username) {
    if (isFollowing) {
      dispatch(unfollowUser(username, user))
    } else {
      dispatch(followUser(username, user))
    }
  }

  const followersDetailList = flatten(map(data?.pages))

  return (
    <Box id="scrollableFollowers" height={500} minHeight={400} overflow="auto" mt={20}>
      <InfiniteScroll
        dataLength={followersDetailList.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
        scrollableTarget="scrollableFollowers"
      >
        {!isLoading &&
          followersDetailList.map((props) => (
            <UserItem
              key={props.username}
              {...props}
              following={followings.includes(props.username)}
              handleFollow={handleFollow}
              hideButton={props.username === user.username}
            />
          ))}
      </InfiniteScroll>
      {!isLoading && !followersDetailList.length && (
        <Flex justifyContent="center" alignItems="center" height="100%">
          {isPrivate ? "You don't have any followers yet" : 'User has no followers'}
        </Flex>
      )}
      {isLoading && <Loader />}
    </Box>
  )
}

const UserItem = ({ profileImage, username, is_verified, name, following, handleFollow, hideButton }) => {
  const [buttonCaption, setButtonCaption] = useState('Follow')

  useEffect(() => {
    if (following) {
      setButtonCaption('Following')
    } else {
      setButtonCaption('Follow')
    }
  }, [following])

  function onMouseHover() {
    setButtonCaption('Unfollow')
  }
  function onMouseOut() {
    setButtonCaption('Following')
  }

  function onButtonClick(e) {
    e.preventDefault()
    if (handleFollow) handleFollow(following, username)
  }

  return (
    <Flex paddingX={isMobile ? 0 : 20} paddingY={15} overflow={'hidden'}>
      <UserLink href={`/${username}`} target="_blank">
        {!isDefaultImage(profileImage) ? (
          <img src={`${profileImage}?h=100&auto=format,compress`} className="avatar__img" alt="profile" />
        ) : (
          <BoringAvatar size={40} name={username} />
        )}
        <Box ml={10} maxWidth={isMobile ? '100%' : 'auto'}>
          <TruncateText fontFamily="roc-grotesk" color="textTertiary" fontWeight={600} fontSize={18} lineHeight="100%">
            {startCase(name)} {is_verified && <VerifiedIcon />}
          </TruncateText>
          <TruncateText color="textTertiary">@{truncateUsername(username)}</TruncateText>
        </Box>
      </UserLink>
      <Box ml="auto" minWidth={120}>
        {!hideButton && (
          <Button
            variant="secondary"
            minWidth={120}
            {...(following && {
              onMouseEnter: onMouseHover,
              onMouseLeave: onMouseOut,
            })}
            onClick={onButtonClick}
          >
            {buttonCaption}
          </Button>
        )}
      </Box>
    </Flex>
  )
}

const UserLink = styled.a`
  display: flex;
`

const TruncateText = styled(Text)`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  max-width: 220px;
`

export default ProfileStats
