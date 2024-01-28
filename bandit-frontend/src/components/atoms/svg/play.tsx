import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />{' '}
    </Svg>
  )
}

export default SvgComponent
