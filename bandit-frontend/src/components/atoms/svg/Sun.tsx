import React from 'react'
import Svg from '../StyledSystem/Svg'
import styled from 'styled-components'

const SVG = styled(Svg)`
  :hover {
    path {
      fill: ${(p) => p.theme.colors.foreground};
      stroke: ${(p) => p.theme.colors.foreground};
    }
  }
`

const SunIcon = (props) => {
  return (
    <SVG width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 23.5C20.1421 23.5 23.5 20.1421 23.5 16C23.5 11.8579 20.1421 8.5 16 8.5C11.8579 8.5 8.5 11.8579 8.5 16C8.5 20.1421 11.8579 23.5 16 23.5Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 3.5V1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M24.8379 7.1625L26.2504 5.75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28.5 16H30.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M24.8379 24.8374L26.2504 26.2499"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 28.5V30.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.1625 24.8374L5.75 26.2499"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 16H1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.1625 7.1625L5.75 5.75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  )
}

export default SunIcon
