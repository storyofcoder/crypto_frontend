import React, { useEffect, useState } from 'react'
import moment from 'moment'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { InfoContainer, MintingContainer, PriceOffering } from './styles'
import { NavigationTabs } from '../../../../components/molecules/AppLayout/DiscoverLayout'
import { Box, Text, Flex } from 'components/atoms/StyledSystem'
import { Heading } from '../../../../components/atomsV2/Heading'
import CopyAddress from '../../../../components/atomsV2/CopyAddress'
import Timer from './Timer'
import useERC721Contracts from '../../../../hooks/useERC721Contracts'
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import { DEFAULT_TOKEN_DECIMAL } from '../../../../constant'
import Counter from '../../../../components/atoms/Counter/Counter'
import TokenIcon from '../../../../components/atoms/svg/tokenIcon'
import { Button } from '../../../../components/atomsV2/Button'
import { notify } from '../../../../components/atoms/Notification/Notify'
import { makeFriendlyNumber } from '../../../../utils'
import useDeployContract from '../../../../hooks/useDeployContract'
import Timeline, { STATES } from '../../../../components/atomsV2/Timeline/Timeline'
import Loader from '../../../../components/atomsV2/Loader'

import { updateCollectionMintErrors, updateCollectionMints } from '../../../../state/collections/source'
import { SUPPORTED_NETWORKS_NAMES } from 'constant/network'
import { getERC721CustomContract, getERC721NFTContract, getSigner } from '../../../../utils/contractHelpers'
import useWalletModal from '../../../../hooks/useWalletModal'
import useBalance from '../../../../hooks/useBalance'
import { Mixpanel, MixpanelEvents } from '../../../../analytics/Mixpanel'
import SchoolPride from '../../../../components/atomsV2/Confetti'
import { MODAL, showModal } from 'modules/Modals'
import { useRouter } from 'next/router'
import { isChainAllowed, switchChain } from '../../../../utils/switchChain'
import { simpleRpcProvider } from '../../../../utils/providers'
import Checkbox from '../../../../components/atoms/Form/CheckBox'
import { NextLinkFromReactRouter } from '../../../../components/atoms/NextLink'

const DECODE_KEY = 'u8x/A%D*G-KaPdSgVkYp3s6v9y$B&E(H'

