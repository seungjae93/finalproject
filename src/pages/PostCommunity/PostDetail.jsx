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
    navigate("/list");
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StDetailBox>
        <StContainer>
          <StPostTitle>
            <StTitle> {data?.post.title} </StTitle>

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
          </StPostTitle>

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

      <StPostNextBefore>
        <StPost>
          <StPostBut onClick={() => navigate(`/detail/${postId + 1}`)}>
            다음글 |
          </StPostBut>
        </StPost>

        <StPost>
          <StPostBut>이전글 |</StPostBut>
        </StPost>
      </StPostNextBefore>
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
`;

const StTitle = styled.div`
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
  height: 50px;
  margin: 10px;
`;

const StCommentBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 60%;
`;

const StPostNextBefore = styled.div`
  background-color: powderblue;
  width: 70%;
`;

const StPost = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  margin-top: 5px;
  height: 30px;
`;

const StPostBut = styled.button`
  margin: 0 0 0 30px;
  border: none;
  cursor: pointer;
`;
