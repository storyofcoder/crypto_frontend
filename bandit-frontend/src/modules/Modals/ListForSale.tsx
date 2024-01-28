import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import Button from "../../components/atoms/Button/Button";
import { Form, Popover, Radio } from "antd";
import Input from "../../components/atoms/Form/Input";
import styled from "styled-components";
import { notify } from "../../components/atoms/Notification/Notify";
import { useSelector } from "react-redux";
import API from "../../services/API";
import { DECIMAL_FIX, MAX_PRICE } from "../../constant/values";
import Loader from "../../components/atoms/Loader/Loader";
import BigNumber from "bignumber.js";
import { useAuctionContract, useNftContract, useSaleContract } from "../../hooks/useContract";
import { getEscrowAddress } from "../../utils/addressHelpers";
import { callWithEstimateGas } from "../../utils/callWithGasEstimation";
import { InfoCircleOutlined } from "@ant-design/icons/lib/icons";
import { convertToUsd, decimalFix } from "../../utils";
import useWalletSource from "../../hooks/useWalletSource";
import SplitBreakupPopover from "../../components/molecules/Token/SplitBreakPopover";

const Wrapper = styled(Flex)`
  #horizontal_list-for-sale {
    width: 100%;
  }

  .ant-radio-button-wrapper-checked {
    background-color: ${(p) => p.theme.colors.text4} !important;
    border-color: ${(p) => p.theme.colors.text4} !important;
    &:hover {
      color: ${(p) => p.theme.colors.bg2} !important;
    }
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 14px;

  b,
  small {
    color: ${(p) => p.theme.colors.text4};
  }
`

const FinalBreakUp = styled(Flex)`
  align-items: baseline;

  b,
  small {
    color: ${(p) => p.theme.colors.text4};
    margin-left: 5px;
  }
`

