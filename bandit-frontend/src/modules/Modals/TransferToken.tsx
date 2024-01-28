import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import API from "../../services/API";
import Loader from "../../components/atoms/Loader/Loader";
import { notify } from "../../components/atoms/Notification/Notify";
import { hideModal } from "./index";
import useDecideContract from "../../hooks/useDecideContract";
import { truncateUsername } from "../../utils";

const { Option } = Select

const StyledButton = styled(Button)`
  background: #11110f;
  border-radius: 26.5px;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`

const PriceWrapper = styled(Box)`
  display: flex;
  align-items: center;
`

const Footer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
  align-items: center;
  width: 100%;
`

const TransferToken = ({ tokenId, token, transferNFT, user }) => {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userList, setUsersList] = useState([])
  const [userSearchValue, setUserSearchValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasOffersOnNft, setHasOffersOnNft] = useState(false)

  const { contractAddress } = token

  const { initDecideContract } = useDecideContract()
  const { nftContract, escrowAddress } = initDecideContract(contractAddress)

  async function checkNftHasOffers() {
    const owner = await nftContract.ownerOf(tokenId)

    if (owner === escrowAddress) {
      setHasOffersOnNft(true)
    }
  }

  useEffect(() => {
    checkNftHasOffers()
  }, [])

  async function handleSave() {
    const walletAddress = userList[userList.findIndex((user) => user.username == selectedUser)].walletAddress
    setLoading(true)
    try {
      const transaction = await nftContract['safeTransferFrom(address,address,uint256)'](
        user?.wallet_address,
        walletAddress,
        tokenId,
      )

      await transaction.wait()

      await API.transferNFT(tokenId, token.contractAddress, user?.username, user.signature, walletAddress)
      notify.success('NFT Transferred successfully', '')

      transferNFT()
      hideModal()
    } catch (e) {
      notify.error('Something went wrong', e?.message)
    } finally {
      setLoading(false)
    }
  }

  function onChange(value) {
    onSelectUser(value)
    setUserSearchValue(null)
    // setUsersList([]);
  }

  async function onSearch(val) {
    setUserSearchValue(val)
    if (!val) return
    try {
      const res = await API.getUsername(val)
      setUsersList(res)
    } catch (e) {
      console.log(e)
    }
  }

  function onSelectUser(username) {
    setSelectedUser(username)
  }

  return (
    <Flex flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading ? (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'5px'}>
            Transfer NFT
          </Text>

          {!hasOffersOnNft ? (
            <PriceWrapper mb={20} mt={20} width="100%">
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Search by username"
                optionFilterProp="children"
                onSelect={onChange}
                onSearch={onSearch}
                searchValue={userSearchValue}
                autoClearSearchValue
                allowClear
              >
                {userList
                  .filter((u) => u.username !== user?.username)
                  .map((user) => (
                    <Option key={user.username} value={user.username}>
                      {truncateUsername(user.username)}
                    </Option>
                  ))}
              </Select>
            </PriceWrapper>
          ) : (
            <Text marginY={10}>This NFT cannot be transferred because it is for sale/you accepted an offer.</Text>
          )}

          {!hasOffersOnNft && (
            <Footer>
              <StyledButton variant="solid" onClick={handleSave} minWidth={100} disabled={!selectedUser}>
                Transfer NFT
              </StyledButton>
            </Footer>
          )}
        </>
      ) : (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600">
            Transferring NFT
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Flex>
  )
}

export default TransferToken
