import React from 'react'
import Svg from '../StyledSystem/Svg'

const AngelUp = (props) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" {...props}>
      <path
        d="M5.25 17.5L14 8.75L22.75 17.5"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}

export default AngelUp
