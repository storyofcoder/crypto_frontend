import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg viewBox="0 0 18 18" class="css-1vak4bf" {...props}>
      <g clipPath="url(#unmuted_svg__clip0)" fill="#fff">
        <path d="M10.84 1.078a.755.755 0 00-.785.072L4.252 5.502H.75a.75.75 0 00-.75.75v6.003c0 .415.335.75.75.75h3.502l5.803 4.352a.747.747 0 00.785.071.751.751 0 00.415-.671V1.75a.751.751 0 00-.415-.672zm2.849 4.992l-.53-.53-1.062 1.06.53.531a3.003 3.003 0 010 4.244l-.53.53 1.061 1.062.53-.53a4.507 4.507 0 000-6.367z"></path>
        <path d="M15.28 3.417l-1.06 1.061.53.53a6.01 6.01 0 010 8.49l-.53.53 1.06 1.061.53-.53c2.926-2.926 2.926-7.686 0-10.612l-.53-.53z"></path>
      </g>
      <defs>
        <clipPath id="unmuted_svg__clip0">
          <path fill="#fff" d="M0 0h18v18H0z"></path>
        </clipPath>
      </defs>
    </Svg>
  )
}

export default SvgComponent
