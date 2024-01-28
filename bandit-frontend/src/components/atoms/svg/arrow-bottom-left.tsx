import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M5.5 6.96222V18.5M17.0378 18.5H5.5M5.5 18.5L18.5 5.5" stroke="black" strokeWidth="2.5" />
    </Svg>
  )
}

export default SvgComponent
