import React from 'react'

const RankingsIcon = (props) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M4.8125 22.75V14.875H10.9375"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.9375 22.75H3.0625"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9375 22.75V9.625H17.0625"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.1875 4.375H17.0625V22.75H23.1875V4.375Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default RankingsIcon
