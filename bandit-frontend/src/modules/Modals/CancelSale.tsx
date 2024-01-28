import React, { useState } from "react";
import { Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { notify } from "../../components/atoms/Notification/Notify";
import Loader from "../../components/atoms/Loader/Loader";
import { MODAL, showModal } from "./index";
import useDecideContract from "../../hooks/useDecideContract";

const CancelSale = ({ close, token, refreshProfile, showTransfer = false, cancelOnly = false }: any) => {
  const user = useSelector((state: any) => state.auth.user)
  const [loading, setLoading] = useState(false)

  const { initDecideContract } = useDecideContract()
  const { saleContract, auctionContract, isExternalContract } = initDecideContract(token?.contractAddress)

  const { id, contractAddress } = token

  async function cancelToken() {
    try {
      setLoading(true)
      let args = [id]

      if (isExternalContract) {
        args.splice(1, 0, contractAddress)
      }
      if (token.saleType === 'buy') {
        const tx = await saleContract.cancelBuySale(...args)
        await tx.wait()
        await API.cancelSale(id, contractAddress, user.username, user.signature)
      } else if (token.saleType === 'auction') {
        const tx = await auctionContract.cancelAuction(...args)
        await tx.wait()
        await API.cancelAuction(id, contractAddress, user.username, user.signature)
      }

      setLoading(false)
      close()
      refreshProfile()

      if (!cancelOnly) {
        if (showTransfer) {
          showModal(MODAL.TRANSFER_TOKEN, {
            tokenId: id,
            token,
            transferNFT: refreshProfile,
            user,
          })
        } else {
          showModal(MODAL.BURN_CONFIRMATION, {
            tokenId: token.id,
            token,
            refreshProfile,
          })
        }
      }

      notify.success('De-listed successfully', '')
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
            Please cancel the {token.saleType === 'auction' ? 'auction' : 'sale'} before proceeding.
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20} textAlign="center">
            This transaction cannot be undone.
          </Text>
          <Button variant="secondary" onClick={cancelToken}>
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
            Please wait until we de-list the NFT from sale
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Flex>
  )
}

export default CancelSale
