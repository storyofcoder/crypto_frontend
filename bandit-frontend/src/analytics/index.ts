import ReactGA from "react-ga";

let dimensionForSet = {}
export const initializeAnalytics = ({ trackingId = 'UA-158696126-2', clientId }) => {
  ReactGA.initialize(trackingId, {
    debug: !process.env.NEXT_PUBLIC_NODE_ENV || ['development', 'qa'].includes(process.env.NEXT_PUBLIC_NODE_ENV),
    titleCase: false,
    gaOptions: {
      clientId,
    },
  })
}

export const trackPageView = ({ path }) => {
  ReactGA.set(dimensionForSet)
  ReactGA.pageview(path)
}

export const trackModelView = ({ path }) => {
  ReactGA.set(dimensionForSet)
  ReactGA.modalview(path)
}

export const trackEvent = ({ action, value }) => {
  ReactGA.set(dimensionForSet)
  ReactGA.event(
    JSON.parse(
      JSON.stringify({
        value,
        action,
      }),
    ),
  )
}

export const trackException = ({ description, fatal }) => {
  ReactGA.exception(
    JSON.parse(
      JSON.stringify({
        description,
        fatal,
      }),
    ),
  )
}

export const setUserId = (userId) => {
  ReactGA.set({ userId })
}

export const setDimension = (dimension) => {
  dimensionForSet = {
    ...dimensionForSet,
    ...dimension,
  }
}
