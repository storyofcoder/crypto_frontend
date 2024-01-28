import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button/Button";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Loader from "../../components/atoms/Loader/Loader";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useERC721Contracts from "../../hooks/useERC721Contracts";
import { notify } from "../../components/atoms/Notification/Notify";
import { BNB } from "../../constant/currencies";
import { truncateAddress } from "../../utils";

const WithdrawFundsFromContract = ({ collectionDetails, close }) => {
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [contract, setContract] = useState(null)

  const { getContract } = useERC721Contracts()

  const { account, library } = useActiveWeb3React()

  useEffect(() => {
    const _contract = getContract(collectionDetails?.contract?.ContractType, collectionDetails.contractAddress)
    fetchBalance(_contract)
    setContract(_contract)
  }, [collectionDetails, library])

  const fetchBalance = async (contract) => {
    try {
      const funds = await library.getBalance(contract.address)
      setBalance(funds.toString())
    } catch (e) {
      console.log(e)
    }
  }

  const handleWithdraw = async () => {
    setLoading(true)
    try {
      const transaction = await contract.withdraw()
      await transaction.wait()
      setLoading(false)
      notify.success('Successfully withdrawn funds', '')
      close()
    } catch (e) {
      console.log(e)
      setLoading(false)
      notify.error('Failed to withdraw funds', e?.message)
    }
  }

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text fontSize={22} fontWeight={700} mb={20}>
            WITHDRAW FUNDS
          </Text>
          <Text fontSize={[16]} fontWeight={500} textAlign="center" opacity="0.6" mb={20}>
            Funds will be transferred to <br />
            {truncateAddress(account, 10)}
          </Text>
          <Text fontSize={[28]} fontWeight={700}>
            Balance: {BNB.convert(balance)} BNB
          </Text>
          <Box mt={20} mb={20}>
            <Button variant="solid" height={50} width={205} disabled={loading || balance <= 0} onClick={handleWithdraw}>
              Withdraw
            </Button>
          </Box>
        </>
      )}
    </Flex>
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

export default WithdrawFundsFromContract
