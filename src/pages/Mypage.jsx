import React from "react";
import MyCommunity from "../components/MyCommunity";
import MyReview from "../components/MyReview";

const Mypage = () => {
  return (
    <>
      <div>
        <div>OOO 님, 안녕하세요!</div>
        <div>이 집은 어떤가요?</div>
      </div>

      {/* <div>--내가 쓴 후기가 보여질 부분--</div> */}
      <MyReview />

      {/* <div>--내가 쓴 게시물이 보여질 부분--</div> */}
      <MyCommunity />
    </>
  );
};

export default Mypage;
