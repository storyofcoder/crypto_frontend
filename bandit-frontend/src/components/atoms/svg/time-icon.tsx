import React from "react";
import Svg from "../StyledSystem/Svg";

const SvgComponent = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        d="M16.24 7.76C15.6842 7.20153 15.0235 6.75852 14.2958 6.45646C13.5681 6.1544 12.7879 5.99927 12 6V12L7.76 16.24C8.88452 17.3645 10.4097 17.9963 12 17.9963C13.5903 17.9963 15.1155 17.3645 16.24 16.24C17.3645 15.1155 17.9963 13.5903 17.9963 12C17.9963 10.4097 17.3645 8.88452 16.24 7.76ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17316C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8078C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9991 9.3481 20.9453 6.80508 19.0701 4.92991C17.1949 3.05474 14.6519 2.00088 12 2ZM12 20C10.4178 20 8.87103 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46196 6.34315 6.34314C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21446 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6568C16.1566 19.1571 14.1217 20 12 20Z"
        fill="black"
      />
    </Svg>
  )
}

export default SvgComponent