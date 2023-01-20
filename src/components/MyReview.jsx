import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getmypageReviews } from "../redux/api/mypageApi";

const MyReview = () => {
  const { data, error, isLoading, isError } = useQuery(
    ["myreview"],
    getmypageReviews
  );

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <div>
        <StMyReviewBox>
          <StReviewBoxTitle>내가 남긴 리뷰</StReviewBoxTitle>
        </StMyReviewBox>
        <div>
          {data?.map((reviews) => {
            return (
              <StMyReview>
                <div key={`myreview_${reviews.id}`}>
                  <div className="time">{reviews.createdAt}</div>
                  <div className="postId">번호: {reviews.estateId}</div>
                  <div className="address">{reviews.address}</div>
                  <div className="star">
                    <img src={require("../images/Star 165.png")} alt="star" />
                  </div>
                  <div className="starPoint">{reviews.star} / 5</div>
                </div>
              </StMyReview>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyReview;

const StMyReviewBox = styled.div`
  margin: auto;
  max-width: 1920px;
  height: 10vh;
`;

const StReviewBoxTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 800;
  position: relative;
  top: 4vh;
  left: 14%;
`;

const StMyReview = styled.div`
  position: relative;
  background-color: #f0f0f0;
  width: 70vw;
  height: 100px;
  padding: 1%;
  margin: auto;
  margin-bottom: 15px;
  .time {
    position: relative;
    top: 3vh;
  }
  .postId {
    position: relative;
    top: 4vh;
  }
  .address {
    position: relative;
    left: 25%;
    font-size: 20px;
    font-weight: 600;
  }
  .starPoint {
    position: relative;
    left: 78%;
    top: -5.5vh;
    font-size: 23px;
    font-weight: 600;
    color: #aec90a;
  }
  .star {
    position: relative;
    left: 75%;
    top: -2.5vh;
  }
`;

const StMyReviewBtn = styled.div`
  position: relative;
  left: 75%;
  top: -8vh;

  .ReviewBtn {
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-size: 17px;
    padding-right: 10px;
  }
`;
