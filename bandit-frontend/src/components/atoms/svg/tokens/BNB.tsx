import React from "react";
import Svg from "../../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg fill="none" width="18" height="18" viewBox="0 0 18 18" {...props}>
      <rect width="18" height="18" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image0_4760_25977" transform="scale(0.0277778)" />
        </pattern>
        <image
          id="image0_4760_25977"
          width="36"
          height="36"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXSURBVHgBzdbREYIwEATQVRuzFEuwA9YKLCHaiVamZASHYeJ5F5JLdiYfEjc+wSBAmQzT6CIR8ppGc9QS0xyVwjRDSRh3lAbjhrJgqqNyMNVQ/zC3cdALpcHMYW2UBVMEtYecnTB3H8cJadAFeWuqQujOjKZHFAqNmFSPmsJh9Tpe3+M4nqvjD3xOdTx+Tqyj6dHQ+07O3+YKfZY9yy4Se6ndFIyLWlBiT9rawbioBiX24raXtmGzOcJ3a6t6NGJSPZbuUcDEax+EHoXekNETs/whhszegELxviWYF615S9j0b3/6gYofSOStqQohP9+EFUZ6L1EoVKDcMFqUK2YLiqgc9oSxoAjnEB1hJBTROERHmDlEIcwbz+FVW//D/HEAAAAASUVORK5CYII="
        />
      </defs>
    </Svg>
  )
}

export default SvgComponent
