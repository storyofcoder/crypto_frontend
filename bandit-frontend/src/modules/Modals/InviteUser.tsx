import React, { useState } from "react";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import SearchUser from "../../components/molecules/SearchUser/SearchUser";
import API from "../../services/API";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "../../components/atoms/Tabs/Tabs";
import { isDefaultImage, truncateUsername } from "../../utils";
import BoringAvatar from "../../components/atoms/Avatar/BoringAvatar";
import Button from "../../components/atoms/Button/Button";
import styled from "styled-components";
import Loader from "../../components/atoms/Loader/Loader";
import { notify } from "../../components/atoms/Notification/Notify";
import { refreshUser } from "../../state/Auth/actions";
import CustomInput from "../../components/atoms/Form/CustomInput";
import { MODAL, showModal } from "../Modals";
import { CrossIcon, ErrorIcon, FacebookIcon, TwitterIcon, WhatsAppIcon } from "../../components/atoms/svg";

const SOCIAL_SHARE_TEMPLATE =
  "Hello, I'd like to invite you to join the Bandit NFT platform, where you can discover some of the finest NFTs and collections from some of the best creators and collect the future. Check it out! "

const TabWrapper = styled(Box)`
  .tabs__tab-active {
    border: 1px solid #11110f;
  }

  .active-link {
    font-weight: 800;
    color: ${(p) => p.theme.colors.text};

    &:hover {
      text-decoration: underline !important;
    }
  }
`

const SelectWrapper = styled(Box)`
  width: 100%;

  .ant-select {
    width: 100%;
    .ant-select-selector {
      height: 53px !important;
      input {
        height: 100% !important;
      }
    }
  }
`

const ProfileStats = ({ close, defaultTab = 'Collector', isPrivate }: any) => {
  const user = useSelector((state: any) => state.auth.user)
  let tabList = []

  tabList.push(
    <Tab label={'Collector'} tabName={`Collector`}>
      <Collector close={close} />
    </Tab>,
  )

  if (user?.is_mintable || user?.is_verified) {
    tabList.push(
      <Tab label={'Creator'} tabName={`Creator`}>
        <Creator close={close} />
      </Tab>,
    )
  }
  return (
    <TabWrapper mt={'6px'}>
      <Tabs defaultTab={defaultTab}>{tabList}</Tabs>
    </TabWrapper>
  )
}

