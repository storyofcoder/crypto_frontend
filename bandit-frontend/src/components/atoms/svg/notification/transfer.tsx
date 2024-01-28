import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M13 6.99L9 3L5 6.99L8 6.99L8 14L10 14L10 6.99L13 6.99ZM15 21L19 17.01L16 17.01L16 10L14 10L14 17.01L11 17.01L15 21Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
