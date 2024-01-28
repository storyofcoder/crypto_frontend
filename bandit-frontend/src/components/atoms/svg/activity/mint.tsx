import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="22" viewBox="0 0 24 22" {...props}>
      <path
        d="M10 20.5C10 21.329 9.328 22 8.5 22C7.672 22 7 21.329 7 20.5C7 19.672 7.672 19 8.5 19C9.328 19 10 19.672 10 20.5ZM13.5 19C12.672 19 12 19.671 12 20.5C12 21.329 12.672 22 13.5 22C14.328 22 15 21.329 15 20.5C15 19.672 14.328 19 13.5 19ZM19.805 4L16.373 16H5.945L2.168 7H0L4.615 18H17.854L21.328 6H23.257L24 4H19.805ZM6 0C12.712 1.617 13 9 13 9H15L11 13L7 9H9C9 9 9.94 2.58 6 0Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent
