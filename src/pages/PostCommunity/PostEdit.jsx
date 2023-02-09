import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUpdateCommunity,
  updateCommunity,
} from "../../redux/api/communityApi";
import { hangjungdong } from "../../components/community/hangjungdong";

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

  // 수정 전 가져오기
  const { error, isLoading, isError } = useQuery(
    ["post", postId],
    () => getUpdateCommunity(postId),
    {
      onSuccess: ({ post }) => {
        setTitle(post.title);
        setContent(post.content);
        setImage(post.postImage);
        setSelected({
          postLocation1: post.postLocation1,
          postLocation2: post.postLocation2,
        });
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
    alert("수정 되었습니다");
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

            <StTitleInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <StImageBox>
              <input
                type="file"
                id="file"
                name="postImage"
                onChange={onPreviewImage}
                style={{ display: "none" }}
              />
              <StUpload htmlFor="file"> + </StUpload>
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
              </div>{" "}
            </StImageBox>

            <StContentInput
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <StInfor>
              <StButton onClick={updateHandler}>수정 완료</StButton>
              <StButton onClick={() => navigate("/:postId")}>취소</StButton>
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
  justify-content: center;
`;

const StAddBox = styled.div`
  width: 1250px;
  background-color: white;
  padding: 2rem 000;
`;

const StForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StSeleteBox = styled.div`
  width: 70%;
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

const StInfor = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  min-width: 45%;
`;

const StButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: #c1de0d;
  width: 200px;
  height: 30px;
  cursor: pointer;
`;
