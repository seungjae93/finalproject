import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const ImageDetailCarousel = ({ imageUrl }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <Div>
        <CgChevronRight
          style={{
            color: "white",
            width: "30px",
            height: "30px",
          }}
        />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <CgChevronLeft
          style={{
            color: "white",
            width: "30px",
            height: "30px",
          }}
        />
      </DivPre>
    ),
  };

  return (
    <div>
      <StyledSlider {...settings}>
        {imageUrl.map((el) => {
          return (
            <div key={el}>
              <StCardImg alt="" src={el} />
            </div>
          );
        })}
      </StyledSlider>
    </div>
  );
};

export default React.memo(ImageDetailCarousel);

const StCardImg = styled.img`
  width: 550px;
  height: 400px;
`;
const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
`;
const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;
