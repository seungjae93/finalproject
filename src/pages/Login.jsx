import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL } from "./KakaoLogin";

const Login = () => {
  return (
    <>
      <StLoginBox>
        <Sthight />
        <StTitle>이집은</StTitle>

        <StContents>
          <div>간편하게 로그인하고 </div>
          <div>진짜 후기를 알아보세요.</div>
        </StContents>

        <StLog>서비스 이용을 위해 로그인 해주세요</StLog>
        <a href={KAKAO_AUTH_URL}>
          <StImg
            alt="kakao_login"
            src={require("../images/kakao_login.jpg")}
          ></StImg>
        </a>
      </StLoginBox>
    </>
  );
};

export default Login;

const StLoginBox = styled.div`
  text-align: center;
  width: 350px;
  height: 400px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  box-shadow: 0px 5px 20px 5px #bcbcbc;
`;

const Sthight = styled.div`
  height: 30px;
`;

const StTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StContents = styled.div`
  margin-top: 80px;
  font-size: 20px;
  font-weight: bold;
`;

const StLog = styled.div`
  margin-top: 10px;
`;

const StImg = styled.img`
  margin-top: 70px;
`;
