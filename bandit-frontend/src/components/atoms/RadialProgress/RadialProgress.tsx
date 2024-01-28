import React from "react";
import styled from "styled-components";
import { Box } from "../StyledSystem";

const Circle = (props) => {
  const { size = 170, progress = 0 } = props

  const center = size / 2
  const strokeWidth = size * 0.14
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = ((100 - progress) / 100) * circumference

  const style = {
    strokeDashoffset: offset,
  }

  return (
    <svg className="circle" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle className="circle__background" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
      <circle
        className="circle__fill"
        style={style}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
      />
    </svg>
  )
}

const Percent = (props) => {
  const { progress = 0 } = props

  return (
    <div className="percent-progress">
      <div className="percent__content">
        {progress}
        <sub>%</sub>
      </div>
    </div>
  )
}

const Progress = (props) => {
  return (
    <div className="radial-progress">
      <Circle {...props} />
      <Percent {...props} />
    </div>
  )
}

export default function RadialProgress(props) {
  return (
    <RadialProgressWrapper>
      <div className="radial-container">
        <Progress progress={props?.value} />
      </div>
    </RadialProgressWrapper>
  )
}

const RadialProgressWrapper = styled(Box)`
  .u-absoluteCenter {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .radial-container {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .radial-progress {
    position: relative;
    display: inline-block;
  }
  .circle {
    transform: rotate(-90deg);
    fill: none;
    strokelinecap: round;
  }
  .circle .circle__background {
    stroke: #efeeea;
  }
  .circle .circle__fill {
    stroke: #75767b;
  }
  .percent-progress {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .percent-progress .percent__content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: 900;
    font-size: 40px;
    line-height: 49px;
    color: #202020;

    sub {
      font-size: 14px;
    }
  }
  .control {
    margin-top: 4px;
  }
`
