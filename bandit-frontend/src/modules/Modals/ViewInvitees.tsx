import React from "react";
import { flatten, map, startCase } from "lodash";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import API from "../../services/API";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import { isDefaultImage, truncateUsername } from "../../utils";
import BoringAvatar from "../../components/atoms/Avatar/BoringAvatar";
import { BackIcon, VerifiedIcon } from "../../components/atoms/svg";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import Loader from "../../components/atoms/Loader/Loader";
import { followUser, unfollowUser } from "../../state/Profile/actions";
import { isMobile } from "react-device-detect";
import { MODAL, showModal } from "../Modals";

const ViewInvitiees = (props) => {
  return <InvitiesList {...props} />
}

const InvitiesList = ({ isCreator }) => {
  const { user } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  const { isLoading, data, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'invities-details',
    fetchInvitiesDetails,
    {
      retry: false,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => pages.length,
    },
  )

  function fetchInvitiesDetails({ pageParam = 0 }) {
    const offset = pageParam * 9
    let apiAction = isCreator ? 'getCreatorReferredUsers' : 'getCollectorReferredUsers'
    return API[apiAction](user?.username, user?.signature, offset, 9)
  }

  function handleFollow(isInvities, username) {
    if (isInvities) {
      dispatch(unfollowUser(username, user))
    } else {
      dispatch(followUser(username, user))
    }
  }

  const followingsDetailList = flatten(map(data?.pages))

  const openModel = () => {
    showModal(MODAL.INVITE_USER, {
      defaultTab: isCreator ? 'Creator' : 'Collector',
    })
  }

  return (
    <>
      <Text role="button" onClick={openModel}>
        <BackIcon />
      </Text>
      <Box id="scrollableInvities" height={300} overflow="auto" mt={20}>
        <InfiniteScroll
          dataLength={followingsDetailList.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={null}
          scrollableTarget="scrollableInvities"
        >
          {!isLoading &&
            followingsDetailList.map((props) => (
              <UserItem
                key={props.username}
                {...props}
                hideButton={props.username === user.username}
                handleFollow={handleFollow}
              />
            ))}
        </InfiniteScroll>
        {!isLoading && !followingsDetailList.length && (
          <Flex justifyContent="center" alignItems="center" height="100%">
            {'User has no Invitees'}
          </Flex>
        )}
        {isLoading && <Loader />}
      </Box>
    </>
  )
}

const UserItem = ({ profileImage, username, is_verified, name }) => {
  return (
    <Flex paddingX={isMobile ? 0 : 20} paddingY={15}>
      <UserLink href={`/${username}`} target="_blank">
        {!isDefaultImage(profileImage) ? (
          <img src={`${profileImage}?h=100&auto=format,compress`} className="avatar__img" alt="profile" />
        ) : (
          <BoringAvatar size={40} name={username} />
        )}
        <Box ml={10} maxWidth={'auto'}>
          <TruncateText fontFamily="roc-grotesk" color="textTertiary" fontWeight={600} fontSize={18} lineHeight="100%">
            {startCase(name)} {is_verified && <VerifiedIcon />}
          </TruncateText>
          <TruncateText color="textTertiary">@{truncateUsername(username)}</TruncateText>
        </Box>
      </UserLink>
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
`

export default ViewInvitiees
