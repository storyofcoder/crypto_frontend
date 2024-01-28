import React from 'react'
import Svg from '../../../atoms/StyledSystem/Svg'

const LaunchpadIcon = (props) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M10.2922 20.1908C9.04531 23.8986 4.10156 23.8986 4.10156 23.8986C4.10156 23.8986 4.10156 18.9549 7.80938 17.708"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.4262 11.5281L13.9996 18.9546L9.04492 13.9999L16.4715 6.57337C19.2824 3.76243 22.0934 3.79524 23.2965 3.97024C23.4821 3.99501 23.6545 4.08019 23.7869 4.21263C23.9194 4.34506 24.0045 4.51741 24.0293 4.70306C24.2043 5.90618 24.2371 8.71712 21.4262 11.5281Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1906 12.7642V19.8298C20.1873 20.0606 20.093 20.2807 19.9281 20.4423L16.3953 23.986C16.2832 24.098 16.1429 24.1774 15.9892 24.2158C15.8355 24.2543 15.6743 24.2502 15.5227 24.2042C15.3711 24.1582 15.2349 24.0718 15.1285 23.9544C15.0221 23.837 14.9496 23.693 14.9187 23.5376L14 18.9548"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2356 7.80957H8.16999C7.93919 7.81286 7.71904 7.90721 7.55749 8.07207L4.01374 11.6049C3.90179 11.717 3.82236 11.8573 3.78394 12.011C3.74552 12.1647 3.74954 12.3259 3.79557 12.4775C3.84161 12.6291 3.92793 12.7653 4.04533 12.8717C4.16273 12.9781 4.3068 13.0506 4.46218 13.0814L9.04499 14.0002"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LaunchpadIcon
