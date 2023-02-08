import React, { useMemo, useState } from "react";
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

  const renderItem = useMemo(() => {
    return (
      <>
        {data?.map((el, index) => {
          return (
            <StReviewWrap key={`map-list-${index}`}>
              <span className="reviewAddress">{el?.estates?.address}</span>

              <div className="bottomWrapper">
                <div className="bottomWrapper_left">
                  <span className="reviewDeposit">
                    {el?.review?.transaction_type} {el?.review?.deposit} /{" "}
                    {el?.review?.monthly_payment}
                  </span>
                  <span className="residenceType">
                    {el?.review?.residence_type}
                  </span>
                </div>
                <div className="reviewStar">
                  <img src={Star} alt="Star" />
                  <span>{el?.review?.star}</span>
                  <span className="reveiwTotalScore"> / 5.0</span>
                </div>
              </div>
            </StReviewWrap>
          );
        })}
      </>
    );
  }, [data]);
  return (
    <>
      <StReviewContainer>{renderItem}</StReviewContainer>
    </>
  );
};

export default ReviewList;

const StReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow-y: scroll;
  padding: 0px 10px 10px 10px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }
`;
const StReviewWrap = styled.div`
  border-radius: 10px;
  background-color: white;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 30px 30px;

  .reviewAddress {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .bottomWrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .bottomWrapper_left {
      display: flex;
      flex-direction: column;
    }
  }
  .reviewDeposit {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 8px;
  }
  .residenceType {
    font-size: 15px;
  }
  .reviewStar {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #819608;
    img {
      width: 18px;
      margin-right: 3px;
    }
  }
  .reveiwTotalScore {
    color: #737d81;
    font-size: 17px;
    margin-left: 4px;
  }
`;
