import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import footerLogo from "../images/footerLogo.svg";

const Footer = () => {
  const locationNow = useLocation();
  if (locationNow.pathname === "/map") return null;
  if (locationNow.pathname === "/list") return null;
  if (locationNow.pathname === "/login") return null;
  if (locationNow.pathname === "/review") return null;

  return (
    <>
      <StSectionFooter>
        <StFooterBtn>
          <Link to="/map" className="btn">
            지도
          </Link>
          <Link to="/review" className="btn">
            후기작성
          </Link>
          <Link to="/list" className="btn">
            커뮤니티
          </Link>
          <Link to="/login" className="btn">
            로그인 / 회원가입
          </Link>
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
  max-width: 1920px;
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
