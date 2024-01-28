import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M17.9999 7L16.5899 5.59L10.2499 11.93L11.6599 13.34L17.9999 7ZM22.2399 5.59L11.6599 16.17L7.47991 12L6.06991 13.41L11.6599 19L23.6599 7L22.2399 5.59ZM0.409912 13.41L5.99991 19L7.40991 17.59L1.82991 12L0.409912 13.41Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
