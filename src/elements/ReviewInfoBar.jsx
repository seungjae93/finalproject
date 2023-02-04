import React, { useState, useEffect } from "react";

import styled from "styled-components";

const ReviewInfoBar = ({
  communication,
  safe,
  bug,
  smell,
  floor_noise,
  walls_noise,
  town_noise,
  mold,
  parking,
}) => {
  const [reviewInfo, setReviewInfo] = useState([]);

  useEffect(() => {
    setReviewInfo([
      communication,
      safe,
      bug,
      smell,
      floor_noise,
      walls_noise,
      town_noise,
      mold,
      parking,
    ]);
  }, [
    communication,
    safe,
    bug,
    smell,
    floor_noise,
    walls_noise,
    town_noise,
    mold,
    parking,
  ]);

  return (
    <>
      <ReviewContainer>
        {reviewInfo.map((el, index) => {
          return <ReviewBar key={`review-info-${index}`} point={el} />;
        })}
        {[1, 2, 3, 4, 5, 6].map((value, index) => {
          return <ReviewPoint key={`review-point-${index}`} />;
        })}
      </ReviewContainer>
    </>
  );
};
export default ReviewInfoBar;

const ReviewContainer = styled.div`
  height: 10px;
  width: 320px;
  background-color: #c4cbcd;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewPoint = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 20px;
  background-color: #b8d60b;
  z-index: 2;
`;

const ReviewBar = styled.div`
  height: 10px;
  width: 180px;
  width: ${({ point }) => (point ? `${(320 * point) / 5}` : 0)}px;
  background-color: #819608;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
`;
