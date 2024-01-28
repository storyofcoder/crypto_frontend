import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="16" height="13" viewBox="0 0 16 13" {...props}>
      <path
        d="M2.66667 13H0V10.4H2.66667V13ZM2.66667 5.2H0V7.8H2.66667V5.2ZM2.66667 0H0V2.6H2.66667V0ZM4.66667 0V2.6H16V0H4.66667ZM4.66667 7.8H16V5.2H4.66667V7.8ZM4.66667 13H16V10.4H4.66667V13Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
