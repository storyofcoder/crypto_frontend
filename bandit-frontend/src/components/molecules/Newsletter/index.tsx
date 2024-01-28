import React, { useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Box, Flex, Text } from 'components/atoms/StyledSystem'
import { Heading } from 'components/atomsV2/Heading'
import { Input } from 'components/atomsV2/Input'
import { Button } from 'components/atomsV2/Button'
import API from 'services/API'
import { subscribe } from 'state/source'

const NewsletterWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.backgroundAlt};
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  ${(p) => p.theme.media.xxs} {
    padding: 24px;
  }

  ${(p) => p.theme.media.lg} {
    padding: 48px;
  }
`

const Header = styled(Heading)`
  z-index: 9;
  max-width: 320px;
  margin-right: 80px;
`

const FlexWrapper1 = styled(Flex)`
  ${(p) => p.theme.media.xxs} {
    flex-direction: column;
  }

  ${(p) => p.theme.media.lg} {
    flex-direction: row;
  }
`

const FlexWrapper2 = styled(Flex)``

const InputWrapper = styled(Input)`
  margin-top: 24px;
  margin-right: 20px;
  z-index: 9;
  ${(p) => p.theme.media.lg} {
    width: 320px;
    margin-top: 0;
  }
`

const ButtonWrapper = styled(Button)`
  margin-top: 24px;
  height: 40px !important;
  border-radius: 6px !important;
  z-index: 9;

  ${(p) => p.theme.media.xxs} {
    margin-top: 40px;
  }

  ${(p) => p.theme.media.lg} {
    margin-top: 0;
  }
`

const Circle1 = styled.div`
  width: ${(p) => (p.theme.size === 'sm' ? '50px' : '200px')};
  height: ${(p) => (p.theme.size === 'sm' ? '50px' : '200px')};
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.grey600};
  position: absolute;
  top: -100px;
  left: -120px;
  z-index: 1;
`

const Circle2 = styled.div`
  width: ${(p) => (p.theme.size === 'sm' ? '50px' : '200px')};
  height: ${(p) => (p.theme.size === 'sm' ? '50px' : '200px')};
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.grey600};
  position: absolute;
  bottom: -100px;
  right: -120px;
  z-index: 1;
`

const Message = styled.div<{
  error: boolean
}>`
  position: absolute;

  ${(p) => p.theme.media.xxs} {
    top: 140px;
  }

  ${(p) => p.theme.media.lg} {
    top: 100px;
  }

  p {
    color: ${(p) => (p.error ? 'red' : 'green')};
    font-size: 11px;
  }
`

const index = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please provide a valid email.')
      .test('unique', 'Email exists.', async function (value, context) {
        try {
          if (!value) return true
          const res = await API.checkEmail(value)
          return !res.usernameExist
        } catch (e) {
          return true
        }
      })
      .required('Email is required.'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const data = await subscribe(values?.email)
        formik.resetForm()
        setLoading(false)
        setSuccess('Subscription Successful! 🎉')
      } catch (error) {
        console.error('Failed to subscribe newsletter', error)
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit} name="newsletter">
      <NewsletterWrapper>
        <Circle1 />
        <FlexWrapper1 ml={'auto'} mr={'auto'}>
          <Header>Subscribe for weekly updates on upcoming mints</Header>
          <FlexWrapper2 flexDirection="column">
            <InputWrapper
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formik?.values?.email}
              error={formik.errors.email}
              touched={formik.touched.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Message error={formik.errors.email ? true : false}>
              {formik.errors.email ? <p>{formik.errors.email}</p> : <p>{success}</p>}
            </Message>
          </FlexWrapper2>
          <ButtonWrapper type="submit" htmlType="submit" disabled={!Object.keys(formik.errors)} isLoading={loading}>
            Subscribe
          </ButtonWrapper>
        </FlexWrapper1>
        <Circle2 />
      </NewsletterWrapper>
    </form>
  )
}

export default index
