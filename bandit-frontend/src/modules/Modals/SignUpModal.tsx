import React, { useCallback, useEffect, useState } from "react";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import { Checkbox, Form } from "antd";
import { debounce } from "lodash";
import API from "../../services/API";
import { validateUserName } from "../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/Auth/actions";
import { notify } from "../../components/atoms/Notification/Notify";
import Input from "../../components/atoms/Form/CustomInput";
import Button from "../../components/atoms/Button/Button";
import styled from "styled-components";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { Mixpanel, MixpanelEvents } from "../../analytics/Mixpanel";

const FormItem = styled(Form.Item)`
  margin-bottom: 10px !important;

  .terms-link {
    color: #9a4ffa !important;
  }
`

const SignUpModal = ({ close }) => {
  const { account } = useActiveWeb3React()
  const data = new URL(window.location.href)
  const referral = data.searchParams.get('referral')

  const dispatch = useDispatch()
  useEffect(() => {
    Mixpanel.track(MixpanelEvents.SIGN_UP_PAGE_VIEW, {})
  }, [])
  const [state, setState] = useState({
    username: '',
    email: '',
    name: '',
    referral: referral || '',
  })
  const [exist, setExist] = useState({
    emailExist: false,
    usernameExist: false,
  })
  const [accept, setAccept] = useState(false)
  const [form] = Form.useForm()
  form.setFieldsValue(state)

  async function handleSave() {
    try {
      // setInProgress(true);
      const user = await API.signUp(account, state.username, state.email, state.name, state.referral)
      const signature = localStorage.getItem('signature')
      localStorage.setItem('user', JSON.stringify({ ...user, signature }))

      dispatch(
        setUser({
          ...user,
          signature,
          wallet_address: account,
        }),
      )
      Mixpanel.identify(state.username)
      Mixpanel.track(MixpanelEvents.SIGN_UP_CONFIRMED, {
        ...user,
        signature,
        wallet_address: account,
      })
      close()
      // setInProgress(false);
    } catch (e) {
      notify.error('Something went wrong pls try again later', '')
    }
  }

  const checkUserName = async (value: string) => {
    const res = await API.checkUsername(value)
    setExist(res)
    if (res.usernameExist) {
      form.setFields([
        {
          name: 'username',
          errors: ['Username already exist'],
        },
      ])
    }
  }

  const checkEmail = async (value: string) => {
    const res = await API.checkEmail(value)
    setExist(res)
    if (res.emailExist) {
      form.setFields([
        {
          name: 'email',
          errors: ['The email already exist'],
        },
      ])
    }
  }

  const delayedQueryUserName = useCallback(
    debounce((q) => checkUserName(q), 500),
    [],
  )
  const delayedQueryEmail = useCallback(
    debounce((q) => checkEmail(q), 500),
    [],
  )

  function handleInputChange(e: any) {
    const { value, name } = e.target
    if (name === 'username') {
      delayedQueryUserName(value)
      if (!validateUserName(value)) {
        if (value.length > 0) {
          return form.setFieldsValue({ [name]: state.username })
        }
      }
    }
    if (name === 'email') {
      delayedQueryEmail(value)
    }
    form.setFieldsValue({ [name]: value })
    setState({ ...state, [name]: value })
  }

  function onChangePrivacy() {
    setAccept(!accept)
  }

  return (
    <Box backgroundColor="bg2">
      <Text fontSize="largeMedium" fontWeight="600" mb={'10px'} textAlign="center" fontFamily="roc-grotesk">
        Connect
      </Text>
      <Form form={form} name="horizontal_login" onFinish={handleSave}>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              min: 6,
              message:
                state.username.length < 6
                  ? 'Username should be at least 6 characters long.'
                  : 'Please provide a valid username.',
            },
          ]}
          // shouldUpdate={(p,c)=>p.username !== c.username}
        >
          <Input
            type="text"
            label="Username"
            placeholder="Username"
            name="username"
            value={state.username}
            onChange={handleInputChange}
            prefix="@"
          />
        </FormItem>
        <FormItem
          name="name"
          rules={[
            {
              required: true,
              message: 'Please provide a valid display name.',
            },
          ]}
          shouldUpdate
        >
          <Input
            type="text"
            label="Display name"
            placeholder="Display name"
            name="name"
            value={state.name}
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please provide a valid email',
            },
          ]}
          shouldUpdate
        >
          <Input
            type="text"
            label="Email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem name="referral" rules={[]} shouldUpdate>
          <Input
            type="text"
            label="Referral Code"
            placeholder="Referral Code"
            name="referral"
            value={state.referral}
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem style={{ marginTop: '20px' }}>
          <Checkbox onChange={onChangePrivacy}>
            I agree to the Bandit NFT marketplace's{' '}
            <a href="/legal/terms" target="_blank" className="terms-link">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" target="_blank" className="terms-link">
              Privacy Policy
            </a>
          </Checkbox>
        </FormItem>

        <Flex flexDirection="column" alignItems="center">
          <FormItem shouldUpdate>
            {() => (
              <Button
                variant="secondary"
                htmlType="submit"
                width={150}
                m={0}
                mt={'10px'}
                disabled={
                  !form.isFieldsTouched(['username', 'name', 'email'], true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                  exist.emailExist ||
                  exist.usernameExist ||
                  !accept
                }
              >
                Register
              </Button>
            )}
          </FormItem>
          <Text style={{ cursor: 'pointer' }} onClick={close}>
            Cancel
          </Text>
        </Flex>
      </Form>
    </Box>
  )
}

export default SignUpModal
