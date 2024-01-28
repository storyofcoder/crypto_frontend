import React, { useEffect } from "react";
import { initializeAnalytics, trackPageView } from "./index";
import { useRouter } from "next/router";

const hostname = window.location.hostname

const InitializeAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    initializeAnalytics({
      clientId: hostname.substring(0, hostname.indexOf('.')),
    })
    // TODO: Testing
    const handleRouteChange = (location) => {
      trackPageView({
        path: `${router.pathname}${location.search}${location.hash}`,
      })
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return null
}

export default InitializeAnalytics
