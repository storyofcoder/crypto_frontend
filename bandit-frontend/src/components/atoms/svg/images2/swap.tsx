import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M17.28 17.96H19.2V19.56H14.4V14.76H16V16.944C17.464 15.768 18.4 13.976 18.4 11.96C18.4 8.704 15.952 6.008 12.8 5.616V4C16.84 4.4 20 7.808 20 11.96C20 14.352 18.944 16.496 17.28 17.96ZM5.6 11.96C5.6 9.944 6.536 8.144 8 6.976V9.16H9.6V4.36H4.8V5.96H6.72C5.056 7.424 4 9.568 4 11.96C4 16.112 7.16 19.52 11.2 19.92V18.304C8.048 17.912 5.6 15.216 5.6 11.96Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
