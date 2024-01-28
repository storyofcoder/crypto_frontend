import React from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Box, Flex, Text } from '../../atoms/StyledSystem'
import { DiscordIcon, InstagramIcon, TwitterIcon } from '../../../components/atoms/svg'
import { INSTAGRAM, TWITTER, DISCORD } from '../../../constant/socialMedia'
import { Input, InputGroup, InputHybrid } from '../../../components/atomsV2/Input'
import { Button } from '../../atomsV2/Button'

import API from '../../../services/API'
import ProfileDescriptionSection from 'views/Profile/components/Components/ProfileDescriptionSection'

const Container = styled(Box)`
  ${(p) => p.theme.media.xlg} {
    max-width: var(--max-width);
    margin: 0 auto;
    // padding: 0 40px;
  }
`

const EditProfileLayout = styled.div`
  ${(p) => p.theme.media.xlg} {
    width: 100% !important;
  }
`

const Details = styled.div`
  margin: 0 20px;
  display: flex;
  max-width: 550px;
  margin: auto;
  margin-top: 50px;
  justify-content: center;

  ${(p) => p.theme.media.xs} {
    flex-direction: column;
  }
`

const Info = styled.div`
  flex: 4;
  padding: 0 15px;
  width: 100%;
`

const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  ${(p) => p.theme.media.xs} {
    justify-content: center;
  }
`

const EditProfile = ({ onClickSubmit, profileInfo = {}, uploadCoverImage, uploadProfileImage }: any) => {
  const FormSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is must.')
      .matches(/^[a-zA-Z0-9_ ]*$/, 'Username can only be alphanumeric.')
      .test('unique', 'Username exists.', async function (value, context) {
        try {
          if (!value) return
          if (value === profileInfo?.username) {
            return true
          }
          const trimmed = value.trim()
          const res = await API.checkUsername(trimmed)
          return !res.usernameExist
        } catch (e) {
          return true
        }
      }),
    name: Yup.string().required('Name is must.'),
    email: Yup.string()
      .email('Please provide a valid email.')
      .test('unique', 'Email exists.', async function (value, context) {
        try {
          if (!value) return true
          if (value === profileInfo?.email) {
            return true
          }
          const res = await API.checkEmail(value)
          return !res.usernameExist
        } catch (e) {
          return true
        }
      }),

    bio: Yup.string(),
    instagram: Yup.string(),
    discord: Yup.string(),
    twitter: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      username: profileInfo?.username,
      name: profileInfo?.name,
      email: profileInfo?.email,
      bio: profileInfo?.bio,
      discord: profileInfo?.socialmedia?.discord,
      instagram: profileInfo?.socialmedia?.instagram,
      twitter: profileInfo?.socialmedia?.twitter,
      profileImage: profileInfo?.profileImage,
      coverImage: profileInfo?.coverImage,
      defaultView: profileInfo?.default_user_page || 'collections',
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      const object = {
        username: values?.username,
        name: values?.name,
        email: values?.email,
        profileImage: values?.profileImage,
        coverImage: values?.coverImage,
        bio: values?.bio,
        socialmedia: {
          discord: values?.discord,
          instagram: values?.instagram,
          twitter: values?.twitter,
        },
      }
      if (onClickSubmit) onClickSubmit(object, formik?.values?.defaultView)
    },
  })

  return (
    <Container>
      <EditProfileLayout>
        <ProfileDescriptionSection
          profileInfo={profileInfo}
          uploadCoverImage={uploadCoverImage}
          uploadProfileImage={uploadProfileImage}
          isEdit={true}
        />

        <Details>
          <Info>
            <form onSubmit={formik.handleSubmit} name="horizontal_login">
              <InputHybrid
                label="User name"
                type="text"
                placeholder="User name"
                name="username"
                size="large"
                required={true}
                value={formik?.values?.username}
                error={formik.errors.username}
                touched={formik.touched.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mb={10}
              />

              <InputHybrid
                label="Full name"
                type="text"
                name="name"
                placeholder="Full name"
                size="large"
                required={true}
                value={formik?.values?.name}
                error={formik.errors.name}
                touched={formik.touched.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mb={10}
              />

              <InputHybrid
                label="Email"
                type="text"
                name="email"
                placeholder="Email"
                size="large"
                value={formik?.values?.email}
                error={formik.errors.email}
                touched={formik.touched.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mb={10}
              />

              <InputHybrid
                label="Bio"
                type="textarea"
                name="bio"
                size="large"
                value={formik?.values?.bio}
                error={formik.errors.bio}
                touched={formik.touched.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mb={10}
              />

              <Text fontSize="12px" fontWeight="600" color="text" mb={1}>
                Social Links
              </Text>

              <InputGroup
                mb={10}
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
                  value={formik?.values?.instagram}
                  error={formik.errors.instagram}
                  touched={formik.touched.instagram}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>

              <InputGroup
                mb={10}
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
                  value={formik?.values?.discord}
                  error={formik.errors.discord}
                  touched={formik.touched.discord}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>

              <InputGroup
                mb={10}
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
                  value={formik?.values?.twitter}
                  error={formik.errors.twitter}
                  touched={formik.touched.twitter}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              <Action>
                <Button
                  variant="primary"
                  type="submit"
                  htmlType="submit"
                  disabled={!Object.keys(formik.errors)}
                  minWidth={150}
                >
                  Submit
                </Button>
              </Action>
            </form>
          </Info>
        </Details>
      </EditProfileLayout>
    </Container>
  )
}

export default EditProfile
