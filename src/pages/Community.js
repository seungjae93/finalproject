import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import PostCommunity from "../component/PostCommunity";

const Community = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/post");
  };

  return (
    <>
      <StMain>
        <StTitle> 뒤로 가기 </StTitle>
        <StTitle onClick={onClickHandler}> 작성 하기 </StTitle>
      </StMain>
      <StPost>
        <PostCommunity />
        <PostCommunity />
        <PostCommunity />
        <PostCommunity />

        <PostCommunity />
        <PostCommunity />

        {/* <StCardContainer>

        </StCardContainer> */}
      </StPost>
    </>
  );
};

export default Community;

const StMain = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const StTitle = styled.button`
  margin: 25px;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

const StPost = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
