import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getmypageReviews } from "../redux/api/mypageApi";

const MyReview = () => {
  const { data, error, isLoading, isError } = useQuery(
    ["myreview"],
    getmypageReviews
  );

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  console.log(data);

  return (
    <>
      <div>
        {data?.map((reviews) => {
          return (
            <div key={`myreview_${reviews.id}`}>
              <div>별점: {reviews.star}</div>
              <div>주소: {reviews.address}</div>
              <div>작성날짜: {reviews.createdAt}</div>
              <div>ID: {reviews.estateId}</div>
            </div>
          );
        })}
      </div>
      <button onClick={() => {}}>수정</button>
      <button onClick={() => {}}>삭제</button>
    </>
  );
};

export default MyReview;
