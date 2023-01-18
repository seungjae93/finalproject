import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { deleteCommunity, detailCommunity } from "../../redux/api/communityApi";
import Comment from "../Comment";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPosts] = useState("");

  const { isLoading, isError, error } = useQuery(
    ["posts", postId],
    () => detailCommunity(postId),
    {
      onSuccess: (post) => {
        const postArray = Object.values(post);
        const detailItem = postArray.filter(
          (value) => value.postId === Number(postId)
        );
        setPosts(detailItem[0]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const deleteCommunityCallback = async (postId) => {
    await deleteCommunity(postId);
    navigate("/list");
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StMain>
        <StButton> MAP </StButton>
        <StButton onClick={() => navigate("/list")}> 뒤로 가기 </StButton>
      </StMain>
      <StContainer>
        <StTitle> {post?.title} </StTitle>

        <StInfor>
          <StNicDa>
            <StNicName> {post?.nickname} </StNicName>
            <StDate>
              {" "}
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            </StDate>
          </StNicDa>

          <div>
            <StEdit onClick={() => navigate(`/edit/${post.postId}`)}>
              수정
            </StEdit>

            <StRemove onClick={() => deleteCommunityCallback(postId)}>
              삭제
            </StRemove>
          </div>
        </StInfor>

        <div>
          <StDetailImage
            src={post?.postImage}
            style={{ width: "100%", height: "300px" }}
          />
        </div>

        <StContent> {post.content} </StContent>
      </StContainer>

      <Comment />
    </>
  );
};

export default PostDetail;

const StContainer = styled.div`
  width: 40%;
  border: 2px solid powderblue;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const StButton = styled.button`
  margin: 25px;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

const StMain = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
`;

const StTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
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
  margin-left: 20px;
`;

const StRemove = styled.button``;

const StEdit = styled.button``;

const StDetailImage = styled.img`
  border: 0px solid black;
  margin-top: 30px;
  width: 100%;
  height: 200px;
`;

const StContent = styled.div`
  font-size: 20px;
`;
