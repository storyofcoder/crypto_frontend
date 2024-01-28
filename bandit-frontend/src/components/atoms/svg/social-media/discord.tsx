import React from 'react'
import Svg from '../../StyledSystem/Svg'

const DiscordIcon = (props) => {
  if (props.filled) {
    return (
      <Svg width="25" height="20" viewBox="0 0 25 20" {...props}>
        <g clipPath="url(#clip1)">
          <path
            d="M21.1636 1.78168C19.5701 1.02663 17.8614 0.470338 16.0749 0.151727C16.0424 0.145578 16.0099 0.160945 15.9931 0.19168C15.7733 0.59532 15.5299 1.1219 15.3595 1.53579C13.4379 1.2387 11.5262 1.2387 9.64408 1.53579C9.47359 1.1127 9.22134 0.59532 9.0006 0.19168C8.98384 0.16197 8.95134 0.146604 8.9188 0.151727C7.13324 0.46932 5.42454 1.02561 3.83014 1.78168C3.81634 1.78783 3.80451 1.79808 3.79666 1.81139C0.555616 6.8119 -0.33224 11.6895 0.103313 16.5066C0.105283 16.5302 0.118094 16.5527 0.135831 16.5671C2.27418 18.1888 4.34553 19.1734 6.37842 19.8259C6.41095 19.8362 6.44542 19.8239 6.46613 19.7962C6.94701 19.118 7.37567 18.403 7.7432 17.651C7.76489 17.6069 7.74419 17.5547 7.69986 17.5372C7.01993 17.2709 6.3725 16.9461 5.74972 16.5773C5.70046 16.5476 5.69651 16.4748 5.74183 16.44C5.87289 16.3386 6.00398 16.2331 6.12912 16.1265C6.15176 16.1071 6.18331 16.103 6.20993 16.1152C10.3013 18.0444 14.7308 18.0444 18.7739 16.1152C18.8005 16.1019 18.8321 16.106 18.8557 16.1255C18.9809 16.232 19.1119 16.3386 19.244 16.44C19.2893 16.4748 19.2863 16.5476 19.2371 16.5773C18.6143 16.9533 17.9669 17.2709 17.286 17.5362C17.2416 17.5536 17.2219 17.6069 17.2436 17.651C17.619 18.4019 18.0477 19.117 18.5197 19.7952C18.5394 19.8239 18.5749 19.8362 18.6074 19.8259C20.6501 19.1734 22.7215 18.1888 24.8598 16.5671C24.8786 16.5527 24.8904 16.5312 24.8924 16.5076C25.4136 10.9385 24.0193 6.10092 21.1961 1.81241C21.1892 1.79808 21.1774 1.78783 21.1636 1.78168ZM8.35419 13.5735C7.12239 13.5735 6.10743 12.4056 6.10743 10.9713C6.10743 9.53703 7.10271 8.36914 8.35419 8.36914C9.61549 8.36914 10.6206 9.54728 10.6009 10.9713C10.6009 12.4056 9.60563 13.5735 8.35419 13.5735ZM16.6612 13.5735C15.4294 13.5735 14.4145 12.4056 14.4145 10.9713C14.4145 9.53703 15.4097 8.36914 16.6612 8.36914C17.9225 8.36914 18.9276 9.54728 18.908 10.9713C18.908 12.4056 17.9225 13.5735 16.6612 13.5735Z"
            fill="#484848"
          />
        </g>
        <defs>
          <clipPath id="clip1">
            <rect width="25" height="20" fill="black" />
          </clipPath>
        </defs>
      </Svg>
    )
  }

  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M10.5 17.0625C11.2249 17.0625 11.8125 16.4749 11.8125 15.75C11.8125 15.0251 11.2249 14.4375 10.5 14.4375C9.77513 14.4375 9.1875 15.0251 9.1875 15.75C9.1875 16.4749 9.77513 17.0625 10.5 17.0625Z"
        fill={props.iconcolor ?? '#49536E'}
      />
      <path
        d="M17.5 17.0625C18.2249 17.0625 18.8125 16.4749 18.8125 15.75C18.8125 15.0251 18.2249 14.4375 17.5 14.4375C16.7751 14.4375 16.1875 15.0251 16.1875 15.75C16.1875 16.4749 16.7751 17.0625 17.5 17.0625Z"
        fill={props.iconcolor ?? '#49536E'}
      />
      <path
        d="M8.1377 8.75003C10.0345 8.15555 12.0124 7.86034 14.0002 7.87503C15.988 7.86034 17.9659 8.15555 19.8627 8.75003"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8627 19.25C17.9659 19.8445 15.988 20.1397 14.0002 20.125C12.0124 20.1397 10.0345 19.8445 8.1377 19.25"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9529 19.917L18.2764 22.542C18.3615 22.721 18.5064 22.8648 18.686 22.9486C18.8656 23.0324 19.0688 23.0511 19.2607 23.0014C21.9404 22.3451 24.2592 21.2076 25.9436 19.742C26.0705 19.63 26.1628 19.4839 26.2093 19.321C26.2558 19.1582 26.2547 18.9855 26.2061 18.8232L22.4982 6.442C22.4622 6.31529 22.3968 6.19882 22.3076 6.10194C22.2183 6.00506 22.1075 5.93048 21.9842 5.88418C20.9366 5.45442 19.8533 5.1177 18.7467 4.87793C18.534 4.83136 18.3117 4.86472 18.122 4.97164C17.9324 5.07856 17.7888 5.25156 17.7186 5.45762L16.8545 8.07168"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0468 19.917L9.72335 22.542C9.6382 22.721 9.49336 22.8648 9.31373 22.9486C9.13409 23.0324 8.93087 23.0511 8.73898 23.0014C6.05929 22.3451 3.74054 21.2076 2.05616 19.742C1.92917 19.63 1.83696 19.4839 1.79044 19.321C1.74391 19.1582 1.74503 18.9855 1.79366 18.8232L5.50148 6.442C5.53756 6.31529 5.60287 6.19882 5.69215 6.10194C5.78143 6.00506 5.89219 5.93048 6.01554 5.88418C7.06309 5.45442 8.14644 5.1177 9.25304 4.87793C9.4657 4.83136 9.68806 4.86472 9.87769 4.97164C10.0673 5.07856 10.2109 5.25156 10.2812 5.45762L11.1452 8.07168"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 17.0625C11.2249 17.0625 11.8125 16.4749 11.8125 15.75C11.8125 15.0251 11.2249 14.4375 10.5 14.4375C9.77513 14.4375 9.1875 15.0251 9.1875 15.75C9.1875 16.4749 9.77513 17.0625 10.5 17.0625Z"
        fill={props.iconcolor ?? '#49536E'}
      />
      <path
        d="M17.5 17.0625C18.2249 17.0625 18.8125 16.4749 18.8125 15.75C18.8125 15.0251 18.2249 14.4375 17.5 14.4375C16.7751 14.4375 16.1875 15.0251 16.1875 15.75C16.1875 16.4749 16.7751 17.0625 17.5 17.0625Z"
        fill={props.iconcolor ?? '#49536E'}
      />
      <path
        d="M8.1377 8.75003C10.0345 8.15555 12.0124 7.86034 14.0002 7.87503C15.988 7.86034 17.9659 8.15555 19.8627 8.75003"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8627 19.25C17.9659 19.8445 15.988 20.1397 14.0002 20.125C12.0124 20.1397 10.0345 19.8445 8.1377 19.25"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9529 19.917L18.2764 22.542C18.3615 22.721 18.5064 22.8648 18.686 22.9486C18.8656 23.0324 19.0688 23.0511 19.2607 23.0014C21.9404 22.3451 24.2592 21.2076 25.9436 19.742C26.0705 19.63 26.1628 19.4839 26.2093 19.321C26.2558 19.1582 26.2547 18.9855 26.2061 18.8232L22.4982 6.442C22.4622 6.31529 22.3968 6.19882 22.3076 6.10194C22.2183 6.00506 22.1075 5.93048 21.9842 5.88418C20.9366 5.45442 19.8533 5.1177 18.7467 4.87793C18.534 4.83136 18.3117 4.86472 18.122 4.97164C17.9324 5.07856 17.7888 5.25156 17.7186 5.45762L16.8545 8.07168"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0468 19.917L9.72335 22.542C9.6382 22.721 9.49336 22.8648 9.31373 22.9486C9.13409 23.0324 8.93087 23.0511 8.73898 23.0014C6.05929 22.3451 3.74054 21.2076 2.05616 19.742C1.92917 19.63 1.83696 19.4839 1.79044 19.321C1.74391 19.1582 1.74503 18.9855 1.79366 18.8232L5.50148 6.442C5.53756 6.31529 5.60287 6.19882 5.69215 6.10194C5.78143 6.00506 5.89219 5.93048 6.01554 5.88418C7.06309 5.45442 8.14644 5.1177 9.25304 4.87793C9.4657 4.83136 9.68806 4.86472 9.87769 4.97164C10.0673 5.07856 10.2109 5.25156 10.2812 5.45762L11.1452 8.07168"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DiscordIcon