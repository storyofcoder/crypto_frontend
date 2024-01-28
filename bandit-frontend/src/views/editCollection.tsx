import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons/lib/icons";
import * as Yup from "yup";
import Button from "../components/atoms/Button/Button";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import CollectionCard from "../components/molecules/collections/CollectionsCard";
import Input from "../components/atoms/Form/CustomInput";
import UploadInput from "../components/atoms/Form/UploadInput";
import API from "../services/API";
import { useSelector } from "react-redux";
import { notify } from "../components/atoms/Notification/Notify";
import Loader from "../components/atoms/Loader/Loader";
import { useQuery } from "react-query";
import { DISCORD, INSTAGRAM, TWITTER } from "../constant/socialMedia";
import CustomInputIcon from "../components/atoms/Form/CustomInputIcon";
import Switch from "../components/atoms/Switch/Switch";
import { DiscordIcon, InstagramIcon, TwitterIcon, WebsiteIcon } from "./../components/atoms/svg";
import { getNftAddress } from "../utils/addressHelpers";
import { getWebsiteRegex } from "../utils";
import validateIpfsFormat from "../utils/ipfsValidation";
import { useRouter } from "next/router";
import moment from "moment";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

const defaultImage = 'https://bandit-network.s3.ap-southeast-1.amazonaws.com/assets/default-profile.png'

const contractGuidelines = '#'

const FormSchema = Yup.object().shape({
  name: Yup.string(),
  // .required("Collection name is must.")
  // .matches(/^[a-zA-Z0-9_ ]*$/, "Collection name can only be alphanumeric.")
  // .test("unique", "Collection name exists", async function (value) {
  //   try {
  //     if (!value) return;
  //     const trimmed = value.trim();
  //     const res = await API.checkCollectionUsername(trimmed);
  //     return !res.usernameExist;
  //   } catch (e) {
  //     return true;
  //   }
  // }),
  description: Yup.string().required('Collection Description is must.'),

  discord: Yup.string(),
  instagram: Yup.string(),
  twitter: Yup.string(),
  website: Yup.string().matches(getWebsiteRegex(), 'Please Enter valid website link'),
  contractSupply: Yup.number().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.number().integer().strict().min(1, 'Minimum contract supply is 1').required('Contract supply is must.'),
    otherwise: Yup.number(),
  }),
  contractName: Yup.string().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.string().required('Contract name is must.'),
    otherwise: Yup.string(),
  }),
  contractSymbol: Yup.string().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.string().required('Contract symbol is must.'),
    otherwise: Yup.string(),
  }),
  contractURL: Yup.string().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.string().required('Contract url is must.'),
    otherwise: Yup.string(),
  }),
  contractPrice: Yup.number().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.number().min(0.0001, 'Price must more than 0.0001').required('Minting price is must.'),
    otherwise: Yup.number(),
  }),
  contractRoyalty: Yup.number().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.number()
      .min(0, 'Royalty must more than or equal to 0')
      .max(15, 'Royalty must less than or equal to 15')
      .required('Invalid Royalty'),
    otherwise: Yup.number(),
  }),
  maxMint: Yup.string().when('deployContract', {
    is: (deployContract) => Boolean(deployContract),
    then: Yup.string()
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
    otherwise: Yup.string(),
  }),
})

