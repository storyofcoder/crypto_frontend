import React, { useState } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Input from "../../components/atoms/Form/CustomInput";
import Button from "../../components/atoms/Button/Button";
import { notify } from "../../components/atoms/Notification/Notify";
import Loader from "../../components/atoms/Loader/Loader";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useERC721Contracts from "../../hooks/useERC721Contracts";
import validateIpfsFormat from "../../utils/ipfsValidation";

const RevealContract = ({ collectionDetails, close, refresh }) => {
  const [loading, setLoading] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')
  const { account } = useActiveWeb3React()
  const { getContract } = useERC721Contracts()

  const handleSave = async () => {
    setLoading(true)

    const isValidIpfsFormat = await validateIpfsFormat(baseUrl.trim(), true)

    if (!isValidIpfsFormat) {
      setLoading(false)
      return notify.error('Invalid IPFS hash/CID', 'Please review the Contract Guidelines again')
    }

    try {
      const _baseUrl = `ipfs://${baseUrl.trim()}/`
      const contract = getContract(collectionDetails?.contract?.ContractType, collectionDetails.contractAddress)
      const transaction = await contract.setBaseURI(_baseUrl)
      await transaction.wait()
      setLoading(false)
      notify.success('Successfully updated the base URL', '')
      refresh()
      close()
    } catch (e) {
      setLoading(false)
      notify.error('Failed to update base URL', e?.message)
    }
  }
  const handleChange = (e) => {
    setBaseUrl(e.target.value)
  }

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text fontSize={24} fontWeight={500}>
            Update Base URL
          </Text>
          <Text fontSize={16} fontWeight={500}>
            Caution: You can set the base url only once.
          </Text>
          <Box width="100%" mt={10}>
            <Input
              type="text"
              label="IPFS hash/CID"
              placeholder="Qma9dKtMSVhz5s7xzFE2HmzRr4MWerUJRH3oMoRHi64siK"
              name="baseUrl"
              required={true}
              value={baseUrl}
              onChange={handleChange}
            />
          </Box>
          <Box mt={20} mb={20}>
            <Button variant="solid" height={50} width={205} disabled={loading} onClick={handleSave}>
              Update
            </Button>
          </Box>
        </>
      )}
    </Flex>
  )
}

const Deployed = ({ contract }) => {
  return (
    <LoadingWrapper>
      <Text fontSize={25} fontWeight={800} color="text">
        Contract deployed
      </Text>

      <Text fontSize={25} fontWeight={800} color="text">
        {contract.address}
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
        Please wait...
      </Text>
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

export default RevealContract
