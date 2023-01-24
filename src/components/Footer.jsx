import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
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
            로그인/회원가입
          </Link>
        </StFooterBtn>
        <StFooterContent>
          <div className="footerTitle">이집은(Ezipeun)</div>
          <div className="footerName">
            참여자:박영호(팀장),서정득,권태형,이승재(부팀장),조민욱,이희승
          </div>
        </StFooterContent>
        <StFooterLogo>
          <div className="logo">이집은</div>
          <div className="footerCopy">All rights reserved,2023</div>
        </StFooterLogo>
      </StSectionFooter>
    </>
  );
};

export default Footer;

const StSectionFooter = styled.div`
  max-width: 1920px;
  height: 200px;
  margin: auto;
  background-color: #d7dbdc;
  align-items: center;
`;

const StFooterBtn = styled.div`
  width: 700px;
  padding-top: 30px;
  padding-left: 600px;
  .btn {
    color: #737d81;
    font-size: 16px;
    font-weight: 500;
    border: none;
    background-color: transparent;
    margin-left: 4%;
    cursor: pointer;
  }
`;

const StFooterContent = styled.div`
  padding-top: 60px;
  padding-left: 200px;

  .footerTitle {
    color: #737d81;
    font-size: 20px;
    font-weight: 600;
  }
  .footerName {
    color: #737d81;
    font-size: 15px;
    font-weight: 300;
  }
`;

const StFooterLogo = styled.div`
  padding-left: 800px;
  border: 1px solid red;
  .footerCopy {
    color: #737d81;
  }
`;
