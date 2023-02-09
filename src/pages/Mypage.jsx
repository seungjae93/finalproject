import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import MyCommunity from "../components/mypage/MyCommunity";
import MyReview from "../components/mypage/MyReview";

const Mypage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (!email) {
      navigate("/login");
      alert("로그인을 해주세요");
    }
  }, []);

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
    </>
  );
};

export default Mypage;

const StmyPageWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
  margin: auto;
`;

const StmyPageBox = styled.div`
  margin: auto;
  width: 1254px;
  height: 150px;
  background-color: #ffffff;
  padding-top: 50px;
  border-bottom: 1px solid #c4cbcd;
  justify-content: center;
  text-align: center;

  .myPageTitle {
    width: 1254px;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px;
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
  margin-left: 150px;

  .email {
    font-weight: bold;
  }
`;
