import React from 'react'

const ExploreIcon = (props) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M15.8592 15.8594L18.9326 9.05627L12.1404 12.1406L9.3623 18.6375L15.8592 15.8594Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ExploreIcon
