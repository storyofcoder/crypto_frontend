import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" {...props}>
      <g clipPath="url(#clip0)">
        <path
          d="M8.23767 6.99998L13.7441 1.49413C14.0859 1.15232 14.0859 0.598141 13.7441 0.256358C13.4023 -0.0854525 12.8481 -0.0854525 12.5063 0.256358L7.00047 5.76278L1.49462 0.256358C1.15281 -0.0854525 0.598629 -0.0854525 0.256846 0.256358C-0.0849369 0.598168 -0.0849643 1.15235 0.256846 1.49413L5.76327 6.99998L0.256846 12.5059C-0.0849643 12.8477 -0.0849643 13.4018 0.256846 13.7436C0.598656 14.0854 1.15284 14.0854 1.49462 13.7436L7.00047 8.23718L12.5063 13.7436C12.8481 14.0854 13.4023 14.0854 13.7441 13.7436C14.0859 13.4018 14.0859 12.8476 13.7441 12.5059L8.23767 6.99998Z"
          fill={props.iconColor}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  )
}

export default SvgComponent