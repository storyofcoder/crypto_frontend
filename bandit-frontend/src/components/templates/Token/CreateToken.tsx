import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, Form, Popover, Radio, Select, Spin, Switch } from "antd";
import cx from "classnames";
import styled from "styled-components";
import { FacebookShareButton, TwitterShareButton } from "react-share";

import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { FacebookV2Icon, TwitterIcon } from "../../../components/atoms/svg/images2";
import { convertToUsd, isDefaultImage, truncateUsername } from "../../../utils";
import { notify } from "../../atoms/Notification/Notify";
import { InfoCircleOutlined } from "@ant-design/icons/lib/icons";
import { MAX_PRICE } from "../../../constant/values";
import { CrossIcon } from "../../../components/atoms/svg";

import BoringAvatar from "../../atoms/Avatar/BoringAvatar";
import TokenCard from "../../molecules/Token/TokenCard2";
import Button from "../../atoms/Button/Button";
import API from "../../../services/API";
import SplitBreakupPopover from "../../molecules/Token/SplitBreakPopover";
import Input from "../../atoms/Form/Input";
import UploadInput from "../../atoms/Form/UploadInput";
import CustomSlider from "../../atoms/Slider/slider";

const { Option } = Select

const defaultImage = 'https://bandit-network.s3.ap-southeast-1.amazonaws.com/assets/default-profile.png'

