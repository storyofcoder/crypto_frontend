import styled from "styled-components";

import { createAbsolute } from "./Absolute";
import { createAbsoluteFlex } from "./AbsoluteFlex";
import { createBox } from "./Box";
import { createFlex } from "./Flex";
import { createText } from "./Text";

export { createAbsolute, createAbsoluteFlex, createBox, createFlex, createText }

export const Absolute = createAbsolute(styled.div)
export const AbsoluteFlex = createAbsoluteFlex(styled.div)
export const Box = createBox(styled.div)
export const Flex = createFlex(styled.div)
export const Text = createText(styled.div)
