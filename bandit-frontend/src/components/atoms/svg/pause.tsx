import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </Svg>
  )
}

export default SvgComponent
