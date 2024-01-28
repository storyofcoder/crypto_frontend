import React from "react";
import styled from "styled-components";
import ReadMoreAndLess from "react-read-more-less";

import { Box, Flex, Text } from "../../atoms/StyledSystem";
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  VerifiedIcon,
  WebsiteIcon
} from "../../../components/atoms/svg";
import { PencilOutlineIcon } from "../../../components/atoms/svg/images2";
import { isDefaultImage, makeFriendlyNumber, truncateUsername } from "../../../utils";
import { useDispatch } from "react-redux";
import { DISCORD, FACEBOOK, INSTAGRAM, TWITTER } from "../../../constant/socialMedia";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

import BoringAvatar from "../../atoms/Avatar/BoringAvatar";
import Button from "../../atoms/Button/Button";
import { ProfileAvatar } from "../../atomsV2/Image";

const ProfileDetailsLayout = ({
  details,
  stats,
  showEdit,
  editLink,
  renderSettings,
  renderSettingsSmall,
  type,
  renderSync,
}: any) => {
  const { name, bio, username, profileImage, coverImage, is_verified, socialmedia, referredBy, owner, walletAddress } = details
  const dispatch = useDispatch()
  const { facebook, instagram, twitter, discord, website } = socialmedia || {}

  // const handleImageLoaded = () => {
  //   if (!isMobile) {
  //     dispatch(updateProfileScroll(true))
  //     document.documentElement.scrollTop = 300
  //     setTimeout(() => {
  //       dispatch(updateProfileScroll(false))
  //     }, 1000)
  //   }
  // }
  //
  // useEffect(() => {
  //   handleImageLoaded()
  // }, [])

  return (
    <Wrapper>
      <CoverImageWrapper>
        <img
          src={`${coverImage}?h=500&auto=format,compress`}
          alt="cover image"
          className="cover-image"
          // onLoad={() => handleImageLoaded()}
        />
        <DetailsWrapper>
          <DetailsWrapper2>
            {showEdit && (
              <EditContainer>
                {renderSync && renderSync()}
                <NextLinkFromReactRouter to={editLink}>
                  <EditButton variant="primary">
                    {/*<img src={PencilOutlineIcon} />*/}
                    <Text fontSize={14} fontWeight={500} color="text">
                      Edit{' '}
                    </Text>
                  </EditButton>
                </NextLinkFromReactRouter>
              </EditContainer>
            )}
            <Details>
              <DetailsFlex
                // alignItems="center"
                flexDirection={['column', 'column', 'row']}
              >
                <ProfileImageWrapper>
                  <ProfileAvatar
                    width={88}
                    height={88}
                    src={`${profileImage}?h=200&auto=format,compress`}
                    walletAddress={""}
                  />
                  {/*{!isDefaultImage(profileImage) ? (*/}
                  {/*  <img  alt="profile image" />*/}
                  {/*) : (*/}
                  {/*  <BoringAvatar size={88} name={username} />*/}
                  {/*)}*/}
                </ProfileImageWrapper>
                <Box width={'100%'} pl={35} mt={60}>
                  <Flex>
                    <Box>
                      <Text fontSize="28px" fontWeight={800} lineHeight={1} mb={'5px'}>
                        {name} {is_verified && <VerifiedIcon />}
                      </Text>

                      {type === 'collection' ? (
                        <NextLinkFromReactRouter to={`/${owner?.username}`}>
                          <Text fontSize="16px" fontWeight={600} color="text" mb={10}>
                            <span
                              style={{
                                opacity: 0.6,
                                fontWeight: 500,
                                fontSize: '14px',
                              }}
                            >
                              Created by
                            </span>{' '}
                            @{truncateUsername(owner?.username)} {owner?.isVerified && <VerifiedIcon />}
                          </Text>
                        </NextLinkFromReactRouter>
                      ) : (
                        <Text fontSize="16px" fontWeight={500}>
                          @{truncateUsername(username)}
                        </Text>
                      )}
                    </Box>
                    <Box ml={'auto'}>
                      <Flex>
                        <StatsContainer marginLeft="auto" mr={[0, 30, 30]}>
                          {stats.map((s, i) => (
                            <Flex mr={i === stats.length - 1 && type === 'collection' ? 0 : 0} key={i}>
                              <StatsBoxHorizontal key={i} {...s} horizontal={type === 'profile'} />
                            </Flex>
                          ))}
                        </StatsContainer>

                        {renderSettings && renderSettings()}
                      </Flex>
                    </Box>
                  </Flex>
                  <Box mt={10}>
                    {/* <Text fontSize="18px" fontWeight={500}>
                  About
                </Text> */}
                    <ProfileBio
                      fontSize="14px"
                      // fontWeight={500}
                      // color="text6"
                      // mt={10}
                    >
                      <ReadMoreAndLess
                        className="read-more-content"
                        charLimit={200}
                        readMoreText="read more"
                        readLessText="read less"
                      >
                        {bio || ''}
                      </ReadMoreAndLess>
                    </ProfileBio>
                  </Box>
                  <Flex mt={18} justifyContent="space-between" alignItems="center">
                    <SocialMedia className="w-100">
                      {type === 'collection' ? (
                        <>
                          {website && (
                            <a href={`${website}`} target="_blank">
                              <WebsiteIcon /> Website
                            </a>
                          )}
                          {discord && (
                            <a href={`${DISCORD}${discord}`} target="_blank">
                              <DiscordIcon /> {discord}
                            </a>
                          )}
                        </>
                      ) : (
                        facebook && (
                          <a href={`${FACEBOOK}${facebook}`} target="_blank">
                            <FacebookIcon /> {facebook}
                          </a>
                        )
                      )}
                      {instagram && (
                        <a href={`${INSTAGRAM}${instagram}`} target="_blank">
                          {' '}
                          <InstagramIcon /> {instagram}
                        </a>
                      )}
                      {twitter && (
                        <a href={`${TWITTER}${twitter}`} target="_blank">
                          <TwitterIcon /> {twitter}
                        </a>
                      )}

                      {referredBy?.username && (
                        <NextLinkFromReactRouter to={`/${referredBy?.username}`} className="invited-by">
                          <Flex alignItems="center">
                            <Text fontSize="14px" color="textLight">
                              Invited by{' '}
                              <span style={{ fontWeight: 500 }}>@{truncateUsername(referredBy?.username)} </span>
                            </Text>
                            <Box ml={10}>
                              {!isDefaultImage(profileImage) ? (
                                <img
                                  src={`${referredBy?.profileImage}?h=100&auto=format,compress`}
                                  className="avatar__img"
                                  style={{ width: '30px', height: '30px' }}
                                  alt="profile"
                                />
                              ) : (
                                <BoringAvatar size={30} name={referredBy?.username} />
                              )}
                            </Box>
                          </Flex>
                        </NextLinkFromReactRouter>
                      )}
                    </SocialMedia>

                    {/* <Flex>
                  <StatsContainer marginLeft="auto">
                    {stats.map((s, i) => (
                      <Box mr={30} key={i}>
                        <StatsBoxHorizontal key={i} {...s} />
                      </Box>
                    ))}
                  </StatsContainer>

                  {renderSettings && renderSettings()}
                </Flex> */}
                  </Flex>
                </Box>
              </DetailsFlex>
            </Details>
          </DetailsWrapper2>
        </DetailsWrapper>

        <DetailsWrapperSmall>
          {showEdit && (
            <EditContainer>
              {renderSync && renderSync()}
              <NextLinkFromReactRouter to="/edit-profile">
                <EditButtonSmall variant="primary">
                  <PencilOutlineIcon />
                </EditButtonSmall>
              </NextLinkFromReactRouter>
            </EditContainer>
          )}
          <Flex justifyContent="center">
            <ProfileImageWrapper mt={-100}>
              {!isDefaultImage(profileImage) ? (
                <img src={`${profileImage}?h=200&auto=format,compress`} alt="profile image" />
              ) : (
                <BoringAvatar size={88} name={username} />
              )}
            </ProfileImageWrapper>
          </Flex>
          <Flex justifyContent="center">
            <Flex mt={12}>
              <ProfileTextWrapper>
                <Text fontSize={[20, 20, 28]} fontWeight={800} color="textLight">
                  {name} {is_verified && <VerifiedIcon />}
                </Text>

                {type === 'collection' ? (
                  <NextLinkFromReactRouter to={`/${owner?.username}`}>
                    <Text fontSize="14px" fontWeight={600} color="textLight" mb={10}>
                      <span
                        style={{
                          opacity: 0.6,
                          fontWeight: 500,
                          fontSize: '14px',
                        }}
                      >
                        Created by
                      </span>{' '}
                      @{truncateUsername(owner?.username)} {owner?.isVerified && <VerifiedIcon />}
                    </Text>
                  </NextLinkFromReactRouter>
                ) : (
                  <Text fontSize="14px" fontWeight={800} color="textLight" mb={10}>
                    @{truncateUsername(username)}
                  </Text>
                )}
              </ProfileTextWrapper>
            </Flex>
          </Flex>

          <Box mt={15}>
            {type === 'collection' ? (
              <CollectionStatsContainer color="textLight">
                {stats.map((s, i) => (
                  <Flex mr={30} key={i}>
                    <StatsBoxHorizontal key={i} {...s} horizontal={type === 'profile'} />
                  </Flex>
                ))}
              </CollectionStatsContainer>
            ) : (
              <StatsContainer color="textLight">
                {stats.map((s, i) => (
                  <StatsBoxHorizontal key={i} {...s} horizontal={type === 'profile'} />
                ))}
              </StatsContainer>
            )}
          </Box>
          <Box mt={15}>{renderSettingsSmall && renderSettingsSmall()}</Box>

          <Box mt={20}>
            {/* <Text fontSize="16px" fontWeight={700} color="textLight">
              Bio
            </Text> */}
            <ProfileBio fontSize="14px" fontWeight={500} color="text6" mt={10}>
              <ReadMoreAndLess
                className="read-more-content"
                charLimit={170}
                readMoreText="read more"
                readLessText="read less"
              >
                {bio || ''}
              </ReadMoreAndLess>
            </ProfileBio>
          </Box>

          <Flex>
            {(!!facebook || !!instagram || !!twitter || !!website || !!discord) && (
              <SocialMedia mt={20}>
                {type === 'collection' ? (
                  <>
                    {website && (
                      <a href={website} target="_blank">
                        {' '}
                        <WebsiteIcon />
                      </a>
                    )}
                    {discord && (
                      <a href={`${DISCORD}${discord}`} target="_blank">
                        {' '}
                        <DiscordIcon />
                      </a>
                    )}
                  </>
                ) : (
                  facebook && (
                    <a href={`${FACEBOOK}${facebook}`} target="_blank">
                      <FacebookIcon />
                    </a>
                  )
                )}
                {instagram && (
                  <a href={`${INSTAGRAM}${instagram}`} target="_blank">
                    {' '}
                    <InstagramIcon />
                  </a>
                )}
                {twitter && (
                  <a href={`${TWITTER}${twitter}`} target="_blank">
                    <TwitterIcon />
                  </a>
                )}
              </SocialMedia>
            )}
            <Box ml={'auto'} mt={20}>
              {' '}
              {referredBy?.username && (
                <NextLinkFromReactRouter to={`/${username}`}>
                  <Text fontSize="12px" fontWeight={800} color="textLight">
                    Invited by @{truncateUsername(referredBy?.username)}{' '}
                  </Text>
                </NextLinkFromReactRouter>
              )}
            </Box>
          </Flex>
        </DetailsWrapperSmall>
      </CoverImageWrapper>
    </Wrapper>
  )
}

