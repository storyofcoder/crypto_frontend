import React from 'react'
import Svg from '../../StyledSystem/Svg'

const SvgComponent = (props) => {
  if (props.filled) {
    return (
      <Svg width="24" height="24" viewBox="0 0 127.999 128" {...props}>
        <path
          fill="#484848"
          d="M64 7.989c-30.885 0-56.01 25.126-56.01 56.01 0 30.885 25.125 56.012 56.01 56.012 30.883 0 56.01-25.127 56.01-56.012 0-30.884-25.127-56.01-56.01-56.01zm15.83 35.358a1 1 0 0 1-1 1l-6.367.004c-4.201 0-4.969 1.636-4.969 4.858v6.684h10.92c.287 0 .561.124.75.34s.277.503.242.788l-1.555 12.033a1 1 0 0 1-.992.872h-9.365v29.879a1 1 0 0 1-1 1H54.07a1 1 0 0 1-1-1V69.926h-9.395a1 1 0 0 1-1-1V56.893a1 1 0 0 1 1-1h9.395v-7.875c0-10.43 6.312-16.908 16.475-16.908 4.369 0 8.23.325 9.416.482a1 1 0 0 1 .869.991v10.764z"
        ></path>
      </Svg>
    )
  }

  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.375 9.62502H16.625C16.2799 9.62358 15.9379 9.69049 15.6188 9.82189C15.2996 9.9533 15.0097 10.1466 14.7656 10.3906C14.5216 10.6347 14.3283 10.9246 14.1969 11.2438C14.0655 11.5629 13.9986 11.9049 14 12.25V24.5"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.5 15.75H17.5" stroke="#49536E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default SvgComponent
