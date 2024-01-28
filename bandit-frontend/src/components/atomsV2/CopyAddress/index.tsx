import React, { useState } from 'react'
import styled from 'styled-components'
import { utils } from 'ethers'
import { Box, Flex } from '../../atoms/StyledSystem'
import { getBlockExplorer, truncateAddress } from '../../../utils'
import CopyIcon from '../../atoms/svg/Copy'
import CheckCircle from '../../atoms/svg/CheckCircle'
import useTheme from '../../../hooks/useTheme'
import { copyText } from '../../../utils/copyText'
import { BLOCK_EXPLORER } from '../../../constant/chains'
import { NULL_ADDRESS } from 'constant/values'

const Wrapper = styled(Flex)`
  align-items: center;
  position: relative;
`
const Address = styled.a`
  // color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline !important;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Icon = styled(CopyIcon)`
  cursor: pointer;
`
const Copied = styled(CheckCircle)`
  cursor: pointer;
`

const CopyAddress = (props) => {
  const [copied, setCopied] = useState(false)
  const { address, addressLength = 5, chainId = 1 } = props

  const { theme } = useTheme()

  const isValidAddress = utils.isAddress(address)
  const onClickCopy = () => {
    setCopied(true)

    copyText(isValidAddress ? address : NULL_ADDRESS)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <Box {...props}>
      <Wrapper>
        <Address href={`${BLOCK_EXPLORER[chainId]}address/${address}`} target="_blank">
          {isValidAddress ? truncateAddress(address, addressLength) : truncateAddress(NULL_ADDRESS, addressLength)}
        </Address>
        {copied ? (
          <Copied width={24} height={24} iconcolor={copied ? theme.colors.success : theme.colors.text} />
        ) : (
          <Icon width={24} height={24} onClick={onClickCopy} iconcolor={theme.colors.text} />
        )}
      </Wrapper>
    </Box>
  )
}

export default CopyAddress
