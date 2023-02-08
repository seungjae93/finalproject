import React from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getmypageReviews } from "../../redux/api/reviewApi";
import { deletePost } from "../../redux/api/reviewApi";
import Star from "../../images/Star.svg";

const MyReview = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery(["myreview"], () =>
    getmypageReviews()
  );

  const deleteHandler = async (reviewId) => {
    window.alert("후기가 삭제되었습니다!");
    await deletePost(reviewId);
    queryClient.invalidateQueries(["myreview"]);
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StMyReviewBox>
        <STReviesner>
          <StTitleBox>
            <StReviewBoxTitle>내가 남긴 리뷰</StReviewBoxTitle>
            <StReviewBoxLength>총 {data.length} 개 </StReviewBoxLength>
          </StTitleBox>

          {data?.map((reviews) => {
            return (
              <StMyReview>
                <div className="review_wrapper" key={`myreview_${reviews.id}`}>
                  <div className="time">
                    {new Date(reviews?.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <div className="address">{reviews.address}</div>

                  <img className="Star" src={Star} alt="Star" />
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
          <div style={{ height: "20px" }}> </div>
        </STReviesner>
      </StMyReviewBox>
    </>
  );
};

export default MyReview;

const StMyReviewBox = styled.div`
  width: 1254px;
  margin: auto;
  background-color: white;
  font-family: "Pretendard";
`;

const STReviesner = styled.div`
  width: 1000px;
  margin: auto;
`;

const StTitleBox = styled.div`
  display: flex;
  align-items: center;
`;

const StReviewBoxTitle = styled.div`
  margin: 30px 20px 30px 0;
  font-size: 20px;
  font-weight: 800;
`;

const StReviewBoxLength = styled.div`
  font-size: 15px;
  margin: 30px 0 30px 0;
`;

const StMyReview = styled.div`
  display: flex;
  background-color: #f0f0f0;
  width: 100%;
  height: 100px;
  margin-bottom: 15px;
  border-radius: 10px;

  .review_wrapper {
    display: flex;
    align-items: center;
    text-align: left;
  }

  .time {
    width: 130px;
    font-size: 15px;
    margin-left: 20px;
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
    margin: 0 5px 0 160px;
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
    border-radius: 5px;
    color: #2d2d2d;
    margin-left: 60px;
    cursor: pointer;
  }
`;
