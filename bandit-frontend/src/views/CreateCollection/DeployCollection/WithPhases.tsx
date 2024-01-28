import React from 'react'
import { Box, Flex, Text } from '../../../components/atoms/StyledSystem'
import { Button } from '../../../components/atomsV2/Button'
import styled from 'styled-components'
import Switch from '../../../components/atoms/Switch/Switch'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons/lib/icons'
import { PencilOutlineIcon } from 'components/atoms/svg/images2'
import { TrashIcon } from 'components/atoms/svg'
import moment from 'moment'
import { MODAL, showModal } from '../../../modules/Modals'

const WithPhases = ({ onClickAddPhase, formik }) => {
  const onClickConfirm = (phaseIndex, phase) => {
    const _phases = [...formik.values.phases.slice(0, phaseIndex), phase, ...formik.values.phases.slice(phaseIndex + 1)]
    formik.setFieldValue('phases', _phases)
  }
  const onClickEdit = (phaseIndex) => {
    showModal(MODAL.ADD_PHASE, {
      onClickConfirm: (props) => onClickConfirm(phaseIndex, props),
      initialValues: formik.values.phases[phaseIndex],
      contractSupply: formik.values.contractSupply,
      totalPhaseSupply: formik.values.phases.reduce((sum, phase, index) => {
        if (index !== phaseIndex) {
          return (sum += phase.supply)
        }
        return sum
      }, 0),
    })
  }
  const onClickDelete = (phaseIndex) => {
    const _phases = formik.values.phases.filter((item, index) => index < phaseIndex)

    formik.setFieldValue('phases', _phases)
  }
  return (
    <Box>
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
      <Button variant="tertiary" scale="md" mt={20} mb={20} width="100%" onClick={onClickAddPhase}>
        Add Phase
      </Button>
      {formik.values.phases.map((phase, index) => (
        <Phase phaseNumber={index + 1} {...phase} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
      ))}
    </Box>
  )
}

const Phase = ({
  supply,
  maxMint,
  price,
  startDate,
  whitelists,
  phaseNumber,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <StyledPhase>
      <Flex>
        <Text fontWeight={600}>
          Phase <span>{phaseNumber}</span>
        </Text>

        <Flex ml="auto">
          <PencilOutlineIcon width={20} height={20} cursor="pointer" onClick={() => onClickEdit(phaseNumber - 1)} />
          <TrashIcon width={20} height={20} ml={10} cursor="pointer" onClick={() => onClickDelete(phaseNumber - 1)} />
        </Flex>
      </Flex>

      <Flex>
        <Box mr={20}>
          <StyledText>
            Supply: <span>{supply}</span>
          </StyledText>
          <StyledText>
            Max. mint per address: <span>{maxMint}</span>
          </StyledText>
        </Box>
        <Box>
          <StyledText>
            Price: <span>{price}</span>
          </StyledText>
          <StyledText>
            startTime: <span>{moment(startDate).format()}</span>
          </StyledText>
        </Box>
      </Flex>
      <StyledText ellipsis title={whitelists}>
        whitelists: {whitelists}
      </StyledText>
    </StyledPhase>
  )
}

const StyledPhase = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: 10px 20px;
  margin-bottom: 10px;
`
const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;

  span {
    font-weight: 500;
  }
`

export default WithPhases