const EditCollection = () => {
  const [profileImage, setProfileImage] = useState({
    file: null,
    fileUrl: null,
  })
  const [coverImage, setCoverImage] = useState({ file: null, fileUrl: null })
  const [currentPage, setcurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [launchDate, setLaunchDate] = useState(null)

  const { user } = useSelector((state: any) => state.auth)

  const router = useRouter()
  const { query } = router
  const { username } = query

  const {
    isLoading,
    error,
    data: collection = {},
    isFetched,
    isFetching: isCollectionFetching,
    refetch: refetchCollectionDetail,
  } = useQuery('collection-detail', fetchCollectionDetail, {
    enabled: !!username,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  function fetchCollectionDetail() {
    return API.getCollectionProfile(username)
  }

  const formik = useFormik({
    initialValues: {
      name: collection.name,
      description: collection.bio,
      discord: collection?.socialmedia?.discord,
      instagram: collection?.socialmedia?.instagram,
      twitter: collection?.socialmedia?.twitter,
      website: collection?.socialmedia?.website,
      deployContract: collection?.isExternalCollection,
      revealableContract: collection?.contract?.revealableContract,
      contractURL: collection?.contract?.baseURI.split('/')[2],
      contractName: collection?.contract?.name,
      contractSymbol: collection?.contract?.symbol,
      contractSupply: collection?.contract?.totalSupply,
      contractRoyalty: collection?.contract?.royalty,
      contractPrice: collection?.contract?.price,
      maxMint: collection?.contract?.maxMint,
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit()
    },
  })

  const deployed = collection?.isExternalCollection && collection?.contractAddress !== getNftAddress()

  useEffect(() => {
    if (!!Object.keys(collection).length) {
      if (collection?.owner?.username !== user?.username) {
        return router.push('/not-found')
      }

      setProfileImage({
        ...profileImage,
        fileUrl: collection.profileImage,
      })
      setCoverImage({
        ...coverImage,
        fileUrl: collection.coverImage,
      })
      setLaunchDate(moment.unix(collection?.contract?.collectionReleaseDate).toDate())
    }
    //TODO
    return collection
  }, [collection])

  const uploadFile = async (file, type) => {
    const url = await API.uploadImage(user.wallet_address, user.signature, file, type)

    return url
  }

  const handleSubmit = async () => {
    let {
      name,
      description,
      instagram,
      discord,
      twitter,
      website,
      deployContract,
      revealableContract,
      contractURL,
      contractName,
      contractSupply,
      contractRoyalty,
      contractPrice,
      contractSymbol,
      maxMint,
    } = formik.values

    if (formik?.values?.deployContract && currentPage === 1 && !deployed) {
      setcurrentPage(2)
      return
    }

    if (!profileImage.file && !profileImage.fileUrl) return notify.error('Please upload profile image', '')
    if (!coverImage.file && !coverImage.fileUrl) return notify.error('Please upload cover image', '')

    setLoading(true)

    if (deployContract) {
      const isValidIpfsFormat = await validateIpfsFormat(contractURL, !revealableContract)

      if (!isValidIpfsFormat) {
        setLoading(false)
        return notify.error('Invalid IPFS hash/CID', 'Please review the Contract Guidelines again')
      }
    }

    try {
      let coverImageUrl = null
      let profileImageUrl = null

      if (coverImage.file) {
        coverImageUrl = await uploadFile(coverImage.file, 'collection-cover')
      } else {
        coverImageUrl = coverImage.fileUrl
      }

      if (profileImage.file) {
        profileImageUrl = await uploadFile(profileImage.file, 'collection-profile')
      } else {
        profileImageUrl = profileImage.fileUrl
      }

      let params = {
        profile: {
          coverImage: coverImageUrl,
          profileImage: profileImageUrl,
          name: collection.name,
          socialmedia: {
            instagram,
            discord,
            twitter,
            website,
          },
          bio: description,
        },
        username: user.username,
        collectionUsername: collection.username,
        isExternalCollection: deployContract,
        signature: user.signature,
      }

      if (deployContract) {
        params['contract'] = {
          name: contractName,
          symbol: contractSymbol,
          totalSupply: contractSupply,
          price: contractPrice.toString(),
          baseURI: `ipfs://${contractURL.trim()}${revealableContract ? '' : '/'}`,
          royalty: contractRoyalty.toString(),
          revealableContract: revealableContract,
          maxMint,
          collectionReleaseDate: launchDate ? String(launchDate.unix()) : null,
        }
      }

      await API.updateCollection(params)
      setLoading(false)
      notify.success('Collection details saved', '')
    } catch (e) {
      setLoading(false)
      notify.error('Failed to edit collection', e?.message)
    }
  }

  const isExternalCollectionDeployed = () => {
    return collection?.contractAddress !== getNftAddress()
  }
  const isExternalCollection = () => {
    return !!collection?.isExternalCollection
  }

  const onChangeProfileImage = (file) => {
    setProfileImage({
      file,
      fileUrl: URL.createObjectURL(file),
    })
  }
  const onChangeCoverImage = (file) => {
    setCoverImage({
      file,
      fileUrl: URL.createObjectURL(file),
    })
  }

  return (
    <>
      <PageMeta />
      <Container>
        <Flex flexDirection={['column', 'column', 'column', 'column', 'row']}>
          <Left flex="1" width="80%">
            <NextLinkFromReactRouter to={`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[collection?.chainId]}/${collection.username}`}>
              <CollectionCard
                details={{
                  name: formik.values.name,
                  bio: formik.values.description,
                  coverImage: coverImage.fileUrl ? coverImage.fileUrl : defaultImage,
                  profileImage: profileImage.fileUrl ? profileImage.fileUrl : defaultImage,
                }}
              />
            </NextLinkFromReactRouter>
            <Flex flexDirection="column" alignItems="center" mt={20}>
              <UploadInput
                id="profile-pic"
                customButton={() => (
                  <Button variant="solid" mb={20} icon={<UploadOutlined />}>
                    Upload profile image
                  </Button>
                )}
                onChange={onChangeProfileImage}
                maxSize={5}
                accept={'image/png, image/jpeg, image/gif'}
              />

              <UploadInput
                id="profile-pic"
                customButton={() => (
                  <Button variant="solid" icon={<UploadOutlined />}>
                    Upload cover image
                  </Button>
                )}
                onChange={onChangeCoverImage}
                maxSize={5}
                accept={'image/png, image/jpeg, image/webp, image/gif'}
              />

              <Box mt={50}>
                <Text fotSize="22px" fontWeight="600" color="text" textAlign="center">
                  Upload your file here
                </Text>
                <Text textAlign="center">png, jpg, gif file are accepted. The maximum file size is 5 MB.</Text>
              </Box>
            </Flex>
          </Left>
          <Right flex="2">
            {loading ? <Loading /> : null}
            <Box>
              <Text fontSize="22px" fontWeight="600" color="#292C36" mb={20}>
                {currentPage === 1 ? ' Edit Collection' : 'Edit Contract Details'}
              </Text>
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  {currentPage === 1 && (
                    <DetailSection
                      formik={formik}
                      isExternal={isExternalCollection()}
                      isExternalCollectionDeployed={isExternalCollectionDeployed()}
                    />
                  )}
                  {currentPage === 2 && (
                    <ContractSection formik={formik} launchDate={launchDate} setLaunchDate={setLaunchDate} />
                  )}
                  <Flex justifyContent="flex-end" mt={20}>
                    {currentPage === 2 && (
                      <StyledSubmit variant="primaryLight" onClick={() => setcurrentPage(1)}>
                        Back
                      </StyledSubmit>
                    )}
                    {!deployed && currentPage === 1 && isExternalCollection() ? (
                      <StyledSubmit
                        variant="solid"
                        ml={10}
                        onClick={() => setcurrentPage(2)}
                        disabled={
                          Object.keys(formik.errors).includes('name') ||
                          Object.keys(formik.errors).includes('description') ||
                          Object.keys(formik.errors).includes('website')
                        }
                      >
                        Continue
                      </StyledSubmit>
                    ) : (
                      <StyledSubmit variant="solid" ml={10}>
                        Update Collection
                        <input type="submit" className="" value="Create" />
                      </StyledSubmit>
                    )}
                  </Flex>
                </form>
              </Box>
            </Box>
          </Right>
        </Flex>
      </Container>
    </>
  )
}

const DetailSection = ({ formik, isExternal, isExternalCollectionDeployed }) => {
  return (
    <Box>
      <Input
        type="text"
        label="Name"
        placeholder="Enter collection name"
        name="name"
        errors={formik.errors}
        touched={formik.touched}
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        maxLength={50}
        disabled
        required
      />

      <Input
        type="textarea"
        label="Description"
        placeholder="Collection description"
        name="description"
        errors={formik.errors}
        touched={formik.touched}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
      />

      <CustomInputIcon
        type="text"
        placeholder="Username"
        name="instagram"
        prefixIcon={<InstagramIcon />}
        prefixText={INSTAGRAM}
        errors={formik.errors}
        touched={formik.touched}
        value={formik.values.instagram}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CustomInputIcon
        type="text"
        placeholder="Server"
        name="discord"
        prefixIcon={
          <FacebookIconWrapper>
            <DiscordIcon />
          </FacebookIconWrapper>
        }
        prefixText={DISCORD}
        errors={formik.errors}
        touched={formik.touched}
        value={formik.values.discord}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CustomInputIcon
        type="text"
        placeholder="Username"
        name="twitter"
        prefixIcon={<TwitterIcon />}
        prefixText={TWITTER}
        errors={formik.errors}
        touched={formik.touched}
        value={formik.values.twitter}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <CustomInputIcon
        type="text"
        placeholder="https://collectionwebsite.com/"
        name="website"
        prefixIcon={<WebsiteIcon />}
        errors={formik.errors}
        touched={formik.touched}
        value={formik.values.website}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {isExternal && !isExternalCollectionDeployed && (
        <Flex mt={20} ml={1}>
          <Switch
            defaultChecked={formik?.values?.deployContract}
            onChange={(e) => formik.setFieldValue('deployContract', e)}
          />

          <Text fontSize={14} fontWeight={500} ml={2} color="textTertiary">
            Deploy your own smart contract?
          </Text>
        </Flex>
      )}
    </Box>
  )
}

const ContractSection = ({ formik, launchDate, setLaunchDate }) => {
  return (
    <Box>
      <Text fontSize="16px" fontWeight="500" color="#292C36" mb={10} opacity="0.6">
        This will incur additional gas fee and the platform is not liable for the contract's security.
      </Text>
      <a href={contractGuidelines} target={'_blank'}>
        <Text fontSize="16px" fontWeight="500" mb={15} role="button">
          Contract Guidelines
        </Text>
      </a>
      <Box>
        <Input
          type="text"
          label="Contract Name"
          placeholder="Enter your contract name"
          name="contractName"
          errors={formik.errors}
          touched={formik.touched}
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
        />

        <Input
          type="text"
          label="Contract Symbol"
          placeholder="Enter your contract Symbol"
          name="contractSymbol"
          errors={formik.errors}
          touched={formik.touched}
          value={formik.values.contractSymbol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={50}
          required
          popover={() => <div style={{ padding: '10px' }}>Token’s shorthand name or symbol</div>}
        />

        <Input
          type="number"
          label="Total Supply"
          placeholder={'Enter Total Supply NFT'}
          name="contractSupply"
          errors={formik.errors}
          touched={formik.touched}
          value={formik.values.contractSupply}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={50}
          required
          popover={() => <div style={{ padding: '10px' }}>Total number of NFTs on the blockchain</div>}
        />

        <Input
          type="number"
          label="Minting Price (BNB)"
          placeholder="Enter Price"
          name="contractPrice"
          errors={formik.errors}
          touched={formik.touched}
          value={formik.values.contractPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={50}
          required
          popover={() => <div style={{ padding: '10px' }}>Minting price for each NFT</div>}
        />

        <Input
          type="text"
          label="Royalty(Max 15%)"
          placeholder="Set your royalty percentage. Min 0, Max 15"
          name="contractRoyalty"
          errors={formik.errors}
          touched={formik.touched}
          value={formik.values.contractRoyalty}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxLength={50}
        />

        <Flex mt={10} mb={20} ml={1}>
          <Switch
            defaultChecked={formik?.values?.revealableContract}
            onChange={(e) => formik.setFieldValue('revealableContract', e)}
          />
          <Text fontSize={14} fontWeight={500} ml={2} color="textTertiary">
            Revealable Contract
          </Text>
        </Flex>

        <Input
          type="text"
          label={formik.values.revealableContract ? 'IPFS hash/CID prior reveal' : 'IPFS hash/CID'}
          placeholder="Qma9dKtMSVhz5s7xzFE2HmzRr4MWerUJRH3oMoRHi64siK"
          name="contractURL"
          errors={formik.errors}
          touched={formik.touched}
          value={formik.values.contractURL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          popover={() => (
            <div style={{ padding: '10px' }}>
              The hash can be obtained from <br />
              the path in IPFS where you <br /> upload your content{' '}
              <a href={contractGuidelines} target="_blank" style={{ color: '#000000', fontWeight: 600 }}>
                Know more
              </a>
            </div>
          )}
        />

        <Input
          type="text"
          label="Maximum NFTs per user"
          placeholder="Maximum NFTs per user"
          name="maxMint"
          errors={formik.errors}
          touched={formik.touched}
          value={formik.values.maxMint}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          popover={() => (
            <div style={{ padding: '10px' }}>
              Maximum number of NFTs can be <br />
              minted by a single user
            </div>
          )}
        />

        <Input
          type="datetime"
          label={`Launch date (UTC${moment().format('Z')})`}
          name="launchdate"
          value={launchDate}
          onChange={setLaunchDate}
          minDate={new Date().getTime()}
          popover={() => (
            <div style={{ padding: '10px' }}>
              The launch date can only be set once. Please contact support to update the date once it has been set.
            </div>
          )}
          inputProps={{
            disabled: !!launchDate,
            placeholder: 'Launch date ',
          }}
        />
      </Box>
    </Box>
  )
}

const Loading = () => {
  return (
    <LoadingWrapper>
      <Box>
        <Loader />
      </Box>
      <Text fontSize={25} fontWeight={800} color="text">
        Updating collection
      </Text>
    </LoadingWrapper>
  )
}

const Container = styled(Box)`
  min-height: 70vh;
  ${(p) => p.theme.media.xs} {
    padding: 20px;
  }
  ${(p) => p.theme.media.sm} {
    padding: 20px;
  }
  ${(p) => p.theme.media.md} {
    padding: 20px;
  }
  ${(p) => p.theme.media.xlg} {
    padding: 20px 40px;
    max-width: var(--max-width);
    margin: 0 auto;
  }
`

const Left = styled(Box)`
  margin: 0 7% 20px 7%;
`
const Right = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 32px;
  padding: 3%;
  position: relative;
`
const StyledSubmit = styled(Button)`
  position: relative;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 30%;
    border: none;
    opacity: 0;
  }
`

const LoadingWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${(p) => p.theme.colors.bg1};
  opacity: 0.8;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const FacebookIconWrapper = styled(Box)`
  .class1 {
    fill: ${(p) => p.theme.colors.bg1};
  }
`

export default EditCollection
