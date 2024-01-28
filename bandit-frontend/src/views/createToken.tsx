import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons/lib/icons";
import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import UploadInput from "../components/atoms/Form/UploadInput";
import Button from "../components/atoms/Button/Button";
import Input from "../components/atoms/Form/CustomInput";
import TokenCard from "../components/molecules/Token/TokenCard2";
import PillFilled from "../components/atoms/Pill/PilllFilled";
import { useQuery } from "react-query";
import API from "../services/API";
import { notify } from "../components/atoms/Notification/Notify";
import SearchUser from "../components/molecules/SearchUser/SearchUser";
import SplitUsers from "../modules/CreateToken/SplitUsers";
import SearchCollection from "../modules/CreateToken/SearchCollection";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import { DECIMAL_FIX } from "../constant/values";
import { useNftContract } from "../hooks/useContract";
import BigNumber from "bignumber.js";
import useWalletSource from "../hooks/useWalletSource";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import Switch from "../components/atoms/Switch/Switch";
import { CrossIcon } from "../components/atoms/svg";
import Loader from "../components/atoms/Loader/Loader";
import { showConffeti } from "../state/Auth/actions";
import { CREATOR_GUIDELINE } from "../utils/storagekeys";
import { useCookies } from "react-cookie";
import DocumentView from "../components/molecules/DocumentView";
import { Popover } from "antd";
import { getNftAddress } from "../utils/addressHelpers";
import { NextLinkFromReactRouter } from "../components/atoms/NextLink";
import { useRouter } from "next/router";
import { PageMeta } from "../components/molecules/AppLayout/PageMeta";

const defaultImage = 'https://bandit-network.s3.ap-southeast-1.amazonaws.com/assets/default-profile.png'

const FormSchema = Yup.object().shape({
  name: Yup.string().required('NFT title is must.'),
  description: Yup.string().required('NFT description is must.'),
})
const PropertyFormSchema = Yup.object().shape({
  key: Yup.string()
    .matches(/^[a-zA-Z0-9_ ]*$/, 'Property key can only be alphanumeric.')
    .required('Property is must')
    .max(50),
  value: Yup.string()
    .matches(/^[a-zA-Z0-9_ ]*$/, 'Property value can only be alphanumeric.')
    .required('Property value is must')
    .max(50),
})

