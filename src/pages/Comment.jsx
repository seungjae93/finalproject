import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { deleteComment, getComment } from "../redux/api/communityApi";
import CommentPost from "../components/Community/CommentPost";

const Comment = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["comments", postId],
    () => getComment(postId)
  );

  const deleteCommentCallback = async (commentId) => {
    await deleteComment(commentId);
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <StCommentlistBox>
      <CommentPost />

      {data.comments.map((comments) => {
        return (
          <StCommentlist key={`comment_${comments.commentId}`}>
            <StComment>{comments.content}</StComment>

            <StCommentBut>
              <StNickDate> 닉네임 </StNickDate>
              <StNickDate> 날짜 </StNickDate>
              <div>
                <StBut
                  onClick={() => deleteCommentCallback(comments.commentId)}
                >
                  {" "}
                  삭제하기{" "}
                </StBut>
                <StBut> 수정하기 </StBut>
              </div>
            </StCommentBut>
          </StCommentlist>
        );
      })}
    </StCommentlistBox>
  );
};

export default Comment;

const StCommentlistBox = styled.div`
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

const StCommentlist = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  height: 70px;
  border: 1px solid #c4cbcd;
  border-radius: 5px;
  margin-top: 15px;
`;

const StComment = styled.div``;

const StCommentBut = styled.div`
  display: flex;
  font-size: 11px;
  margin-top: 20px;
  margin-left: 10px;
`;

const StNickDate = styled.div`
  margin-right: 5px;
`;

const StBut = styled.button`
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;
