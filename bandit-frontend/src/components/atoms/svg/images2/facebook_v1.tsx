import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 2C6.489 2 2 6.489 2 12C2 17.511 6.489 22 12 22C17.511 22 22 17.511 22 12C22 6.489 17.511 2 12 2ZM12 4C16.4301 4 20 7.56988 20 12C20 16.0145 17.0653 19.313 13.2188 19.8984V14.3848H15.5469L15.9121 12.0195H13.2188V10.7266C13.2188 9.74356 13.539 8.87109 14.459 8.87109H15.9355V6.80664C15.6755 6.77164 15.1268 6.69531 14.0898 6.69531C11.9238 6.69531 10.6543 7.83931 10.6543 10.4453V12.0195H8.42773V14.3848H10.6543V19.8789C6.87029 19.2408 4 15.9702 4 12C4 7.56988 7.56988 4 12 4Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
