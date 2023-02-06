import React from "react";
import styled from "styled-components";

export const NextPost = ({ onNext, data }) => {
  return (
    <>
      <StNextPrevious>
        <StNext onClick={onNext}>
          <div>다음글 |</div>
          <StTitleVeiw>{data.post.nextPostTitle} </StTitleVeiw>
        </StNext>
      </StNextPrevious>
    </>
  );
};

export const PreviousPost = ({ onPrevious, data }) => {
  return (
    <>
      <StNextPrevious>
        <StNext onClick={onPrevious}>
          <div>이전글 |</div>
          <StTitleVeiw>{data.post.previoustPostTitle} </StTitleVeiw>
        </StNext>
      </StNextPrevious>
    </>
  );
};

const StNextPrevious = styled.div`
  background-color: #f3f5f5;
  height: 30px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const StNext = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f5f5;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

const StTitleVeiw = styled.div`
  margin-left: 15px;
`;
