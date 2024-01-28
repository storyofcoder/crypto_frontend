import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { notify } from "../../components/atoms/Notification/Notify";
import Loader from "../../components/atoms/Loader/Loader";
import useDeployContract from "../../hooks/useDeployContract";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import BigNumber from "bignumber.js";
import locale from "../../constant/locale";
import axios from "axios";
import { getBlockExplorer } from "../../utils";
import moment from "moment";

const DeployCollectionContract = ({ collectionDetails }) => {
  const [loading, setLoading] = useState(false)
  const [deployed, setDeployed] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [deployedContract, setDeployedContract] = useState(null)
  const [canDeploy, setCanDeploy] = useState(true)
  const { deploy, ContractTypes } = useDeployContract()
  const { account } = useActiveWeb3React()

  const user = useSelector((state: any) => state.auth.user)

  useEffect(() => {
    const launchDate = collectionDetails?.contract?.collectionReleaseDate
    if (launchDate) {
      setCanDeploy(moment.unix(launchDate).isBefore(moment()))
    }
  }, [collectionDetails])

  const syncExternalContract = async (contractAddress) => {
    const endPoint = locale.ADMIN_API_END_POINT
    try {
      const res = await axios.get(`${endPoint}/webhook?address=${contractAddress}`)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeploy = async () => {
    setLoading(true)
    setConfirmation(false)
    try {
      const { contract, username } = collectionDetails
      const { name, symbol, baseURI, price, royalty, totalSupply, maxMint, revealableContract, ContractType } = contract

      let params = {
        name,
        symbol,
        uri: baseURI,
        price: new BigNumber(price).times(10 ** 18).toFixed(),
        royalty: new BigNumber(royalty).times(10 ** 8).toFixed(),
        royaltyReceiver: account,
        maxSupply: totalSupply,
        maxMint,
      }

      const dc = await deploy(ContractType, params)

      await API.updateCollectionContractAddress(user?.username, user?.signature, username, dc.address)

      await syncExternalContract(dc.address)

      setDeployed(true)
      setDeployedContract(dc)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
      notify.error('Failed to deploy', e?.message)
    }
  }

  const toggleConfirmation = () => {
    setConfirmation(!confirmation)
  }

  if (confirmation)
    return <Confirmation toggleConfirmation={toggleConfirmation} handleDeploy={handleDeploy} loading={loading} />

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {loading ? (
        <Loading />
      ) : deployed ? (
        <Deployed contract={deployedContract} />
      ) : (
        <>
          <Text fontSize={22} fontWeight={700} textAlign="center" mb={10}>
            DEPLOY SMART CONTRACT ON BLOCKCHAIN
          </Text>
          <Text fontSize={16} fontWeight={500} textAlign="center" opacity={0.6}>
            Additional gas fees are incurred while deploying a contract.
          </Text>
          <Box mt={40} mb={20}>
            <Button
              variant="solid"
              height={50}
              width={205}
              disabled={loading}
              onClick={canDeploy ? handleDeploy : toggleConfirmation}
            >
              Deploy
            </Button>
          </Box>
        </>
      )}
    </Flex>
  )
}

const Deployed = ({ contract }) => {
  const baseUrl = getBlockExplorer()
  return (
    <LoadingWrapper>
      <Text fontSize={25} fontWeight={600} color="text">
        Contract deployed
      </Text>
      <Text fontSize={14} fontWeight={600} color="text" mb={10}>
        Please find deployed contract at below address
      </Text>

      <Text fontSize={12} fontWeight={800} color="text" cursor="pointer">
        <a href={`${baseUrl}/address/${contract?.address}`} target="_blank">
          {contract?.address}
        </a>
      </Text>
    </LoadingWrapper>
  )
}
const Loading = () => {
  return (
    <LoadingWrapper>
      <Box>
        <Loader />
      </Box>
      <Text fontSize={25} fontWeight={800} color="text">
        Deploying...
      </Text>
    </LoadingWrapper>
  )
}
const Confirmation = ({ handleDeploy, toggleConfirmation, loading }) => {
  return (
    <LoadingWrapper>
      <Text fontSize={25} fontWeight={800} color="text" textAlign="center" mt={20}>
        Are you sure you want to deploy collection before launch date ?
      </Text>
      <Flex mt={40}>
        <Button variant="secondary" height={50} width={100} onClick={toggleConfirmation} mr={20}>
          Cancel
        </Button>
        <Button variant="solid" height={50} width={100} disabled={loading} onClick={handleDeploy}>
          Confirm
        </Button>
      </Flex>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 150px;
`

export default DeployCollectionContract
