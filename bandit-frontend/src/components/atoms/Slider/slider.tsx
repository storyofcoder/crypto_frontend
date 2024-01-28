import React from "react";
import { Slider } from "antd";
import styled from "styled-components";

const StyledSlider = styled.div`
  .ant-slider {
    &:hover {
      .ant-slider-track {
        background-color: ${(p) => p.theme.colors.text};
      }

      .ant-slider-handle {
        border-color: ${(p) => p.theme.colors.text};
      }
    }
  }
  .ant-slider-track {
    background-color: ${(p) => p.theme.colors.text};
  }

  .ant-slider-handle {
    border-color: ${(p) => p.theme.colors.text};
    background-color: ${(p) => p.theme.colors.text};
  }
`

const CustomSlider = (props) => {
  return (
    <StyledSlider>
      <Slider {...props} />
    </StyledSlider>
  )
}

export default CustomSlider
