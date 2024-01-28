import Svg from '../../atoms/StyledSystem/Svg'
import React from 'react'
import useTheme from "../../../hooks/useTheme";
import { LoaderProps, scales } from './types';
import {scaleVariants} from './theme'

const Loader = (props: LoaderProps) => {
  const { theme } = useTheme()
  const { scale } = props;
  const scaleVariant = scaleVariants[scale] || scaleVariants.sm
  return (
    <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" {...scaleVariant}>
      <circle cx="28" cy="28" r="24" stroke={theme.colors.darkGrey ?? '#E2E4E8'} strokeWidth="8" />
      <mask id="path-3-inside-1_1538_43915" fill="white">
        <path d="M47.0342 13.3761C48.7846 12.0313 49.1311 9.49734 47.551 7.9561C45.3497 5.80895 42.8031 4.03259 40.0088 2.70595C36.0069 0.805998 31.6114 -0.117303 27.1833 0.011914C22.7552 0.141131 18.4209 1.31918 14.5367 3.44926C11.8245 4.93658 9.38577 6.85842 7.31344 9.13028C5.8259 10.761 6.3196 13.2705 8.14538 14.511V14.511C9.97117 15.7514 12.4334 15.2399 14.0115 13.6966C15.3091 12.4275 16.7778 11.3366 18.3801 10.4579C21.1555 8.93591 24.2525 8.09417 27.4164 8.00184C30.5804 7.90951 33.7211 8.56923 36.5806 9.9268C38.2314 10.7105 39.7612 11.714 41.1306 12.9052C42.796 14.3539 45.2839 14.7209 47.0342 13.3761V13.3761Z" />
      </mask>
      <path
        className="spinner"
        d="M47.0342 13.3761C48.7846 12.0313 49.1311 9.49734 47.551 7.9561C45.3497 5.80895 42.8031 4.03259 40.0088 2.70595C36.0069 0.805998 31.6114 -0.117303 27.1833 0.011914C22.7552 0.141131 18.4209 1.31918 14.5367 3.44926C11.8245 4.93658 9.38577 6.85842 7.31344 9.13028C5.8259 10.761 6.3196 13.2705 8.14538 14.511V14.511C9.97117 15.7514 12.4334 15.2399 14.0115 13.6966C15.3091 12.4275 16.7778 11.3366 18.3801 10.4579C21.1555 8.93591 24.2525 8.09417 27.4164 8.00184C30.5804 7.90951 33.7211 8.56923 36.5806 9.9268C38.2314 10.7105 39.7612 11.714 41.1306 12.9052C42.796 14.3539 45.2839 14.7209 47.0342 13.3761V13.3761Z"
        stroke={theme.colors.text ?? '#8247E5'}
        strokeWidth="16"
        mask="url(#path-3-inside-1_1538_43915)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 28 28"
          to="360 28 28"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </Svg>
  )
}

Loader.defaultProps = {
  scale: scales.MD,
}

export default Loader
