import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M13.0005 6.99L9.00049 3L5.00049 6.99L8.00049 6.99L8.00049 14L10.0005 14L10.0005 6.99L13.0005 6.99ZM15.0005 21L19.0005 17.01L16.0005 17.01L16.0005 10L14.0005 10L14.0005 17.01L11.0005 17.01L15.0005 21Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
