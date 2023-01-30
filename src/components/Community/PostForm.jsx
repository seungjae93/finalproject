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
    if (!title || !content || !postLocation1 || !postLocation2)
      return alert("양식을 확인해 주세요 ");
    if (title.length > 50) {
      return alert("제목을 50글자 이내로 입력해 주세요");
    }

    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postLocation1", selected.postLocation1);
    formData.append("postLocation2", selected.postLocation2);

    mutate(formData);
    navigate("/list");
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  return (
    <>
      <StAddContainer>
        <StForm onSubmit={onHandleAddPost}>
          <StSeleteBox>
            <StSeleteR name="postLocation1" onChange={HandleChange}>
              <StOption value="">시,도 선택</StOption>
              {postLocation1.map((el) => (
                <StOption key={el.postLocation1} value={el.postLocation1}>
                  {el.codeNm}
                </StOption>
              ))}
            </StSeleteR>
            <StSeleteL name="postLocation2" onChange={HandleChange}>
              <StOption value="">구,군 선택</StOption>
              {postLocation2
                .filter((el) => el.postLocation1 === selected.postLocation1)
                .map((el) => (
                  <StOption key={el.postLocation2} value={el.codeNm}>
                    {el.codeNm}
                  </StOption>
                ))}
            </StSeleteL>
          </StSeleteBox>

          <StTitleInput
            type="text"
            value={title}
            placeholder="제목을 입력해 주세요 (최대 50자)"
            onChange={(e) => setTitle(e.target.value)}
          />

          <StImageBox>
            <StUpload htmlFor="file"> + </StUpload>
            <input
              type="file"
              id="file"
              onChange={onPreviewImage}
              style={{ display: "none" }}
            />
            <StyledImage src={preview} />
          </StImageBox>

          <StContentInput
            type="text"
            value={content}
            placeholder="내용을 입력해 주세요 "
            onChange={(e) => setContent(e.target.value)}
          />

          <StButton type="submit"> 작성 완료 </StButton>
        </StForm>
      </StAddContainer>
    </>
  );
};

export default PostForm;

const StAddContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StForm = styled.form`
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60%;
  min-width: 600px;
  height: 100%;
`;

const StSeleteBox = styled.div`
  margin: 30px 0 20px 0;
  width: 70%;
`;

const StSeleteR = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 8px;
  margin-right: 20px;
`;

const StSeleteL = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 8px;
`;

const StOption = styled.option`
  border: none;
  border: 2px solid #a6b2b9;
`;

const StTitleInput = styled.input`
  border: 2px solid #a6b2b9;
  border-radius: 8px;
  width: 70%;
  height: 2rem;
  margin: 20px 0 20px 0;
`;

const StImageBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`;

const StUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  padding: 10px 30px 20px 30px;
  margin-right: 20px;
  background-color: #d2d2d2;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #6688ab;
  }
`;

const StyledImage = styled.img`
  width: 150px;
  height: 120px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const StContentInput = styled.textarea`
  margin-top: 20px;
  border: 2px solid #a6b2b9;
  border-radius: 8px;
  width: 70%;
  height: 20rem;
  resize: none;
`;

const StButton = styled.button`
  padding: 0.5rem 6rem 0.5rem 6rem;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: #c1de0d;
  margin: 20px 0 20px 0;
  cursor: pointer;
`;
