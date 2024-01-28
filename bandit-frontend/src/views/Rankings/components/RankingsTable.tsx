import React from 'react'
import styled from 'styled-components'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { COLLECTION_1K } from '../../../constant/badgesNames'
import { Table } from 'antd'
import { useRouter } from 'next/router'
import { DownIcon, UpIcon, VerifiedIcon } from '../../../components/atoms/svg'
import { Flex, Text, Box } from 'components/atoms/StyledSystem'
import { NextLinkFromReactRouter } from '../../../components/atoms/NextLink'
import { capitalize } from 'lodash'
import { Skeleton } from '../../../components/atomsV2/Skeleton'
import BackgroundImage from '../../../components/atomsV2/Image/BackgroundImage'
import TokenIcon from '../../../components/atoms/svg/tokenIcon'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

export const StyledTable = styled.div`
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
    color: ${(p) => p.theme.colors.foreground};
    font-weight: 500;
    font-size: 14px;
    border-bottom: 1px solid;
    border-color: ${(p) => p.theme.colors.border};
    cursor: pointer;
    vertical-align: middle !important;
    padding: 16px 16px 16px 0 !important;
    white-space: break-spaces;
    
    :before{
      height: 0 !important;
    }
  }
  
  // .ant-table-body{
  //   .ant-table-cell{
  //     ${(p) => p.theme.media.xs} {
  //       padding: 16px 0px !important;
  //     }
  //   }
  // }
  //
  // .ant-table-thead {
  //   .ant-table-cell:first-child{
  //     padding: 16px 16px 16px 0px !important;
  //   }
  // }
  

  .ant-table-row {
    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      font-weight: 500;
      font-size: 14px !important;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      font-size: 14px;
      font-weight: 600;
      color: ${(p) => p.theme.colors.text};
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

const CollectionNameLink = styled.span`
  display: flex;
  align-items: center;
