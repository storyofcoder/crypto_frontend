import { Box, Flex } from 'components/atoms/StyledSystem'
import Page from '../../components/atomsV2/Page'

import styled from 'styled-components'
import { Typography } from 'antd'
import { useState } from 'react'

const PageWrapper = styled(Box)`
  justify-content: center;
  display: flex;
`

const AuthCardWrapper = styled(Box)`
  width: 448px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;
  background-color: rgb(16, 16, 16);
  height: 840px;
  padding: 16px;
  flex-direction: column;
  justify-content: space-between;
  display: inline-flex;
  transform: scale(0.7);
  font-family: Montserrat, sans-serif;
  border: 2px solid #80808008;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
  position: absolute;
  right: 0;

  .close-header {
    position: absolute;
    top: -30px;
    margin: auto;
    left: calc(50% - 50px);
    cursor: pointer;
  }
`

const AuthCTAWrapper = styled(Box)`
  margin-top: auto;
  background: linear-gradient(0deg, #101010 7.05%, rgba(16, 16, 16, 0) 44.44%);
`

const PoweredByWrapper = styled(Flex)`
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: fit-content;
  border-radius: 16px;
  margin: auto;
  margin-top: 12px;
  :hover {
    background-color: var(--surface-alpha-light-4, rgba(250, 250, 250, 0.04));
    transition: background-color 0.1s ease-in-out;
  }
  color: #808080;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
`

const BalanceSectionWrapper = styled(Box)`
  height: 189.771px;
  padding: 16px;
  align-items: flex-start;
  gap: 14.057px;
  align-self: stretch;
  border-radius: var(--borer-radius-12, 12px);
  border: 1px solid #6350c2;
  background: linear-gradient(170deg, rgb(0, 0, 0) 42%, #433fe5);
  :hover {
    background: linear-gradient(170deg, rgb(45, 44, 44) 42%, #433fe5);
  }
`

const Heading = styled(Typography)`
  color: var(--text-light-secondary, rgba(250, 250, 250, 0.7));
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 16px */
  opacity: 0.6;
`

const HeadingChange = styled(Box)`
  display: flex;
  padding: 1.757px 7.029px;
  align-items: center;
  gap: 7.029px;
  border-radius: 26.357px;
  background: rgba(37, 89, 55, 0.4);

  color: var(--text-light-feedback-positive, #55cc7d);
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 16.8px */
`

const BalanceSection = styled(Flex)`
  gap: 8px;
  margin-top: 8px;
  align-items: center;
`

const Balance = styled(Flex)`
  color: #fff;

  text-align: center;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 43.2px */
`

const BalanceButtonWrapper = styled(Flex)`
  gap: 14px;
  width: 100%;
  margin-top: 47px;
`

const BalanceActionButton = styled(Box)`
  display: flex;
  height: 44px;
  padding: 8.786px 10.543px;
  justify-content: center;
  align-items: center;
  gap: 7.029px;
  flex: 1 0 0;

  border-radius: 7.029px;
  background: rgba(16, 16, 16, 0.5);

  color: var(--text-light-primary, #fafafa);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 19.2px */
  cursor: pointer;

  background: linear-gradient(to right, #9f8bff 50%, rgba(16, 16, 16, 0.5) 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.2s ease-out;

  .hover {
    width: 0;
    transition: width 0.2s ease-out;
  }

  :hover {
    background-position: left bottom;
    color: white;
    .hover {
      width: 20px;
    }
  }
`
const CurrencyListWrapper = styled(Box)`
  margin-top: 20px;

  .heading {
    color: var(--text-light-tertiary, rgba(250, 250, 250, 0.3));
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 19.2px */
  }
  .currency-network-wrapper {
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 4px;
    border-radius: var(--borer-radius-max, 9999999px);
    border: 1px solid var(--border-light-primary, rgba(250, 250, 250, 0.16));
    background: var(--surface-neutral-dark-surface-900, #1a1a1a);

    transition: all 0.2s ease-out;
  }
`

