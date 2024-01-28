import React from 'react'
import Svg from '../StyledSystem/Svg'

const SvgComponent = (props) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.4274 22.1926C17.9502 22.1926 22.4274 17.7155 22.4274 12.1926C22.4274 6.66978 17.9502 2.19263 12.4274 2.19263C6.90452 2.19263 2.42737 6.66978 2.42737 12.1926C2.42737 17.7155 6.90452 22.1926 12.4274 22.1926Z"
        stroke={'var(--background)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4274 16.1926V12.1926"
        stroke={'var(--background)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4274 8.19263H12.4374"
        stroke={'var(--background)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