`

const DisplayPercentage = ({ type, value }) => {
  return (
    <Percentage positive={type === '+'}>
      {type}
      {value}%
    </Percentage>
  )
}

export const LargeRankingsTable = ({ data }) => {
  const router = useRouter()
  const columns = [
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      width: '30%',
      render: (text, record) => {
        const { isLoading } = record
        const link =
          record?.collection?.username === COLLECTION_1K
            ? `/discover?nftBadge=1`
            : `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[record?.collection?.chainId]}/${record?.collection?.username}`

        return (
          <NextLinkFromReactRouter to={link}>
            <CollectionNameLink>
              {isLoading ? (
                <Skeleton height={40} width={40} />
              ) : (
                <BackgroundImage src={record?.collection?.profileImage} width={40} height={40} />
              )}

              <Text ml={'5px'} mr={'5px'} fontWeight={500} fontSize={14} color="foreground">
                {isLoading ? <Skeleton height={20} width={150} /> : <>{capitalize(record?.collection?.name)}</>}
              </Text>
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <Flex alignItems="center">
            {Number(record.volume) > 0 ? (
              <>
                <TokenIcon width={14} height={14} /> {record.volume}
              </>
            ) : (
              '--'
            )}
          </Flex>
        ),
      sorter: (a, b) => a.volume - b.volume,
    },

    {
      title: '24h%',
      dataIndex: '24',
      key: '24',
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <div>
            {Number(record.dailyPercentage?.value) > 0 ? <DisplayPercentage {...record.dailyPercentage} /> : '--'}
          </div>
        ),
    },
    {
      title: '7d%',
      dataIndex: '7',
      key: '7',
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <div>
            {Number(record.weekPercentage?.value) > 0 ? <DisplayPercentage {...record.weekPercentage} /> : '--'}
          </div>
        ),
    },
    {
      title: 'Floor Price',
      dataIndex: 'floorPrice',
      key: 'floorPrice',
      sorter: (a, b) => a.floorPrice.value - b.floorPrice.value,
      // sortDirections: ["descend"],
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <div>
            {Number(record.floorPrice) > 0 ? (
              <>
                <TokenIcon width={14} height={14} /> {record.floorPrice}
              </>
            ) : (
              '--'
            )}
          </div>
        ),
    },
    {
      title: 'Owners',
      dataIndex: 'owners',
      key: 'owners',
      render: (text, record) => (record.isLoading ? <Skeleton height={20} width={50} /> : <div>{text}</div>),
      sorter: (a, b) => a.owners - b.owners,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (text, record) => (record.isLoading ? <Skeleton height={20} width={50} /> : <div>{text}</div>),
      sorter: (a, b) => a.items - b.items,
    },
  ]
  return (
    <StyledTable>
      <Table
        // loading={loading}
        pagination={false}
        bordered={false}
        columns={columns}
        dataSource={data}
        sticky
        tableLayout={'fixed'}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              Mixpanel.track(MixpanelEvents.VIEW_COLLECTION_CLICK, {
                from: 'rankings',
                collectionUsername: record?.collection?.username,
              })
              if (record?.collection?.username === COLLECTION_1K) {
                router.push(`/discover?nftBadge=1`)
              } else {
                router.push(`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[record?.collection?.chainId]}/${record?.collection?.username}`)
              }
            },
          }
        }}
      />
    </StyledTable>
  )
}

export const SmallRankingsTable = ({ data }) => {
  const columns = [
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      ellipsis: true,
      width: '55%',
      render: (text, record) => {
        const { isLoading } = record
        const link =
          record?.collection?.username === COLLECTION_1K
            ? `/discover?nftBadge=1`
            : `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[record?.collection?.chainId]}/${record?.collection?.username}`
        return (
          <NextLinkFromReactRouter to={link}>
            <CollectionNameLink>
              <>
                {isLoading ? (
                  <Skeleton height={40} width={40} />
                ) : (
                  <BackgroundImage src={record?.collection?.profileImage} width={40} height={40} />
                )}

                <Text
                  ml={'5px'}
                  mr={'5px'}
                  fontWeight={500}
                  fontSize={14}
                  color="foreground"
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {isLoading ? <Skeleton height={20} width={60} /> : <>{capitalize(record?.collection?.name)}</>}
                </Text>
              </>
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      ellipsis: true,
      render: (text, record) => (
        <div>
          {record.isLoading ? (
            <Skeleton height={15} width={40} mb={10}/>
          ) : (
            <Text>
              {Number(record.volume) > 0 ? (
                <>
                  <TokenIcon width={14} height={14} /> {record.volume}
                </>
              ) : (
                '--'
              )}
            </Text>
          )}

          {record.isLoading ? (
            <Skeleton height={15} width={40} />
          ) : (
            <Text>
              {Number(record.dailyPercentage?.value) > 0 ? <DisplayPercentage {...record.dailyPercentage} /> : '--'}
            </Text>
          )}
        </div>
      ),
      sorter: (a, b) => a.volume.value - b.volume.value,
    },
  ]
  return (
    <StyledTable>
      <Table
        // loading={loading}
        pagination={false}
        bordered={false}
        columns={columns}
        dataSource={data}
        sticky
        tableLayout={'fixed'}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       Mixpanel.track(MixpanelEvents.VIEW_COLLECTION_CLICK, {
        //         from: "rankings",
        //         collectionUsername: record?.collection?.username,
        //       });
        //       history.push(`/collection/${record?.collection?.username}`);
        //     }, // click row
        //   };
        // }}
        expandable={{
          expandedRowRender: (record) => (
            <Flex justifyContent="space-between" width="100%" overflow="auto" pb={'5px'}>
              <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                <Text fontSize={12}>7d %</Text>
                <Text fontSize={14}>
                  {Number(record.weekPercentage?.value) > 0 ? <DisplayPercentage {...record.weekPercentage} /> : '--'}
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                <Text fontSize={12}>Floor Price</Text>
                <Text
                  fontSize={14}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {record.floorPrice.value ? `${record.floorPrice.value} ${record.floorPrice.unit}` : '--'}
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                <Text fontSize={12}>Owners</Text>
                <Text
                  fontSize={14}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {record.owners}
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                <Text fontSize={12}>Items</Text>
                <Text
                  fontSize={14}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {record.items}
                </Text>
              </Flex>
            </Flex>
          ),
          expandIcon: (props) => {
            return !props.expanded ? (
              <DownIcon
                onClick={(e) => {
                  // @ts-ignore
                  props.onExpand(props.record, e)
                }}
              />
            ) : (
              <UpIcon
                onClick={(e) => {
                  // @ts-ignore
                  props.onExpand(props.record, e)
                }}
              />
            )
          },
        }}
      />
    </StyledTable>
  )
}