const Container = styled(Box)`
  .ant-upload-list-item-name {
    width: 0;
    color: ${(p) => p.theme.colors.success};
  }
  .ant-tooltip {
    display: none;
  }

  .ant-radio-button-wrapper {
    outline: none;
    &:hover {
      color: ${(p) => p.theme.colors.text4} !important;
    }
  }

  .ant-switch-checked {
    background-color: ${(p) => p.theme.colors.text4} !important;
  }

  .ant-radio-button-wrapper-checked {
    background-color: ${(p) => p.theme.colors.text4} !important;
    border-color: ${(p) => p.theme.colors.text4} !important;
    &:hover {
      color: ${(p) => p.theme.colors.bg2} !important;
    }
  }
`

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: ${(p) => p.theme.colors.text};
  }

  .ant-spin-text {
    font-size: 30px;
    color: ${(p) => p.theme.colors.text};
    font-weight: 700;
    text-shadow: none !important;
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 14px;

  b,
  small {
    color: ${(p) => p.theme.colors.text4};
  }
`

const FinalBreakUp = styled(Flex)`
  align-items: baseline;

  b,
  small {
    color: ${(p) => p.theme.colors.text4};
    margin-left: 5px;
  }
`

const ShareButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  margin-right: 10px;
`

const CreateToken = ({
  priceUnit,
  primaryButton,
  tokenMinted,
  user,
  generatedTokenId,
  isMinting,
  conversionRate,
  categories,
}: any) => {
  const [state, setState] = useState<any>({
    file: null,
    name: null,
    description: null,
    price: null,
    royalty: null,
    isOnBuy: true,
    cryptoType: priceUnit,
  })
  const [uploadedFile, setUploadedFile] = useState<any>(null)
  const [saleType, setSaleType] = useState<any>('buy')
  const [selectedCategory, setSelectedCategory] = useState<any>([])
  const [fileUrl, setFileUrl] = useState<any>(null)
  const [splitEnabled, setSplitEnabled] = useState<any>(false)
  const [splitUsers, setSplitUsers] = useState<any>([])
  const [splitUsersList, setSplitUsersList] = useState([])
  const [splitUserSearchValue, setSplitUserSearchValue] = useState(null)
  const [form] = Form.useForm()

  const saleTypeOptions = [
    { label: 'Fixed Price', value: 'buy' },
    { label: 'Auction', value: 'auction' },
  ]

  const SERVICE_FEE = 5

  function setFile(file: any) {
    setUploadedFile(file)
    setState({ ...state, file })
  }

  function onSaleTypeChange(e) {
    setSaleType(e.target.value)
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

  function onSelectSplitUser(username) {
    const hasEntry = splitUsers.filter((item) => item.user.username === username).length
    if (!hasEntry && splitUsers.length === 5) return
    const user = splitUsersList.find((item) => item.username === username)
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

  function onChange(value) {
    onSelectSplitUser(value)
    setSplitUserSearchValue(null)
    setSplitUsersList([])
  }

  async function onSearch(val) {
    setSplitUserSearchValue(val)
    if (!val) return
    try {
      const res = await API.getUsername(val)
      setSplitUsersList(res)
    } catch (e) {
      console.log(e)
    }
  }

  function handleSave(e: any) {
    if (primaryButton.onClick)
      primaryButton.onClick({ ...state, category: selectedCategory, splitUsers }, saleType, splitEnabled)
  }

  function handleInputChange(e: any) {
    const { value, name } = e.target
    setState({ ...state, [name]: value.substring(0, 50) })
  }
  function handleDescriptionChange(e: any) {
    const { value } = e.target
    setState({ ...state, description: value })
  }
  function handlePriceChange(value: any) {
    if (value === 0) return form.setFieldsValue({ price: state.price })
    form.setFieldsValue({ price: value && value.toFixed(2) })
    setState({ ...state, price: value && value.toFixed(2) })
  }
  function handleRoyalty(value: any) {
    form.setFieldsValue({ royalty: value && value.toFixed(2) })
    setState({ ...state, royalty: value && value.toFixed(2) })
  }

  function handleFileUpload(file: any) {
    setFileUrl(URL.createObjectURL(file))
    setFile(file)
  }

  function onRemoveFile() {
    setFileUrl(null)
    setFile(null)
  }

  function cutCommission(price) {
    return (price * (1 - SERVICE_FEE / 100)).toFixed(2)
  }

  function onChangeCategory(e, categoryId) {
    if (selectedCategory.includes(categoryId)) {
      setSelectedCategory(selectedCategory.filter((id) => id !== categoryId))
    } else {
      if (selectedCategory.length === 3) return notify.error('You can select only 3 categories', '')
      setSelectedCategory([...selectedCategory, categoryId])
    }
  }

  const totalPercentage = useMemo(() => splitUsers.reduce((s, u) => s + u.percentage, 0), [splitUsers])

  const isCompleteSplitPercentage = totalPercentage === 100

  const hasUserWithZeroPercentage = splitUsers.filter((u) => u.percentage <= 0).length

  // @ts-ignore
  return (
    <Container className="create-token">
      <div
        className={cx('create-token--card', {
          'create-token--card-success': tokenMinted,
        })}
      >
        <div className="create-token__section create-token__section--flex">
          <TokenCard
            isBlob={true}
            token={{
              metaData: {
                url: fileUrl || defaultImage,
                name: state.name || 'Title',
                type: uploadedFile?.type || 'image',
                thumbnail: fileUrl || defaultImage,
                preview: fileUrl || defaultImage,
              },
              ownerProfileImage: user?.profileImage || defaultImage,
              creatorProfileImage: user?.profileImage || defaultImage,
              tokenCreator: user?.username || 'username',
              tokenOwner: user?.username || 'username',
              price: state.price || 0,
              unit: state.cryptoType,
              id: generatedTokenId,
              creatorVerified: user?.is_verified,
              localRate: state.price ? convertToUsd(Number(state.price), conversionRate) : 0,
              localUnit: 'USD',
              auctionLive: false,
              saleType,
            }}
            showSoldOut={false}
          />
          {tokenMinted && (
            <div className="create-token__share">
              <h4>Congratulations!</h4>
              <p>
                You have successfully minted your NFT.
                <br /> Click on the card to view your NFT.
                <br /> To view all your minted NFTs, <br /> go to "Creations" section in your profile.
              </p>
              <Box>
                <Text mb={'10px'}>Share this NFT</Text>
                <Box>
                  <TwitterShareButton
                    title={'Checkout out my NFT here'}
                    url={`${window.location.origin}/${user.username}/${generatedTokenId}`}
                  >
                    <ShareButton variant="primary" icon={<TwitterIcon width="24px" />}>
                      Twitter
                    </ShareButton>
                  </TwitterShareButton>
                  <FacebookShareButton
                    quote={'Checkout out my NFT here'}
                    url={`${window.location.origin}/${user.username}/${generatedTokenId}`}
                  >
                    <ShareButton variant="primary" icon={<FacebookV2Icon width="24px" mr={2} />}>
                      Facebook
                    </ShareButton>
                  </FacebookShareButton>
                </Box>
              </Box>
            </div>
          )}
        </div>
        <div
          className={cx('create-token__section', {
            'create-token__section--hide': tokenMinted,
          })}
        >
          {/*{isMinting && <div className="create-token__section-loading"></div>}*/}
          <CustomSpin size="large" tip={`${primaryButton.caption}...`} spinning={isMinting} delay={200}>
            <Form form={form} name="horizontal_login" onFinish={handleSave}>
              <Box mb={[20]}>
                <UploadInput
                  onChange={handleFileUpload}
                  onRemove={onRemoveFile}
                  label="Upload your file here"
                  helperText="png, jpg, mp4, gif files are accepted. The maximum file size is 100MB."
                  maxSize={100}
                  accept={'image/png, image/jpeg, image/gif, video/mp4'}
                />
              </Box>
              <Form.Item name="name" rules={[{ required: true, message: 'Please provide a valid title.' }]}>
                <Input
                  type="text"
                  label="Title"
                  placeholder="Enter the title of your NFT"
                  className="create-token__input"
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                  maxLength={50}
                />
              </Form.Item>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a valid description.',
                  },
                ]}
              >
                <Input
                  type="textarea"
                  label="Description"
                  placeholder="Add your NFT description or write the story behind your NFT or IPR giveaways"
                  className="create-token__input"
                  name="description"
                  value={state.description}
                  onChange={handleDescriptionChange}
                />
              </Form.Item>
              <Form.Item
                name="royalty"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a valid royalty.',
                  },
                ]}
              >
                <Input
                  type="number"
                  label="Royalty (Max 15%)"
                  placeholder="Set your royalty percentage. Min 1, Max 15"
                  className="create-token__input"
                  onChange={handleRoyalty}
                  name="royalty"
                  value={state.royalty}
                  min="1"
                  max="15"
                />
              </Form.Item>

              <Box mb={20}>
                <Radio.Group
                  options={saleTypeOptions}
                  onChange={onSaleTypeChange}
                  value={saleType}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Box>
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a valid price.',
                  },
                ]}
              >
                <Input
                  type="number"
                  label={
                    <Flex alignItems="center">
                      {`${saleType === 'buy' ? 'Price' : 'Reserve price'} (${state.cryptoType})`}{' '}
                      {saleType !== 'buy' && (
                        <Popover
                          content={() => (
                            <div style={{ padding: '10px' }}>
                              Reserve price is the minimum amount you're <br />
                              willing to accept. A 24 hour auction will be
                              <br />
                              initiated once there is any bid which cannot <br /> be less than reserve price
                            </div>
                          )}
                        >
                          <InfoCircleOutlined style={{ marginLeft: '10px', cursor: 'pointer' }} />
                        </Popover>
                      )}
                    </Flex>
                  }
                  placeholder={`Set the NFT price (${state.cryptoType})`}
                  className="create-token__input"
                  name="price"
                  value={state.price}
                  max={MAX_PRICE}
                  step="0.01"
                  onChange={handlePriceChange}
                />
              </Form.Item>
              {/*<CheckBox label="List NFT for sale" onChange={handleInputChange} />*/}

              {
                <Box mb={20}>
                  <Flex>
                    <Box flex="8">
                      <Text fontSize={[14]} mb={10} fontWeight={[600]}>
                        Create spilt
                      </Text>
                      <Text fontSize={[12]} mb={10}>
                        Enable splits to automatically divide the fund earned from this auction with up to five
                        recipients, including yourself.
                      </Text>
                    </Box>
                    <Box flex="1">
                      <Switch onChange={onChangeSplitRoyalty} />
                    </Box>
                  </Flex>
                  {splitEnabled && (
                    <Box>
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search by username"
                        optionFilterProp="children"
                        onSelect={onChange}
                        onSearch={onSearch}
                        searchValue={splitUserSearchValue}
                        autoClearSearchValue
                        allowClear
                      >
                        {splitUsersList
                          .filter((su) => !splitUsers.map((u) => u.user.username).includes(su.username))
                          .map((user) => (
                            <Option key={user.username} value={user.username}>
                              {user.username}
                            </Option>
                          ))}
                      </Select>

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
                              removeUser={() => onSelectSplitUser(su.user.username)}
                              disableRemove={su.user.username === user.username}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              }

              <Categories mb={20}>
                <Form.Item name="categories" valuePropName="checked" noStyle>
                  <Text fontSize={14} fontWeight={600} mb={10}>
                    Categories (Max 3)
                  </Text>
                  {categories.map((category) => (
                    <Checkbox
                      key={category.id}
                      onChange={(e) => onChangeCategory(e, category.id)}
                      checked={selectedCategory.includes(category.id)}
                      disabled={selectedCategory.length === 3 && !selectedCategory.includes(category.id)}
                    >
                      {category.description}
                    </Checkbox>
                  ))}
                </Form.Item>
              </Categories>

              <div className="create-token__section--actions">
                <Box>
                  {SERVICE_FEE > 0 && (
                    <StyledText>
                      Service fee <b>{SERVICE_FEE}%</b>
                    </StyledText>
                  )}

                  {saleType === 'buy' && (
                    <FinalBreakUp>
                      {splitEnabled ? 'Creators will receive' : 'You will receive'}{' '}
                      <b>
                        {cutCommission(state.price) || 0} {state.cryptoType}
                      </b>{' '}
                      {/*// @ts-ignore*/}
                      <small>{cutCommission(convertToUsd(state.price, conversionRate)) || 0} USD</small>
                      {splitEnabled && (
                        <SplitBreakupPopover
                          usersList={splitUsers.map((u) => ({
                            username: u.user.username,
                            price: Number(cutCommission(state.price)) * (u.percentage / 100),
                            unit: '',
                          }))}
                        />
                      )}
                    </FinalBreakUp>
                  )}
                </Box>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      variant="secondary"
                      htmlType="submit"
                      disabled={
                        !state.file ||
                        primaryButton.disabled ||
                        !selectedCategory.length ||
                        (splitEnabled &&
                          (!isCompleteSplitPercentage || !!hasUserWithZeroPercentage || splitUsers.length < 2))
                      }
                      minWidth={100}
                    >
                      {primaryButton.caption || 'Save'}
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </CustomSpin>
        </div>
      </div>
    </Container>
  )
}

