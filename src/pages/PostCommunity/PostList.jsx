import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "../../redux/api/communityApi";
import { hangjungdong } from "../../components/Community/hangjungdong";
import PostListCard from "../../components/Community/PostListCard";

const PostList = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState({});
  const { postLocation1, postLocation2 } = hangjungdong;
  const [initial, setInitial] = useState(true);
  const [searchText, setSearchText] = useState("");

  const { login } = useSelector((state) => state.user);

  const { data, error, isLoading, isError } = useQuery(["posts"], getCommunity);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    setInitial(false);
  };

  const handleViewAll = () => {
    setSelected({});
    setInitial(true);
  };

  const onPostHandler = () => {
    if (login === false) {
      alert("로그인을 해주세요");
    } else navigate("/post");
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setInitial(false);
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StMain>
        <div>
          <StTitle> 뒤로 가기 </StTitle>
          <StTitle onClick={onPostHandler}> 작성 하기 </StTitle>
        </div>
        <StSearch
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </StMain>

      <StSeleteBox>
        <div>
          <StSeleteAll onClick={handleViewAll}> 모두보기 </StSeleteAll>
          <StSeleteR name="postLocation1" onChange={HandleChange}>
            <option value="">시,도 선택</option>
            {postLocation1.map((el) => (
              <option key={el.postLocation1} value={el.postLocation1}>
                {el.codeNm}
              </option>
            ))}
          </StSeleteR>
          <StSeleteL name="postLocation2" onChange={HandleChange}>
            <option value="">구,군 선택</option>
            {postLocation2
              .filter((el) => el.postLocation1 === selected.postLocation1)
              .map((el) => (
                <option key={el.postLocation2} value={el.codeNm}>
                  {el.codeNm}
                </option>
              ))}
          </StSeleteL>
        </div>
      </StSeleteBox>

      <STPostCon>
        {initial || !Object.keys(selected).length
          ? data?.posts
              .filter((post) => post.title.indexOf(searchText) !== -1)
              .map((posts) => {
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
              .filter((post) => post.title.indexOf(searchText) !== -1)
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
`;

const StSearch = styled.input`
  height: 50px;
  width: 200px;
`;

const StTitle = styled.button`
  margin: 25px;
  font-size: 30px;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

const StSeleteBox = styled.div`
  text-align: center;
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

const StSeleteAll = styled.button`
  background-color: white;
  border: 2px solid powderblue;
  text-align: center;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;
