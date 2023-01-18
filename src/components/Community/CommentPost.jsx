import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useAddComment } from "../../redux/api/communityApi";
import { useParams } from "react-router";

const CommentPost = () => {
  const [input, setInput] = useState("");
  const { postId } = useParams();

  const { mutate: addCommentGoo } = useAddComment();

  const onClickHandler = (event) => {
    event.preventDefault();
    if (!input) return alert("댓글을 입력해 주세요");

    const comment = { text: input, postId: postId };

    addCommentGoo(comment);

    setInput("");
  };

  return (
    <StCommentBox>
      <StInput
        cols="90"
        rows="3"
        placeholder="댓글작성"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></StInput>

      <StButton onClick={onClickHandler}>작성</StButton>
    </StCommentBox>
  );
};

export default CommentPost;

const StCommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50%;
`;

const StInput = styled.textarea`
  background-color: #f0f0f0;
  border-radius: 5px;
  border: 1px solid #c4cbcd;
  resize: none;
`;

const StButton = styled.button`
  font-size: 15px;
`;
