import React from 'react'
import Svg from '../StyledSystem/Svg'
import { SupportedChainId } from '../../../constant/chains'

const TokenIcon = (props) => {
  const { chainId } = props
  if ([SupportedChainId.BINANCE, SupportedChainId.BINANCE_TESTNET].includes(chainId)) {
    return (
      <Svg width="100" height="100" viewBox="0 0 100 100" fill="none" {...props}>
        <g clipPath="url(#clip0_217_1165)">
          <path d="M30.5799 42.022L50.0029 22.6009L69.4318 42.0298L80.7332 30.7303L50.0029 0L19.2804 30.7205L30.5799 42.02V42.022ZM0 50.0029L11.3014 38.6995L22.6009 50.0029L11.2995 61.2985L0 50.0029ZM30.5799 57.9819L50.0029 77.401L69.4318 57.9721L80.7391 69.2658L50.0029 100.006L19.2804 69.2814L19.2648 69.2638L30.5799 57.98V57.9819ZM77.401 50.0029L88.7005 38.7034L100.006 50.0029L88.7064 61.3024L77.401 50.0029Z" fill="#F3BA2F"/>
          <path d="M61.4608 50.0031L50.0031 38.5278L41.5261 47.001L40.5494 47.9776L38.5435 49.9836L38.5278 49.9992L38.5435 50.0148L50.0031 61.4725L61.4686 50.007H61.4589" fill="#F3BA2F"/>
        </g>
        <defs>
          <clipPath id="clip0_217_1165">
            <rect width="100" height="100" fill="white"/>
          </clipPath>
        </defs>
      </Svg>

    )
  }
  // return (
  //   <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
  //     <path d="M10 14.1406L9.17969 15.8984L10 18.3203L15.1172 11.0938L10 14.1406Z" fill="#3C3C3B" />
  //     <path d="M10 18.3203V14.1406L4.84375 11.0938L10 18.3203Z" fill="#8C8C8C" />
  //     <path d="M10 1.60156L4.84375 10.1172L10 13.1641L15.1172 10.1172L10 1.60156Z" fill="#343434" />
  //     <path d="M10 1.60156L4.84375 10.1172L10 7.77344V1.60156Z" fill="#8C8C8C" />
  //     <path d="M10 13.1641L15.1172 10.1172L10 7.77344V13.1641Z" fill="#141414" />
  //     <path d="M4.84375 10.1172L10 13.1641V7.77344L4.84375 10.1172Z" fill="#393939" />
  //   </Svg>
  // )
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100" fill="none" {...props}>
      <g clipPath="url(#clip0_226_1177)">
        <path d="M49.6859 0L49.0156 2.27815V68.3847L49.6859 69.0537L80.3718 50.9154L49.6859 0Z" fill="#343434"/>
        <path d="M49.6859 0L19 50.9154L49.6859 69.054V36.9679V0Z" fill="#8C8C8C"/>
        <path d="M49.6853 74.8636L49.3076 75.3241V98.8727L49.6853 99.9758L80.3897 56.7344L49.6853 74.8636Z" fill="#3C3C3B"/>
        <path d="M49.6859 99.976V74.8636L19 56.7344L49.6859 99.976Z" fill="#8C8C8C"/>
        <path d="M49.6855 69.0539L80.371 50.9158L49.6855 36.9683V69.0539Z" fill="#141414"/>
        <path d="M19 50.9158L49.6854 69.0542V36.9683L19 50.9158Z" fill="#393939"/>
      </g>
      <defs>
        <clipPath id="clip0_226_1177">
          <rect width="100" height="100" fill="white"/>
        </clipPath>
      </defs>
    </Svg>
  )
}

export default TokenIcon
