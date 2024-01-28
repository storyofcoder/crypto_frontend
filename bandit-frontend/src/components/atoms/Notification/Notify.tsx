import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import { CheckCircleFilled, ExclamationCircleFilled, InfoCircleFilled, WarningFilled } from '@ant-design/icons'
import { NotifyInfoIcon, NotifyWarningIcon, NotifyErrorIcon, NotifySuccessIcon } from '../svg'
import { Box, Flex, Text } from '../StyledSystem'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig = {
  draggable: true,
  hideProgressBar: true,
  newestOnTop: true,
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
}

const getIcon = (type: any) => {
  switch (type) {
    case 'success':
      return <NotifySuccessIcon />
    case 'error':
      return <NotifyErrorIcon />
    case 'warning':
      return <NotifyWarningIcon />
    default:
      return <NotifyInfoIcon />
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    .Toastify {
      z-index: 999999 !important;
      &__toast-container{
        top: 5rem !important;
      }
      &__toast {
        background-color: ${(p: any) => p.theme.colors.foreground};
        /* background-color: ${(p: any) => p.theme.colors[p.type]}; */
        /* border: 1px solid  ${(p: any) => p.theme.colors.foreground}; */
        color: ${(p: any) => p.theme.colors.background};
        opacity: 1 !important;
        z-index: 999999 !important;
        padding: 10px !important;
        border-radius: 3px;
        box-shadow: 0 0 1px .2px ${(p) => p.theme.shadows[1]};
      }

      &__close-button {
       outline: none !important;
       color: ${(p: any) => p.theme.colors.background};
      }
    }
  }
  `

const Type = styled.div`
  background-color: ${(p: any) => p.theme.colors[p.type]};
  border-radius: 2px;
  height: 60%;
  width: 6px;
  position: absolute;
  left: -2px;
  top: 20%;
  bottom: 50%;
`

const IconWrapper = styled(Box)`
  path {
    /* fill: ${(p: any) => p.theme.colors.background}; */
  }
`

const NotificationTemplate = (props: any) => {
  const { title, message, type } = props
  return (
    <>
      <Type type={type} />
      <GlobalStyle type={type} />
      <Flex>
        <IconWrapper mr={10} color={type}>
          {getIcon(type)}
        </IconWrapper>
        <Flex flexDirection="column" justifyContent="center" alignItems="flexStart">
          <Text fontSize="14px">{title}</Text>
          {message && <Text fontSize="12px">{message}</Text>}
        </Flex>
      </Flex>
    </>
  )
}

const notifier = (title: string, message: string, type: any) => {
  // @ts-ignore
  toast(<NotificationTemplate type={type} title={title} message={message} />, {
    ...toastConfig,
    type: type,
  })
}

export const notify = {
  success: (title: string, message?: string) => notifier(title, message, 'success'),
  error: (title: string, message?: string) => notifier(title, message, 'error'),
  warning: (title: string, message?: string) => notifier(title, message, 'warning'),
  info: (title: string, message?: string) => notifier(title, message, 'info'),
}

export const NotificationContainer = ToastContainer