const CurrencyCardWrapper = styled(Box)`
  border-radius: var(--borer-radius-12, 12px);
  background: ${(p) => (p.isActive ? '#191919' : '')};

  :hover {
    border: 1px solid #1a1a1a;
    background-color: #191919;

    .currency-network {
      display: inline-block;
      width: 100%;
    }
    .currency-network-wrapper {
      margin-right: 5px;
    }
  }

  .currency-list-section {
    align-items: center;
    padding: 12px;
    cursor: pointer;
    gap: 20px;
    :hover {
      .currency-change {
        opacity: 1;
      }
    }
  }

  .border-top {
    border-top: 1px solid var(--text-light-tertiary, rgba(250, 250, 250, 0.3));
  }
  .currency-index {
    color: var(--surface-neutral-dark-surface-600, #41413e);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 19.2px */
  }
  .pol {
    color: var(--text-light-tertiary, rgba(250, 250, 250, 0.3));
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 16.8px */
  }
  .balance {
    color: var(--text-light-primary, #fafafa);
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 19.2px */
  }
  .currency {
    color: #fafafa;

    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 21.6px */
  }
  .currency-network {
    color: #fff;

    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 12px */
    width: ${(p) => (p.isActive ? '100%' : 0)};
    transition: width 0.6s ease-in-out;
    display: ${(p) => (p.isActive ? 'inline-block' : 'none')};
  }
  .currency-change {
    opacity: ${(p) => (p.isActive ? 1 : 0)};
    transition: all 0.2s ease-in-out;
  }
`

const AvatarImage = styled.img<any>`
  height: ${(p) => (p.height ? p.height : 44)}px;
  width: ${(p) => (p.width ? p.width : 44)}px;
  border-radius: 50%;
`

const IconWrapper = styled(Box)`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 7px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    background: var(--surface-neutral-dark-surface-700, #333331);
  }

  .rotate {
    :hover {
      img {
        width: 300px;
        animation: rotation 2s infinite linear;
      }

      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
`

const UserInfoWrapper = styled(Flex)`
  gap: 8px;
  align-items: center;
  padding: 8px;
  border-radius: var(--borer-radius-12, 12px);
  cursor: pointer;

  .username {
    color: rgba(250, 250, 250, 0.8);
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 19.2px */
  }

  :hover {
    background: var(--surface-alpha-light-8, rgba(250, 250, 250, 0.08));
  }
`
const MainWrapper = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
`

const OpenButton = styled(Box)`
  cursor: pointer;
