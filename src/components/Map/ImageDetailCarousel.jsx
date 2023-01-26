import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageDetailCarousel = ({ imageUrl }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {imageUrl.map((el) => {
          return (
            <div key={el}>
              <StCardImg alt="" src={el} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageDetailCarousel;

const StCardImg = styled.img`
  width: 500px;
  height: 400px;
`;
