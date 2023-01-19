import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUpdateCommunity,
  updateCommunity,
} from "../../redux/api/communityApi";
import { hangjungdong } from "../../components/Community/hangjungdong";

const PostEdit = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [newImage, setNewImage] = useState(null);

  const [selected, setSelected] = useState({});
  const { postLocation1, postLocation2 } = hangjungdong;

  const queryClient = useQueryClient();

  const { error, isLoading, isError } = useQuery(
    ["post", postId],
    () => getUpdateCommunity(postId),
    {
      onSuccess: ({ post }) => {
        setTitle(post.title);
        setContent(post.content);
        setImage(post.postImage);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onPreviewImage = (e) => {
    setNewImage(e.target.files[0]);
    const newImage = e.target.files[0];
    setImage(URL.createObjectURL(newImage));
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(URL.createObjectURL(newImage));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //수정하기
  const { mutate } = useMutation(
    (formData) => updateCommunity(postId, formData),
    {
      onSuccess: () => queryClient.refetchQueries(["posts"]),
    }
  );

  const updateHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("postImage", newImage);
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

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StAddContainer>
        <StAddBox>
          <StForm>
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

            <StyledInput
              type="file"
              id="file"
              name="postImage"
              onChange={onPreviewImage}
              style={{ display: "none" }}
            />
            <StUpload htmlFor="file">파일 업로드</StUpload>
            {preview && (
              <StyledImage
                alt="sample"
                src={preview}
                style={{ display: "none" }}
              />
            )}
            <div>
              <StyledImage
                src={image}
                value={image}
                onChange={onPreviewImage}
              />
            </div>

            <StTitle> 제목 </StTitle>
            <Stinput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <StContent> 내용 </StContent>
            <StContentInput
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <StInfor>
              <div>
                <StButton onClick={updateHandler}>수정 완료</StButton>
                <StButton onClick={() => navigate("/:postId")}>취소</StButton>
              </div>
            </StInfor>
          </StForm>
        </StAddBox>
      </StAddContainer>
    </>
  );
};

export default PostEdit;

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

const StTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const StInfor = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`;

const StContent = styled.div`
  font-size: 20px;
`;

const StUpload = styled.label`
  text-align: center;
  padding: 6px 25px;
  margin: 10px 0 30px 0;
  background-color: powderblue;
  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: #6688ab;
  }
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
`;

const StyledImage = styled.img`
  width: 400px;
  height: 300px;
  border-radius: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.23) 0px 0px 5px 6px;
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

const StButton = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 20px;
`;