const CreateToken = () => {
  const [tokenImage, setTokenImage] = useState<any>({
    file: null,
    fileUrl: null,
  })
  const [readGuidelines, setReadGuidelines] = useState(false)

  const [loading, setLoading] = useState(false)
  const [tokenMinted, setTokenMinted] = useState(false)
  const [tokenId, setTokenId] = useState(null)

  const [selectedCategory, setSelectedCategory] = useState<any>([])
  const [collectionUsername, setCollectionUsername] = useState<any>(null)
  const [properties, setProperties] = useState<any>({})
  const [selectedUser, setSelectedUser] = useState<any>([])
  const [freezeProperties, setFreezeProperties] = useState<any>(false)

  const [splitEnabled, setSplitEnabled] = useState<any>(false)
  const [splitUsers, setSplitUsers] = useState<any>([])

  const { user } = useSelector((state: any) => state.auth)
  const [cookies, setCookie] = useCookies([])

  const router = useRouter()

  const nftContract = useNftContract()

  const walletSource = useWalletSource()

  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()

  const createContainerRef = useRef()

  useEffect(() => {
    if (cookies[`${user?.username}_${CREATOR_GUIDELINE}`] === 'true') {
      setReadGuidelines(true)
    } else {
      setReadGuidelines(false)
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit()
    },
  })
  const propertiesFormik = useFormik({
    initialValues: {
      key: '',
      value: '',
    },
    validationSchema: PropertyFormSchema,
    onSubmit: (values) => {
      alert('property')
    },
  })

  const { data: categories = [] }: any = useQuery('categories', API.fetchCategories, {
    refetchOnWindowFocus: false,
  })

  const {
    isLoading: isCreatorGuidelineLoading,
    data: CreatorGuideline,
    // isFetching: isTokenFetching,
  } = useQuery('creator-guideline', fetchCreatorGuideline, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  function markAsRead() {
    let date: any = new Date()
    date.setTime(date.getTime() + CreatorGuideline.expiry * 60 * 1000)

    window.scrollTo(0, 0)
    setReadGuidelines(true)
    setCookie(`${user?.username}_${CREATOR_GUIDELINE}`, 'true', {
      path: '/',
      expires: date,
    })
    Mixpanel.track(MixpanelEvents.READ_CREATOR_GUIDELINE, {
      username: user?.username,
    })
  }

  function fetchCreatorGuideline() {
    return API.fetchCreatorGuideline()
  }

  const onChangeImage = (file) => {
    setTokenImage({
      file,
      fileUrl: URL.createObjectURL(file),
    })
  }
  const handleSubmit = async () => {
    const { name, description } = formik.values
    window.scrollTo(0, 0)

    Mixpanel.identify(user?.username)
    Mixpanel.track(MixpanelEvents.UPLOAD_NFT_CLICK, {
      name,
      category: selectedCategory,
      username: user.username,
    })

    if (!tokenImage.file) return notify.error('Please upload the file', '')

    setLoading(true)
    try {
      let tokenId = null
      let receipt = null
      let splits = []
      let tx = null
      let tempTransactionHash = null

      const nftRes = await API.createNFT(account, name, description, tokenImage.file, 'WRX', user.signature, properties)

      if (splitEnabled && !!splitUsers.length) {
        const splitUsersArray = splitUsers.map((u) => [u.user.walletAddress, (u.percentage * DECIMAL_FIX).toString()])
        splits = splitUsers.map((u) => ({
          username: u.user.username,
          percentage: (u.percentage * DECIMAL_FIX).toString(),
        }))
        tx = await nftContract.createTokenWithSplit(account, nftRes.metadata, splitUsersArray)
      } else {
        tx = await nftContract.createToken(account, nftRes.metadata)
      }

      Mixpanel.track(MixpanelEvents.SAVE_MINTING_TX, {
        username: user.username,
        metadata: nftRes.raw,
        transactionId: tx.hash,
        tokenType: tokenImage.file.type,
        hash: nftRes.metadata,
        category: selectedCategory,
        splits,
        collectionUsername,
        properties,
      })

      tempTransactionHash = await API.saveMintingTransaction(
        user.username,
        nftRes.raw,
        tx.hash,
        tokenImage.file.type,
        user.signature,
        nftRes.metadata,
        selectedCategory,
        splits,
        collectionUsername,
        properties,
      )
      receipt = await tx.wait()

      tokenId = new BigNumber(receipt.events[0].topics[3]).toString()
      setTokenId(tokenId)

      await API.saveNFT(user.username, tokenId, tx.hash, user.signature, walletSource, tempTransactionHash.data)

      // if (freezeProperties) {
      //   await API.freezeTokenProperties(
      //     user.username,
      //     user?.signature,
      //     tokenId
      //   );
      // }

      Mixpanel.track(MixpanelEvents.NFT_MINTED, {
        tokenId,
        username: user.username,
        splitEnabled: splitEnabled,
        collectionUsername,
        properties,
      })
      dispatch(showConffeti())
      setLoading(false)
      setTokenMinted(true)
    } catch (e) {
      setLoading(false)

      console.log(e)
      notify.error('Something went wrong', e?.message)
      Mixpanel.track(MixpanelEvents.NFT_CREATION_ERROR, {
        errorMessage: e,
        reqBody: JSON.stringify(e?.response?.config?.body),
      })
    }
  }

  const onChangeCategory = (categoryId) => {
    if (selectedCategory.includes(categoryId)) {
      setSelectedCategory(selectedCategory.filter((id) => id !== categoryId))
    } else {
      if (selectedCategory.length === 3) return notify.error('Max 3 categories', '')
      setSelectedCategory([...selectedCategory, categoryId])
    }
  }

  function onChangeSplitRoyalty(checked) {
    setSplitEnabled(checked)
    setSplitUsers([
      {
        id: user.username,
        user: {
          ...user,
          walletAddress: user.wallet_address,
        },
        percentage: 0,
      },
    ])
  }

  function onUserSelect(user) {
    onSelectSplitUser(user.username, user)
  }

  function filterSearchUserList(list) {
    return list.filter((u) => u.username !== user?.username)
  }

  function onChangeUserRoyalty(user, value) {
    const index = splitUsers.findIndex((u) => u.user.username === user.username)

    setSplitUsers([
      ...splitUsers.slice(0, index),
      {
        ...splitUsers[index],
        percentage: value,
      },
      ...splitUsers.slice(index + 1),
    ])
  }

  function onSelectSplitUser(username, user) {
    const hasEntry = splitUsers.filter((item) => item.user.username === username).length
    if (!hasEntry && splitUsers.length === 5) return
    if (hasEntry) {
      setSplitUsers([...splitUsers.filter((item) => item.user.username !== username)])
    } else {
      setSplitUsers([
        ...splitUsers,
        {
          id: username,
          user,
          percentage: 0,
        },
      ])
    }
  }

  function onClearCollection() {
    setCollectionUsername(null)
    setProperties({})
    setFreezeProperties(false)
  }

  function addProperty() {
    let { key, value } = propertiesFormik.values
    key = key.trim()
    const keysArr = Object.keys(properties)
    if (keysArr.length > 30) return notify.error('Max 30 properties', '')
    if (keysArr.includes(key)) return notify.error('Property already added', '')

    if (!key || !value) return

    setProperties({
      ...properties,
      [key]: value,
    })
    propertiesFormik.values.key = ''
    propertiesFormik.values.value = ''
  }
  function removePropertyItem(key) {
    const propertiesCopy = { ...properties }
    delete propertiesCopy[key]
    setProperties(propertiesCopy)
  }

  function onChangeFreezeProperties() {
    setFreezeProperties(!freezeProperties)
  }

  function createCollection() {
    router.push('/create-collection')
  }

  const totalPercentage = useMemo(() => splitUsers.reduce((s, u) => s + u.percentage, 0), [splitUsers])

  const getContent = (content) => {
    if (!content) return []

    const List = content.map((item, index) => ({
      title: item?.title,
      scrollId: `${index + 1}`,
      renderContent: () => {
        return (
          <div>
            <img src={item.image} className="guidelines-image" style={{ width: '100%', height: '100%' }} />

            {content.length === index + 1 && (
              <Flex justifyContent="center" mt={30}>
                <Button minWidth={150} height={50} variant="tertiary" onClick={markAsRead}>
                  Proceed to create
                </Button>
              </Flex>
            )}
          </div>
        )
      },
    }))

    return List
  }

  const isCompleteSplitPercentage = totalPercentage === 100

  return (
    <>
      <PageMeta />
      {isCreatorGuidelineLoading ? (
        <DocumentContainer>
          <Loader />
        </DocumentContainer>
      ) : !readGuidelines ? (
        <DocumentContainer>
          <DocumentView
            document={{
              title: CreatorGuideline?.title || '',
              lastUpdate: '',
              description: <p>{CreatorGuideline?.description}</p>,
            }}
            contentList={getContent(CreatorGuideline?.content)}
            hideContentTitle={true}
          />
        </DocumentContainer>
      ) : (
        <Container ref={createContainerRef}>
          <Flex flexDirection={['column', 'column', 'column', 'column', 'column', 'row']}>
            <Left flex="1">
              <FixedCard>
                <Box maxWidth="322px" margin="0 auto">
                  <TokenCard
                    isBlob={true}
                    token={{
                      metaData: {
                        url: tokenImage.fileUrl || defaultImage,
                        name: formik.values.name || 'Title',
                        type: tokenImage?.file?.type || 'image',
                        thumbnail: tokenImage.fileUrl || defaultImage,
                        // preview: tokenImage.fileUrl || defaultImage,
                      },
                      creatorProfileImage: user?.profileImage || defaultImage,
                      tokenCreator: user?.username || 'username',
                      tokenOwner: user?.username || 'username',
                      creatorVerified: user?.is_verified,
                      auctionLive: false,
                      price: null,
                      ownerProfileImage: defaultImage,
                      id: tokenId,
                    }}
                    showSoldOut={false}
                    tokenMinted={tokenMinted}
                  />
                </Box>
                {!tokenMinted && !loading && (
                  <Flex flexDirection="column" alignItems="center" mt={20}>
                    <UploadInput
                      id="profile-pic"
                      customButton={() => (
                        <Button variant="solid" icon={<UploadOutlined />}>
                          Upload file
                        </Button>
                      )}
                      onChange={onChangeImage}
                      maxSize={100}
                      accept={'image/png, image/jpeg, image/gif, video/mp4'}
                    />

                    <Box mt={10}>
                      <Text textAlign="center">
                        png, jpg, mp4, gif files are accepted. The maximum file size is 100MB.
                      </Text>
                    </Box>
                  </Flex>
                )}
              </FixedCard>
            </Left>
            <Right flex="2" minHeight={200}>
              {loading && <Loading />}
              {!loading && tokenMinted && <MintingSuccess tokenId={tokenId} />}
              {!loading && !tokenMinted && (
                <Box>
                  <Text fontSize="22px" fontWeight="600" color="#292C36" mb={20}>
                    Create NFT
                  </Text>

                  <form onSubmit={formik.handleSubmit}>
                    <Box mb={20}>
                      <Input
                        type="text"
                        label="Title"
                        placeholder="Enter the title of your NFT"
                        name="name"
                        errors={formik.errors}
                        touched={formik.touched}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={50}
                      />
                    </Box>
                    <Box mb={20}>
                      <Input
                        type="textarea"
                        label="Description"
                        placeholder="Add your NFT description or write the story behind your NFT or IPR giveaways"
                        name="description"
                        errors={formik.errors}
                        touched={formik.touched}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Box>
                    <Box mb={20}>
                      <Text fontSize={[14]} mb={10} fontWeight={[500]} color="text">
                        Categories (Max 3)
                      </Text>
                      <Flex flexWrap="wrap">
                        {categories.map((c, index) => (
                          <PillFilled
                            key={c.id}
                            name={c.description}
                            active={selectedCategory.includes(c.id)}
                            onClick={() => onChangeCategory(c.id)}
                          />
                        ))}
                      </Flex>
                    </Box>

                    <Box mb={20}>
                      <Flex justifyContent="space-between">
                        <Box>
                          <Text fontSize={[14]} mb={'5px'} fontWeight={[500]} color="text">
                            Create split
                          </Text>
                          <Text fontSize={[12]} mb={10}>
                            Enable splits to automatically divide the fund earned from this auction with up to five
                            recipients, including yourself.
                          </Text>
                        </Box>
                        <Box width={[100, 100, 44]} minWidth={45}>
                          <Switch onChange={onChangeSplitRoyalty} />
                        </Box>
                      </Flex>
                      {splitEnabled && (
                        <Box>
                          <SearchUser
                            onSelect={onUserSelect}
                            filterList={filterSearchUserList}
                            disabled={selectedUser.length > 5}
                          />

                          <Box mt={10}>
                            <Flex justifyContent="space-between" alignItems="center">
                              <Text fontSize={[14]} mb={10} fontWeight={[600]}>
                                Split users
                              </Text>
                              {totalPercentage > 100 && (
                                <Text fontSize={'10px'} mb={10} fontWeight={[600]} color={'danger'}>
                                  Sum of split percentages cannot be more than 100
                                </Text>
                              )}
                            </Flex>

                            <Box>
                              {splitUsers.map((su) => (
                                <SplitUsers
                                  key={su.user.username}
                                  {...su}
                                  onChangeUserRoyalty={onChangeUserRoyalty}
                                  complete={isCompleteSplitPercentage}
                                  removeUser={() => onSelectSplitUser(su.user.username, su.user)}
                                  disableRemove={su.user.username === user.username}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>

                    <Box mb={20}>
                      <Flex alignItems="center" mb={10}>
                        <Text fontSize={14} fontWeight={[500]} color="text">
                          Collection
                        </Text>
                        <Popover
                          content={() => (
                            <div style={{ padding: '10px' }}>
                              You may use collections to organise <br />
                              your NFTs or to make a series of NFTs. <br />
                              To create a new collection go{' '}
                              <a
                                href="/create-collection"
                                target="_blank"
                                style={{ color: '#000000', fontWeight: 600 }}
                              >
                                here
                              </a>
                            </div>
                          )}
                        >
                          <InfoCircleOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </Popover>
                      </Flex>

                      <SearchCollection
                        onSelect={(c) => setCollectionUsername(c.username)}
                        onClear={onClearCollection}
                      />
                    </Box>

                    {collectionUsername && (
                      <Box mb={20}>
                        <Text fontSize={[14]} mb={'5px'} fontWeight={[500]} color="text">
                          Add properties
                        </Text>

                        <PropertiesFlex alignItems="baseline" justifyContent="space-between">
                          <Box>
                            <Input
                              type="text"
                              label=""
                              placeholder="Add property"
                              name="key"
                              errors={propertiesFormik.errors}
                              touched={propertiesFormik.touched}
                              value={propertiesFormik.values.key}
                              onChange={propertiesFormik.handleChange}
                              onBlur={propertiesFormik.handleBlur}
                            />
                          </Box>
                          <Box>
                            <Input
                              type="text"
                              label=""
                              placeholder="Add value"
                              name="value"
                              errors={propertiesFormik.errors}
                              touched={propertiesFormik.touched}
                              value={propertiesFormik.values.value}
                              onChange={propertiesFormik.handleChange}
                              onBlur={propertiesFormik.handleBlur}
                            />
                          </Box>

                          <Button
                            variant="solid"
                            mb={10}
                            padding="12px 20px"
                            onClick={addProperty}
                            disabled={!!Object.keys(propertiesFormik.errors).length}
                          >
                            Add
                          </Button>
                        </PropertiesFlex>

                        <Flex flexWrap="wrap">
                          {Object.keys(properties).map((c) => (
                            <PropertyCard key={c} title={c} value={properties[c]} removeItem={removePropertyItem} />
                          ))}
                        </Flex>
                        {/*<Box mt={20}>*/}
                        {/*  <Flex justifyContent="space-between">*/}
                        {/*    <Box>*/}
                        {/*      <Text*/}
                        {/*        fontSize={[14]}*/}
                        {/*        mb={"5px"}*/}
                        {/*        fontWeight={[500]}*/}
                        {/*        color="text"*/}
                        {/*      >*/}
                        {/*        Freeze properties*/}
                        {/*      </Text>*/}
                        {/*      <Text fontSize={[12]} mb={10}>*/}
                        {/*        Freezing your properties will allow you to*/}
                        {/*        permanently lock and wont be able to edit later.*/}
                        {/*      </Text>*/}
                        {/*    </Box>*/}
                        {/*    <Box>*/}
                        {/*      <Switch onChange={onChangeFreezeProperties} />*/}
                        {/*    </Box>*/}
                        {/*  </Flex>*/}
                        {/*</Box>*/}
                      </Box>
                    )}

                    <Flex justifyContent="flex-end" mt={20}>
                      <StyledSubmit variant="solid">
                        Mint
                        <input type="submit" className="" value="Create" />
                      </StyledSubmit>
                    </Flex>
                  </form>
                </Box>
              )}
            </Right>
          </Flex>
        </Container>
      )}
    </>
  )
}

export const PropertyCard = ({ title, value, removeItem }) => {
  return (
    <PropertyCardWrapper>
      <IconWrapper onClick={() => removeItem(title)}>
        <CrossIcon />
      </IconWrapper>
      <Text fontSize="16px" fontWeight={700} color="text" textAlign="center" className="property-text">
        {title}
      </Text>
      <Text
        fontSize="14px"
        fontWeight={600}
        color="text"
        opacity={0.6}
        textAlign="center"
        className="property-text"
      >
        {value}
      </Text>
    </PropertyCardWrapper>
  )
}

const Loading = () => {
  return (
    <LoadingWrapper>
      <Box>
        <Loader />
      </Box>
      <Text fontSize={25} fontWeight={800} color="text">
        Your NFT is being minted
      </Text>
    </LoadingWrapper>
  )
}
const MintingSuccess = ({ tokenId }) => {
  const nftContractAddress = getNftAddress()
  return (
    <LoadingWrapper>
      <Text fontSize={25} fontWeight={800} color="text">
        Your NFT has been minted
      </Text>
      <Text mb={10}>Congratulations!, You have successfully minted your NFT.</Text>
      <NextLinkFromReactRouter to={`/list-for-sale/${nftContractAddress}/${tokenId}`}>
        <Button variant="solid" minWidth={150}>
          List for sale
        </Button>
      </NextLinkFromReactRouter>
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
    padding: 0 40px;
    max-width: var(--max-width);
    margin: 0 auto;
    margin-top: 20px;
  }
`

const DocumentContainer = styled.div`
  padding: 20px;
  min-height: 70vh;

  ${(p) => p.theme.media.xlg} {
    width: 1040px;
    margin: 0 auto;
    padding: 20px 0 0 0;
  }
`

const Left = styled(Box)`
  margin: 0 7%;
  ${(p) => p.theme.media.xs} {
    margin: 0 auto;
  }
  ${(p) => p.theme.media.sm} {
    margin: 0 7%;
  }
`
const FixedCard = styled(Box)`
  position: sticky;
  top: 100px;
  margin-bottom: 40px;
`
const Right = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 32px;
  padding: 3%;
  position: relative;
`

const StyledSubmit = styled(Button)`
  position: relative;
  min-width: 150px;
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

const PropertyCardWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg1};
  border-radius: 22px;
  padding: 20px;
  position: relative;
  margin: 0 10px 10px 0;
  width: 140px;

  .property-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const IconWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.text};
  border-radius: 50%;
  text-align: center;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(20%, -20%);
  cursor: pointer;
  svg {
    width: 12px;
    height: 12px;

    path {
      fill: ${(p) => p.theme.colors.bg2};
    }
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const PropertiesFlex = styled(Flex)`
  grid-gap: 10px;
  ${(p) => p.theme.media.xxs} {
    grid-gap: 5px;
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`

export default CreateToken
