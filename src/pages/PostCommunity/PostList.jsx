import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "../../redux/api/communityApi";
import { hangjungdong } from "../../components/Community/hangjungdong";
import PostListCard from "../../components/Community/PostListCard";

const PostList = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState({});
  const { postLocation1, postLocation2 } = hangjungdong;
  const [initial, setInitial] = useState(true);

  const { data, error, isLoading, isError } = useQuery(["posts"], getCommunity);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    setInitial(false);
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <div>
        <select name="postLocation1" onChange={HandleChange}>
          <option value="">시,도 선택</option>
          {postLocation1.map((el) => (
            <option key={el.postLocation1} value={el.postLocation1}>
              {el.codeNm}
            </option>
          ))}
        </select>
        <select name="postLocation2" onChange={HandleChange}>
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

      <StMain>
        <StTitle> 뒤로 가기 </StTitle>
        <StTitle onClick={() => navigate("/post")}> 작성 하기 </StTitle>
      </StMain>

      <STPostCon>
        {initial
          ? data?.posts.map((posts) => {
              return (
                <PostListCard key={`main_${posts.postId}`} posts={posts} />
              );
            })
          : data?.posts
              .filter((post) => {
                if (!selected.postLocation2) {
                  return post.postLocation1 === selected.postLocation1;
                }
                return (
                  post.postLocation1 === selected.postLocation1 &&
                  post.postLocation2 === selected.postLocation2
                );
              })
              .map((posts) => {
                return (
                  <PostListCard key={`main_${posts.postId}`} posts={posts} />
                );
              })}
      </STPostCon>
    </>
  );
};

export default PostList;

const STPostCon = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const StMain = styled.div`
  width: 100%;
  height: 100px;
`;

const StTitle = styled.button`
  margin: 25px;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;
