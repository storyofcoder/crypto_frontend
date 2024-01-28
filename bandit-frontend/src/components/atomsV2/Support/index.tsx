import React from 'react'
import SupportIcon from '../../atoms/svg/support'
import DropDown from '../../atoms/Dropdown/Dropdown'
import useTheme from '../../../hooks/useTheme'
import { Mixpanel, MixpanelEvents } from '../../../analytics/Mixpanel'

export const SUBMIT_COLLECTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfZNewiU9PWnexG6LcKpcRkT_0SvhfpFoop8nyzPXYD7cCjXQ/viewform'

const Support = () => {
  const { theme } = useTheme()
  const goTo = (link, event) => {
    Mixpanel.track(event)
    window.open(link, '_blank')
  }
  return (
    <DropDown
      optionList={[
        {
          title: 'Submit your Collection',
          onClick: () => goTo(SUBMIT_COLLECTION, MixpanelEvents.SUBMIT_YOUR_COLLECTION),
        },
        {
          title: 'Request Features',
          onClick: () => goTo('https://bandit.canny.io/feature-requests', MixpanelEvents.REQUEST_FEATURE),
        },
      ]}
      customButton={() => <SupportIcon mr={10} iconColor={theme.colors.textSubtle} cursor="pointer" />}
    />
  )
}

export default Support
