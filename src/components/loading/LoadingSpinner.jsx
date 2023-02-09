import React from "react";
import styled from "styled-components";
import footerLogo from "../../images/footerLogo.webp";

const LoadingSpinner = () => {
  return (
    <Background>
      <img src={footerLogo} alt="footerLogo" />
      <LoadingText>잠시만 기다려 주세요</LoadingText>
    </Background>
  );
};

export default LoadingSpinner;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  text-align: center;
  margin-top: 10px;
`;
