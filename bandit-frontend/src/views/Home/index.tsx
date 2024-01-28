import { Box } from 'components/atoms/StyledSystem'
import Page from '../../components/atomsV2/Page'

import { useWeb3React } from '@web3-react/core'
import CustomInput from 'components/atoms/Form/CustomInput'
import Lottie from 'lottie-react'
import { useRouter } from 'next/router'
import CardJson from '../../../public/assets/loties/card-json.json'
import EmojeJson from '../../../public/assets/loties/emoje.json'
import WalletLoginComponent from './WalletLogin'
import {
  AuthButtonGoogle,
  AuthButtonOthers,
  AuthCTABox,
  AuthCTAWrapper,
  AuthCardWrapper,
  AvatarImage,
  AvatarWrapper,
  CreateAccountWrapper,
  CreateTitle,
  Heading,
  InfoText,
  InfoWrapper,
  PageWrapper,
  PoweredByWrapper,
  RecommendationTitle,
  RecommendationValue,
  RecommendationValueWrapper,
  RecommendationWrapper,
  UsernameSubmit,
  UsernameSuffixText,
  UsernameWrapper,
} from './styles'
import { useState } from 'react'
import useAuth from 'hooks/useAuth'

const Home = () => {
  const router = useRouter()
  const { account } = useWeb3React()
  const { logout } = useAuth()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('helloworld')
  const suggestions = ['helloworld1', 'helloworld2', 'helloworld3']

  const handleUsername = (e) => {
    setUsername(e?.target?.value)
  }

  const handleBack = () => {
    if (account) logout()
    setIsLoggedIn(false)
  }

  const isUser = account || isLoggedIn

  return (
    <Page>
      <PageWrapper>
        <AuthCardWrapper>
          <Box position="absolute">
            <Lottie animationData={CardJson} loop={true} />
          </Box>

          <Box style={{ zIndex: '1' }}>
            <Box onClick={handleBack} style={{ position: 'absolute', cursor: 'pointer' }}>
              {isUser && <img src={'./assets/images/svg/left-icon.svg'} height={32} />}
            </Box>
            <Box style={{ textAlign: 'center', marginTop: '85px' }}>
              <video
                src="https://s3-figma-videos-production-sig.figma.com/video/1147787743358927679/TEAM/8108/aaeb/-a1f5-4b6d-8b32-c65134c65035?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mbB4FIu7dtDBshWMX0AFEQTv7dDeGPnplCKTz8l0MjB6gy5zFzF9LEtzVJAGksO5zU-i~DzvZke4VAZnDgUkTOqBPSn7el0CsMW3~mvYnOaFVP6ZsJk-0mF4VykKOMe~NIfmYnlWdG5jT11txunb-BrX1OYUKOx8N9qN7wtwcCNbWweNszGzuL7F6JOuttVkJOhzfDWcuEqX0JCHU5WxNSiUA9m49uKKikdYUDzGZh08SbH65qGOLwri5Mr5FA3r2Bn0yT8rwJ1P39ia~M5UFfFDKD2~u3fSDTOKD5sZbZnpBzAerWs4srEGGcnBBBn4YmHhv1QLASC10-luWILKNw__"
                width="100px"
                height="100px"
                autoPlay
                controls={false}
                loop
              />
            </Box>

            <Box>
              <Heading>
                Login to
                <br /> <strong>tria</strong> Demo
              </Heading>
            </Box>
          </Box>
          <AuthCTAWrapper>
            <AuthCTABox>
              {isUser ? (
                <CreateAccountWrapper>
                  <CreateTitle>Create your Tria name</CreateTitle>
                  <UsernameWrapper>
                    <CustomInput
                      suffix={() => <UsernameSuffixText>@tria</UsernameSuffixText>}
                      value={username}
                      type="text"
                      onChange={handleUsername}
                    />
                    <UsernameSubmit onClick={() => router.push('/dashboard')}>Next</UsernameSubmit>
                  </UsernameWrapper>
                  <RecommendationWrapper>
                    <RecommendationTitle>Recommended:</RecommendationTitle>
                    <RecommendationValueWrapper>
                      {suggestions.map((value, index) => (
                        <RecommendationValue onClick={() => setUsername(value)} key={index} active={username === value}>
                          {value}
                        </RecommendationValue>
                      ))}
                    </RecommendationValueWrapper>
                  </RecommendationWrapper>

                  <InfoWrapper>
                    <Box width={'70px'}>
                      <Lottie animationData={EmojeJson} loop={true} style={{ width: '36px' }} />
                    </Box>
                    <InfoText>
                      Your @tria is like Gmail, for Web3. Pay, receive and log-in to apps on any device, and blockchain.
                    </InfoText>
                  </InfoWrapper>
                </CreateAccountWrapper>
              ) : (
                <>
                  <AuthButtonGoogle onClick={() => setIsLoggedIn(true)}>
                    <AvatarWrapper height={32} width={32}>
                      <AvatarImage src={'./assets/images/folder/google.png'} height={26} width={26} />
                    </AvatarWrapper>
                    Continue with Google
                  </AuthButtonGoogle>
                  <AuthButtonOthers onClick={() => setIsLoggedIn(true)}>
                    <AvatarWrapper height={32} width={32}>
                      <AvatarImage src={'./assets/images/folder/twitter.png'} height={20} width={20} />
                    </AvatarWrapper>
                    Continue with X (formerly Twitter)
                  </AuthButtonOthers>
                  <AuthButtonOthers onClick={() => setIsLoggedIn(true)}>
                    <img src={'./assets/images/folder/phone.png'} height={32} />
                    Continue with Email/ Phone
                  </AuthButtonOthers>

                  <img src={'./assets/images/folder/or.png'} height={32} />

                  <WalletLoginComponent />
                </>
              )}
            </AuthCTABox>
            <PoweredByWrapper>
              <img src={'./assets/images/svg/svg-small-logo.svg'} height={20} />
              Powered by Tria
            </PoweredByWrapper>
          </AuthCTAWrapper>
        </AuthCardWrapper>
      </PageWrapper>
    </Page>
  )
}

export default Home
