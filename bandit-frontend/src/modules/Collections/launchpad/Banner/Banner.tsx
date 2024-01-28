import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Box } from "../../../../components/atoms/StyledSystem";
import BannerSection from "./BannerSection";

const Container = styled(Box)`
  .slick-slider {
    &:hover {
      .slick-prev {
        opacity: 1;
      }
      .slick-next {
        opacity: 1;
      }
    }
  }

  .slick-dots {
    li {
      margin: 0;
      button {
        &:before {
          font-size: 10px;
          color: #292c36;
          opacity: 1;
        }
      }
    }

    .slick-active {
      button {
        &:before {
          font-size: 16px;
          color: #292c36;
          opacity: 1;
        }
      }
    }
  }

  .slick-list {
    margin-right: 1px !important;
    width: 100%;
    position: relative;
    z-index: 0;

    //&:after {
    //  content: "";
    //  width: 100%;
    //  height: 10%;
    //  position: absolute;
    //  bottom: -5%;
    //  z-index: 1;
    //}
  }

  .slick-arrow:before {
    content: '' !important;
    display: none;
  }

  .slick-disabled {
    display: none !important;
  }

  .slick-prev {
    transform: translate(-50%, -50%);
    left: 4% !important;
    opacity: 0.5;

    ${(p) => p.theme.media.xs} {
      //display: none !important;
      left: 6% !important;
      width: 30px !important;
      height: 30px !important;
    }
    ${(p) => p.theme.media.sm} {
      //display: none !important;
      left: 6% !important;
      width: 30px !important;
      height: 30px !important;
    }
    ${(p) => p.theme.media.md} {
      display: flex !important;
      width: 42px !important;
      height: 42px !important;
      left: 4% !important;
    }
  }
  .slick-dots {
    position: relative;
    display: block !important;
    display: none !important;
    ${(p) => p.theme.media.lg} {
      display: none !important;
    }
  }
  .slick-dots button:before {
    opacity: 0.2 !important;
  }
  .slick-dots .slick-active button:before {
    opacity: 1 !important;
  }

  .slick-next {
    transform: translate(50%, -50%);
    right: 4% !important;
    opacity: 0.5;

    ${(p) => p.theme.media.xs} {
      width: 30px !important;
      height: 30px !important;
      right: 6% !important;
      //display: none !important;
    }
    ${(p) => p.theme.media.sm} {
      width: 30px !important;
      height: 30px !important;
      right: 6% !important;
      //display: none !important;
    }
    ${(p) => p.theme.media.md} {
      display: flex !important;
      width: 42px !important;
      height: 42px !important;
      right: 4% !important;
    }
  }
`

const settings = {
  infinite: true,
  lazyLoad: true,
  // dots: true,
  draggable: true,
  autoplay: true,
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // adaptiveHeight: true,
  // variableWidth: true,
  // responsive: [
  //   {
  //     breakpoint: 1024,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       infinite: true,
  //       dots: true,
  //     },
  //   },
  //   {
  //     breakpoint: 992,
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //     },
  //   },
  // ],
}

const BannerSlider = ({ banners }) => {
  return (
    <Container>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <BannerSection key={index} banner={banner} />
        ))}
      </Slider>
    </Container>
  )
}

export default BannerSlider
