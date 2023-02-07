import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PostListCard = React.memo(({ posts }) => {
  return (
    <StCardWrapper to={`/${posts.postId}`}>
      <StImageCarrier alt="" src={posts?.postImage}></StImageCarrier>

      <StCommunityBox>
        <StTitleCarrier>{posts?.title}</StTitleCarrier>

        <StContentCarrier>
          <pre> {posts?.content} </pre>
        </StContentCarrier>
      </StCommunityBox>
      <StBox>
        <StName>
          <StNickName> {posts?.email} </StNickName>
          <div>{new Date(posts.createdAt).toLocaleDateString("ko-KR")}</div>
        </StName>
        <div> {posts.commentsCount}개의 댓글 </div>
      </StBox>
    </StCardWrapper>
  );
});

export default PostListCard;

const StCardWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 400px;
  height: 287px;
  border: 0px solid black;
  border-radius: 10px;
  margin: 10px 0 0 10px;
  z-index: 900px;
  box-shadow: 0px 1px 5px 1px #dddddd;
  text-decoration-line: none;
  color: black;
  :hover {
    box-shadow: 0px 5px 10px 1px #181818;
    transition: all 0.3s;
  }
`;

const StImageCarrier = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 166px;
  border: none;
  border-radius: 10px 10px 0 0;
`;

const StCommunityBox = styled.div`
  margin: 15px;
`;

const StTitleCarrier = styled.pre`
  font-size: 16px;
  font-style: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 98%;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StContentCarrier = styled.div`
  width: 98%;
  height: 40px;

  pre {
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
    font-size: 13px;
  }
`;

const StBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 13px;
  color: #737d81;
  margin-bottom: 10px;
`;

const StName = styled.div`
  display: flex;
`;

const StNickName = styled.div`
  margin-right: 8px;
`;
