import React from 'react'
import Svg from '../StyledSystem/Svg'

const AngleDown = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.25 7.5L10 13.75L3.75 7.5"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AngleDown
