import React from 'react'
import Svg from '../StyledSystem/Svg'

const BackIcon = (props) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
        stroke={props.iconColor ?? '#49536E'}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M15.75 10.0625L11.375 14L15.75 17.9375"
        stroke={props.iconColor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BackIcon
