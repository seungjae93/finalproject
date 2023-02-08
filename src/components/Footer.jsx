import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import footerLogo from "../images/footerLogo.svg";

const Footer = () => {
  const navigate = useNavigate();
  const onReviewPost = () => {
    if (localStorage.getItem("token") === null) {
      alert("로그인을 해주세요");
      navigate("login");
    } else navigate("/review");
  };
  const onLoginPost = () => {
    if (localStorage.getItem("token")) {
      alert("로그인이 되었습니다.");
    } else navigate("/login");
  };
  const locationNow = useLocation();
  if (
    locationNow.pathname === "/map" ||
    locationNow.pathname === "/list" ||
    locationNow.pathname === "/login" ||
    locationNow.pathname === "/review" ||
    locationNow.pathname === "/auth/kakao/callback"
  ) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <StSectionFooter>
        <StFooterBtn>
          <Link to="/map" className="btn">
            지도
          </Link>
          <div className="btn" onClick={onReviewPost}>
            후기작성
          </div>
          <Link to="/list" className="btn">
            커뮤니티
          </Link>
          <div className="btn" onClick={onLoginPost}>
            로그인 / 회원가입
          </div>
        </StFooterBtn>
        <StFooterWrap>
          <StFooterContent>
            <div className="footerTitle">이집은(Ezipeun)</div>
            <div className="footerName">
              참여자: 박영호(팀장), 서정득, 권태형, 이승재(부팀장), 조민욱,
              이희승
            </div>
          </StFooterContent>
          <StFooterLogo>
            <div className="logo">
              <img className="footerLogo" src={footerLogo} alt="footerLogo" />
            </div>
            <div className="footerCopy">All rights reserved,2023</div>
          </StFooterLogo>
        </StFooterWrap>
      </StSectionFooter>
    </>
  );
};

export default Footer;

const StSectionFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 900px;
  height: 200px;
  min-height: 200px;
  background-color: #f3f5f5f5;
`;

const StFooterBtn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 50px;
  font-family: "Pretendard";

  .btn {
    color: #737d81;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    background-color: transparent;
    text-decoration-line: none;
    cursor: pointer;
  }
`;

const StFooterWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 1920px;
  height: 100px;
`;

const StFooterContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 470px;
  margin-top: 40px;

  .footerTitle {
    color: #737d81;
    font-size: 20px;
    font-weight: 600;
  }
  .footerName {
    margin-top: 20px;
    color: #737d81;
    font-size: 15px;
    font-weight: 300;
  }
`;

const StFooterLogo = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 470px;
  margin-top: 50px;
  .footerCopy {
    color: #737d81;
    padding-top: 5px;
  }
`;
