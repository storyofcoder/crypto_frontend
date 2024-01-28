import React, { forwardRef } from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { WrapperProps } from "./types";

const StyledWrapper = styled.div<{ $width: number; $height: number, borderRadius: any }>`
  max-height: ${({ $height }) => $height}px;
  max-width: ${({ $width }) => $width}px;
  min-height: ${({ $height }) => $height}px;
  min-width: ${({ $width }) => $width}px;
  position: relative;
  width: 100%;
  border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : "50%"};  ;

  &:after {
    content: "";
    display: block;
    padding-top: ${({ $width, $height }) => ($height / $width) * 100}%;
  }

  ${space}
`;

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ width, height, ...props }, ref) => {
  return <StyledWrapper ref={ref} $width={width} $height={height} {...props} />;
});

export default Wrapper;
