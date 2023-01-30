import React from "react";
import styled from "styled-components";
import MyCommunity from "../components/MyCommunity";
import MyReview from "../components/MyReview";
import Footer from "../components/Footer";

const Mypage = () => {
  const email = localStorage.getItem("email");
  return (
    <>
      <StmyPageWrap>
        <StmyPageBox>
          <div className="myPageTitle">마이페이지</div>
          <StmyPageName>
            <div className="myPage1">
              <span className="email">{email}</span> 님, 안녕하세요!
            </div>
            <div className="myPage2">이집은 어떤가요?</div>
          </StmyPageName>
        </StmyPageBox>

        <MyReview />

        <MyCommunity />
      </StmyPageWrap>
      <Footer />
    </>
  );
};

export default Mypage;

const StmyPageWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
`;

const StmyPageBox = styled.div`
  width: 1254px;
  height: 150px;
  background-color: #ffffff;
  margin: auto;
  padding-top: 65px;
  text-align: center;
  border-bottom: 1px solid #c4cbcd;

  .myPageTitle {
    font-size: 28px;
    font-weight: bold;
    padding-bottom: 25px;
  }
  .myPage1 {
    font-size: 20px;
    padding-bottom: 9px;
  }
  .myPage2 {
    font-size: 18px;
  }
`;

const StmyPageName = styled.div`
  text-align: left;
  width: 300px;
  padding-left: 120px;

  .myPage1 {
    font-size: 20px;
    padding-bottom: 9px;
  }
  .myPage2 {
    font-size: 18px;
  }
  .email {
    font-weight: bold;
  }
`;
