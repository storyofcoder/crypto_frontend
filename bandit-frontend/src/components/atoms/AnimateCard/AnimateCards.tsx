import React, { useState } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

const TRANSLATE_VALUE = 10
const ROTATE_VALUE = isMobile ? 7 : 10
const ZINDEX_VALUE = 10
const SCALE_VALUE = 0.125

const AnimateWrapper = styled.div`
  position: absolute;
  top: 0;
  transition: all 0.2s linear;
`

const AnimateCards = ({ children }) => {
  const [active, setActive] = useState(0)
  function makeActive(index) {
    setActive(index)
  }
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        const translateValue =
          index === active
            ? 0
            : index > active
            ? -TRANSLATE_VALUE * (index - active)
            : TRANSLATE_VALUE * (active - index)
        const rotateValue =
          index === active ? 0 : index > active ? -ROTATE_VALUE * (index - active) : ROTATE_VALUE * (active - index)
        const zIndexValue =
          index === active ? 45 : index > active ? ZINDEX_VALUE - (index - active) : ZINDEX_VALUE - (active - index)
        const scaleValue =
          index === active
            ? 1
            : index > active
            ? 1 - (index - active) * SCALE_VALUE
            : 1 - (active - index) * SCALE_VALUE
        return (
          <AnimateWrapper
            className={index === active ? 'active-card' : ''}
            style={{
              position: 'absolute',
              transformOrigin: 'center bottom',
              transform: `translate(${translateValue}%, 0%) scale(${scaleValue}) rotate(${rotateValue}deg)`,
              zIndex: zIndexValue,
            }}
            onClick={() => makeActive(index)}
          >
            {child}
          </AnimateWrapper>
        )
      })}
    </div>
  )
}

export default AnimateCards
