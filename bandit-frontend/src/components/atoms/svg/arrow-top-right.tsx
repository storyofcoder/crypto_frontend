import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M18.5 17.0378L18.5 5.5M6.96222 5.5L18.5 5.5M18.5 5.5L5.5 18.5" stroke="black" strokeWidth="2.5" />
    </Svg>
  )
}

export default SvgComponent
