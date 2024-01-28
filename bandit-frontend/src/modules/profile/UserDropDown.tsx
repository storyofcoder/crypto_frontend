import React, { useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { Button } from '../../components/atomsV2/Button'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../state/Auth/actions'
import { clearAuthLocalStorage, truncateAddress } from '../../utils'
import { MODAL, showModal } from '../Modals'
import DropDown from '../../components/atoms/Dropdown/Dropdown'
import useAuth from '../../hooks/useAuth'
import useWalletModal from '../../hooks/useWalletModal'
import { useWeb3React } from '@web3-react/core'
import { Mixpanel, MixpanelEvents } from '../../analytics/Mixpanel'
import { useRouter } from 'next/router'
import ProfileAvatar from '../../components/atomsV2/Image/ProfileAvatar'
import { getEnvSupportedChainIds, isChainAllowed } from '../../utils/switchChain'
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints'
import Loader from '../../components/atomsV2/Loader'

const UserProfileSmall = styled.div`
  display: flex;
  padding: 0;
  align-items: center;
  cursor: pointer;
`

const UserProfile = styled.div`
  display: flex;
  border: 1px solid ${(p) => p.theme.colors.grey400};
  border-radius: 12px;
  padding: 5px 10px;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0 10px 0 0;
    font-weight: 600;
    font-size: 14px;
    color: ${(p) => p.theme.colors.text};
    line-height: 100%;
    white-space: nowrap;
  }
  span {
    margin-left: auto;
  }
`

const ConnectButton = styled(Button)``

const UserDropDown = () => {
  const [open, setOpen] = useState(false)
  const [formUrl, setFormUrl] = useState(null)
  const { isLoggedIn, user, isLoggingIn } = useSelector((state: any) => state.auth)
  const { onPresentConnectModal } = useWalletModal()
  const { account, error, chainId, connector } = useWeb3React()
  const { logout } = useAuth()

  const history = useRouter()
  const dispatch = useDispatch()

  const { isDesktop, isTablet } = useMatchBreakpoints()

  const chainIds = getEnvSupportedChainIds()

  // useEffect(() => {
  //   if (!account && isLoggedIn) {
  //     Mixpanel.track(MixpanelEvents.LOG_OUT_USER, {});
  //     disconnect();
  //   }
  // }, [account]);

  function closeDropdown() {
    setOpen(false)
  }

  function disconnect() {
    logout()
    dispatch(logoutUser())
    // localStorage.removeItem("user");
    clearAuthLocalStorage()
  }

  function onClickConnectWallet() {
    clearAuthLocalStorage()
    onPresentConnectModal()
  }

  const wrongNetwork = chainId && !isChainAllowed(connector, chainId)

  return (
    <OutsideClickHandler onOutsideClick={closeDropdown}>
      {isLoggedIn ? (
        <DropDown
          optionList={[
            // {
            //   title: `Profile (${truncateAddress(user.walletAddress, 5)})`,
            //   onClick: () => goTo(`/${user.username}`),
            // },
            // ...(user?.is_mintable
            //   ? [
            //       { title: 'Create NFT', onClick: onButtonClick },
            //       { title: 'Create collection', onClick: gotoCreateCollection },
            //     ]
            //   : []),
            // ...(!user?.is_mintable ? [{ title: 'Become a creator', onClick: onButtonClick }] : []),
            // { title: 'Buy crypto with fiat', onClick: depositCrypto },
            { title: 'Disconnect', onClick: disconnect },
          ]}
          customButton={() => (
            <div>
              {isDesktop || isTablet ? (
                <UserProfile onClick={() => setOpen(!open)}>
                  <p>
                    {wrongNetwork
                      ? 'Wrong Network'
                      : ethers.utils.isAddress(user.username)
                      ? truncateAddress(user.username, 5)
                      : user.username}
                  </p>
                  <ProfileAvatar
                    src={user.profileImage ? `${user.profileImage}?h=100&auto=format,compress` : null}
                    walletAddress={user.walletAddress}
                    width={32}
                    height={32}
                  />
                </UserProfile>
              ) : (
                <UserProfileSmall>
                  <ProfileAvatar
                    src={user.profileImage ? `${user.profileImage}?h=100&auto=format,compress` : null}
                    walletAddress={user.walletAddress}
                    width={32}
                    height={32}
                  />
                </UserProfileSmall>
              )}
            </div>
          )}
        />
      ) : (
        <ConnectButton variant="primary" scale={'sm'} onClick={onClickConnectWallet}>
          Connect Wallet
        </ConnectButton>
      )}
    </OutsideClickHandler>
  )
}

export default UserDropDown
