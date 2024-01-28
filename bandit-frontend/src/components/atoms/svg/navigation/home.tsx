import React from 'react'

const HomeIcon = (props) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M16.625 22.7501V17.5001C16.625 17.268 16.5328 17.0455 16.3687 16.8814C16.2046 16.7173 15.9821 16.6251 15.75 16.6251H12.25C12.0179 16.6251 11.7954 16.7173 11.6313 16.8814C11.4672 17.0455 11.375 17.268 11.375 17.5001V22.7501C11.375 22.9822 11.2828 23.2047 11.1187 23.3688C10.9546 23.5329 10.7321 23.6251 10.5 23.6251H5.25C5.01794 23.6251 4.79538 23.5329 4.63128 23.3688C4.46719 23.2047 4.375 22.9822 4.375 22.7501V12.6329C4.37696 12.5118 4.40313 12.3924 4.45197 12.2815C4.50081 12.1707 4.57133 12.0708 4.65937 11.9876L13.4094 4.03605C13.5707 3.88848 13.7814 3.80664 14 3.80664C14.2186 3.80664 14.4293 3.88848 14.5906 4.03605L23.3406 11.9876C23.4287 12.0708 23.4992 12.1707 23.548 12.2815C23.5969 12.3924 23.623 12.5118 23.625 12.6329V22.7501C23.625 22.9822 23.5328 23.2047 23.3687 23.3688C23.2046 23.5329 22.9821 23.6251 22.75 23.6251H17.5C17.2679 23.6251 17.0454 23.5329 16.8813 23.3688C16.7172 23.2047 16.625 22.9822 16.625 22.7501Z"
        stroke={props.iconcolor ?? '#49536E'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default HomeIcon
