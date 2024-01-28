import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import { signMessage } from '../../../utils/web3react'
import { Box, Text } from '../../../components/atoms/StyledSystem'
import useAuth from '../../../hooks/useAuth'
import useWeb3Provider from '../../../hooks/useActiveWeb3React'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setRedirectCallback, setSelectedWallet, setWalletModal, signIn } from '../../../state/Auth/actions'
import { CONNECTOR_ID, CONNECTOR_TITLE } from '../../../utils/storagekeys'
import WalletCard from './WalletCard'
import { IS_DAPP } from '../../../utils/wallet'
import CustomModal from '../../../components/atoms/Modal/Modal'
import useWalletModal from '../../../hooks/useWalletModal'
import { useRouter } from 'next/router'
import usePreviousValue from '../../../hooks/usePreviousValue'
import { Button } from '../../../components/atomsV2/Button'
import { NextLinkFromReactRouter } from '../../../components/atoms/NextLink'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { SUPPORTED_WALLETS } from 'constant/wallet'
import { getWalletForConnector, injected } from 'connectors'
import Metamask from 'components/atoms/svg/wallets/Metamask'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { clearAuthLocalStorage } from 'utils'

const Wrapper = styled.div``

const ConnectWalletModal = ({}) => {
  const user = useSelector((state: any) => state.auth.user)
  const [connecting, setConnecting] = useState(false)
  const [signing, setSigning] = useState(false)
  const [requireSignature, setRequireSignature] = useState(false)
  const [wrongNetwork, setWrongNetwork] = useState(false)
  const [title, WalletTitle] = useState('')
  const [signingError, setSigningError] = useState(false)
  const [referral, setReferral] = useState('')
  const dispatch = useDispatch()
  const { login, logout } = useAuth()
  const { account } = useWeb3React()
  const { account: account1 } = useActiveWeb3React()
  const { library } = useWeb3Provider()
  const { onPresentConnectModal } = useWalletModal()
  // TODO find new logic to handle invite code
  // const data = new URL(window.location.href);
  const data = { pathname: '' }
  const router = useRouter()
  const { open, ...restWalletModalProps } = useSelector((state: any) => state.auth.walletModal)

  const previousAccount = usePreviousValue(account)

  useEffect(() => {
    async function signInToAccount(account) {
      await dispatch(logoutUser())
      await dispatch(signIn(account))
      close()
    }

    async function logout() {
      await dispatch(logoutUser())
    }

    if (account && account !== previousAccount) {
      signInToAccount(account)
      // onPresentConnectModal({ ...restWalletModalProps })
      // setRequireSignature(true)
    } else if (account === undefined && account !== previousAccount) {
      logout()
    }
  }, [account])

  useEffect(() => {
    const selectedWallet = localStorage.getItem(CONNECTOR_ID)
    dispatch(setSelectedWallet(selectedWallet))
  }, [])

  async function handleWalletSelect(connector, title) {
    try {
      const connectorId = getWalletForConnector(connector)
      // clearAuthLocalStorage()
      // dispatch(setSelectedWallet(connectorId))
      // localStorage.setItem(CONNECTOR_ID, connectorId)
      // WalletTitle(title)
      await login(connectorId)

      // Mixpanel.track(MixpanelEvents.WALLET, { account, selectedWallet: connectorId })
    } catch (e) {
      close()
      console.log(e)
    }
  }

  function close() {
    // setSigning(false)
    // setSigningError(false)
    dispatch(setRedirectCallback(null))
    dispatch(setWalletModal(false, {}))
  }

  let view = <WalletList handleWalletSelect={handleWalletSelect} />

  // if (requireSignature) view = <RequireSignature requireSignature={askForSignature} close={close} signing={signing} />

  return (
    <CustomModal onCancel={close} visible={open} footer={null} width={400}>
      <Wrapper>
        {/*{!signing && signingError && (*/}
        {/*  <Box mt={20}>*/}
        {/*    <Text fontSize={[16, 22, 28]} fontWeight={600} lineHeight={'120%'}>*/}
        {/*      You can't continue without signing the message*/}
        {/*    </Text>*/}
        {/*    <Flex alignItems="center" mt={20} justifyContent="flex-end">*/}
        {/*      <Button variant="primary" onClick={close} mr={20}>*/}
        {/*        Cancel*/}
        {/*      </Button>*/}
        {/*      <Button variant="primary" onClick={retrySigning}>*/}
        {/*        Try again*/}
        {/*      </Button>*/}
        {/*    </Flex>*/}
        {/*  </Box>*/}
        {/*)}*/}
        {view}
      </Wrapper>
    </CustomModal>
  )
}

const WalletList = ({ handleWalletSelect }) => {
  const { connector, account } = useWeb3React()

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetaMask = !!window.ethereum?.isMetaMask
    const isCoinbaseWallet = !!window.ethereum?.isCoinbaseWallet
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]

      const optionProps = {
        isActive: option.connector === connector,
        id: `connect-${key}`,
        link: option.href,
        header: option.name,
        color: option.color,
        key,
        icon: option.icon,
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <WalletCard
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={<Text>Install MetaMask</Text>}
                link={'https://metamask.io/'}
                icon={Metamask}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetaMask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetaMask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <WalletCard
            {...optionProps}
            onClick={() => {
              option.connector !== connector && !option.href && option.connector && handleWalletSelect(option.connector)
            }}
          />
        )
      )
    })
  }
  return (
    <>
      <Text fontSize={24} fontWeight={600} textAlign="center" mb={'5px'}>
        Choose your wallet
      </Text>
      <Box mb={20}>
        <Text fontSize={12} textAlign="center">
          By connecting your wallet, you agree to our <br />
          <Button
            variant="link"
            scale="xs"
            as={NextLinkFromReactRouter}
            target="_blank"
            to="https://bandit.network/legal/termsOfUse.pdf"
          >
            Terms of Use
          </Button>{' '}
          and{' '}
          <Button
            variant="link"
            scale="xs"
            as={NextLinkFromReactRouter}
            target="_blank"
            to="https://bandit.network/legal/privacy.pdf"
          >
            Privacy Policy
          </Button>
        </Text>
      </Box>
      {getOptions()}
    </>
  )
}

export default ConnectWalletModal
