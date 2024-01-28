import React, { useRef, Children, cloneElement, ReactElement } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import styled from 'styled-components'

import { Box } from 'components/atoms/StyledSystem'
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints'

const SliderWrapper = styled(Box)`
  .swiper {
    width: 100%;
    height: 100%;
    padding: 20px 8px;
    padding-top: 50px;
  }
  .swiper-pagination {
    display: none;
  }
  .swiper-button-disabled {
    opacity: 0.3;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 14px;
    color: ${(p) => p.theme.colors.foreground};
  }
  .swiper-button-prev,
  .swiper-button-next {
    top: 25px;
    // border: 1px solid ${(p) => p.theme.colors.foreground};
    border-radius: 12px;
    padding: 0px 10px;
    height: 30px;
  }
  .swiper-button-prev {
    right: 44px;
    left: auto;
  }
  .swiper-slide {
    ${(p) => p.theme.media.xs} {
      width: min(calc(calc(100% / ${(p) => p.slidesPerView}) - 10px), 381.333px);
      margin-right: 20px;
    }
  }
`

export default function NFTSlider({ ...props }) {
  const containerRef: any = useRef()

  const { isTablet, isDesktop, isMobile } = useMatchBreakpoints()

  return (
    <SliderWrapper ref={containerRef} slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}>
      <Swiper
        slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
        spaceBetween={20}
        slidesPerGroup={isMobile ? 1 : isTablet ? 2 : 3}
        // loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {Children.map(props.children, (child: ReactElement, index) => {
          return <SwiperSlide key={index}>{cloneElement(child)}</SwiperSlide>
        })}
      </Swiper>
    </SliderWrapper>
  )
}