const ListForSale = ({ close, token, refresh, isSecondary }) => {
  const [loading, setLoading] = useState(false)
  const [listingState, setListingState] = useState('')
  const [saleType, setSaleType] = useState<any>('buy')
  const [hasOffersOnNft, setHasOffersOnNft] = useState(false)

  const { royalty = 0 } = token
  const tokenRoyaltyValue = Number(royalty) / DECIMAL_FIX

  const { conversionRate } = useSelector((state: any) => state.auth)

  const [state, setState] = useState<any>({
    price: null,
    royalty: null,
  })

  const [form] = Form.useForm()
  const user = useSelector((state: any) => state.auth.user)

  const saleContract = useSaleContract()
  const nftContract = useNftContract()
  const auctionContract = useAuctionContract()
  const walletSource = useWalletSource()

  const escrowAddress = getEscrowAddress()

  const needRoyalty = token.tokenCreator === token.tokenOwner && token.tokenCreator === user?.username

  const saleTypeOptions = [
    { label: 'Fixed Price', value: 'buy' },
    { label: 'Auction', value: 'auction', disabled: hasOffersOnNft },
  ]

  const SERVICE_FEE = 5

  async function checkNftHasOffers() {
    const owner = await nftContract.ownerOf(token.id)

    if (owner === escrowAddress) {
      setHasOffersOnNft(true)
    }
  }

  useEffect(() => {
    checkNftHasOffers()
  }, [])

  function handlePriceChange(value: any) {
    if (value === 0) return form.setFieldsValue({ price: state.price })
    form.setFieldsValue({ price: value && value.toFixed(2) })
    setState({ ...state, price: value && value.toFixed(2) })
  }
  function handleRoyalty(value: any) {
    form.setFieldsValue({ royalty: value && value.toFixed(2) })
    setState({ ...state, royalty: value && value.toFixed(2) })
  }

  function onSaleTypeChange(e) {
    setSaleType(e.target.value)
  }

  async function listForSale() {
    setLoading(true)
    setListingState('Loading...')
    try {
      const state = await form.getFieldsValue(true)

      const tokenPrice = new BigNumber(state.price).times(100000000).toFixed()

      const tokenRoyalty = needRoyalty ? parseInt((state.royalty * 100000000).toString()) : 0

      const address = await nftContract.getApproved(token.id)
      const owner = await nftContract.ownerOf(token.id)

      if (owner !== escrowAddress && address !== escrowAddress) {
        setListingState('Escrowing NFT...')
        const transaction = await callWithEstimateGas(nftContract, 'approve', [escrowAddress, token.id])
        await transaction.wait()
      }

      if (saleType === 'buy') {
        setListingState('Listing NFT for Sale...')
        let txBuySale = null

        if (hasOffersOnNft) {
          txBuySale = await saleContract.putOnBuySaleWithOffers(token.id, tokenPrice, tokenRoyalty)
        } else {
          txBuySale = await saleContract.putOnBuySale(token.id, tokenPrice, tokenRoyalty)
        }

        await txBuySale.wait()
        await API.listTokenOnSale(token.id, tokenPrice, user.username, user.signature, tokenRoyalty, walletSource)
      } else {
        setListingState('Listing NFT for Auction...')
        let txSale = null

        if (needRoyalty) {
          txSale = await auctionContract['createAuction(uint256,uint256,uint256)'](token.id, tokenPrice, tokenRoyalty)
        } else {
          txSale = await auctionContract['createAuction(uint256,uint256)'](token.id, tokenPrice)
        }

        await txSale.wait()

        await API.listTokenOnAuction(token.id, tokenPrice, user.username, user.signature, tokenRoyalty, walletSource)
      }

      setLoading(false)
      refresh()
      close()
      notify.success('Successfully listed for sale', '')
    } catch (e) {
      console.log(e)
      notify.error('Something went wrong', 'Please try again')
      setListingState('')
      setLoading(false)
    }
  }

  function cutCommission(price) {
    if (needRoyalty) {
      return (price * (1 - SERVICE_FEE / 100)).toFixed(2)
    }
    return (price - price * ((tokenRoyaltyValue + SERVICE_FEE) / 100)).toFixed(2)
  }

  const splitEnabled = needRoyalty && token.splits && token.splits.length > 0

  return (
    <Wrapper flexDirection="column" alignItems="center" backgroundColor="bg2" mt={20}>
      {!loading && (
        <>
          <Text fontSize="20px" fontWeight="600" mb={'20px'}>
            List for Sale
          </Text>
          <Form form={form} name="horizontal_list-for-sale" onFinish={listForSale}>
            {needRoyalty && (
              <Form.Item
                name="royalty"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a valid royalty.',
                  },
                ]}
              >
                <Input
                  type="number"
                  label="Royalty (Max 15%)"
                  placeholder="Set your royalty percentage. Min 1, Max 15"
                  style={{ width: '100%' }}
                  name="royalty"
                  value={state.royalty}
                  min="1"
                  max="15"
                  onChange={handleRoyalty}
                />
              </Form.Item>
            )}
            <Box mb={20}>
              <Radio.Group
                options={saleTypeOptions}
                onChange={onSaleTypeChange}
                value={saleType}
                optionType="button"
                buttonStyle="solid"
              />
            </Box>
            {hasOffersOnNft && (
              <Text fontSize={'12px'} mb={10}>
                NFT cannot be listed on auction because you have accepted an offer
              </Text>
            )}
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please provide a valid price.',
                },
              ]}
            >
              <Input
                type="number"
                label={
                  <Flex alignItems="center">
                    {`${saleType === 'buy' ? 'Price' : 'Reserve price'} (WRX)`}{' '}
                    {saleType !== 'buy' && (
                      <Popover
                        content={() => (
                          <div style={{ padding: '10px' }}>
                            Reserve price is the minimum amount you're <br />
                            willing to accept. A 24 hour auction will be
                            <br />
                            initiated once there is any bid which cannot <br /> be less than reserve price
                          </div>
                        )}
                      >
                        <InfoCircleOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} />
                      </Popover>
                    )}
                  </Flex>
                }
                placeholder={`Set the NFT price (WRX)`}
                style={{ width: '100%' }}
                name="price"
                value={state.price}
                max={MAX_PRICE}
                step="0.01"
                onChange={handlePriceChange}
              />
            </Form.Item>
            <Box mb={20}>
              {!needRoyalty && (
                <StyledText>
                  Royalty <b>{tokenRoyaltyValue}%</b>
                </StyledText>
              )}
              {SERVICE_FEE > 0 && (
                <StyledText>
                  Service fee <b>{SERVICE_FEE}%</b>
                </StyledText>
              )}

              {saleType === 'buy' && (
                <FinalBreakUp>
                  {splitEnabled ? 'Creators will receive' : 'You will receive'}{' '}
                  <b>{cutCommission(state.price) || 0} WRX</b> {/*// @ts-ignore*/}
                  <small>{cutCommission(convertToUsd(Number(state.price), conversionRate.USD)) || 0} USD</small>
                  {splitEnabled && (
                    <SplitBreakupPopover
                      usersList={token.splits.map((u) => ({
                        username: u.username,
                        price: Number(cutCommission(state.price)) * (decimalFix(u.percentage) / 100),
                        unit: '',
                      }))}
                    />
                  )}
                </FinalBreakUp>
              )}
            </Box>
            <Flex justifyContent="center">
              <Button htmlType="submit" variant="secondary">
                Confirm
              </Button>
            </Flex>
          </Form>

          <Text style={{ cursor: 'pointer' }} onClick={close} mt={10}>
            Cancel
          </Text>
        </>
      )}

      {loading && (
        <>
          <Loader />
          <Text fontSize="20px" fontWeight="600">
            {listingState}
          </Text>
          <Text fontSize="20" fontWeight="500" mb={20}>
            Please do not refresh the page.
          </Text>
        </>
      )}
    </Wrapper>
  )
}

export default ListForSale
