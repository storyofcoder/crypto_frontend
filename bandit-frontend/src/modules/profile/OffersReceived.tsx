import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { capitalize, flatten, map } from "lodash";
import { useInfiniteQuery } from "react-query";
import { Table } from "antd";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import API from "../../services/API";
import { DownIcon, UpIcon, VerifiedIcon } from "../../components/atoms/svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";
import Button from "../../components/atoms/Button/Button";
import { useSelector } from "react-redux";
import { callWithEstimateGas } from "../../utils/callWithGasEstimation";
import useDecideContract from "../../hooks/useDecideContract";
import { notify } from "../../components/atoms/Notification/Notify";
import { BNB, WBNB, WRX } from "../../constant/currencies";
import { convertToUsd, truncateUsername } from "../../utils";
import { MODAL, showModal } from "../Modals";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";
import { useRouter } from "next/router";

const Rankings = () => {
  const [parsingUrl, setParsingUrl] = useState(true)
  const { initDecideContract } = useDecideContract()
  const { user, isLoggedIn, conversionRate } = useSelector((state: any) => state.auth)
  const { account } = useActiveWeb3React()
  const router = useRouter()
  const { query } = router

  const {
    isLoading,
    error,
    data: getOfferData,
    isFetched,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch: refetchGetReceivedOffer,
  } = useInfiniteQuery('getOfferData', fetchReceivedOffer, {
    enabled: !parsingUrl,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length >= 10 ? pages.length : undefined),
  })

  const myOfferDataList = useMemo(() => flatten(map(getOfferData?.pages)), [getOfferData?.pages])

  async function fetchReceivedOffer({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * 10
    return API.getReceivedOffer(query.username, offset, limit)
  }

  async function acceptOffer(props) {
    const [offerId, tokenId, price, walletAddress, currency, contractAddress] = props
    const { saleContract, isExternalContract, saleContractAddress, nftContract } = initDecideContract(contractAddress)

    try {
      let offerPrice = WBNB.decimalFix(price)

      const isApprovedForAll = await nftContract.isApprovedForAll(account, saleContractAddress)

      if (!isApprovedForAll) {
        const approveTx = await nftContract.setApprovalForAll(saleContractAddress, true)
        await approveTx.wait()
      }

      let args = [tokenId, walletAddress, offerPrice]

      if (isExternalContract) {
        args.splice(1, 0, contractAddress)
      }

      const tx = await saleContract.acceptOffer(...args)
      const receipt = await tx.wait()
      const res = await API.acceptOffer(
        offerId,
        tokenId,
        contractAddress,
        currency.id,
        user.username,
        user.signature,
        tx.hash,
      )

      Mixpanel.track(MixpanelEvents.ACCEPT_OFFER, {
        tokenId,
        username: user?.username,
        offerId,
        price,
        contractAddress,
      })

      refetchGetReceivedOffer()
      notify.success('Successfully accepted the offer', '')
    } catch (e) {
      console.log(e)
      Mixpanel.track(MixpanelEvents.ACCEPT_OFFER_ERROR, {
        tokenId,
        username: user?.username,
        offerId,
        price,
        contractAddress,
        error: JSON.stringify(e),
      })
      notify.error('Something went wrong', e?.data?.message || e?.message)
    }
  }

  async function getTokenDetail(tokenId, contractAddress) {
    try {
      return await API.fetchNFT(tokenId, contractAddress)
    } catch (e) {
      console.log(e)
    }
  }

  async function escrowBeforeAcceptOffer(props) {
    const [, tokenId, , , , contractAddress] = props
    const { escrowAddress, nftContract } = initDecideContract(contractAddress)

    try {
      const transaction = await callWithEstimateGas(nftContract, 'approve', [escrowAddress, tokenId])
      await transaction.wait()
      notify.success('Successfully escrowed the NFT', '')
      showModal(
        MODAL.TX_LOADING,
        {
          title: 'Are you sure you want to accept this offer?',
          callback: () => acceptOffer(props),
        },
        {},
      )
      return true
    } catch (e) {
      notify.error('Something went wrong', e?.data?.message || e?.message)
      console.log(e)
    }
  }

  async function showAcceptOfferModal(...props) {
    const [, tokenId, price, wallet, currency, contractAddress] = props

    const { escrowAddress, nftContract } = initDecideContract(contractAddress)

    const owner = await nftContract.ownerOf(tokenId)

    if (owner === escrowAddress) {
      const token = await getTokenDetail(tokenId, contractAddress)
      showModal(
        MODAL.CANCEL_SALE,
        {
          token,
          refreshProfile: () => showAcceptOfferModal(...props),
          cancelOnly: true,
        },
        {},
      )
    } else {
      showModal(
        MODAL.TX_LOADING,
        {
          title: 'Are you sure you want to accept this offer?',
          callback: () => acceptOffer(props),
        },
        {},
      )
    }
  }

  useEffect(() => {
    refetchGetReceivedOffer()
  }, [query.username])

  async function cancelAcceptedOffer(props) {
    const [offerId, tokenId, contractAddress] = props
    const { saleContract, isExternalContract } = initDecideContract(contractAddress)
    try {
      const args = [tokenId]
      if (isExternalContract) {
        args.splice(1, 0, contractAddress)
      }
      const tx = await saleContract.revokeOffer(...args)
      const receipt = await tx.wait()
      const res = await API.cancelAcceptedOffer(offerId, tokenId, contractAddress, user.username, user.signature)
      refetchGetReceivedOffer()
    } catch (e) {
      notify.error('Something went wrong', e.message)
    }
  }

  async function showCancelAcceptedOffer(...props) {
    showModal(
      MODAL.TX_LOADING,
      {
        title: 'Are you sure you want to cancel the accepted offer?',
        callback: () => cancelAcceptedOffer(props),
      },
      {},
    )
  }

  const columns = [
    {
      title: 'NFT',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text, record) => {
        return (
          <NextLinkFromReactRouter to={`/assets/${record.contractAddress}/${record.tokenId}`}>
            <CollectionNameLink>
              <Box height={60} width={60} className="image-wrapper">
                <img src={`${record.thumbnail}?h=100&q=80`} />
              </Box>
              <Text ml={'15px'} mr={'5px'} fontWeight={400} fontSize={14} color="text">
                {capitalize(truncateUsername(record.name))}
              </Text>
              {record.isVerified && <VerifiedIcon />}
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'Offered Price',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'From',
      key: 'from',
      render: (text, record) => (
        <NextLinkFromReactRouter to={`/${record.from}`} style={{ color: 'black' }}>
          {record.from}
        </NextLinkFromReactRouter>
      ),
    },
    {
      title: 'Received On',
      dataIndex: 'made',
      key: 'made',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) =>
        isLoggedIn && user?.username === query.username ? (
          record.status === 'accepted' ? (
            <div>
              <Button
                variant="secondary"
                onClick={() => showCancelAcceptedOffer(record.offerId, record.tokenId, record.contractAddress)}
              >
                Cancel Acceptance{' '}
              </Button>
            </div>
          ) : record.status === 'valid' ? (
            <div>
              <Button
                variant="secondary"
                onClick={() =>
                  showAcceptOfferModal(
                    record.offerId,
                    record.tokenId,
                    record.price,
                    record.walletAddress,
                    record.currency,
                    record.contractAddress,
                  )
                }
              >
                Accept
              </Button>
            </div>
          ) : record.status === 'invalid' ? (
            'Cancelled'
          ) : record.status === 'settled' ? (
            'Settled'
          ) : (
            '-'
          )
        ) : (
          '-'
        ),
    },
  ]
  const smallViewColumns = [
    {
      title: 'NFT',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '45%',
      render: (text, record) => {
        return (
          <NextLinkFromReactRouter to={`/assets/${record.contractAddress}/${record.tokenId}`}>
            <CollectionNameLink>
              <Box minWidth={[40, 40, 60]} height={[40, 40, 60]} width={[40, 40, 60]} className="image-wrapper">
                <img src={`${record.thumbnail}?h=100&q=80`} />
              </Box>
              <Text
                ml={'5px'}
                mr={'5px'}
                fontWeight={400}
                fontSize={14}
                color="text"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {capitalize(record.name)}
              </Text>
              {record.isVerified && (
                <Box minWidth="14px">
                  <VerifiedIcon />
                </Box>
              )}
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'Offered',
      dataIndex: 'amount',
      key: 'amount',
      ellipsis: true,
      render: (text, record) => (
        <div>
          <Text>{record?.mobileAmount}</Text>
          <Text>{record?.from}</Text>
          <Text>{record?.made}</Text>
        </div>
      ),
    },
  ]

  const data = myOfferDataList.map((record, index) => {
    const {
      nftName,
      amount,
      username,
      createdAt,
      thumbnail,
      tokenId,
      status,
      offerId,
      unit,
      contractAddress,
      profileImage,
      isVerified,
      offeredByWalletAddress,
    } = record
    return {
      ...record,
      key: index + 1,
      name: nftName,
      amount: `${Number(Number(amount).toFixed(['BNB', 'WBNB'].includes(unit) ? 4 : 2))} ${unit} (${convertToUsd(
        amount,
        unit === 'WRX' ? conversionRate.USD : conversionRate.BNB_USD,
      )} USD)`,
      mobileAmount: `${Number(Number(amount).toFixed(['BNB', 'WBNB'].includes(unit) ? 4 : 2))} ${unit}`,
      from: username,
      made: moment.utc(createdAt).fromNow(),
      thumbnail,
      tokenId,
      status,
      price: amount,
      offerId,
      unit,
      contractAddress,
      profileImage,
      isVerified,
      walletAddress: offeredByWalletAddress,
    }
  })

  return (
    <Container>
      <Box mt={20}>
        <MediaLarge>
          <InfiniteScroll
            dataLength={myOfferDataList.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={null}
          >
            <StyledTable>
              <Table
                loading={isFetching}
                pagination={false}
                bordered={false}
                columns={columns}
                dataSource={data}
                sticky
                tableLayout={'fixed'}
              />
            </StyledTable>
          </InfiniteScroll>
        </MediaLarge>

        <MediaSmall>
          <InfiniteScroll
            dataLength={myOfferDataList.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={null}
          >
            <StyledTable>
              <Table
                loading={isFetching}
                pagination={false}
                bordered={false}
                columns={smallViewColumns}
                dataSource={data}
                sticky
                tableLayout={'fixed'}
                expandable={{
                  expandedRowRender: (record) => (
                    <Flex justifyContent="space-between" width="100%" overflow="auto" pb={'5px'}>
                      <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                        {isLoggedIn && user?.username === query.username ? (
                          record.status === 'accepted' ? (
                            <div>
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  showCancelAcceptedOffer(record.offerId, record.tokenId, record.contractAddress)
                                }
                              >
                                Cancel Acceptance{' '}
                              </Button>
                            </div>
                          ) : record.status === 'valid' ? (
                            <div>
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  showAcceptOfferModal(
                                    record.offerId,
                                    record.tokenId,
                                    record.price,
                                    record.walletAddress,
                                    record.currency,
                                    record.contractAddress,
                                  )
                                }
                              >
                                Accept
                              </Button>
                            </div>
                          ) : record.status === 'invalid' ? (
                            'Cancelled'
                          ) : record.status === 'settled' ? (
                            'Settled'
                          ) : (
                            '-'
                          )
                        ) : (
                          '-'
                        )}
                      </Flex>
                    </Flex>
                  ),
                  expandIcon: (props) => {
                    return !props.expanded ? (
                      <span
                        onClick={(e) => {
                          // @ts-ignore
                          props.onExpand(props.record, e)
                        }}
                      >
                        <DownIcon />
                      </span>
                    ) : (
                      <span
                        onClick={(e) => {
                          // @ts-ignore
                          props.onExpand(props.record, e)
                        }}
                      >
                        {' '}
                        <UpIcon />
                      </span>
                    )
                  },
                }}
              />
            </StyledTable>
          </InfiniteScroll>
        </MediaSmall>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  margin: 0 auto;
  ${(p) => p.theme.media.xlg} {
    //padding: 0 70px;
  }
  ${(p) => p.theme.media.lg} {
    //padding: 0 70px;
  }
`

const CollectionNameLink = styled.span`
  display: flex;
  align-items: center;
  .image-wrapper {
    border-radius: 5px;
    overflow-y: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const StyledTable = styled.div`
  .ant-table,
  .ant-table-sticky-holder {
    background-color: transparent;
  }
  .ant-table-wrapper {
    border-radius: 20px;
    overflow: hidden;
  }
  .ant-table-cell {
    border: none;
    background-color: transparent !important;
    color: ${(p) => p.theme.colors.text};
    font-weight: 700;
    font-size: 14px;
    border-bottom: 1px solid #d3d3d3;
    cursor: pointer;
  }

  .ant-table-row {
    &:hover {
      box-shadow: rgba(4, 7, 9, 0.25) 0px 0px 8px 0px;
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 400;
      font-size: 14px !important;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .ant-spin-dot {
    .ant-spin-dot-item {
      background-color: ${(p) => p.theme.colors.text};
    }
  }
`

const Percentage = styled(Box)`
  color: ${(p) => (p.positive ? '#05944F' : '#E11900')};
`

const MediaLarge = styled(Box)`
  display: none;
  transition: all 0.3s ease;
  ${(p) => p.theme.media.xlg} {
    display: flex;
    justify-content: flex-end;
  }
`
const MediaSmall = styled(Box)`
  display: flex;
  ${(p) => p.theme.media.xlg} {
    display: none;
  }
`

export default Rankings
