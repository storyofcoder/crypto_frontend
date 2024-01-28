import React from 'react'
import CollectionCard from '../../../components/molecules/collections/CollectionCardV2'
import UploadInput from '../../../components/atoms/Form/UploadInput'
import { Button } from '../../../components/atomsV2/Button'
import UploadIcon from '../../../components/atoms/svg/Upload'
import { Box, Flex, Text } from 'components/atoms/StyledSystem'
import styled from 'styled-components'
import { Input, InputGroup, InputHybrid } from '../../../components/atomsV2/Input'
import { DiscordIcon, InstagramIcon, TwitterIcon, WebsiteIcon } from '../../../components/atoms/svg'
import { DISCORD, INSTAGRAM, TWITTER } from '../../../constant/socialMedia'
import useTheme from '../../../hooks/useTheme'
import { isValidAddress } from '../../../utils'

const defaultImage = 'https://bandit-network.s3.ap-southeast-1.amazonaws.com/assets/default-profile.png'

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

const CollectionDetails = ({
  hide,
  formik,
  continueToDeploy,
  onChangeProfileImage,
  onChangeCoverImage,
  coverImage,
  profileImage,
  isDeployed,
  isEdit,
}) => {
  const { theme } = useTheme()

  if (hide) return null
  return (
    <Flex flexDirection={['column', 'column', 'column', 'column', 'row']}>
      <Left flex="1" minHeight={200}>
        <Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <Text fontSize="22px" fontWeight="600" color="text" mb={20}>
                  {isEdit ? 'Edit ' : 'Create '}
                  Collection
                </Text>
                <Box>
                  <InputHybrid
                    type="text"
                    label="Collection Name"
                    placeholder="eg: Bored Ape Yacht Club"
                    name="name"
                    required={true}
                    error={formik.errors.name}
                    touched={formik.touched.name}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={50}
                    mb={10}
                  />

                  <InputHybrid
                    type="textarea"
                    label="Description"
                    placeholder="eg: 10k unique NFT collection"
                    name="description"
                    error={formik.errors.description}
                    touched={formik.touched.description}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    mb={10}
                  />

                  <InputGroup
                    mb={20}
                    startIcon={
                      <Flex alignItems="center">
                        <InstagramIcon />
                        <Text fontSize={14} ml={'5px'}>
                          {INSTAGRAM}
                        </Text>
                      </Flex>
                    }
                  >
                    <Input
                      placeholder="username"
                      name="instagram"
                      paddingLeft="220px !important"
                      onChange={formik.handleChange}
                      touched={formik.touched}
                      value={formik.values.instagram}
                    />
                  </InputGroup>

                  <InputGroup
                    mb={20}
                    startIcon={
                      <Flex alignItems="center">
                        <DiscordIcon />
                        <Text fontSize={14} ml={'5px'}>
                          {DISCORD}
                        </Text>
                      </Flex>
                    }
                  >
                    <Input
                      placeholder="server"
                      name="discord"
                      paddingLeft="185px !important"
                      onChange={formik.handleChange}
                      touched={formik.touched}
                      value={formik.values.discord}
                    />
                  </InputGroup>

                  <InputGroup
                    mb={20}
                    startIcon={
                      <Flex alignItems="center">
                        <TwitterIcon />
                        <Text fontSize={14} ml={'5px'}>
                          {TWITTER}
                        </Text>
                      </Flex>
                    }
                  >
                    <Input
                      placeholder="username"
                      name="twitter"
                      paddingLeft="190px !important"
                      onChange={formik.handleChange}
                      touched={formik.touched}
                      value={formik.values.twitter}
                    />
                  </InputGroup>

                  <InputGroup
                    mb={20}
                    startIcon={
                      <Flex alignItems="center">
                        <WebsiteIcon />
                      </Flex>
                    }
                  >
                    <Input
                      placeholder="https://collectionwebsite.io"
                      name="website"
                      onChange={formik.handleChange}
                      touched={formik.touched}
                      value={formik.values.website}
                    />
                  </InputGroup>
                </Box>
              </Box>
              <Flex mt={20}>
                <StyledSubmit
                  variant="primary"
                  scale="md"
                  onClick={continueToDeploy}
                  disabled={
                    Object.keys(formik.errors).includes('name') ||
                    Object.keys(formik.errors).includes('description') ||
                    Object.keys(formik.errors).includes('website')
                  }
                >
                  {isDeployed ? 'Save' : 'Continue'}
                </StyledSubmit>
              </Flex>
            </form>
          </Box>
        </Box>
      </Left>
      <Right flex="1">
        <CollectionCard
          showDetails={false}
          details={{
            name: formik.values.name,
            bio: formik.values.description,
            coverImage: coverImage.fileUrl ? coverImage.fileUrl : defaultImage,
            profileImage: profileImage.fileUrl ? profileImage.fileUrl : defaultImage,
          }}
        />
        <Flex flexDirection="column" alignItems="center" mt={20}>
          <UploadInput
            id="profile-pic"
            customButton={() => (
              <Button
                variant="secondary"
                scale="sm"
                mb={20}
                startIcon={<UploadIcon width={20} height={20} iconcolor={theme.colors.primary} />}
              >
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
              <Button
                variant="secondary"
                scale="sm"
                startIcon={<UploadIcon width={20} height={20} iconcolor={theme.colors.primary} />}
              >
                Upload cover image
              </Button>
            )}
            onChange={onChangeCoverImage}
            maxSize={5}
            accept={'image/png, image/jpeg, image/gif'}
          />
        </Flex>
      </Right>
    </Flex>
  )
}

export default CollectionDetails
