import React from "react";
import styled from "styled-components";
const TotalModal = (props) => {
  return (
    <>
      <StModalContainer>x</StModalContainer>
    </>
  );
};

export default TotalModal;

const StModalContainer = styled.div`
  position: fixed;
  width: 25%;
  height: 100%;
  z-index: 200;
  top: 48px;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
