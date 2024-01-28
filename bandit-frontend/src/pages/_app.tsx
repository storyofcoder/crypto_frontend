import React from 'react'
import NextNProgress from "nextjs-progressbar";

import { useStore } from '../config/store'

import AppLayout from '../components/molecules/AppLayout'
import { RouteGuard } from '../components/atoms/RouteGuard'

import Providers from '../providers'

import useEagerConnect from '../hooks/useEagerConnect'

import { NotificationContainer } from '../components/atoms/Notification/Notify'

import GlobalStyles from '../config/globalStyles'

import 'antd/dist/antd.css'
import 'suneditor/dist/css/suneditor.min.css'
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap/dist/css/bootstrap.css";
import 'react-datetime/css/react-datetime.css'
import 'swiper/css/bundle'

import { AppProps } from 'next/app'
import Script from 'next/script'
import useTheme from "../hooks/useTheme";

// import "../index.scss";
// import "../components/atoms/Avatar/styles.scss";
// import "../components/atoms/Avatar/skeleton/styles.scss";
// import "../components/atoms/Tabs/tabs.scss";
// import "../components/atoms/Image/asset.scss";
// import "../components/molecules/Token/bidTokenCard.scss";
// import "../components/molecules/Token/settleAuctionCard.scss";
// import "../components/molecules/Token/auctionHistory.scss";
// import "../components/molecules/Token/historyitem.scss";
// import "../components/molecules/Token/tokenCard.scss";
// import "../components/molecules/Token/verificationitem.scss";
// import "../components/molecules/Token/bidToken.scss";
// import "../components/molecules/Token/dropToken.scss";
// import "../modules/layout/searchStyle.scss";

// import "../components/molecules/Token/skeletons/historyItemSkeleton.scss";
// import "../components/molecules/Token/skeletons/bidTokenSkeleton.scss";
// import "../components/molecules/Token/skeletons/dropTokenSkeleton.scss";
// import "../components/molecules/Token/skeletons/tokenCardSkeleton.scss";
// import "../components/molecules/Token/skeletons/notificationSkeleton.scss";
// import "../components/templates/Profile/styles.scss"
// import "suneditor/dist/css/suneditor.min.css";
// import 'suneditor/src/assets/css/suneditor.css'

function GlobalHooks() {
  // useEagerConnect()
  // useAccountDetails()

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
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KT7XRG5');
          `,
        }}
      />
    </>
  )
}

const MyApp = (props) => {
  const { Component, pageProps } = props
  const {theme} = useTheme()
  return (
    <AppLayout>
      <NextNProgress color={theme.colors.foreground}/>
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