const StatsBox = ({ title, value, unit, onClick }) => {
  return (
    <Flex flexDirection="column" alignItems="center" onClick={onClick} style={{ cursor: onClick ? 'pointer' : '' }}>
      <Text fontSize={[18, 18, 22]} fontWeight={800}>
        {value} {unit && unit}
      </Text>
      <Text fontSize="16px" fontWeight={600}>
        {title}
      </Text>
    </Flex>
  )
}
const StatsBoxHorizontal = ({ title, value, unit, onClick, friendly = true, horizontal }) => {
  return (
    <Flex
      alignItems="center"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : '' }}
      title={value}
      flexDirection={horizontal ? ['row'] : ['row', 'row', 'column']}
    >
      <Text fontSize={[18]} fontWeight={800} lineHeight={1}>
        {friendly ? makeFriendlyNumber(value) : value} {unit && unit}
      </Text>
      <Text fontSize={[14, 16, 16]} fontWeight={400} ml={'5px'}>
        {title}
      </Text>
    </Flex>
  )
}

const Wrapper = styled(Box)`
  // overflow: hidden;
  ${(p) => p.theme.media.lg} {
    border-radius: 22px;
  }
`
const ProfileTextWrapper = styled(Box)`
  div {
    ${(p) => p.theme.media.md} {
      text-align: center;
      }
    }
    ${(p) => p.theme.media.sm} {
      text-align: center;
    }
    ${(p) => p.theme.media.xs} {
        text-align: center;
    }
  }
`

