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

    for (let key of formData.keys()) {
      console.log(key);
    }
    for (let value of formData.values()) {
      console.log(value);
    }

    const community = formData;

    mutate(community);
    navigate("/list");
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  return (
    <>
      <StAddContainer>
        <StAddBox>
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

            <div>
              <StyledInput
                type="file"
                id="file"
                onChange={onPreviewImage}
                style={{ display: "none" }}
              />
              <StyledImage src={preview} />
            </div>
            <StUpload htmlFor="file">파일 업로드</StUpload>

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
            <StButton type="submit"> 등록하기 </StButton>
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
  width: 60%;
  background-color: white;
  padding: 2rem 000;
`;

const StForm = styled.form`
  height: 110%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StSeleteBox = styled.div`
  text-align: center;
  margin: 0 0 20px 0;
`;
const StSeleteR = styled.select`
  border: 2px solid powderblue;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  margin-right: 20px;
`;

const StSeleteL = styled.select`
  border: 2px solid powderblue;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 10px;
`;

const StOption = styled.option`
  border: none;
  border: 2px solid powderblue;
`;

const StUpload = styled.label`
  text-align: center;
  padding: 6px 25px;
  margin: 10px 0 10px 0;
  background-color: powderblue;

  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: #6688ab;
  }
`;

const Stinput = styled.input`
  width: 50%;
  height: 1rem;
`;

const StContentInput = styled.textarea`
  width: 70%;
  height: 20rem;
  resize: none;
`;

const StyledInput = styled.input`
  padding: 7px;
  background: white;
  border-radius: 10px;
  color: #34495e;
  height: 30px;
  outline: none;
  border: 1px solid #34495e;
  font-weight: 700;
  ::placeholder {
    color: #34495e;
    opacity: 0.5;
  }
`;

const StyledImage = styled.img`
  width: 400px;
  height: 300px;
  border-radius: 50px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 5px 6px;
`;

const StButton = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 20px;
`;
