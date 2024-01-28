import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import { ReferralIcon } from "../components/atoms/svg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/atoms/Button/Button";
import { refreshUser, setRedirectCallback, showConffeti } from "../state/Auth/actions";
import API from "../services/API";
import Loader from "../components/atoms/Loader/Loader";
import useWalletModal from "../hooks/useWalletModal";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

const Container = styled(Box)`
  //padding-top: 10px;
  //padding-left: 40px;
  //padding-right: 40px;

  ${(p) => p.theme.media.xs} {
    padding: 10px 20px 0 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 10px 20px 0 20px;
  }

  ${(p) => p.theme.media.xlg} {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 10px 40px 0 40px;
  }
`

const ImageWrapper = styled.div`
  svg {
    width: 200px;
    height: 200px;
  }
`

const Referral = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const { user, conversionRate } = useSelector((state: any) => state.auth)
  const { isLoggedIn, loading: isAuthLoading }: any = useAuth()
  const dispatch = useDispatch()
  const router = useRouter()
  const { query } = router

  const { onPresentConnectModal } = useWalletModal()

  useEffect(() => {
    if (!isLoggedIn && !isAuthLoading) {
      dispatch(
        setRedirectCallback((userDetails) => {
          acceptInvite(userDetails)
        }),
      )
    } else {
      acceptInvite(user)
    }
  }, [])

  async function acceptInvite(userDetails) {
    setLoading(true)
    try {
      const res = await API.acceptReferralInvite(userDetails?.username, userDetails?.signature, query.code)
      dispatch(showConffeti())
      dispatch(refreshUser())
      setLoading(false)
      setSuccess(true)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setError(e)
      router.push('/')
    }
  }
  return (
    <Container>
      <Flex justifyContent="center" alignItems="center" flexDirection="column" width="100%" minHeight={'80vh'}>
        <ImageWrapper>
          <ReferralIcon />
        </ImageWrapper>
        {!isLoggedIn && (
          <Box mt={30}>
            <Button variant="tertiary" onClick={onPresentConnectModal}>
              Connect Wallet
            </Button>
          </Box>
        )}
        {isLoggedIn && (
          <>
            {loading ? (
              <Box>
                <Loader />
              </Box>
            ) : success ? (
              <Flex flexDirection="column" alignItems="center" mt={20}>
                <Text fontSize={40} color="text" fontWeight={600}>
                  Yay! Congratulations
                </Text>
                <Text fontSize={20} color="text" fontWeight={600} mb={10}>
                  You have got the creator access.
                </Text>
                <NextLinkFromReactRouter to="/create-nft">
                  {' '}
                  <Button variant="tertiary">Create NFT</Button>
                </NextLinkFromReactRouter>
              </Flex>
            ) : error ? (
              <Box>
                <Text>Something went wrong!</Text>
              </Box>
            ) : null}
          </>
        )}
      </Flex>
    </Container>
  )
}

export default Referral
