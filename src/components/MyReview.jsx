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
      <StMyReviewWrap>
        <StMyReviewBox>
          <StReviewBoxTitle>내가 남긴 리뷰</StReviewBoxTitle>
          <div>
            {data?.map((reviews) => {
              return (
                <StMyReview>
                  <div
                    className="review_wrapper"
                    key={`myreview_${reviews.id}`}
                  >
                    <div className="time">
                      {new Date(reviews.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="address">{reviews.address}</div>
                    <img
                      className="star"
                      src={require("../images/Star 165.png")}
                      alt="star"
                    />
                    <div className="starPoint">{reviews.star} / 5</div>
                  </div>
                </StMyReview>
              );
            })}
          </div>
        </StMyReviewBox>
      </StMyReviewWrap>
    </>
  );
};

export default MyReview;

const StMyReviewWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
`;

const StMyReviewBox = styled.div`
  width: 1254px;
  height: 650px;
  background-color: #ffffff;
  margin: auto;
`;

const StReviewBoxTitle = styled.div`
  padding-top: 50px;
  padding-left: 110px;
  padding-bottom: 30px;
  font-size: 16px;
  font-weight: 800;
`;

const StMyReview = styled.div`
  border: 1px solid red;
  background-color: #f0f0f0;
  width: 1000px;
  height: 60px;
  padding: 1%;
  margin: auto;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
  .review_wrapper {
    display: flex;
    /* align-items: center; */
    /* width: 100px; */
    text-align: left;
  }

  .time {
    width: 180px;
    border: 1px solid blue;
    padding-left: 10px;
  }
  .address {
    border: 1px solid blue;
    padding-left: 20px;
    font-size: 20px;
    font-weight: 600;
  }
  .star {
    padding-right: 10px;
    padding-left: 280px;
  }
  .starPoint {
    font-size: 23px;
    font-weight: 600;
    color: #aec90a;
  }
`;
