import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { deleteCommunity, detailCommunity } from "../../redux/api/communityApi";
import Comment from "../Comment";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { isLoading, isError, error, data } = useQuery(["posts", postId], () =>
    detailCommunity(postId)
  );

  const nickname = localStorage.getItem("nickname");

  const deleteCommunityCallback = async (postId) => {
    await deleteCommunity(postId);
    window.alert("삭제되었습니다!");
    navigate("/list");
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StDetailBox>
        <StContainer>
          <StPostTitle>{data?.post.title}</StPostTitle>

          <StInfor>
            <StNicDa>
              <StNicName> {data?.post.nickname} | </StNicName>
              <StDate>
                {new Date(data?.post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </StDate>
            </StNicDa>

            <div>
              {data?.post.nickname === nickname ? (
                <StButton
                  onClick={() => navigate(`/edit/${data?.post.postId}`)}
                >
                  수정하기
                </StButton>
              ) : null}

              {data?.post.nickname === nickname ? (
                <StButton onClick={() => deleteCommunityCallback(postId)}>
                  삭제하기
                </StButton>
              ) : null}
            </div>
          </StInfor>

          <div>
            <StDetailImage src={data?.post?.postImage} />
          </div>

          <StContent> {data?.post.content} </StContent>
        </StContainer>
      </StDetailBox>

      <StCommentBox>
        <Comment />
      </StCommentBox>
      {/* 
      <StPostNextBefore>
        <StPost>
          <StPostBut onClick={() => navigate(`/detail/${postId + 1}`)}>
            다음글 |
          </StPostBut>
        </StPost>

        <StPost>
          <StPostBut>이전글 |</StPostBut>
        </StPost>
      </StPostNextBefore> */}
    </>
  );
};

export default PostDetail;

const StDetailBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 60%;
`;

const StContainer = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const StPostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  margin-top: 10px;
`;

const StButton = styled.button`
  background-color: white;
  border: none;
  margin: 0 10px 0;
  cursor: pointer;
`;

const StInfor = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`;

const StNicDa = styled.div`
  display: flex;
`;

const StNicName = styled.div`
  font-weight: bold;
`;

const StDate = styled.div`
  margin-left: 10px;
`;

const StDetailImage = styled.img`
  border: 0px solid black;
  margin-top: 30px;
  width: 100%;
  height: 500px;
  border-radius: 20px;
`;

const StContent = styled.div`
  font-size: 20px;
  overflow-y: auto;
  white-space: pre-wrap;
  /* @media (min-width: 600px) { 
    max-height: 300px;
    // 너비가 600px이상인 화면의 경우 최대 높이가 300px로 설정
  }
  @media (min-width: 800px) {
    max-height: 400px;
    // 너비가 800px 화면의 경우 최대 높이가 400px 설정
  } */
`;

const StCommentBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 60%;
`;
