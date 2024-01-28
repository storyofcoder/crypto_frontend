import React from 'react'
import Svg from '../StyledSystem/Svg'

const SvgComponent = (props) => {
  return (
    <Svg width="15" height="17" viewBox="0 0 32 32" {...props}>
      <path d="M5 27V6" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5 21.0001C13 15.0001 19 27.0001 27 21.0001V6.00012C19 12.0001 13 0.000117183 5 6.00012"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
