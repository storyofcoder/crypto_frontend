import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Checkbox, Form } from "antd";
import { debounce } from "lodash";

import { Box, Flex, Text } from "../components/atoms/StyledSystem";
import { setWalletModal, signIn } from "../state/Auth/actions";
import { notify } from "../components/atoms/Notification/Notify";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";
import { signMessage } from "../utils/web3react";
import { validateUserName } from "../utils";

import Input from "../components/atoms/Form/CustomInput";
import Button from "../components/atoms/Button/Button";
import useWalletModal from "../hooks/useWalletModal";
import API from "../services/API";

const FormItem = styled(Form.Item)`
  margin-bottom: 10px !important;

  .terms-link {
    //color: #9a4ffa !important;
    font-weight: 800;
    color: ${(p) => p.theme.colors.text} !important;
    text-decoration: underline !important;
  }
`

const KnowMore = styled.a`
  margin-left: 5px;
  color: ${(p) => p.theme.colors.text} !important;
  text-decoration: underline !important;
  font-size: 13px;
`

const SignUpModal = () => {
  const { onPresentConnectModal } = useWalletModal()
  const { account, library } = useActiveWeb3React()
  const [forceCreate, setforceCreate] = useState(false)
  const { isLoggedIn, user } = useSelector((state: any) => state.auth)
  const [referral, setreferral] = useState('')
  const [state, setState] = useState({
    username: '',
    email: '',
    name: '',
    referral: '',
  })

  const [exist, setExist] = useState({
    emailExist: false,
    usernameExist: false,
  })
  const [accept, setAccept] = useState(false)
  const [form] = Form.useForm()
  form.setFieldsValue(state)
  const router = useRouter()
  const { query } = router
  const dispatch = useDispatch()

  // useEffect(() => {
  //  // TODO
  //   if (isLoggedIn) router.push("/");
  // }, [isLoggedIn]);

  useEffect(() => {
    if (router?.isReady) {
      const _referral = `${query['id']}` || localStorage.getItem('invite')
      Mixpanel.track(MixpanelEvents.SIGN_UP_PAGE_VIEW, {
        referralLink: !!query['id'],
      })
      if (_referral) localStorage.setItem('invite', `${_referral}`)
      setState({
        username: '',
        email: '',
        name: '',
        referral: `${_referral}` || '',
      })
      setreferral(_referral)
    }
  }, [router?.isReady])

  useEffect(() => {
    if (account && library && forceCreate) {
      handleSave()
    }
  }, [account, forceCreate, library])

  async function handleSave() {
    try {
      if (!account) {
        setforceCreate(true)
        onPresentConnectModal({ skipSign: true })
        return
      }

      const signature = await signMessage(library, account, `Verify your account: ${account}`)

      dispatch(signIn(account, signature, router, referral))

      // // setInProgress(true);
      // const user = await API.signUp(
      //   account,
      //   state.username,
      //   state.email,
      //   state.name,
      //   state.referral
      // );
      // localStorage.setItem("signature", signature);
      // localStorage.setItem("walletAddress", account);
      // localStorage.setItem("user", JSON.stringify({ ...user, signature }));
      // notify.success("Account successfully created", "");
      // dispatch(
      //   setUser({
      //     ...user,
      //     signature,
      //     wallet_address: account,
      //   })
      // );
      Mixpanel.identify(state.username)
      Mixpanel.track(MixpanelEvents.SIGN_UP_CONFIRMED, {
        ...user,
        wallet_address: account,
      })
      // setInProgress(false);

      dispatch(setWalletModal(false, {}))
    } catch (e) {
      if (e?.response?.data?.data === 'ACCOUNT_EXIST') {
        return notify.error('Profile already exist', 'Please click on connect wallet to login')
      }
      Mixpanel.track(MixpanelEvents.SIGN_UP_ERROR, {
        ...user,
        wallet_address: account,
        error: JSON.stringify(e),
      })
      notify.error('Something went wrong please try again later', e?.data?.message || e?.message)
      dispatch(setWalletModal(false, {}))
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
    <Container>
      <Flex flexDirection="row" justifyContent="center">
        <Right flex="2" minHeight={200}>
          <Box backgroundColor="bg2">
            <Text fontSize="largeMedium" fontWeight="600" mb={'10px'} textAlign="center" fontFamily="roc-grotesk">
              Create Account
            </Text>
            <Form form={form} name="horizontal_login" onFinish={handleSave}>
              {/* <FormItem
                name="username"
                rules={[
                  {
                    required: true,
                    min: 6,
                    message:
                      state.username.length < 6
                        ? "Username should be at least 6 characters long."
                        : "Please provide a valid username.",
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
                  required
                />
              </FormItem>
              <FormItem
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please provide a valid display name.",
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
                  required
                />
              </FormItem>

              <FormItem
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please provide a valid email",
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
                  required
                />
              </FormItem> */}

              <FormItem name="referral" rules={[]} shouldUpdate>
                <Input
                  type="text"
                  label={
                    <>
                      <span>Referral code</span>
                      <KnowMore href="#" target="_blank">
                        Know more
                      </KnowMore>
                    </>
                  }
                  placeholder="Referral code (optional)"
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
                    <Flex justifyContent="flex-end" mt={20}>
                      <StyledSubmit
                        type="submit"
                        htmlType="submit"
                        variant="solid"
                        disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length || !accept}
                      >
                        {account ? 'Register' : 'Connect'}
                      </StyledSubmit>
                    </Flex>
                  )}
                </FormItem>
              </Flex>
            </Form>
          </Box>
        </Right>
      </Flex>
    </Container>
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

const Right = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 32px;
  padding: 3%;
  position: relative;
  max-width: 600px;
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

export default SignUpModal
