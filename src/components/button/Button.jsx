import React from "react";
import styled, { css } from "styled-components";

// Primitive Button
const PrimitiveButton = ({ children, rightSlot, ...restProps }) => {
  return (
    <StyledButton {...restProps}>
      {rightSlot ? (
        <ButtonInner>
          <>{children}</>
          <>{rightSlot}</>
        </ButtonInner>
      ) : (
        <>{children}</>
      )}
    </StyledButton>
  );
};

// Primary Style
const PrimaryButton = (props) => {
  return (
    <PrimitiveButton
      {...props}
      bc="#C1DE0D"
      color="#000000"
      activeBc="#8CAC00"
    />
  );
};

// Negative Style

const NegativeButton = (props) => {
  return (
    <PrimitiveButton
      {...props}
      bc="#C4CBCD"
      color="#2D2D2D"
      activeBc="#949A9C"
    />
  );
};

// Community Style

const CommunityButton = (props) => {
  return (
    <PrimitiveButton
      {...props}
      bc="white"
      ma="10px 0 0 0"
      color="#000000"
      hoverBc="#a8c4e1"
    />
  );
};

const Primary = PrimaryButton;
const Negative = NegativeButton;
const Community = CommunityButton;

const Button = { Negative, Primary, Community };
export default Button;

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: ${({ fs }) => fs};
  background-color: ${({ bc }) => bc};
  color: ${({ color }) => color};
  margin: ${({ ma }) => ma};
  font-weight: ${({ fw }) => fw};
  &:active {
    background-color: ${({ activeBc }) => activeBc};
    transition: 0.2s;
  }
  &:hover {
    background-color: ${({ hoverBc }) => hoverBc};
  }
  ${({ size }) => {
    switch (size) {
      case "large":
        return css`
          height: 50px;
          width: 340px;
        `;
      case "medium":
        return css`
          height: 34px;
          width: 121px;
        `;
      case "small":
        return css`
          height: 31px;
          width: 90px;
        `;
      default:
        return css`
          height: 30px;
          width: 70px;
        `;
    }
  }}
  ${({ outlined, bc }) => {
    if (outlined) {
      return css`
        border: 2px solid ${bc};
        background-color: #fff;
        font-weight: 600;
        &:active {
          background-color: #eeeeee;
        }
      `;
    }
  }}
`;

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-family: "Pretendard";
`;
