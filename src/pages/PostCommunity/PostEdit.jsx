import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const [selected, setSelected] = useState({});
  const { postLocation1, postLocation2 } = hangjungdong;

  // 기존의 데이터 가져오기
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
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //수정하기
  const { mutate } = useMutation((postId, formData) =>
    updateCommunity(postId, formData)
  );

  const updateHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postLocation1", selected.postLocation1);
    formData.append("postLocation2", selected.postLocation2);

    mutate(postId, formData);
    navigate("/list");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(name, value);
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <form>
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
        <StContainer>
          <StTitle> 제목 </StTitle>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <StContent> 내용 </StContent>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input type="file" name="postImage" onChange={onPreviewImage} />
          {preview && <img alt="sample" src={preview} />}
          <div>
            <StDetailImage
              src={image}
              value={image}
              style={{ width: "100%", height: "300px" }}
              onChange={onPreviewImage}
            />
          </div>
          <StInfor>
            <div>
              <StEdit onClick={updateHandler}>수정 완료</StEdit>
              <StRemove onClick={() => navigate("/:postId")}> 취소 </StRemove>
            </div>
          </StInfor>
        </StContainer>
      </form>
    </>
  );
};

export default PostEdit;

const StContainer = styled.div`
  width: 60%;
  background-color: powderblue;
  margin-left: auto;
  margin-right: auto;
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

const StRemove = styled.button``;

const StEdit = styled.button``;

const StDetailImage = styled.img`
  border: 0px solid black;
  margin-top: 30px;
  width: 100%;
  height: 200px;
`;
