import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" />{' '}
    </Svg>
  )
}

export default SvgComponent
