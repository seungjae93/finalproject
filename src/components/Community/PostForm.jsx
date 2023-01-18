import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAddCommunity } from "../../redux/api/communityApi";
import { hangjungdong } from "./hangjungdong";

const PostForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState({});
  const { postLocation1, postLocation2 } = hangjungdong;

  const onPreviewImage = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const { mutate } = useAddCommunity();

  const onHandleAddPost = (event) => {
    event.preventDefault();
    if (!title || !content || !image || !postLocation1 || !postLocation2)
      return alert("양식을 확인해 주세요 ");

    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postLocation1", selected.postLocation1);
    formData.append("postLocation2", selected.postLocation2);

    const community = formData;

    mutate(community);
    navigate("/list");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  return (
    <>
      <StAddContainer>
        <StAddBox>
          <StForm onSubmit={onHandleAddPost}>
            <div>
              <select name="postLocation1" onChange={handleChange}>
                <option value="">시,도 선택</option>
                {postLocation1.map((el) => (
                  <option key={el.postLocation1} value={el.postLocation1}>
                    {el.codeNm}
                  </option>
                ))}
              </select>
              <select name="postLocation2" onChange={handleChange}>
                <option value="">구,군 선택</option>
                {postLocation2
                  .filter((el) => el.postLocation1 === selected.postLocation1)
                  .map((el) => (
                    <option key={el.postLocation2} value={el.codeNm}>
                      {el.codeNm}
                    </option>
                  ))}
              </select>
            </div>

            <StImagePreviewBox>
              <StImageBox>
                {preview && <StPreviewImg alt="sample" src={preview} />}
              </StImageBox>
            </StImagePreviewBox>

            <StImageInput
              name="postImage"
              type="file"
              accept="image/*"
              onChange={onPreviewImage}
            />

            <div> 제목 </div>
            <Stinput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div> 내용 </div>
            <StContentInput
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <br />
            <button type="submit"> 등록하기 </button>
          </StForm>
        </StAddBox>
      </StAddContainer>
    </>
  );
};

export default PostForm;

const StAddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StAddBox = styled.div`
  width: 40%;
  height: 32rem;
  background-color: powderblue;
  border-radius: 8px;
  padding: 4.5rem 5rem 5rem 5rem;
  margin-top: 20px;
`;

const StForm = styled.form`
  height: 110%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StContentInput = styled.textarea`
  width: 70%;
  height: 20rem;
  resize: none;
`;

const Stinput = styled.input`
  white-space: pre-wrap;
`;

const StImageInput = styled.input`
  text-align: center;
  width: 50%;
  height: 43px;
`;

const StImagePreviewBox = styled.div`
  background-color: white;
  width: 280px;
  height: 250px;
  background-size: cover;
`;

const StImageBox = styled.div`
  width: 280px;
  height: 250px;
`;

const StPreviewImg = styled.img`
  max-width: 280px;
  max-height: 250px;
  object-fit: contain;
  width: 280px;
  height: 250px;
`;
