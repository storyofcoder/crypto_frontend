import React from 'react'
import Svg from '../../StyledSystem/Svg'

const SvgComponent = (props) => {
  if (props.filled) {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path
          fill="rgb(180, 179, 179)"
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
        />
      </Svg>
    )
  }

  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M13.3768 7.80945L15.5424 5.64382C16.4593 4.80812 17.6629 4.35783 18.9032 4.38655C20.1435 4.41526 21.325 4.92076 22.2023 5.79801C23.0795 6.67525 23.585 7.85678 23.6137 9.09705C23.6424 10.3373 23.1922 11.541 22.3564 12.4579L19.2611 15.5423C18.815 15.99 18.2849 16.3453 17.7012 16.5877C17.1175 16.8302 16.4916 16.955 15.8596 16.955C15.2275 16.955 14.6017 16.8302 14.0179 16.5877C13.4342 16.3453 12.9041 15.99 12.458 15.5423"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.623 20.1904L12.4574 22.3561C11.5405 23.1918 10.3368 23.6421 9.09657 23.6133C7.85629 23.5846 6.67476 23.0791 5.79752 22.2019C4.92027 21.3246 4.41477 20.1431 4.38606 18.9028C4.35735 17.6626 4.80763 16.4589 5.64334 15.542L8.73865 12.4576C9.18475 12.0099 9.71486 11.6546 10.2986 11.4121C10.8823 11.1697 11.5081 11.0449 12.1402 11.0449C12.7723 11.0449 13.3981 11.1697 13.9818 11.4121C14.5656 11.6546 15.0957 12.0099 15.5418 12.4576"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent