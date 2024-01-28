import React from 'react'
import Svg from '../../StyledSystem/Svg'

const PencilIcon = (props) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M10.5 23.6249H5.25001C5.01794 23.6249 4.79538 23.5327 4.63129 23.3686C4.46719 23.2045 4.37501 22.982 4.37501 22.7499V17.8608C4.37461 17.7472 4.39662 17.6346 4.43979 17.5295C4.48295 17.4244 4.54643 17.3289 4.62657 17.2483L17.7516 4.12334C17.833 4.04067 17.93 3.97501 18.0371 3.9302C18.1441 3.88538 18.259 3.8623 18.375 3.8623C18.491 3.8623 18.6059 3.88538 18.7129 3.9302C18.82 3.97501 18.917 4.04067 18.9984 4.12334L23.8766 9.00147C23.9592 9.08289 24.0249 9.17993 24.0697 9.28696C24.1145 9.394 24.1376 9.50887 24.1376 9.6249C24.1376 9.74094 24.1145 9.85581 24.0697 9.96284C24.0249 10.0699 23.9592 10.1669 23.8766 10.2483L10.5 23.6249Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.625 23.625H10.5"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.875 7L21 13.125"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default PencilIcon
