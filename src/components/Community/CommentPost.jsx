import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useAddComment } from "../../redux/api/communityApi";
import { useNavigate, useParams } from "react-router";

const CommentPost = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { postId } = useParams();

  const { mutate } = useAddComment();

  const onClickHandler = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("token")) {
      alert("로그인을 해주세요");
      navigate("/login");
    }
    if (!input) return alert("댓글을 입력해 주세요");
    if (input.length > 100) {
      return alert("제목을 100글자 이내로 입력해 주세요");
    }

    const comment = { text: input, postId: postId };

    mutate(comment);

    setInput("");
  };

  return (
    <>
      <StCommentBox>
        <StInput
          cols="90"
          rows="3"
          placeholder="댓글작성 (최대 100자)"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></StInput>

        <StButton onClick={onClickHandler}>작성하기</StButton>
      </StCommentBox>
    </>
  );
};

export default CommentPost;

const StCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StInput = styled.textarea`
  background-color: #f0f0f0;
  border-radius: 5px;
  border: 1px solid #c4cbcd;
  resize: none;
  margin-top: 20px;
  width: 800px;
`;

const StButton = styled.button`
  font-size: 15px;
  margin-top: 20px;
  border: none;
  background-color: white;
  cursor: pointer;
`;
