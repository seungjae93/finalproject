import React from "react";
import styled from "styled-components";
import MyCommunity from "../components/mypage/MyCommunity";
import MyReview from "../components/mypage/MyReview";
import Footer from "../components/Footer";

const MyPage = () => {
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

export default MyPage;

const StmyPageWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
`;

const StmyPageBox = styled.div`
  width: 1920px;
  height: 150px;
  background-color: #ffffff;
  margin: auto;
  padding-top: 65px;
  border-bottom: 1px solid #c4cbcd;

  .myPageTitle {
    width: 500px;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-left: 35%;
  }
  .myPage1 {
    width: 500;
    font-size: 20px;
    padding-bottom: 9px;
  }
  .myPage2 {
    font-size: 18px;
  }
`;

const StmyPageName = styled.div`
  text-align: left;
  width: 500px;
  margin-left: 220px;

  .email {
    font-weight: bold;
  }
`;
