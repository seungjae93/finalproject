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

  console.log(data);

  const email = localStorage.getItem("email");

  const deleteCommunityCallback = async (postId) => {
    await deleteCommunity(postId);
    window.alert("삭제되었습니다!");
    navigate("/list");
  };

  const onPrevious = () => {
    navigate(`/${data.post.previoustPostId}`);
  };

  const onNext = () => {
    navigate(`/${data.post.nextPostId}`);
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
              <StNicName> {data?.post.email} | </StNicName>
              <StDate>
                {new Date(data?.post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </StDate>
            </StNicDa>

            <div>
              {data?.post.email === email ? (
                <StButton
                  onClick={() => navigate(`/edit/${data?.post.postId}`)}
                >
                  수정하기
                </StButton>
              ) : null}

              {data?.post.email === email ? (
                <StButton onClick={() => deleteCommunityCallback(postId)}>
                  삭제하기
                </StButton>
              ) : null}
            </div>
          </StInfor>
          {data?.post?.postImage ? (
            <StDetailImage src={data?.post?.postImage} />
          ) : null}

          <StContent> {data?.post.content} </StContent>
        </StContainer>
      </StDetailBox>

      <div style={{ height: "10px" }}></div>

      <StCommentBox>
        <Comment />

        {data.post.nextPostTitle ? (
          <StNextPrevious>
            <StNext onClick={onNext}>
              <div>다음글 |</div>
              <StTitleVeiw>{data.post.nextPostTitle} </StTitleVeiw>
            </StNext>
          </StNextPrevious>
        ) : null}

        <div style={{ height: "10px" }}></div>

        {data.post.previoustPostTitle ? (
          <StNextPrevious>
            <StNext onClick={onPrevious}>
              <div>이전글 |</div>
              <StTitleVeiw>{data.post.previoustPostTitle} </StTitleVeiw>
            </StNext>
          </StNextPrevious>
        ) : null}

        <div style={{ height: "20px" }}></div>
      </StCommentBox>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default PostDetail;

const StDetailBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 1254px;
`;

const StContainer = styled.div`
  width: 990px;
  margin-left: auto;
  margin-right: auto;
`;

const StPostTitle = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  font-size: 32px;
  font-weight: bold;
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
  font-size: 16px;
  display: flex;
`;

const StNicName = styled.div`
  font-weight: bold;
`;

const StDate = styled.div`
  margin-left: 10px;
`;

const StDetailImage = styled.img`
  border: none;
  border-radius: 10px;
  margin-top: 30px;
  width: 100%;
  height: 459px;
`;

const StContent = styled.pre`
  margin: 20px 0 10px 0;
  font-size: 16px;
  overflow-y: auto;
  white-space: pre-wrap;
  padding-bottom: 20px;
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
  width: 1254px;
`;

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
