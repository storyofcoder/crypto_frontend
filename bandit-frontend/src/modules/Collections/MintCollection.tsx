import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "antd";
import { ethers } from "ethers";
import * as Yup from "yup";

import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import { notify } from "../../components/atoms/Notification/Notify";
import useDeployContract from "../../hooks/useDeployContract";
import Button from "../../components/atoms/Button/Button";
import Loader from "../../components/atoms/Loader/Loader";
import useWalletModal from "../../hooks/useWalletModal";

import NFTRT from "../../contracts/ERC721/NFTRT.json";
import NFTT from "../../contracts/ERC721/NFTT.json";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import axios from "axios";
import locale from "../../constant/locale";
import { getNftAddress } from "../../utils/addressHelpers";
import Asset from "../../components/atoms/Image/Asset";
import RadialProgress from "../../components/atoms/RadialProgress/RadialProgress";
import BigNumber from "bignumber.js";
import { getBlockExplorer, pad, stringifyErrorJson, truncateAddress } from "../../utils";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import Counter from "../../components/atoms/Counter/Counter";
import { simpleRpcProvider } from "../../utils/providers";
import Countdown from "react-countdown";
import moment from "moment";
import useAuth from "../../hooks/useAuth";

const contractsFiles = {
  NFTRT,
  NFTT,
}

const MintWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 32px;
  padding: 15px 2%;
  position: relative;
  color: #292c36;
  max-width: 1000px;
  margin: 0 auto;
  ${(p) => p.theme.media.lg} {
    padding: 3%;
  }
`
const AddressText = styled(Box)`
  font-style: italic;
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #11110f;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
`

const AssetWrapper = styled(Box)`
  cursor: zoom-in;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  overflow: hidden;
  background-color: #cccccc;

  ${(p) => p.theme.media.xs} {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    overflow: hidden;
  }
`

const MintLogo = styled(Box)`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
`

const MintDetail = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${(p) => p.theme.media.xs} {
    text-align: center;
    margin-top: 15px;
  }
`

const LoadingWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  z-index: 1;
  // background-color: ${(p) => p.theme.colors.bg1};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
