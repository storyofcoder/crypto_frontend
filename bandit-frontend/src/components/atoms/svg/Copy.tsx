import React from 'react'
import Svg from '../StyledSystem/Svg'

const CopyIcon = (props) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M27 23V5H9"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 9H5V27H23V9Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CopyIcon
