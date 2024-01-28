import React from 'react'
import { InputHybrid } from '../../../components/atomsV2/Input'
import Switch from '../../../components/atoms/Switch/Switch'
import { Popover } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import { InfoCircleOutlined } from '@ant-design/icons/lib/icons'
import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'
import DatePicker from '../../../components/atoms/DatePicker/DatePicker'

const WithoutPhases = ({ formik, launchDate, setLaunchDate }) => {
  return (
    <div>
      <InputHybrid
        type="number"
        label="Minting Price (ETH)"
        placeholder="Enter Price"
        name="contractPrice"
        error={formik.errors.contractPrice}
        touched={formik.touched.contractPrice}
        value={formik.values.contractPrice}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        popover={() => <div style={{ padding: '10px' }}>Minting price for each NFT</div>}
        space={{
          mb: 10,
        }}
      />

      <Flex mt={10} mb={10} ml={1} alignItems="center">
        <Switch defaultChecked={formik.values.revealableContract} onChange={(e) => formik.setFieldValue('revealableContract', e)} />
        <Text fontSize={14} fontWeight={500} ml={2} color="textTertiary">
          Delay Reveal
        </Text>
        <Popover content={() => <div style={{ padding: '10px' }}>Select yes to reveal the NFT collection later</div>}>
          <Box>
            <InfoCircleOutlined
              style={{
                position: 'relative',
                left: '5px',
                top: '-2px',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Popover>
      </Flex>

      <InputHybrid
        type="text"
        label={formik.values.revealableContract ? 'IPFS /CID prior reveal' : 'IPFS /CID'}
        placeholder="CID URL"
        name="contractURL"
        error={formik.errors.contractURL}
        touched={formik.touched.contractURL}
        value={formik.values.contractURL}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        popover={() => (
          <div style={{ padding: '10px' }}>
            The hash can be obtained from <br />
            the path in IPFS where you <br /> upload your content{' '}
            <a href={'contractGuidelines'} target="_blank" style={{ color: '#000000', fontWeight: 600 }}>
              Know more
            </a>
          </div>
        )}
        space={{
          mb: 10,
        }}
      />
      <InputHybrid
        type="text"
        label="Maximum NFTs per user"
        placeholder="Maximum NFTs per user"
        name="maxMint"
        error={formik.errors.maxMint}
        touched={formik.touched.maxMint}
        value={formik.values.maxMint}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        popover={() => (
          <div style={{ padding: '10px' }}>
            Maximum number of NFTs can be <br /> minted by a single user
          </div>
        )}
        space={{
          mb: 10,
        }}
      />

      <InputHybrid
        label={`Launch date (UTC${moment().format('Z')})`}
        required={true}
        popover={() => (
          <div style={{ padding: '10px' }}>
            Launch date can only be set once. Please contact support to update the date once it has been set.
          </div>
        )}
        space={{
          mb: 10,
        }}
        customInput={
          <DatePicker
            name="startDate"
            value={formik.values.startDate}
            onChange={(value) => formik.setFieldValue('startDate', value)}
            minDate={new Date().getTime()}
          />
        }
      />
    </div>
  )
}

export default WithoutPhases