const SplitUsers = (props) => {
  const { user, percentage, maxValue, onChangeUserRoyalty, removeUser, disableRemove } = props
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(percentage)
  }, [percentage])
  function handleChange(val) {
    setValue(val)
    onChangeUserRoyalty(user, val)
  }
  return (
    <SplitUserContainer>
      <Flex flex={2} alignItems="center">
        <Box className="profile-image">
          {!isDefaultImage(user.profileImage) ? (
            <img src={user.profileImage} alt="profile" />
          ) : (
            <BoringAvatar size={30} name={user.username} />
          )}
        </Box>
        <div className="username">{truncateUsername(user.username)}</div>
      </Flex>
      <Flex flex={3} alignItems="center">
        <Box className="slider">
          <CustomSlider min={0} max={maxValue} onChange={handleChange} value={value} />
        </Box>
        <div className="percentage">{percentage}%</div>
        <div className="cancel">
          {!disableRemove && (
            // TODO: handle onclick
            <span onClick={removeUser}>
              <CrossIcon />
            </span>
          )}
        </div>
      </Flex>
    </SplitUserContainer>
  )
}

const SplitUserContainer = styled(Flex)`
  align-items: center;
  margin: 10px 0;

  ${(p) => p.theme.media.xs} {
    display: block;
  }
  ${(p) => p.theme.media.sm} {
    display: flex;
  }

  .profile-image {
    width: 42px;
    height: 42px;
    overflow: hidden;

    img,
    svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .username {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .slider {
    flex: 1;
  }

  .percentage {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    font-weight: 600;
    background-color: ${(p) => p.theme.colors.bg1};
    border-radius: 20px;
  }
  .cancel {
    margin-left: 10px;
    cursor: pointer;
    width: 12px;
    height: 12px;
    display: flex;

    svg {
      height: 100%;
      width: 100%;
    }
  }
`

const Categories = styled(Box)`
  .ant-checkbox-wrapper {
    margin-left: 8px !important;
    margin-bottom: 10px;
  }
`

export default CreateToken
