import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
import Star from "../../images/Star.svg";

const ReviewList = ({ estateIds }) => {
  const { data } = useQuery(["showReviewList", estateIds], async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_MAP_SERVER}/review/auto`,
      { estateIds: estateIds }
    );
    const { data } = response.data;
    return data;
  });
  console.log(data);
  return (
    <>
      <StReviewContainer>
        {data?.map((el, index) => {
          return (
            <StReviewWrap key={`map-list-${index}`}>
              <div className="reviewAddress">{el?.estates?.address}</div>
              <div className="reviewDeposit">
                {el?.review?.transaction_type} {el?.review?.deposit} /{" "}
                {el?.review?.monthly_payment}
              </div>
              <div>{el?.review?.residence_type}</div>
              <div className="reviewStar">
                <img src={Star} alt="Star" />
                {el?.review?.star}
                <div className="reveiwTotalScore"> / 5.0</div>
              </div>
            </StReviewWrap>
          );
        })}
      </StReviewContainer>
    </>
  );
};

export default ReviewList;

const StReviewContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 425px;
  height: 85vh;
  gap: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }
`;
const StReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100px;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid #ccc;
  gap: 10px;
  .reviewAddress {
    font-weight: bold;
    font-size: 18px;
  }
  .reviewDeposit {
    font-weight: bold;
    font-size: 15px;
  }
  .reviewStar {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #819608;
  }
  .reveiwTotalScore {
    color: #737d81;
    font-size: 17px;
  }
`;