const Collector = ({ close }) => {
  const user = useSelector((state: any) => state.auth.user)
  const referrel_code = window.location.origin + `/invite/bandit-${user?.username}`

  const copyLink = () => {
    const el = document.createElement('textarea')
    el.value = referrel_code
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    notify.success('Link copied', '')
  }

  const shareOnWhatsapp = () => {
    var url = `https://web.whatsapp.com/send?text=${SOCIAL_SHARE_TEMPLATE} ${window.location.origin}/invite/bandit-${user?.username}`
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  }

  const shareOnTwitter = () => {
    var url = `https://twitter.com/intent/tweet?text=${SOCIAL_SHARE_TEMPLATE} ${window.location.origin}/invite/bandit-${user?.username}`
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  }

  const shareOnFacebook = () => {
    var url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/invite/bandit-${user?.username}&quote=${SOCIAL_SHARE_TEMPLATE}`
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    return false
  }

  const openModel = () => {
    showModal(MODAL.VIEW_INVITEES, { isCreator: false })
  }

  return (
    <Flex flexDirection="column" backgroundColor="bg2" mt={20} overflow="auto" width="100%">
      <Flex className={'w-100'} position="relative">
        <InputBoxContainer>
          <CustomInput
            type="text"
            label="Invite Collector and Earn 20% of the platform fee"
            placeholder="Collection description"
            name="referral"
            value={referrel_code}
          />
        </InputBoxContainer>
        <Box style={{ marginLeft: '16px' }} mb={10} alignSelf="end">
          <StyledButton variant="primaryLight" onClick={copyLink}>
            Copy
          </StyledButton>
        </Box>
      </Flex>

      <SocialIconsContainer ml={10}>
        <Box role="button" onClick={shareOnFacebook}>
          <FacebookIcon />
        </Box>
        <Box role="button" onClick={shareOnWhatsapp}>
          <WhatsAppIcon />
        </Box>
        <Box role="button" onClick={shareOnTwitter}>
          <TwitterIcon />
        </Box>
      </SocialIconsContainer>
      <Flex textAlign="left" mt={20} mb={10} ml={10} justifyContent="space-between" flexWrap="wrap">
        <TextDecoretor role="button" fontSize={14} fontWeight={400} onClick={openModel}>
          View Invitees
        </TextDecoretor>

        <Text fontWeight={500}>(Your code: bandit-{truncateUsername(user?.username)})</Text>
      </Flex>
    </Flex>
  )
}

const Creator = ({ close }) => {
  const user = useSelector((state: any) => state.auth.user)

  const [selectedUser, setSelectedUser] = useState<any>([])
  const [isConfirmed, setisConfirmed] = useState(false)
  const [loading, setLoading] = useState<any>(false)

  const dispatch = useDispatch()

  function onUserSelect(user) {
    const hasEntry = selectedUser.find((u) => u.username === user.username)
    if (!hasEntry) {
      setSelectedUser([...selectedUser, user])
    }
  }

  function filterSearchUserList(list) {
    return list.filter((u) => u.username !== user?.username && !u.is_mintable)
  }

  function removeFromList(username) {
    setSelectedUser([...selectedUser.filter((u) => u.username !== username)])
  }

  async function handleSave() {
    setLoading(true)
    setisConfirmed(false)
    try {
      const invites = selectedUser.map((u) => u.username)
      const res = await API.sendReferralInvite(user?.username, user?.signature, invites)
      dispatch(refreshUser())
      setLoading(false)
      notify.success('Successfully invited', '')
      close()
    } catch (e) {
      setLoading(false)
      console.log(e)
      notify.error('Failed to invite', e?.response?.data?.data)
    }
  }

  const openModel = () => {
    showModal(MODAL.VIEW_INVITEES, { isCreator: true })
  }

  const handleSend = () => {
    if (selectedUser?.length) setisConfirmed(true)
  }

  const disbled = selectedUser.length > 5 || user?.referralLimit - selectedUser.length <= 0

  return (
    <Flex flexDirection="column" backgroundColor="bg2" mt={10} overflow="auto" width="100%">
      {isConfirmed ? (
        <>
          <Text textAlign="center">
            <ErrorIcon />
          </Text>
          <Text textAlign="center" fontSize="24px" fontWeight="500">
            ACCOUNT SUSPENSION
          </Text>
          <Text textAlign="center" fontSize="19" fontWeight="500" mb={20}>
            To maintain the sanctity of the marketplace, please share the invite responsibly with authentic creators.
            Any violation of{' '}
            <a href="/community-guidelines" target="_blank" className="active-link">
              community guidelines
            </a>{' '}
            by the invited creator will result in the suspension of your account, and if you hold a verified badge,
            it'll be revoked.
          </Text>
          <Flex justifyContent="end">
            <StyledButton
              variant="secondary"
              onClick={() => setisConfirmed(false)}
              width={120}
              disabled={!selectedUser}
            >
              Cancel
            </StyledButton>
            <StyledButton
              ml={20}
              width={120}
              variant="solid"
              onClick={handleSave}
              disabled={!selectedUser}
              fontSize={18}
            >
              I Understand
            </StyledButton>
          </Flex>
        </>
      ) : !loading ? (
        <>
          <Flex className={'w-100'} mt={10} position="relative">
            <InputBoxContainer>
              <Text fontSize="14px" alignItems="left" fontWeight="500" mb={10} ml={10}>
                Invite Creator
              </Text>
              <SelectWrapper>
                <SearchUser onSelect={onUserSelect} filterList={filterSearchUserList} disabled={disbled} />
              </SelectWrapper>
            </InputBoxContainer>
            <Box style={{ marginLeft: '16px' }} mb={'6px'} alignSelf="end">
              <StyledButton variant="primaryLight" onClick={handleSend} minWidth={100} disabled={!selectedUser}>
                Send
              </StyledButton>
            </Box>
          </Flex>
          <Text fontSize="14px" ml={10}>
            Remaining Invites: {user?.referralLimit - selectedUser.length}
          </Text>
          <Box width={'100%'} maxHeight={300} overflow="auto" mt={2}>
            {selectedUser.map((u) => (
              <SelectedUser key={u.username} user={u} removeUser={removeFromList} />
            ))}
          </Box>
          <Box textAlign="left" mt={20} mb={10} ml={10}>
            <TextDecoretor role="button" fontSize={14} fontWeight={400} onClick={openModel}>
              View Invitees
            </TextDecoretor>
          </Box>
        </>
      ) : (
        <Box mt={10}>
          <Loader />
          <Text textAlign="center" fontSize="20px" fontWeight="600">
            Inviting Creator
          </Text>
          <Text textAlign="center" fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </Box>
      )}
    </Flex>
  )
}

const SelectedUser = ({ user, removeUser }) => {
  return (
    <SelectedUserContainer>
      <Box className="profile-image">
        {!isDefaultImage(user.profileImage) ? (
          <img src={user.profileImage} alt="profile" />
        ) : (
          <BoringAvatar size={30} name={user.username} />
        )}
      </Box>
      <div className="username">{truncateUsername(user.username)}</div>
      <div className="cancel">
        <span onClick={() => removeUser(user.username)}>
          <CrossIcon />
        </span>
      </div>
    </SelectedUserContainer>
  )
}

const StyledButton = styled(Button)`
  // background: #11110f;
  // border-radius: 26.5px;
  // font-size: 16px;
  // line-height: 19px;
  // color: #ffffff;
  height: 53px;
  min-width: 90px;
  font-size: 14px;
`

const InputBoxContainer = styled(Box)`
  width: calc(100% - 105px);
`
const SelectedUserContainer = styled(Flex)`
  align-items: center;
  margin: 20px 0;
  width: 100%;

  .profile-image {
    width: 42px;
    height: 42px;
    overflow: hidden;

    img,
    svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .username {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }
  .cancel {
    margin-left: auto;
    cursor: pointer;
    width: 12px;
    height: 12px;
    display: flex;

    svg {
      height: 100%;
      width: 100%;
    }
  }
`

const TextDecoretor = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`

const SocialIconsContainer = styled(Flex)`
  grid-gap: 15px;

  svg {
    path {
      fill: rgba(0, 0, 0, 0.85);
    }
  }
`

export default ProfileStats
