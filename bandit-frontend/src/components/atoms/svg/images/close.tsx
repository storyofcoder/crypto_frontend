import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={{ display: 'block' }} {...props}>
      <path
        d="M15 1L1 15M15 15L1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </Svg>
  )
}

export default SvgComponent
