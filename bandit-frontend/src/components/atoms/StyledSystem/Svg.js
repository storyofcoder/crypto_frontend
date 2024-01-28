import styled, { css, keyframes } from "styled-components";
import { space } from "styled-system";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`

const Svg = styled.svg`
  align-self: center; // Safari fix
  flex-shrink: 0;
  fill: ${({ color }) => color};
  ${({ spin }) => spin && spinStyle}
  ${space}
`

Svg.defaultProps = {
  color: 'none',
  width: '20px',
  xmlns: 'http://www.w3.org/2000/svg',
  spin: false,
}

export default Svg