`

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const [openDialog, setOpenDialog] = useState(false)

  const tabs = [
    {
      title: 'Home',
      image: './assets/images/svg/home.svg',
    },
    {
      title: 'Assets',
      image: './assets/images/svg/colorfilter.svg',
    },
    {
      title: 'Activity',
      image: './assets/images/svg/clock.svg',
    },
  ]

  return (
    <Page scale="sm">
      {!openDialog ? (
        <MainWrapper>
          <OpenButton onClick={() => setOpenDialog(true)}>
            <img className="hover" src={'./assets/images/svg/open-dialog.svg'} height={120} />
          </OpenButton>
        </MainWrapper>
      ) : (
        <PageWrapper>
          <AuthCardWrapper>
            <Box className="close-header" onClick={() => setOpenDialog(false)}>
              <img className="hover" src={'./assets/images/svg/top-close.svg'} height={28} />
            </Box>
            <Flex justifyContent="space-between" mb={3}>
              <UserInfoWrapper>
                <img className="hover" src={'./assets/images/svg/user.svg'} height={28} />
                <Box className="username">thekaypo@tria</Box>
                <img className="hover" src={'./assets/images/svg/arrow-down.svg'} height={16} />
              </UserInfoWrapper>
              <Flex style={{ gap: '8px;' }}>
                <IconWrapper>
                  <img className="hover" src={'./assets/images/svg/copy.svg'} height={28} />
                </IconWrapper>
                <img className="hover" src={'./assets/images/svg/polygon.svg'} height={28} />
              </Flex>
            </Flex>
            <BalanceSectionWrapper>
              <Flex style={{ gap: '10px', alignItems: 'center' }}>
                <Heading>Assets Up</Heading>
                <HeadingChange>+2.5%</HeadingChange>
              </Flex>
              <BalanceSection>
                <Balance>$1838.83</Balance>
                <IconWrapper>
                  <img src={'./assets/images/svg/refresh.svg'} className="rotate" height={22} />
                </IconWrapper>
              </BalanceSection>
              <BalanceButtonWrapper>
                <BalanceActionButton>
                  <img src={'./assets/images/svg/buy-crypto.svg'} height={24} /> Buy{' '}
                  <img className="hover" src={'./assets/images/svg/arrow-right.svg'} height={12} />
                </BalanceActionButton>
                <BalanceActionButton>
                  <img src={'./assets/images/svg/sell-crypto.svg'} height={24} /> Sell{' '}
                  <img className="hover" src={'./assets/images/svg/arrow-right.svg'} height={12} />
                </BalanceActionButton>
              </BalanceButtonWrapper>
            </BalanceSectionWrapper>

            <CurrencyListWrapper>
              <Box>
                <Typography className="heading">Crypto</Typography>
              </Box>
              <Flex mt={2} style={{ gridGap: '10px', flexDirection: 'column', overflow: 'scroll', maxHeight: '380px' }}>
                <CurrencyCard />
                <CurrencyCard />
                <CurrencyCard />
              </Flex>
            </CurrencyListWrapper>

            <AuthCTAWrapper>
              <TabsWrapper>
                {tabs.map((value) => (
                  <Tab active={activeTab === value?.title} onClick={() => setActiveTab(value?.title)}>
                    <img src={value?.image} height={20} />
                    <span className="text">{value?.title}</span>
                  </Tab>
                ))}
              </TabsWrapper>

              <PoweredByWrapper>
                <img src={'./assets/images/svg/svg-small-logo.svg'} height={20} />
                Open Tria
                <img src={'./assets/images/svg/arrow-up.svg'} height={20} />
              </PoweredByWrapper>
            </AuthCTAWrapper>
          </AuthCardWrapper>
        </PageWrapper>
      )}
    </Page>
  )
}

export default DashboardPage

const CurrencyCard = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <CurrencyCardWrapper className="currency-list-section-wrapper" isActive={isActive}>
      <Flex className="currency-list-section" onClick={() => setIsActive(!isActive)}>
        <Box>
          <AvatarImage
            src="https://token-icons.s3.amazonaws.com/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
            height={44}
            width={44}
          />
        </Box>
        <Box width="100%">
          <Flex justifyContent="space-between">
            <Typography className="currency">USDC</Typography>
            <Flex style={{ gap: '5px' }}>
              <HeadingChange className="currency-change">+2.5%</HeadingChange>
              <Typography className="balance">$10</Typography>
            </Flex>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Flex>
              <Flex className="currency-network-wrapper">
                <AvatarImage
                  src="https://token-icons.s3.amazonaws.com/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
                  height={16}
                  width={16}
                />
                <Typography className="currency-network">ETH</Typography>
              </Flex>

              <Flex className="currency-network-wrapper">
                <AvatarImage
                  src="https://token-icons.s3.amazonaws.com/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
                  height={16}
                  width={16}
                />
                <Typography className="currency-network">ETH</Typography>
              </Flex>
            </Flex>
            <Typography className="pol">1 POL</Typography>
          </Flex>
        </Box>
        {isActive && <img src={'./assets/images/svg/up-button.svg'} height={30} />}
      </Flex>

      {isActive &&
        [1, 2, 3, 4, 5].map((index) => {
          return (
            <Flex className="currency-list-section border-top">
              <Box>
                <Typography className="currency-index">{index}</Typography>
              </Box>
              <Box>
                <AvatarImage
                  src="https://token-icons.s3.amazonaws.com/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
                  height={44}
                  width={44}
                />
              </Box>
              <Box width="100%">
                <Flex justifyContent="space-between">
                  <Typography className="currency">USDC</Typography>
                  <Flex style={{ gap: '5px' }}>
                    <Typography className="balance">$10</Typography>
                  </Flex>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center" mt={2}>
                  <Box>
                    <Flex className="currency-network-wrapper">
                      <AvatarImage
                        src="https://token-icons.s3.amazonaws.com/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
                        height={16}
                        width={16}
                      />
                      <Typography className="currency-network">ETH</Typography>
                    </Flex>
                  </Box>
                  <Typography className="pol">1 POL</Typography>
                </Flex>
              </Box>
            </Flex>
          )
        })}
    </CurrencyCardWrapper>
  )
}

const TabsWrapper = styled(Flex)`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: var(--borer-radius-max, 9999999px);
  border: 1px solid var(--border-light-secondary, rgba(250, 250, 250, 0.08));
  width: fit-content;
  margin: auto;
`
const Tab = styled(Flex)`
  display: flex;
  padding: 8px;
  gap: ${(p) => (p.active ? '8' : 0)}px;
  justify-content: center;
  align-items: center;

  border-radius: 99999px;
  border: 1px solid var(--border-light-secondary, rgba(250, 250, 250, 0.08));
  background: ${(p) => (p.active ? 'var(--surface-neutral-dark-surface-700, #333331);' : '')};
  cursor: pointer;

  color: #fff;

  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 19.2px */

  .text {
    width: ${(p) => (p.active ? '100%' : 0)};
    max-width: ${(p) => (p.active ? '100%' : 0)};
    overflow: hidden;
    transition: width 0.2s ease-in;
    /* display: ${(p) => (p.active ? 'inline' : 'none')}; */
  }
`
