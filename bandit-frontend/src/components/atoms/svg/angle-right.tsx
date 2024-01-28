import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="8" height="14" viewBox="0 0 8 14" {...props}>
      <path
        d="M7.53998 6.28955L1.87998 0.639548C1.78702 0.54582 1.67642 0.471426 1.55456 0.420657C1.4327 0.369888 1.30199 0.34375 1.16998 0.34375C1.03797 0.34375 0.907264 0.369888 0.785405 0.420657C0.663546 0.471426 0.552945 0.54582 0.459982 0.639548C0.273731 0.826911 0.169189 1.08036 0.169189 1.34455C0.169189 1.60873 0.273731 1.86219 0.459982 2.04955L5.40998 7.04955L0.459982 11.9995C0.273731 12.1869 0.169189 12.4404 0.169189 12.7045C0.169189 12.9687 0.273731 13.2222 0.459982 13.4095C0.552597 13.504 0.663042 13.5792 0.784917 13.6307C0.906792 13.6822 1.03767 13.709 1.16998 13.7095C1.30229 13.709 1.43317 13.6822 1.55505 13.6307C1.67692 13.5792 1.78737 13.504 1.87998 13.4095L7.53998 7.75955C7.64149 7.66591 7.7225 7.55225 7.7779 7.42576C7.83331 7.29926 7.86191 7.16265 7.86191 7.02455C7.86191 6.88645 7.83331 6.74984 7.7779 6.62334C7.7225 6.49684 7.64149 6.38319 7.53998 6.28955Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent