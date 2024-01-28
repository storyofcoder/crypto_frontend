import React from 'react'
import Svg from '../StyledSystem/Svg'

const SvgComponent = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" style={{ fill: 'transparent' }} {...props}>
      <path
        d="M17.5 1.75H2.5C2.08579 1.75 1.75 2.08579 1.75 2.5V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V2.5C18.25 2.08579 17.9142 1.75 17.5 1.75Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
