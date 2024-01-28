import { Popover } from "antd";
import React from "react";

const TokenBadge = ({ height = 45, width = 30, batch }: any) => {
  if (!batch && batch !== '1') return null

  return (
    <Popover
      content={() => (
        <div style={{ padding: '10px', fontWeight: 600 }}>
          "Historical NFT", amongst the <br /> 1st 1000 NFTs collected.
        </div>
      )}
      placement="topRight"
    >
      <div>
        <SVG width={width} height={height} />
      </div>
    </Popover>
  )
}

export default TokenBadge

const SVG = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 38 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path d="M5 3H35V48C20 40 20 40 5 48V3Z" fill="url(#paint0_linear)" shapeRendering="crispEdges" />
      </g>
      <g filter="url(#filter1_i)">
        <path
          d="M14.29 18.252H11.76V16.536C12.4493 16.536 12.9993 16.4773 13.41 16.36C13.8353 16.2427 14.1727 16.052 14.422 15.788C14.6713 15.5093 14.8913 15.1133 15.082 14.6H16.71V30H14.29V18.252ZM19.7106 14.6H22.1306V21.09L25.2106 14.6H27.6306L24.7486 20.254L27.6746 30H25.1446L23.0986 23.136L22.1306 25.094V30H19.7106V14.6Z"
          fill="url(#paint1_linear)"
        />
      </g>
      <path d="M3 0H32C33.6569 0 35 1.34315 35 3V4H3V0Z" fill="url(#paint2_linear)" />
      <path d="M0 2.5C0 1.11929 1.11929 0 2.5 0V0C3.88071 0 5 1.11929 5 2.5V7H0V2.5Z" fill="#BF953F" />
      <defs>
        <filter
          id="filter0_d"
          x="4"
          y="3"
          width="34"
          height="49"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="filter1_i"
          x="11.76"
          y="14.6"
          width="16.9146"
          height="16.4"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.52 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient id="paint0_linear" x1="31.5" y1="8.5" x2="7.49999" y2="42.5" gradientUnits="userSpaceOnUse">
          <stop offset="0.119792" stopColor="#BF953F" />
          <stop offset="0.53125" stopColor="#FCF6BA" stopOpacity="0.97" />
          <stop offset="0.869792" stopColor="#B38728" stopOpacity="0.97" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="18.5" y1="26.5" x2="25.5" y2="14.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#654536" />
          <stop offset="1" stopColor="#A47159" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="14.8154"
          y1="4.79773e-06"
          x2="-34.3705"
          y2="43.7852"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BF953F" />
          <stop offset="0.442708" stopColor="#FCF6BA" />
          <stop offset="0.932292" stopColor="#B38728" />
        </linearGradient>
      </defs>
    </svg>
  )
}
