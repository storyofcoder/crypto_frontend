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
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../state/Auth/actions";
import { notify } from "../../components/atoms/Notification/Notify";
import { convertToUsd } from "../../utils";
import { NextLinkFromReactRouter } from "../../components/atoms/NextLink";
import { useRouter } from "next/router";

const Rankings = () => {
  const [parsingUrl, setParsingUrl] = useState(true)
  const { user, isLoggedIn, conversionRate } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const { query } = router

  const {
    isLoading,
    error,
    data: myOffers,
    isFetched,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery('myOffers', fetchRankings, {
    enabled: !parsingUrl,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.length >= 10 ? pages.length : undefined),
  })

  const myOfferDataList = useMemo(() => flatten(map(myOffers?.pages)), [myOffers?.pages])

  async function fetchRankings({ pageParam = 0 }) {
    const limit = 10
    const offset = pageParam * 10
    return API.getMyOffers(query.username, offset, limit)
  }

  useEffect(() => {
    refetch()
  }, [query.username])

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
                {capitalize(record.name)}
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
      title: 'Made On',
      dataIndex: 'made',
      key: 'made',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) =>
        isLoggedIn && user?.username === query.username ? (
          record.status === 'valid' ? (
            <div>
              <Button variant="secondary" onClick={() => cancelOffer(record.offerId, record.tokenId)}>
                Cancel
              </Button>
            </div>
          ) : record.status === 'accepted' ? (
            <div>
              <Button
                variant="secondary"
                onClick={() =>
                  settleOffer(record.offerId, record.tokenId, record.price, record.unit, record.contractAddress)
                }
              >
                Settle offer
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
          <Text>{record?.made}</Text>
        </div>
      ),
    },
  ]

  async function cancelOffer(offerId, tokenId) {
    try {
      const res = await API.cancelOffer(offerId, user.username, user.signature)

      Mixpanel.track(MixpanelEvents.CANCEL_OFFER, {
        tokenId,
        username: user?.username,
        offerId,
      })

      dispatch(refreshUser())
      refetch()
    } catch (e) {
      notify.error('Something went wrong', e.message)
    }
  }
  async function settleOffer(...props) {
    const [offerId, tokenId, price, unit, contractAddress] = props
    router.push(
      `/settle-offer?tokenId=${tokenId}&contractAddress=${contractAddress}&offerId=${offerId}&price=${price}&unit=${unit}`,
    )
  }

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
                          record.status === 'valid' ? (
                            <div>
                              <Button variant="secondary" onClick={() => cancelOffer(record.offerId, record.tokenId)}>
                                Cancel
                              </Button>
                            </div>
                          ) : record.status === 'accepted' ? (
                            <div>
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  settleOffer(
                                    record.offerId,
                                    record.tokenId,
                                    record.price,
                                    record.unit,
                                    record.contractAddress,
                                  )
                                }
                              >
                                Settle offer
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
  //padding: 0 0px;
  //max-width: var(--max-width);
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
