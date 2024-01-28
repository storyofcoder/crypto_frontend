import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'components/atoms/StyledSystem'
import styled from 'styled-components'
import { BackIcon } from '../../../components/atoms/svg'
import { InputHybrid } from '../../../components/atomsV2/Input'
import Switch from '../../../components/atoms/Switch/Switch'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons/lib/icons'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../../../components/atomsV2/Button'
import WithPhases from './WithPhases'
import WithoutPhase from './WithoutPhase'
import { useDispatch } from 'react-redux'
import { MODAL, showModal } from '../../../modules/Modals'
import useDeployContract from '../../../hooks/useDeployContract'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'constant'
import CostEstimates from './CostEstimates'
import Loader from '../../../components/atomsV2/Loader'
import ExternalLink from '../../../components/atoms/svg/external-link'
import { ethers } from 'ethers'
import { getExternalRoyaltyAddress, getRoyaltyAddress } from '../../../utils/addressHelpers'
import { useWeb3React } from '@web3-react/core'
import Timeline, { STATES } from '../../../components/atomsV2/Timeline/Timeline'
import useSignature from '../../../hooks/useSignature'
import { NextLinkFromReactRouter } from '../../../components/atoms/NextLink'
import { createOrUpdateCollection } from '../../../state/collections/helpers'
import { notify } from '../../../components/atoms/Notification/Notify'
import { uploadFile } from 'state/source'
import BeatingIcon from 'components/atoms/svg/beating'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

const FormSchema = Yup.object().shape({
  contractSupply: Yup.number()
    .integer()
    .strict()
    .min(1, 'Minimum contract supply is 1')
    .required('Contract supply is must.'),
  contractName: Yup.string().required('Contract name is must.'),
  contractSymbol: Yup.string().required('Contract symbol is must.'),
  contractURL: Yup.string().required('Contract url is must.'),
  contractPrice: Yup.string().min(0.0001, 'Price must more than 0.0001').required('Minting price is must.'),
  contractRoyalty: Yup.number()
    .min(0, 'Royalty must more than or equal to 0')
    .max(15, 'Royalty must less than or equal to 15')
    .required('Invalid Royalty'),
  maxMint: Yup.number()
    .min(1, 'Value should be more than or equal to 1')
    .test({
      name: 'max',
      exclusive: false,
      params: {},
      message: '${path} must be less than total supply',
      test: function (value) {
        return Number(value) <= parseFloat(this.parent.contractSupply)
      },
    })
    .required('Required'),
  phases: Yup.array().of(
    Yup.object({
      startTime: Yup.string().required(),
      mintingPrice: Yup.number().required(),
      supply: Yup.number().required(),
      whitelists: Yup.string(),
      baseURI: Yup.string().required(),
      maxPerAddress: Yup.number()
        .min(1, 'Value should be more than or equal to 1')
        .test({
          name: 'max',
          exclusive: false,
          params: {},
          message: '${path} must be less than total supply',
          test: function (value) {
            return Number(value) <= parseFloat(this.parent.supply)
          },
        })
        .required('Required'),
    }),
  ),
})

