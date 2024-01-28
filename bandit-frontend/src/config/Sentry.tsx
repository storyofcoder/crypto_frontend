import React, { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// import { createBrowserHistory } from "history";
import { useRouter } from "next/router";
// const history = createBrowserHistory();

const SentryConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const router = useRouter()
  useEffect(() => {
    let dsn = null
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
      dsn = 'https://2e1f6491bcb2474189f2e5f7a9477399@o792490.ingest.sentry.io/5801341'
    }
    Sentry.init({
      dsn,
      integrations: [
        new Integrations.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV5Instrumentation(router),
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      ignoreErrors: ['ResizeObserver loop limit exceeded'],
    })
  }, [])

  useEffect(() => {
    Sentry.setUser({ email: user?.email, username: user?.username })
  }, [user])
  return null
}

export default SentryConfig
