import React from "react";
import styled from "styled-components";

export const NextPreviousPost = ({ onNext, onPrevious, data }) => {
  return (
    <>
      <StBox>
        {data.post.previoustPostTitle ? (
          <StPr>
            <StPrPost onClick={onPrevious}> 이전글 | </StPrPost>
            <StPrTitle>{data.post.previoustPostTitle}</StPrTitle>
          </StPr>
        ) : null}

        {data.post.nextPostTitle ? (
          <StNext>
            <StNextTitle>{data.post.nextPostTitle}</StNextTitle>
            <StNextPost onClick={onNext}>| 다음글 </StNextPost>
          </StNext>
        ) : null}
      </StBox>
    </>
  );
};

const StBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 990px;
  margin: auto;
`;

const StPr = styled.div`
  background-color: #f3f5f5;
  display: flex;
  align-items: center;
  width: 490px;
  height: 30px;
`;

const StPrPost = styled.div`
  margin-left: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const StPrTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 40%;
  margin-left: 10px;
`;

const StNext = styled.div`
  background-color: #f3f5f5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 490px;
  height: 30px;
`;

const StNextPost = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  cursor: pointer;
`;

const StNextTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 40%;
  margin-right: 10px;
`;
