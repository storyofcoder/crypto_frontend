import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <rect x="2" y="3" width="21" height="3" rx="1.5" fill="black" />
      <rect x="6" y="5" width="13" height="15" rx="1" stroke="black" strokeWidth="2" />
      <rect x="14.5" y="5.5" width="1" height="14" rx="0.5" stroke="black" />{' '}
    </Svg>
  )
}

export default SvgComponent
