import NextNProgress from 'nextjs-progressbar'
import React from 'react'

import { useStore } from '../src/config/store'

import { RouteGuard } from '../src/components/atoms/RouteGuard'
import AppLayout from '../src/components/molecules/AppLayout'

import Providers from '../src/providers'


import { NotificationContainer } from '../src/components/atoms/Notification/Notify'

import GlobalStyles from '../src/config/globalStyles'

import 'antd/dist/antd.css'
import 'suneditor/dist/css/suneditor.min.css'
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap/dist/css/bootstrap.css";
import 'react-datetime/css/react-datetime.css'
import 'swiper/css/bundle'

import { AppProps } from 'next/app'
import Script from 'next/script'
import useTheme from '../src/hooks/useTheme'

function GlobalHooks() {

  return null
}

function App(props: AppProps) {
  const { pageProps } = props
  const store = useStore(pageProps.initialReduxState)
  return (
    <>
      <Providers store={store} pageProps={pageProps}>
        <GlobalStyles />
        <GlobalHooks />
        <NotificationContainer />
        <MyApp {...props} />
      </Providers>
    </>
  )
}

const MyApp = (props) => {
  const { Component, pageProps } = props
  const { theme } = useTheme()

  if (Component.layoutOff) return <Component {...pageProps} />
  return (
    <AppLayout>
      <NextNProgress color={theme.colors.foreground} options={{ showSpinner: false }} />
      {/* if requireAuth property is present - protect the page */}
      {Component.requireAuth ? (
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      ) : (
        // public page
        <Component {...pageProps} />
      )}
    </AppLayout>
  )
}

export default App
