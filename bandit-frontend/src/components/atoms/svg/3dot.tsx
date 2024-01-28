import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg fill="none" viewBox="0 0 4 16" {...props}>
      <circle cx="2" cy="2" r="2" fill="white" />
      <circle cx="2" cy="8" r="2" fill="white" />
      <circle cx="2" cy="14" r="2" fill="white" />
    </Svg>
  )
}

export default SvgComponent
