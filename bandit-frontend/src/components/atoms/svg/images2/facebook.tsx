import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 3C7.02955 3 3 7.02955 3 12C3 16.5123 6.32386 20.2379 10.6549 20.8887V14.3854H8.42823V12.0196H10.6549V10.4455C10.6549 7.83914 11.9247 6.69491 14.0909 6.69491C15.1283 6.69491 15.6769 6.77182 15.9367 6.807V8.87209H14.459C13.5394 8.87209 13.2183 9.74386 13.2183 10.7265V12.0196H15.9134L15.5476 14.3854H13.2183V20.908C17.6111 20.3119 21 16.556 21 12C21 7.02955 16.9705 3 12 3Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
