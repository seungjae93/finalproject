import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  getComment,
  updateComment,
} from "../redux/api/communityApi";
import CommentPost from "../components/Community/CommentPost";

const Comment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const [editOn, setEditOn] = useState("");
  const [input, setInput] = useState("");

  const nickname = localStorage.getItem("nickname");

  const { data, isLoading, isError, error } = useQuery(
    ["comments", postId],
    () => getComment(postId)
  );

  const deleteCommentCallback = async (commentId) => {
    await deleteComment(commentId);
    queryClient.invalidateQueries(["comments", postId]);
  };

  const { mutate } = useMutation(
    (data) => updateComment(data.commentId, data.content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const onEditComplete = async (commentId, content) => {
    await mutate({ commentId, content });
    setEditOn("");
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <StCommentlistBox>
      <CommentPost />

      {data.comments.map((comments, i) => {
        return comments.commentId === editOn ? (
          <StCommentlist key={`comment_${i}`}>
            <Stinput onChange={(e) => setInput(e.target.value)} value={input} />

            <StCommentBut>
              <StNickDate> {comments.nickname} </StNickDate>
              <StNickDate>
                {new Date(comments?.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </StNickDate>
              <div>
                <StBut
                  onClick={() => onEditComplete(comments.commentId, input)}
                >
                  수정 완료
                </StBut>
                <StBut onClick={() => setEditOn("")}> 수정 취소 </StBut>
              </div>
            </StCommentBut>
          </StCommentlist>
        ) : (
          <StCommentlist key={`comment_${i}`}>
            <StComment>{comments.content}</StComment>

            <StCommentBut>
              <StNickDate> {comments.nickname} </StNickDate>
              <StNickDate>
                {new Date(comments?.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </StNickDate>

              {comments.nickname === nickname ? (
                <div>
                  <StBut
                    onClick={() => {
                      setEditOn(comments.commentId);
                      setInput(comments.content);
                    }}
                  >
                    수정하기
                  </StBut>
                  <StBut
                    onClick={() => deleteCommentCallback(comments.commentId)}
                  >
                    삭제하기
                  </StBut>
                </div>
              ) : null}
            </StCommentBut>
          </StCommentlist>
        );
      })}
    </StCommentlistBox>
  );
};

export default Comment;

const StCommentlistBox = styled.div`
  width: 60%;
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

const Stinput = styled.input`
  border-radius: 5px;
  background-color: #f0f0f0;
  border: 1px solid powderblue;
  width: 98%;
`;