const CoverImageWrapper = styled(Box)`
  //height: 400px;
  position: relative;

  .cover-image {
    width: 100%;
    height: 100%;
    min-width: 100%;
    max-height: 250px;
    min-height: 250px;
    object-fit: cover;

    z-index: 1;
    position: inherit;
    transition: all 1s;

    // position: absolute;
    bottom: 0;
    margin: 0 auto;
    background: rgba(128, 128, 128, 0.2);
    ${(p) => p.theme.media.xs} {
      max-height: 136px;
    }
  }
  // .cover-image:hover{
  //   max-height: 450px;
  // }
`
const DetailsWrapper = styled(Box)`
  display: none;
  position: relative;
  margin-top: -24px;
  // padding-top: 25px;
  z-index: 1;
  ${(p) => p.theme.media.lg} {
    display: flex;
  }
`

const DetailsWrapper2 = styled(Box)`
  // max-width: 1400px;
  display: flex;
  margin: 0 auto;
  position: relative;
  width: 100%;
`
const DetailsWrapperSmall = styled(Box)`
  display: block;
  // padding: 0px 0px 20px 0px;
  margin-top: -4px;
  position: relative;
  z-index: 1;
  padding-bottom: 30px;
  border-bottom: 1px solid #c0c0c0;
  ${(p) => p.theme.media.lg} {
    display: none;
    padding-bottom: 0;
    border-bottom: none;
  }
  ${(p) => p.theme.media.xs} {
    margin-top: -15px;
  }
`
const Details = styled(Box)`
  padding: 0 70px;
  position: relative;
  color: ${(p) => p.theme.colors.textLight};
  // margin: auto auto 0 auto;
  width: 100%;
`
const DetailsFlex = styled(Flex)`
  padding-bottom: 40px;
  border-bottom: 1px solid #c0c0c0;
`
const EditContainer = styled(Box)`
  position: absolute;
  top: -40px;
  right: 2%;
  z-index: 1;
  display: flex;

  ${(p) => p.theme.media.xs} {
    right: 20px;
    top: -115px;
    flex-direction: column;
    align-items: center;
  }
  ${(p) => p.theme.media.lg} {
    right: 2%;
  }
`
const EditButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  padding: 4px 8px;
  img {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
`
const EditButtonSmall = styled.div`
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.bg2};
  padding: 2px;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  img {
    width: 20px;
    height: 20px;
  }
