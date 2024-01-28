import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" {...props}>
      <path
        d="M16 12L13.7143 12L13.7143 -9.99117e-08L11.4286 -1.99823e-07L11.4286 12L9.14286 12L12.5714 16L16 12ZM6.85714 4L3.42857 -5.49515e-07L7.78829e-07 4L2.28571 4L2.28571 16L4.57143 16L4.57143 4L6.85714 4Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
