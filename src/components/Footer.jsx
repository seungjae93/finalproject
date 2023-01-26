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
        <StFooterWrap>
          <StFooterContent>
            <div className="footerTitle">이집은(Ezipeun)</div>
            <div className="footerName">
              참여자: 박영호(팀장),서정득,권태형, 이승재(부팀장),조민욱,이희승
            </div>
          </StFooterContent>
          <StFooterLogo>
            <div className="logo">
              <img
                className="footerLogo"
                src={require("../images/Group 478.png")}
                alt="logo"
              />
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
  max-width: 1920px;
  height: 200px;
  margin: auto;
  background-color: #f3f5f5f5;
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

const StFooterWrap = styled.div`
  display: flex;
`;

const StFooterContent = styled.div`
  padding-top: 60px;
  padding-left: 200px;

  .footerTitle {
    color: #737d81;
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 15px;
  }
  .footerName {
    color: #737d81;
    font-size: 15px;
    font-weight: 300;
  }
`;

const StFooterLogo = styled.div`
  padding-left: 480px;
  padding-top: 60px;
  .footerCopy {
    color: #737d81;
    padding-top: 15px;
  }
`;