import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="20" viewBox="0 0 24 20" {...props}>
      <path
        d="M10 18.5C10 19.329 9.328 20 8.5 20C7.672 20 7 19.329 7 18.5C7 17.672 7.672 17 8.5 17C9.328 17 10 17.672 10 18.5ZM13.5 17C12.672 17 12 17.671 12 18.5C12 19.329 12.672 20 13.5 20C14.328 20 15 19.329 15 18.5C15 17.672 14.328 17 13.5 17ZM19.805 2L16.373 14H5.945L2.168 5H0L4.615 16H17.854L21.328 4H23.257L24 2H19.805ZM13.857 12C14.896 5.174 9.896 1.898 9.896 1.898L10.674 0L5.285 2.26L7.555 7.644L8.364 5.638C8.363 5.638 12.955 7.378 13.857 12Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