`

const ProfileImageWrapper = styled(Box)`
  width: 230px;
  min-width: 230px !important;
  height: 230px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${(p) => p.theme.colors.bg2};
  transform: scale(1);
  background: rgba(128, 128, 128, 0.2);

  ${(p) => p.theme.media.xs} {
    width: 110px;
    height: 110px;
    min-width: 110px !important;
    margin-top: -35px;
    display: inline-block;
    border: 4px solid ${(p) => p.theme.colors.bg2};
  }

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const StatsContainer = styled(Flex)`
  // align-items: center;
  justify-content: center;
  grid-gap: 15px;

  ${(p) => p.theme.media.lg} {
    justify-content: end;
    grid-gap: 15px;
  }

  // align-items: center;
  // justify-content: space-around;
  ${(p) => p.theme.media.md} {
    grid-gap: 30px;
  }
  ${(p) => p.theme.media.xs} {
    grid-gap: 15px;
    // flex-direction: column;
    display: flex;
  }
  ${(p) => p.theme.media.xxs} {
    // flex-direction: column;
    display: flex;
  }
`

const CollectionStatsContainer = styled(Flex)`
  // align-items: center;
  justify-content: center;
  grid-gap: 15px;

  ${(p) => p.theme.media.lg} {
    justify-content: end;
    grid-gap: 15px;
  }

  // align-items: center;
  // justify-content: space-around;
  ${(p) => p.theme.media.md} {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    div {
      justify-content: center;
    }
  }
  ${(p) => p.theme.media.sm} {
    grid-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    div {
      justify-content: center;
    }
  }
  ${(p) => p.theme.media.xs} {
    grid-gap: 15px;
    grid-template-columns: repeat(1, 1fr);
    display: grid;
    div {
      justify-content: center;
    }
  }
  ${(p) => p.theme.media.xxs} {
    grid-template-columns: repeat(1, 1fr);
    display: grid;
    div {
      justify-content: center;
    }
  }
`

const ProfileBio = styled(Text)`
  white-space: pre-line;
  word-break: break-word;

  .readMoreText {
    color: ${(p) => p.theme.colors.textLight} !important;
    font-weight: 500;
    margin-left: 5px;
  }
`
const SocialMedia = styled(Flex)`
  align-items: center;
  a {
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: ${(p) => p.theme.colors.text} !important;
    opacity: 0.8;
    display: flex;
    align-items: center;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }

  svg {
    margin-right: 5px;
    path {
      fill: ${(p) => p.theme.colors.text} !important;
      opacity: 0.8;
    }
  }

  .class1 {
  }
  .invited-by {
    margin-left: auto !important;
  }
`

export default ProfileDetailsLayout
