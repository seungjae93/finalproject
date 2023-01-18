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

  return (
    <>
      <h1>My Page</h1>
      <div>--주소와 별점이 보여질 부분--</div>
      {data?.myreviews.map((reviews?) => {
        return (
          <>
            <div>건물명:?? </div>
            <div>주소: {reviews.address}</div>
            <div>별점: {reviews.star}</div>
          </>
        );
      })}

      <button onClick={() => {}}>수정</button>
      <button onClick={() => {}}>삭제</button>
    </>
  );
};

export default MyReview;
