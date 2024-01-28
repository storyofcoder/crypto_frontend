import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <path d="M8 16H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 22H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default SvgComponent