const DeployCollection = ({
  collectionDetails,
  launchDate,
  setLaunchDate,
  setcurrentPage,
  hide,
  collectionDetailsFormik,
  profileImage,
  coverImage,
}) => {
  const [contractInitialValues, setContractInitialValues] = useState({
    revealableContract: false,
    contractURL: '',
    contractName: '',
    contractSymbol: '',
    contractSupply: '',
    contractRoyalty: 0,
    contractPrice: 0.0001,
    maxMint: 1,
    startDate: moment(),
    hasPhases: false,
    phases: [],
  })
  const [loading, setLoading] = useState(false)
  const [contractDeployed, setContractDeployed] = useState(false)
  const [savingDraft, setSavingDraft] = useState(false)
  const [deployedContract, setDeployedContract]: any = useState({})
  const dispatch = useDispatch()

  const [signature, getSignature] = useSignature()

  const { account } = useWeb3React()

  const { deploy, ContractTypes } = useDeployContract()
  const formik = useFormik({
    initialValues: contractInitialValues,
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      // handleSubmit()
    },
  })

  useEffect(() => {
    const { contract } = collectionDetails
    const { name, symbol, totalSupply, maxMint, price, baseURI, royalty, isRevealable, hasPhases, phases, startDate } =
      contract || {}
    setContractInitialValues({
      revealableContract: isRevealable,
      contractURL: baseURI,
      contractName: name,
      contractSymbol: symbol,
      contractSupply: totalSupply,
      contractRoyalty: royalty,
      contractPrice: price,
      maxMint,
      startDate: moment(),
      hasPhases,
      phases,
    })
  }, [collectionDetails])

  const onClickConfirm = (phase) => {
    formik.setFieldValue('phases', [...formik.values.phases, phase])
  }

  const onClickAddPhase = () => {
    showModal(MODAL.ADD_PHASE, {
      onClickConfirm: onClickConfirm,
      contractSupply: formik.values.contractSupply,
      totalPhaseSupply: formik.values.phases.reduce((sum, phase) => (sum += phase.supply), 0),
    })
  }

  const onClickDeploy = async () => {
    setLoading(true)
    try {
      const {
        contractURL,
        contractName,
        contractSymbol,
        contractSupply,
        contractRoyalty,
        contractPrice,
        maxMint,
        hasPhases,
        revealableContract,
        startDate,
        phases,
      } = formik.values

      await getSignature()

      await saveAsDraft()

      const convertDefaultTokenDecimal = (price) => {
        return new BigNumber(price).times(DEFAULT_TOKEN_DECIMAL).toFixed()
      }

      const generatePhaseArgs = () => {
        const _contractSupply = String(contractSupply)
        const _uri = phases.map((phase) => phase.baseURI)
        const _startTime = phases.map((phase) => phase.startDate.unix().toString())
        const _mintingPrice = phases.map((phase) => convertDefaultTokenDecimal(phase.price))
        const _supply = phases.map((phase) => String(phase.supply))
        const _maxPerAddress = phases.map((phase) => phase.maxMint)
        const _whitelists = phases.map((phase) => (phase.whitelists !== '' ? phase.whitelists.split(',') : []))
        const _royaltyInfo = encodeRoyaltyInfo(contractRoyalty)

        return [
          contractName,
          contractSymbol,
          _uri,
          _contractSupply,
          _startTime,
          _mintingPrice,
          _supply,
          _maxPerAddress,
          _whitelists,
          _royaltyInfo,
        ]
      }

      const encodeRoyaltyInfo = (royalty) => {
        const royaltyInfo = ethers.utils.defaultAbiCoder.encode(
          ['address', 'uint256', 'address'],
          [getRoyaltyAddress(), convertDefaultTokenDecimal(royalty), account],
        )

        return royaltyInfo
      }

      const contractType = hasPhases
        ? revealableContract
          ? ContractTypes.PHASESR
          : ContractTypes.PHASES
        : revealableContract
        ? ContractTypes.NFTR
        : ContractTypes.NFT

      let args = []

      if (contractType === ContractTypes.NFT || contractType === ContractTypes.NFTR) {
        const royaltyInfo = encodeRoyaltyInfo(contractRoyalty)
        args = [
          contractName,
          contractSymbol,
          contractURL,
          startDate.unix(),
          convertDefaultTokenDecimal(contractPrice),
          contractSupply,
          maxMint,
          royaltyInfo,
        ]
      } else if (contractType === ContractTypes.PHASES) {
        args = generatePhaseArgs()
      } else if (contractType === ContractTypes.PHASESR) {
        args = generatePhaseArgs()
        args.splice(
          2,
          0,
          phases.map(() => ''),
        )
      }

      const dc = await deploy(contractType, args)
      await saveAsDraft(dc.address.toLowerCase())
      setDeployedContract(dc)
      setLoading(false)
      setContractDeployed(true)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const saveAsDraft = async (contractAddress?) => {
    setSavingDraft(true)
    const { name, description, instagram, discord, twitter, website } = collectionDetailsFormik.values
    let coverImageUrl = coverImage.fileUrl
    let profileImageUrl = profileImage.fileUrl
    const {
      contractURL,
      contractName,
      contractSymbol,
      contractSupply,
      contractRoyalty,
      contractPrice,
      maxMint,
      startDate,
      hasPhases,
      revealableContract,
      phases,
    } = formik.values
    try {
      let _signature = signature

      if (!signature) {
        _signature = await getSignature()
      }
      if (coverImage.file) {
        coverImageUrl = await uploadFile(account, _signature, coverImage.file, 'collection-cover')
      }

      if (profileImage.file) {
        profileImageUrl = await uploadFile(account, _signature, profileImage.file, 'collection-profile')
      }

      const contractType = hasPhases
        ? revealableContract
          ? ContractTypes.PHASESR
          : ContractTypes.PHASES
        : revealableContract
        ? ContractTypes.NFTR
        : ContractTypes.NFT

      const username = name.trim().replaceAll(' ', '-')
      let params = {
        walletAddress: account,
        signature: _signature,
        collection: {
          name,
          username,
          bio: description,
          coverImage: coverImageUrl,
          profileImage: profileImageUrl,
          contractAddress: contractAddress ?? username,
          socialmedia: {
            instagram,
            discord,
            twitter,
            website,
          },
        },
        contract: {
          name: contractName,
          symbol: contractSymbol,
          startDate: String(startDate.unix()),
          totalSupply: contractSupply,
          contractType,
          maxMint: Number(maxMint),
          price: String(contractPrice),
          baseURI: contractURL,
          hasPhases,
          isRevealable: revealableContract,
          royalty: contractRoyalty,
          phases,
        },
      }
      await createOrUpdateCollection(username, params)
      setSavingDraft(false)
      notify.success('Collection details saved', '')
    } catch (e) {
      setSavingDraft(false)
      notify.error('Failed to save collection details', '')
    }
  }

  if (hide) return null

  return (
    <div>
      {loading && !contractDeployed && <Loading hasSignature={!!signature} contractDeployed={contractDeployed} />}
      {contractDeployed && <ContractDeployed contract={deployedContract} />}
      <Flex flexDirection={['column', 'column', 'column', 'column', 'row']}>
        <Left flex="1" minHeight={200}>
          <Box>
            <Flex alignItems="center" mb={15}>
              <BackIcon
                width={30}
                height={30}
                style={{ cursor: 'pointer' }}
                onClick={() => setcurrentPage(1)}
                ml={-40}
                mr={10}
              />
              <Text fontSize="22px" fontWeight="600" color="#292C36">
                Your Contract Details
              </Text>
            </Flex>

            <Box>
              <InputHybrid
                type="text"
                label="Contract Name"
                placeholder="Enter your contract name"
                name="contractName"
                error={formik.errors.contractName}
                touched={formik.touched.contractName}
                value={formik.values.contractName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={50}
                required
                popover={() => (
                  <div style={{ padding: '10px' }}>
                    NFT’s name, which <br />
                    other contracts and applications can identify
                  </div>
                )}
                space={{
                  mb: 10,
                }}
              />

              <InputHybrid
                type="text"
                label="Contract Symbol"
                placeholder="Enter your contract Symbol"
                name="contractSymbol"
                error={formik.errors.contractSymbol}
                touched={formik.touched.contractSymbol}
                value={formik.values.contractSymbol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={50}
                required
                popover={() => <div style={{ padding: '10px' }}>Token’s shorthand name or symbol</div>}
                space={{
                  mb: 10,
                }}
              />

              <InputHybrid
                type="number"
                label="Total Supply"
                placeholder={'Enter Total Supply NFT'}
                name="contractSupply"
                error={formik.errors.contractSupply}
                touched={formik.touched.contractSupply}
                value={formik.values.contractSupply}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={50}
                required
                popover={() => <div style={{ padding: '10px' }}>Total number of NFTs on the blockchain</div>}
                space={{
                  mb: 10,
                }}
              />

              <InputHybrid
                type="text"
                label="Royalty(Max 15%)"
                placeholder="Set your royalty percentage. Min 0, Max 15"
                name="contractRoyalty"
                error={formik.errors.contractRoyalty}
                touched={formik.touched.contractRoyalty}
                value={formik.values.contractRoyalty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                space={{
                  mb: 10,
                }}
              />

              <Flex mt={10} mb={10} ml={1} alignItems="center">
                <Switch
                  defaultChecked={formik.values.hasPhases}
                  onChange={(e) => formik.setFieldValue('hasPhases', e)}
                />
                <Text fontSize={14} fontWeight={500} ml={2} color="textTertiary">
                  Does this collection has phases?
                </Text>
                <Popover content={() => <div style={{ padding: '10px' }}>Does this collection has phases?</div>}>
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

              {formik.values.hasPhases ? (
                <WithPhases formik={formik} onClickAddPhase={onClickAddPhase} />
              ) : (
                <WithoutPhase formik={formik} setLaunchDate={setLaunchDate} launchDate={launchDate} />
              )}
            </Box>
          </Box>
        </Left>
        <Right flex="1">
          <CostEstimates />

          <Flex alignItems="center" mt={20}>
            <Button
              isLoading={savingDraft}
              variant="primary"
              onClick={onClickDeploy}
              disabled={!Object.keys(formik.errors)}
            >
              Deploy
            </Button>

            <Button
              variant="secondary"
              ml={20}
              mr={20}
              onClick={() => saveAsDraft()}
              disabled={!Object.keys(formik.errors)}
              isLoading={savingDraft}
            >
              Save as draft
            </Button>
            {savingDraft && <Loader width={30} height={30} />}
          </Flex>
        </Right>
      </Flex>
    </div>
  )
}

const Loading = ({ hasSignature, contractDeployed }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    let _list = [
      {
        title: 'AWAITING SIGNATURE',
        subtitle: 'Open MetaMask and sign the transaction.',
        state: hasSignature ? STATES.COMPLETE : STATES.ACTIVE,
      },
      {
        title: 'DEPLOYING CONTRACT',
        subtitle: 'Waiting for deployment to be mined.',
        state: hasSignature && !contractDeployed ? STATES.ACTIVE : STATES.INCOMPLETE,
      },
    ]
    setList(_list)
  }, [hasSignature, contractDeployed])

  return (
    <Wrapper>
      <Box>
        <Flex justifyContent="center">
          <Loader />
        </Flex>
        <Text fontSize={25} marginY={20} fontWeight={800} color="text">
          DEPLOYING CONTRACT
        </Text>

        <Timeline list={list} />
      </Box>
    </Wrapper>
  )
}
const ContractDeployed = ({ contract }) => {
  return (
    <Wrapper>
      <Text fontSize={22} fontWeight={800} color="text">
        CONTRACT DEPLOYED
      </Text>
      <Text fontSize={16} fontWeight={800} color="text">
        Congrats! blah blah blah
      </Text>
      <Flex mt={20}>
        <Button as={NextLinkFromReactRouter} to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[contract?.chainId]}/${contract?.contractAddress}`} variant="primary" scale="sm">
          Go to Collection
        </Button>
        <Button
          as="a"
          href={`https://etherscan.io/${contract?.contractAddress}`}
          external
          variant="text"
          scale="sm"
          startIcon={<ExternalLink color="text" />}
        >
          View on etherscan
        </Button>
      </Flex>
    </Wrapper>
  )
}

const Left = styled(Box)`
  width: 80%;

  ${(p) => p.theme.media.xxs} {
    margin-bottom: 20px;
    width: 80%;
  }
`
const Right = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 32px;
  padding: 0 3%;
  position: relative;
`

const Wrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: ${(p) => p.theme.colors.background};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export default DeployCollection
