import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M18.6 19.5H21V21.5H15V15.5H17V18.23C18.83 16.76 20 14.52 20 12C20 7.92999 16.94 4.55999 13 4.06999V2.04999C18.05 2.54999 22 6.80999 22 12C22 14.99 20.68 17.67 18.6 19.5ZM4 12C4 9.47999 5.17 7.22999 7 5.76999V8.49999H9V2.49999H3V4.49999H5.4C3.32 6.32999 2 9.00999 2 12C2 17.19 5.95 21.45 11 21.95V19.93C7.06 19.44 4 16.07 4 12Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
