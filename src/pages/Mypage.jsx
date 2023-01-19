import React from "react";
import MyCommunity from "../components/MyCommunity";
import MyReview from "../components/MyReview";

const Mypage = () => {
  return (
    <>
      <h2>마이페이지(로그인 필요)</h2>

      {/* <div>--내가 쓴 후기가 보여질 부분--</div> */}
      <MyReview />

      {/* <div>--내가 쓴 게시물이 보여질 부분--</div> */}
      <MyCommunity />
    </>
  );
};

export default Mypage;
