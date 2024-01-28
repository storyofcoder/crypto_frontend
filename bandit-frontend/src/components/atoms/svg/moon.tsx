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

const MoonIcon = (props) => {
  return (
    <SVG width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27.0877 19.0751C25.1243 19.6257 23.0498 19.6437 21.0772 19.1274C19.1046 18.611 17.305 17.579 15.8631 16.1371C14.4213 14.6953 13.3892 12.8957 12.8729 10.923C12.3566 8.95043 12.3746 6.87593 12.9252 4.9126C10.9895 5.45136 9.22875 6.48787 7.81833 7.91889C6.40791 9.3499 5.39704 11.1255 4.88639 13.0688C4.37574 15.012 4.38315 17.0552 4.90787 18.9947C5.43259 20.9342 6.45631 22.7024 7.87706 24.1232C9.29781 25.5439 11.066 26.5677 13.0055 27.0924C14.9451 27.6171 16.9882 27.6245 18.9315 27.1139C20.8748 26.6032 22.6503 25.5923 24.0814 24.1819C25.5124 22.7715 26.5489 21.0108 27.0877 19.0751V19.0751Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SVG>
  )
}

export default MoonIcon
