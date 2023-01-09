import React, { useState } from "react";
import styled from "styled-components";

const Modal = (props) => {
  const { width, height, onClick, children, top, left } = props;
  const styles = { width, height, top, left };
  const [modal, setModal] = useState(false);

  return (
    <>
      <StModalContainer {...styles} onClick={onClick}>
        {children}
      </StModalContainer>
    </>
  );
};

export default Modal;

const StModalContainer = styled.div`
  position: fixed;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  z-index: 20;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
