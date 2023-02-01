import React from "react";
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getmypageReviews } from "../../redux/api/reviewApi";
import { deletePost } from "../../redux/api/reviewApi";

const MyReview = () => {
  const navigate = useNavigate();

  const { data, error, isLoading, isError } = useQuery(["myreview"], () =>
    getmypageReviews()
  );

  const deleteHandler = (reviewId) => {
    deletePost(reviewId);
    // window.alert("후기가 삭제되었습니다!");
    navigate("/mypage");
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <GlobalStyle />
      <StMyReviewWrap>
        <StMyReviewBox>
          <StReviewBoxTitle>내가 남긴 리뷰</StReviewBoxTitle>

          <StInnerBox>
            {data?.map((reviews) => {
              console.log(reviews.reviewId);
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
                      src={require("../../images/Star 165.png")}
                      alt="star"
                    />
                    <div className="starPoint">{reviews.star} / 5</div>
                    <button
                      className="delBtn"
                      onClick={() => deleteHandler(reviews.reviewId)}
                    >
                      삭제
                    </button>
                  </div>
                </StMyReview>
              );
            })}
          </StInnerBox>
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
  background-color: #ffffff;
  margin: auto;
  padding-bottom: 30px;
`;

const StReviewBoxTitle = styled.div`
  padding-top: 50px;
  padding-left: 110px;
  padding-bottom: 30px;
  font-size: 16px;
  font-weight: 800;
`;

const StInnerBox = styled.div`
  overflow-y: auto;
`;

const StMyReview = styled.div`
  background-color: #f0f0f0;
  width: 1000px;
  height: 60px;
  padding: 1%;
  margin: auto;
  margin-bottom: 15px;
  display: flex;

  .review_wrapper {
    display: flex;
    align-items: center;
    text-align: left;
  }

  .time {
    width: 130px;
    padding-left: 10px;
    font-size: 15px;
  }
  .address {
    width: 450px;
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
  .star {
    margin-left: 160px;
    padding-right: 5px;
  }
  .starPoint {
    font-size: 23px;
    font-weight: 600;
    color: #aec90a;
  }
  .delBtn {
    border: 1px solid #aec90a;
    width: 65px;
    height: 30px;
    border-radius: 5%;
    color: #2d2d2d;
    margin-left: 90px;
    cursor: pointer;
  }
`;