const MintPage = ({
  tabsList,
  contractType,
  contractAddress,
  contractDetails,
  chainId,
  collectionDetails,
  isPrivate = false,
}) => {
  const [contract, setContract] = useState(null)
  const [agreedToTnc, setAgreedToTnc] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [initialQuantity, setInitialQuantity] = useState(1)
  const [offerPrice, setOfferPrice] = useState(0)
  const [offerQuantity, setOfferQuantity] = useState(1)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, settLoading] = useState(false)
  const [mintProcessing, setMintProcessing] = useState(false)
  const [minted, setMinted] = useState(false)
  const [state, setState] = useState({
    hasStarted: false,
    startTime: null,
    accountMints: 0,
    maxPerAddress: 0,
    maxSupply: 0,
    totalSupply: 0,
    mintingPrice: 0,
    symbol: '',
    phases: [],
    activeLivePhase: null,
  })

  const router = useRouter()

  const { account, library, provider, connector, chainId: connectedChainId } = useActiveWeb3React()
  const { getContract } = useERC721Contracts()
  const { ContractTypes } = useDeployContract()
  const { isTablet, isDesktop, isMobile } = useMatchBreakpoints()

  const dispatch = useDispatch()

  const { onPresentConnectModal } = useWalletModal()

  const { balance }: any = useBalance({ chainId })

  const { price, maxMint, abi, mintFunction, startDate, priceSlabs, mintingTerms } = contractDetails || {}

  useEffect(() => {
    priceSlabs.map((priceSlab) => {
      if (quantity >= priceSlab.quantity) {
        setOfferPrice(priceSlab.price)
        setOfferQuantity(priceSlab.quantity)
      }
    })
  }, [quantity])

  const initializeVariables = async (contract) => {
    // const results = await Promise.all([contract.maxSupply(), contract.totalSupply(), contract.symbol()])
    try {
      const results = await Promise.all([contract.totalSupply(), contract.symbol()])
      setState((state) => ({
        ...state,
        // maxSupply: Number(results[0].toString()),
        totalSupply: Number(results[0].toString()),
        symbol: results[1],
      }))
    } catch (e) {
      console.log('Failed to fetch contract info')
    }
  }

  const initializeNFTData = async (contract) => {
    const results = await Promise.all([
      contract.startTime(),
      contract.maxPerAddress(),
      contract.mintingPrice(),
      contract.minted(account),
    ])
    setState((state) => ({
      ...state,
      hasStarted: moment.unix(results[0].toString()).isBefore(moment()),
      startTime: results[0].toString(),
      maxPerAddress: results[1].toString(),
      mintingPrice: Number(new BigNumber(results[2].toString()).div(DEFAULT_TOKEN_DECIMAL).toString()),
      accountMints: results[3].toNumber(),
    }))

    settLoading(false)
  }
  const initializePhasesData = async (contract) => {
    const results = await Promise.all([contract.getLivePhase(), contract.getPhases()])
    let resultsAlt = []
    const activeLivePhase = Number(results[0].toString())
    if (activeLivePhase > 0 && account) {
      resultsAlt = await Promise.all([contract.minted(activeLivePhase, account)])
    }

    const phases = results[1][0].map((col, i) => results[1].map((row) => row[i].toString()))

    setState((state) => ({
      ...state,
      hasStarted:
        activeLivePhase <= 0
          ? moment.unix(phases.find((phase) => phase[3] === '0')[1].toString()).isBefore(moment())
          : moment.unix(results[1][1][activeLivePhase - 1].toString()).isBefore(moment()),
      startTime:
        activeLivePhase <= 0 ? phases.find((phase) => phase[3] === '0')[1] : results[1][1][activeLivePhase - 1],
      activeLivePhase,
      phases,

      maxPerAddress: activeLivePhase > 0 ? Number(phases[activeLivePhase - 1][4]) : 0,
      mintingPrice:
        activeLivePhase > 0
          ? Number(new BigNumber(phases[activeLivePhase - 1][0]).div(DEFAULT_TOKEN_DECIMAL).toString())
          : 0,
      accountMints: resultsAlt[1] ? resultsAlt[1].toString() : 0,
    }))

    settLoading(false)
  }

  useEffect(() => {
    const { quantity, access_token } = router.query || {}

    if (access_token) {
      setAccessToken(access_token)
    }

    if (!quantity) return

    try {
      const qty = Number(quantity)

      if (qty > 0) {
        setInitialQuantity(qty)
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    const contractType = !!abi ? ContractTypes.CUSTOM : ContractTypes.NFT
    if (!contractType || !contractAddress) return
    settLoading(true)
    const _contract = getContract(contractType, contractAddress, chainId, !!abi ? JSON.parse(abi) : null)
    initializeVariables(_contract)
    setContract(_contract)

    settLoading(false)

    return

    //doesnt work
    if ([ContractTypes.PHASES, ContractTypes.PHASESR].includes(contractType)) {
      initializePhasesData(_contract)
    } else {
      initializeNFTData(_contract)
    }
  }, [contractAddress, contractType, account, library])

  const onQuantityChange = (qty) => {
    setQuantity(qty)
  }
  const onMintStart = () => {
    setState((state) => ({
      ...state,
      hasStarted: true,
    }))
  }

  const showConfirmMintModal = () => {
    if (!account) return onPresentConnectModal()

    showModal(MODAL.MINT_CONFIRM, {
      callback: mint,
    })
  }

  const requestNetworkSwitch = async (chainId) => {
    try {
      await switchChain(connector, chainId)
    } catch (e) {
      console.log(e)
    }
  }

  const mint = async () => {
    if (!account) return onPresentConnectModal()

    Mixpanel.track(MixpanelEvents.MINT_CLICKED, {
      contractAddress,
      chainId,
    })

    if (chainId !== connectedChainId)
      return notify.error('Wrong network', `Switch to ${SUPPORTED_NETWORKS_NAMES[chainId]}`)
    try {
      setMintProcessing(true)

      const totalPrice = new BigNumber(offerPrice ? offerPrice : price)
        .times(quantity)
        .times(DEFAULT_TOKEN_DECIMAL)
        .toString()
      const externalAbi = !!abi
      let _contract = null
      let transaction = null
      let needQuantity = true

      let parsedAbi = null
      if (externalAbi) {
        _contract = getERC721CustomContract(getSigner(provider, account), contractAddress, JSON.parse(abi))
        parsedAbi = JSON.parse(abi)
      } else {
        _contract = getERC721NFTContract(getSigner(provider, account), contractAddress)
      }

      if (externalAbi) {
        const abiFunction = parsedAbi.find(
          (item) => item.name === mintFunction && item.type.toLowerCase() === 'function',
        )
        if (!!abiFunction) {
          needQuantity = !!abiFunction.inputs.length
        } else {
          throw new Error(`${mintFunction} function is not available in contract`)
        }
      }

      if (needQuantity) {
        transaction = await _contract[!!abi ? mintFunction : 'mint'](quantity, {
          value: totalPrice,
        })
      } else {
        transaction = await _contract[mintFunction]({
          value: totalPrice,
        })
      }

      await transaction.wait()

      showModal(MODAL.MINT_SUCCESS, { collectionDetails })
      await updateCollectionMints(contractAddress, {
        walletAddress: account,
        transactionHash: transaction.hash,
        chainId: chainId,
        quantity: quantity,
        price: totalPrice,
        ...(!!accessToken && { accessToken }),
      })
      initializeVariables(contract)
      notify.success('Minted successfully')
      setMintProcessing(false)
      setMinted(true)

      Mixpanel.track(MixpanelEvents.MINT_SUCCESS, {
        contractAddress,
        chainId,
        transactionHash: transaction.hash,
      })
    } catch (e) {
      console.log(e)
      const params = JSON.stringify({
        account,
        error: typeof e === 'object' ? JSON.stringify(e) : e,
      })
      Mixpanel.track(MixpanelEvents.MINT_ERROR, {
        contractAddress,
        chainId,
      })
      updateCollectionMintErrors(contractAddress, params)
      setMintProcessing(false)
      notify.error('Failed to mint', e.message)
    }
  }

  const mintingBalance = state.maxPerAddress - state.accountMints
  const totalRemainingBalance = Number(maxMint) - state.totalSupply

  const maxState = Number(totalRemainingBalance)

  const soldOut = totalRemainingBalance <= 0

  const wrongNetwork = Number(chainId) !== Number(connectedChainId)

  const lowBalance =
    Number(new BigNumber(offerPrice).times(quantity).times(DEFAULT_TOKEN_DECIMAL).toString()) >=
    Number(balance.toString())

  const disableMint =
    account &&
    !wrongNetwork &&
    (soldOut || !maxState || mintProcessing || lowBalance || !agreedToTnc || quantity > totalRemainingBalance)

  const hasStarted = moment.unix(startDate).isBefore(moment())

  const activePriceSlabs = priceSlabs.filter((priceSlab) => priceSlab.quantity <= maxState)

  const filteredPriceSlabs = activePriceSlabs.length > 1 ? activePriceSlabs : []

  return (
    <Box>
      <NavigationTabs tabsList={tabsList} />
      {loading && (
        <Flex alignItems="center" justifyContent="center" minHeight="40vh">
          <Loader />
        </Flex>
      )}
      {!loading && (
        <Container>
          {!hasStarted && (
            <Flex minHeight="30vh" width="100%" alignItems="center" justifyContent="center" flexDirection="column">
              <Heading scale="lg" mb={20} color="text">
                Starts In
              </Heading>
              <Timer endTime={startDate} onComplete={onMintStart} />
            </Flex>
          )}

          {hasStarted && (
            <>
              <InfoContainer>
                <Box>
                  <Heading scale="md" mb={20} textAlign="center">
                    Mint
                  </Heading>
                  <Text fontSize={18} fontWeight={500} scale="md" mb={20}>
                    Contract details
                  </Text>
                  <Box>
                    <Flex justifyContent="space-between">
                      <Text color="text" fontSize={14}>
                        Contract Address
                      </Text>
                      <CopyAddress address={contractAddress} chainId={chainId} />
                    </Flex>
                    <Flex justifyContent="space-between" mt={10}>
                      <Text color="text" fontSize={14}>
                        Blockchain
                      </Text>
                      <Text fontSize={14} fontWeight={600}>
                        {SUPPORTED_NETWORKS_NAMES[chainId]}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between" mt={10}>
                      <Text color="text" fontSize={14}>
                        Contract SYMBOL
                      </Text>
                      <Text fontSize={14} fontWeight={600}>
                        {state.symbol}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between" mt={10}>
                      <Text color="text" fontSize={14}>
                        Token Supply
                      </Text>
                      <Text fontSize={14} fontWeight={600}>
                        {makeFriendlyNumber(state.totalSupply)}/{maxMint}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between" mt={10}>
                      <Text color="text" fontSize={14}>
                        Token Standard
                      </Text>
                      <Text fontSize={14} fontWeight={600}>
                        ERC721
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between" mt={10}>
                      <Text color="text" fontSize={14}>
                        Metadata
                      </Text>
                      <Text fontSize={14} fontWeight={600}>
                        IPFS
                      </Text>
                    </Flex>
                  </Box>
                </Box>
                {!!state.phases.length && (
                  <Box mt={60}>
                    <Heading scale="md" mb={40}>
                      Phases
                    </Heading>
                    <Timeline
                      list={state.phases.map((phase, index) => ({
                        title: `Phase ${index + 1}`,
                        subtitle: `Start date: ${moment.unix(phase[1])}`,
                        state:
                          phase[2].toString() === phase[3].toString()
                            ? STATES.COMPLETE
                            : state.activeLivePhase === index + 1
                            ? STATES.ACTIVE
                            : STATES.INCOMPLETE,
                      }))}
                    />
                  </Box>
                )}
              </InfoContainer>
              <MintingContainer>
                <Divider />
                <Box>
                  <Box>
                    <Flex alignItems="center" justifyContent="space-between" mt={10}>
                      <Text fontSize={16} fontWeight={600} color="text">
                        Price
                      </Text>
                      <Flex alignItems="center">
                        <TokenIcon width={20} height={20} mr="4px" chainId={chainId} />
                        <Text fontSize={22} fontWeight={700}>
                          {offerPrice ? offerPrice : price}
                        </Text>
                      </Flex>
                    </Flex>
                    <PriceOffering>
                      {filteredPriceSlabs &&
                        filteredPriceSlabs.length > 0 &&
                        filteredPriceSlabs.map((priceSlab) => (
                          <Flex alignItems="center" justifyContent="flex-end" mb="10px" mt="10px">
                            <Flex width="240px" justifyContent="space-between" alignItems="center">
                              <Text color="text" fontSize={14}>{`Mint ${priceSlab.quantity} for`}</Text>
                              <Flex justifyContent="flex-end" ml="auto" mr="16px">
                                <TokenIcon width={15} height={15} mr="4px" chainId={chainId} />
                                <Text fontSize={16} fontWeight={700}>
                                  {priceSlab.price}
                                </Text>
                              </Flex>
                              {offerQuantity == priceSlab.quantity ? (
                                <Button variant="secondary" scale="xs" width="80px" disabled>
                                  Applied
                                </Button>
                              ) : (
                                <Button
                                  variant="secondary"
                                  scale="xs"
                                  width="80px"
                                  onClick={() => {
                                    setOfferQuantity(priceSlab.quantity)
                                    onQuantityChange(priceSlab.quantity)
                                    setOfferPrice(priceSlab.price)
                                  }}
                                >
                                  Apply
                                </Button>
                              )}
                            </Flex>
                          </Flex>
                        ))}
                    </PriceOffering>
                    <Divider />
                    <Flex alignItems="center" justifyContent="space-between" mt={30}>
                      <Box>
                        <Text fontSize={16} fontWeight={600} color="text">
                          Quantity
                        </Text>
                        {/*<Text fontSize={12} fontWeight={600} color="text">*/}
                        {/*  Balance: {state.accountMints}/{state.maxPerAddress}*/}
                        {/*</Text>*/}
                      </Box>
                      <Counter
                        initialState={initialQuantity}
                        maxState={maxState}
                        onChange={onQuantityChange}
                        value={quantity}
                      />
                    </Flex>
                    <Flex alignItems="flex-end" justifyContent="space-between" mt={30} flexDirection="column">
                      <Text fontSize={16} fontWeight={600} color="text">
                        Total Price
                      </Text>
                      <Flex alignItems="center">
                        <TokenIcon width={20} height={20} mr="4px" chainId={chainId} />
                        <Text fontSize={22} fontWeight={700}>
                          {new BigNumber(offerPrice ? offerPrice : price).times(quantity).toString()}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex alignItems="center" flexDirection="column" mt={20}>
                      <Checkbox onChange={() => setAgreedToTnc(!agreedToTnc)}>
                        {mintingTerms === 2 ? (
                          <>
                            I have read and accept to the{' '}
                            <Button
                              variant="link"
                              scale="sm"
                              as={NextLinkFromReactRouter}
                              target="_blank"
                              to="https://bandit.network/legal/TermsOfSale.pdf"
                            >
                              Terms of Sale
                            </Button>{' '}
                          </>
                        ) : (
                          <>
                            I understand that I am interacting with a third party’s Smart Contract and accept the{' '}
                            <Button
                              variant="link"
                              scale="sm"
                              as={NextLinkFromReactRouter}
                              target="_blank"
                              to="https://bandit.network/legal/termsOfUse.pdf"
                            >
                              Terms of Use
                            </Button>{' '}
                          </>
                        )}
                      </Checkbox>
                      <Button
                        variant="primary"
                        width={isDesktop ? '40%' : isTablet ? '50%' : '70%'}
                        mt={30}
                        disabled={disableMint}
                        // onClick={!disableMint ? mint : undefined}
                        onClick={!disableMint ? (wrongNetwork ? () => requestNetworkSwitch(chainId) : mint) : undefined}
                        endIcon={mintProcessing && <Loader scale="xs" />}
                      >
                        {account
                          ? wrongNetwork
                            ? 'Change Network'
                            : soldOut
                            ? 'Sold Out!'
                            : lowBalance
                            ? 'Not enough balance!'
                            : mintProcessing
                            ? 'Minting'
                            : !maxState
                            ? 'Limit reached!'
                            : ' Mint'
                          : 'Mint'}
                        {mintProcessing && <Box width="10px" />}
                      </Button>
                    </Flex>
                    {account && wrongNetwork && (
                      <Text fontSize="16px" textAlign="center" mt={20}>
                        Wrong Network! Please change the network to {SUPPORTED_NETWORKS_NAMES[chainId]} network
                      </Text>
                    )}
                  </Box>
                </Box>
                {minted && <SchoolPride />}
              </MintingContainer>
            </>
          )}
        </Container>
      )}
    </Box>
  )
}

export const Container = styled(Flex)`
  padding-top: 30px;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 30px 0;
`

export default MintPage
