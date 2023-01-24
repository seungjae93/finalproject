import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PostListCard = ({ posts }) => {
  return (
    <StCardWrapper to={`/${posts.postId}`}>
      <StImageCarrier alt="" src={posts?.postImage}></StImageCarrier>
      <StCommunityBox>
        <StTitleCarrier>
          <p>{posts?.title}</p>
        </StTitleCarrier>
        <StContentCarrier>
          <pre> {posts?.content} </pre>
        </StContentCarrier>
        <StBox>
          <StName>
            <StNickName> {posts?.nickname} </StNickName>
            <div>
              {new Date(posts.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </StName>
          <div> {posts.commentsCount}개의 댓글 </div>
        </StBox>
      </StCommunityBox>
    </StCardWrapper>
  );
};

export default PostListCard;

const StCardWrapper = styled(Link)`
  background-color: white;
  width: 350px;
  height: 340px;
  border: 0px solid black;
  border-radius: 10px;
  margin: 20px 0 0 10px;
  z-index: 900px;
  box-shadow: 0px 1px 5px 1px #dddddd;
  text-decoration-line: none;
  color: black;
  :hover {
    box-shadow: 0px 5px 10px 1px #181818;
    transition: all 0.3s;
  }
`;

const StImageCarrier = styled.img`
  width: 350px;
  height: 170px;
  border-radius: 10px 10px 0 0;
`;

const StCommunityBox = styled.div`
  padding: 0 10px 0 10px;
`;

const StTitleCarrier = styled.div`
  p {
    margin-left: 5px;
    font-size: 25px;
    font-style: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    height: 30px;
  }
`;

const StContentCarrier = styled.div`
  width: 100%;
  height: 60px;

  pre {
    margin-left: 5px;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    font-weight: bold;
  }
`;

const StBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 13px;
  width: 90%;
  font-size: 13px;
`;

const StName = styled.div`
  display: flex;
`;

const StNickName = styled.div`
  margin-right: 8px;
`;
