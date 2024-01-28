import { Popover, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { COLLECTION_1K } from '../../../constant/badgesNames'
import { NextLinkFromReactRouter } from '../../../components/atoms/NextLink'
import { Skeleton } from '../../../components/atomsV2/Skeleton'
import BackgroundImage from '../../../components/atomsV2/Image/BackgroundImage'
import capitalize from 'lodash/capitalize'
import TokenIcon from '../../../components/atoms/svg/tokenIcon'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'
import { DownIcon, NotifyInfoIcon, UpIcon } from '../../../components/atoms/svg'
import { StyledTable } from 'views/Rankings/components/RankingsTable'
import { Flex, Text, Box } from '../../../components/atoms/StyledSystem'
import moment from 'moment'
import { getImageUrl, makeFriendlyNumber } from 'utils'
import { InfoCircleOutlined } from '@ant-design/icons/lib/icons'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

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
export const LargeCalendarTable = ({ data }) => {
  const router = useRouter()
  const columns = [
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      width: '30%',
      render: (text, record) => {
        const { isLoading } = record
        const link = `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[record?.chainId]}/${record?.username}`

        return (
          <NextLinkFromReactRouter to={link}>
            <CollectionNameLink>
              {isLoading ? (
                <Skeleton height={40} width={40} />
              ) : (
                <BackgroundImage
                  src={getImageUrl(record?.profileImage, { height: 50, quality: 80 })}
                  width={40}
                  height={40}
                  borderRadius="6px"
                />
              )}

              <Text ml={'5px'} mr={'5px'} fontWeight={500} fontSize={14} color="foreground">
                {isLoading ? <Skeleton height={20} width={150} /> : <>{capitalize(record?.name)}</>}
              </Text>
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: () => (
        <Popover
          content={() => (
            <Text fontSize="12px" p={10}>
              Date time are in UTC (Universal Time)
            </Text>
          )}
        >
          <Flex alignItems="center">
            Launch Date
            <InfoCircleOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Flex>
        </Popover>
      ),
      dataIndex: 'launchDate',
      key: 'launchDate',
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <Flex alignItems="center">
            {record.launchDate ? moment.unix(record.launchDate).format('MMM Do YYYY, h:mm a') : '--'}
          </Flex>
        ),
    },

    {
      title: 'Total Supply',
      dataIndex: 'totalSupply',
      key: 'totalSupply',
      sorter: (a, b) => a.totalSupply - b.totalSupply,
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <div title={record.totalSupply}>
            {record.totalSupply > 0
              ? record.totalSupply > 9999
                ? makeFriendlyNumber(record.totalSupply)
                : record.totalSupply
              : '--'}
          </div>
        ),
    },

    {
      title: 'Mint Price',
      dataIndex: 'mintPrice',
      key: 'mintPrice',
      sorter: (a, b) => a.mintPrice - b.mintPrice,
      // sortDirections: ["descend"],
      render: (text, record) =>
        record.isLoading ? (
          <Skeleton height={20} width={50} />
        ) : (
          <Flex alignItems="center">
            {Number(record.mintPrice) > 0 ? (
              <>
                <TokenIcon width={14} height={14} chainId={record.chainId} mr="5px" /> {record.mintPrice}
              </>
            ) : (
              '--'
            )}
          </Flex>
        ),
    },
    {
      title: () => (
        <Flex alignItems="center">
          Mint %
          <Popover
            placement="top"
            content={() => (
              <Text fontSize="12px" p={10}>
                Percentage of items already minted
              </Text>
            )}
          >
            <InfoCircleOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} />
          </Popover>
        </Flex>
      ),
      dataIndex: 'mintPercentage',
      key: 'mintPercentage',
      render: (text, record) => (record.isLoading ? <Skeleton height={20} width={50} /> : <div>{text}%</div>),
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
      />
    </StyledTable>
  )
}

export const SmallCalendarTable = ({ data }) => {
  const columns = [
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      ellipsis: true,
      width: '50%',
      render: (text, record) => {
        const { isLoading } = record
        const link = `/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[record?.chainId]}/${record?.username}`
        return (
          <NextLinkFromReactRouter to={link}>
            <CollectionNameLink>
              <>
                {isLoading ? (
                  <Skeleton height={40} width={40} />
                ) : (
                  <BackgroundImage
                    src={getImageUrl(record?.profileImage, { height: 200, quality: 80 })}
                    width={40}
                    height={40}
                    borderRadius="6px"
                  />
                )}

                <Text
                  ml={'5px'}
                  mr={'5px'}
                  fontWeight={500}
                  fontSize={14}
                  color="foreground"
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {isLoading ? <Skeleton height={20} width={60} /> : <>{capitalize(record?.name)}</>}
                </Text>
              </>
            </CollectionNameLink>
          </NextLinkFromReactRouter>
        )
      },
    },
    {
      title: 'Launch Date',
      dataIndex: 'launchDate',
      key: 'launchDate',
      ellipsis: true,
      render: (text, record) => (
        <div>
          {record.isLoading ? (
            <Skeleton height={15} width={40} mb={10} />
          ) : (
            <Text>{record.launchDate ? moment.unix(record.launchDate).format('MMM Do YYYY, h:mm a') : '--'}</Text>
          )}
        </div>
      ),
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
                <Text fontSize={12}>Total Supply</Text>
                <Text fontSize={14} title={record.totalSupply}>
                  {record.totalSupply > 0
                    ? record.totalSupply > 9999
                      ? makeFriendlyNumber(record.totalSupply)
                      : record.totalSupply
                    : '--'}
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                <Text fontSize={12}>Mint Price</Text>
                <Text
                  fontSize={14}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {Number(record.mintPrice) > 0 ? (
                    <>
                      <TokenIcon width={14} height={14} chainId={record.chainId} mr="5px" /> {record.mintPrice}
                    </>
                  ) : (
                    '--'
                  )}
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" minWidth="30%" textAlign="center">
                <Text fontSize={12}>Mint %</Text>
                <Text
                  fontSize={14}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {record.mintPercentage}%
                </Text>
              </Flex>
            </Flex>
          ),
          expandIcon: (props) => {
            return !props.expanded ? (
              <DownIcon
                width={12}
                height={12}
                onClick={(e) => {
                  // @ts-ignore
                  props.onExpand(props.record, e)
                }}
              />
            ) : (
              <UpIcon
                width={12}
                height={12}
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
