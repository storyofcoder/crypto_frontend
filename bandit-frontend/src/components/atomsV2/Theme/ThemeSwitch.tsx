import React, { useEffect, useMemo, useState } from 'react'

import { Mixpanel, MixpanelEvents } from 'analytics/Mixpanel'

import styled from 'styled-components'
import SunIcon from '../../atoms/svg/Sun'
import MoonIcon from '../../atoms/svg/moon'
import useTheme from '../../../hooks/useTheme'

const IconWrapper = styled.span`
  cursor: pointer;
  display: flex;
`

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)

  const { isDark, setTheme, theme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const toggleTheme = useMemo(() => {
    Mixpanel.track(MixpanelEvents.CHANGE_THEME, {
      theme: isDark ? 'light' : 'dark',
    })
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  if (!mounted) return null
  return (
    <div>
      {isDark ? (
        <IconWrapper onClick={toggleTheme}>
          <SunIcon mr={10} width={20} height={20} color={theme.colors.textSubtle} />
        </IconWrapper>
      ) : (
        <IconWrapper onClick={toggleTheme}>
          <MoonIcon mr={10} width={24} height={24} color={theme.colors.textSubtle} />
        </IconWrapper>
      )}
    </div>
  )
}

export default ThemeSwitch
