import React, { useState } from "react";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { notify } from "../../components/atoms/Notification/Notify";
import Loader from "../../components/atoms/Loader/Loader";
import useDecideContract from "../../hooks/useDecideContract";

const BurnConfirmation = ({ close, tokenId, token, refreshProfile }: any) => {
  const user = useSelector((state: any) => state.auth.user)
  const [loading, setLoading] = useState(false)

  const { contractAddress } = token
  const { initDecideContract } = useDecideContract()
  const { nftContract } = initDecideContract(contractAddress)

  async function burnToken() {
    try {
      setLoading(true)
      const tx = await nftContract.burn(tokenId)
      await tx.wait()
      await API.burnToken(tokenId, contractAddress, user.username, user.signature)
      refreshProfile()
      setLoading(false)
      close()
      notify.success('Successfully burnt the NFT', '')
    } catch (e) {
      setLoading(false)
      notify.error('Something went wrong. Try Again', '')
    }
  }
  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading ? (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'5px'}>
            Are you sure you want to burn this token?
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20} textAlign="center">
            Burning an NFT destroys the token and completely removes it from the blockchain. This transaction cannot be
            undone.
          </Text>
          <Button variant="secondary" onClick={burnToken}>
            Confirm
          </Button>
          <Text style={{ cursor: 'pointer' }} onClick={close} mt={10}>
            Cancel
          </Text>
        </>
      ) : (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600">
            Please wait until we burn the token
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Flex>
  )
}

export default BurnConfirmation
