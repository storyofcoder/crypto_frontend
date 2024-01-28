import styled, { css } from "styled-components";
import { get } from "lodash";
import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, textAlign } from "styled-system";

import { createBox } from "./index";

function color(p) {
  css`
    color: ${p.theme.colors.text};
  `
}
function typography(p) {
  if (!get(p, 'theme.typography')) return undefined
  return p.theme.typography[p.typography]
}

function ellipsis(p) {
  if(p.ellipsis){
    return css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `
  }
  return null
}

export function createText(StyledElement) {
  return createBox(
    styled(StyledElement`
    ${fontSize}
    ${fontFamily}
    ${fontWeight}
    ${textAlign}
    ${lineHeight}
    ${letterSpacing}
    ${color}
    ${typography}
    ${ellipsis}
    `),
  )
}
