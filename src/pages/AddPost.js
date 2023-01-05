import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import styled from "styled-components";

const AddPost = () => {
  // const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onPreviewImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onHandleAddPost = (event) => {
    event.preventDefault();
    console.log({ title, contents });
    // dispatch(
    //   __addPost({
    //     id: `posts_${new Date().getTime() + Math.random()}`,
    //     title,
    //     contents,
    //   })
    // );
  };

  return (
    <>
      <StAddContainer>
        <StAddBox>
          <StForm onSubmit={onHandleAddPost}>
            {image && <img alt="sample" src={image} />}

            <input
              name="imgUploda"
              type="file"
              ccept="image/*"
              onChange={onPreviewImage}
            />

            <div> 제목 </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div> 내용 </div>
            <input
              type="text"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />

            <br />
            <button type="submit"> 등록하기 </button>
          </StForm>
        </StAddBox>
      </StAddContainer>
    </>
  );
};

export default AddPost;

const StAddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StAddBox = styled.div`
  width: 40%;
  height: 32rem;
  background-color: teal;
  border-radius: 8px;
  padding: 4.5rem 5rem 5rem 5rem;
  margin-top: 20px;
`;

const StForm = styled.form`
  background-color: yellow;
  height: 110%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