`

const AvatarSection = styled(Box)``

const Schema = Yup.object().shape({
  quantity: Yup.number().required('Quantity is must').min(1, 'Minimum quantity is 1.'),
})

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return null
  } else {
    return (
      <>
        {days > 0 && `${pad(days, 2)}d`} {`${pad(hours, 2)}h :`} {`${pad(minutes, 2)}m :`} {pad(seconds, 2)}s
      </>
    )
  }
}

const MintCollection = ({ collectionDetails }) => {
  const [isLoading, setisLoading] = useState(false)
  const [contract, setContract] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [totalSupply, setTotalSupply] = useState(0)
  const [userMintedNft, setUserMintedNft] = useState(0)
  const { user, walletBalance } = useSelector((state: any) => state.auth)

  const { library, account } = useActiveWeb3React()
  const { deploy, ContractTypes } = useDeployContract()
  const { onPresentConnectModal } = useWalletModal()
  const { isLoggedIn, loading: isAuthLoading }: any = useAuth()

  const { isExternalCollection, contractAddress, contract: collectionContract } = collectionDetails || {}

  const { totalSupply: collectionTotalSupply, price, maxMint, collectionReleaseDate } = collectionContract || {}

  const deployed = isExternalCollection && contractAddress !== getNftAddress()

  const _percentage = Number(((totalSupply / (collectionTotalSupply || 1)) * 100).toFixed(0))

  const contractDeployed = contractAddress !== getNftAddress()

  const totalPrice = Number((quantity * price).toFixed(4))

  const mintingBalance = maxMint - userMintedNft
  const totalRemainingBalance = collectionTotalSupply - totalSupply

  const fetchMintedNfts = async (_contract) => {
    try {
      const res = await _contract.totalSupply()
      setTotalSupply(res.toNumber())
    } catch (e) {
      console.log(e)
    }
  }
  const fetchUserMintedNfts = async (_contract) => {
    try {
      const res = await _contract.balanceOf(account)
      setUserMintedNft(res.toNumber())
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const { contractAddress, contract } = collectionDetails
    const { ContractType } = contract || {}

    if (ContractType) {
      //@ts-ignore
      const abi = contractsFiles[ContractType]?.abi

      const newContract = new ethers.Contract(contractAddress, abi, library?.getSigner())

      if (contractAddress !== getNftAddress()) {
        const newContract1 = new ethers.Contract(contractAddress, abi, simpleRpcProvider)
        fetchMintedNfts(newContract1)
        fetchUserMintedNfts(newContract1)
      }

      setContract(newContract)
    }
  }, [collectionDetails, library, account])

  async function connectWallet() {
    onPresentConnectModal()
  }

  const handleMint = async () => {
    if (!isLoggedIn && !isAuthLoading) {
      connectWallet()
      return
    }

    const endPoint = locale.ADMIN_API_END_POINT
    const { contractAddress, username } = collectionDetails

    Mixpanel.track(MixpanelEvents.EXTERNAL_COLLECTION_MINT, {
      collectionUsername: username,
      contractAddress,
      user: user?.username,
    })

    try {
      setisLoading(true)
      const price = await contract.price()

      let transaction = await contract.mint(quantity.toString(), {
        value: new BigNumber(price.toString()).times(quantity).toString(),
      })

      await transaction.wait()

      await axios.get(`${endPoint}/webhook?address=${contractAddress}`)

      Mixpanel.track(MixpanelEvents.EXTERNAL_COLLECTION_MINT_SUCCESS, {
        collectionUsername: username,
        contractAddress,
        user: user?.username,
      })

      await fetchUserMintedNfts(contract)
      await fetchMintedNfts(contract)

      notify.success('Minting success', 'It takes few minutes to sync the NFT')

      setisLoading(false)
    } catch (e) {
      console.log(e)
      setisLoading(false)
      notify.error('Failed to mint', e?.message)

      Mixpanel.track(MixpanelEvents.EXTERNAL_COLLECTION_MINT_ERROR, {
        collectionUsername: username,
        contractAddress,
        user: user?.username,
        error: stringifyErrorJson(e),
      })
    }
  }

  const onQuantityChange = (qty) => {
    setQuantity(qty)
  }

  const openContract = () => {
    const _url = `${getBlockExplorer()}/address/${collectionDetails?.contractAddress}`
    window.open(_url, '_blank')
  }

  return (
    <MintWrapper>
      <Row gutter={[40, 40]}>
        <Col xs={24} lg={12}>
          <AssetWrapper>
            <Asset
              thumbnail={collectionDetails?.profileImage}
              type={'image/jpeg'}
              imageSrc={collectionDetails?.profileImage}
              objectFit="cover"
            />
          </AssetWrapper>
        </Col>
        <Col xs={24} lg={12}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {contractDeployed && (
                <AddressText onClick={openContract} mb={25}>
                  <b>Contract Address:</b> {truncateAddress(collectionDetails?.contractAddress, 8)}
                </AddressText>
              )}

              {collectionDetails?.contract?.totalSupply != -1 && (
                <>
                  <Box>
                    <Text fontWeight={600} fontSize={16}>
                      Total Minted NFT
                    </Text>
                  </Box>
                  <AvatarSection mt={40}>
                    <Row>
                      <Col xs={24} lg={12}>
                        <Flex justifyContent="center">
                          <RadialProgress value={_percentage} />
                        </Flex>
                      </Col>
                      <Col xs={24} lg={12}>
                        <MintDetail>
                          <Text fontWeight={800} fontSize={40}>
                            {totalSupply}
                          </Text>
                          <Text fontWeight={500} fontSize={16} mt={10}>
                            Minted out of
                          </Text>
                          <Text fontWeight={800} fontSize={40} mt={10}>
                            {collectionDetails?.contract?.totalSupply}
                          </Text>
                        </MintDetail>
                      </Col>
                    </Row>
                  </AvatarSection>
                </>
              )}
              <Flex justifyContent="space-between" alignItems="center" mt={55}>
                <Text fontWeight={500} fontSize={16}>
                  Mint Price
                </Text>
                <Text fontWeight={800} fontSize={22}>
                  {collectionDetails?.contract?.price} BNB
                </Text>
              </Flex>
              {/*<Box mt={30}>*/}
              {/*  <CustomInput*/}
              {/*    type="number"*/}
              {/*    placeholder="Enter a number"*/}
              {/*    label="Enter the number of NFTs"*/}
              {/*    name="quantity"*/}
              {/*    id="quantity"*/}
              {/*    errors={formik.errors}*/}
              {/*    touched={formik.touched}*/}
              {/*    value={formik.values.quantity}*/}
              {/*    onChange={formik.handleChange}*/}
              {/*    onBlur={formik.handleBlur}*/}
              {/*  />*/}
              {/*</Box>*/}

              <Flex mt={30}>
                <Box flex="1">
                  <Text fontSize={[16]} fontWeight={[500]} color="text">
                    Quantity
                  </Text>
                  {account && (
                    <Text>
                      Remaining NFTs to mint: {mintingBalance}/{maxMint}
                    </Text>
                  )}
                </Box>
                <Box flex="1">
                  <Counter
                    initialState={1}
                    maxState={Math.min(totalRemainingBalance, mintingBalance)}
                    onChange={onQuantityChange}
                  />
                </Box>
              </Flex>

              <Flex justifyContent="space-between" alignItems="center" mt={30}>
                <Text fontWeight={500} fontSize={16}>
                  Total amount
                </Text>
                <Text fontWeight={800} fontSize={22}>
                  {totalPrice} BNB
                </Text>
              </Flex>
              <Box mt={40}>
                {!deployed ? (
                  <Button variant="solid" height={50} width={'100%'}>
                    {collectionReleaseDate ? (
                      <Countdown date={moment.unix(collectionReleaseDate).utc().toDate()} renderer={renderer} />
                    ) : (
                      'Sale not active'
                    )}
                  </Button>
                ) : totalSupply === collectionTotalSupply ? (
                  <Button variant="solid" height={50} width={'100%'}>
                    Sold out
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    height={50}
                    width={'100%'}
                    disabled={
                      isLoggedIn &&
                      (isLoading || quantity <= 0 || totalPrice > walletBalance?.BNB || maxMint == userMintedNft)
                    }
                    onClick={handleMint}
                  >
                    {!isLoggedIn
                      ? 'Mint'
                      : totalPrice > walletBalance?.BNB
                      ? 'Not enough balance'
                      : maxMint == userMintedNft
                      ? 'Limit Reached'
                      : 'Mint'}
                  </Button>
                )}
              </Box>
            </>
          )}
        </Col>
      </Row>
    </MintWrapper>
  )
}

const Loading = () => {
  return (
    <LoadingWrapper>
      <Box>
        <Loader />
      </Box>
      <Text fontSize={25} fontWeight={800} color="text" textAlign="center">
        Your NFT is being minted
      </Text>
    </LoadingWrapper>
  )
}

export default MintCollection
