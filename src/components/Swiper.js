import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import  { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "swiper/swiper.min.css";

const SwiperComponent = () => {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    accessibility: true

  };




  return (
    <>
      <div className="mt-2 overflow-hidden">
        <Slider {...settings}>
          <div>
            <img src="./images/1.webp" class="img-fluid rounded-top" alt="" />
          </div>
          <div>
            <img src="./images/2.jpg" class="img-fluid rounded-top" alt="" />
          </div>
          <div>
            <img src="./images/3.webp" class="img-fluid rounded-top" alt="" />
          </div>
          <div>
            <img src="./images/4.webp" class="img-fluid rounded-top" alt="" />
          </div>
          
        </Slider>
      </div>
    </>
  );
};

export default SwiperComponent;
