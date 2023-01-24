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
  const [sortBy, setSortBy] = useState("comments");

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

  const handleSort = (e) => {
    setSortBy(e);
  };

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StSeleteBox>
        <StSelete>
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
          <StSearch
            type="text"
            placeholder="검색하기"
            onChange={handleSearchChange}
          />
        </StSelete>
      </StSeleteBox>
      <StOrder>
        <div>
          <StPost onClick={onPostHandler}> + </StPost>
        </div>
        <div>
          <StTrend onClick={() => handleSort("latest")}> 최신순 </StTrend>
          <StTrend onClick={() => handleSort("comments")}> 댓글순 </StTrend>
        </div>
      </StOrder>

      <STPostCon>
        {initial || !Object.keys(selected).length
          ? data?.posts
              .filter(
                (post) =>
                  post.title.indexOf(searchText) !== -1 ||
                  post.content.indexOf(searchText) !== -1
              )
              .sort((a, b) =>
                sortBy === "latest"
                  ? new Date(b.createdAt) - new Date(a.createdAt)
                  : (b.comments ? b.comments.length : 0) -
                    (a.comments ? a.comments.length : 0)
              )

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
              .filter(
                (post) =>
                  post.title.indexOf(searchText) !== -1 ||
                  post.content.indexOf(searchText) !== -1
              )
              .sort((a, b) =>
                sortBy === "latest"
                  ? new Date(b.createdAt) - new Date(a.createdAt)
                  : (b.comments ? b.comments.length : 0) -
                    (a.comments ? a.comments.length : 0)
              )
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

const StSeleteBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
  height: 50px;
`;

const StSeleteAll = styled.button`
  background-color: white;
  border: 2px solid powderblue;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const StSelete = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 40px;
  border-bottom: 3px solid #c4cbcd;
  padding: 0 0 6px 0;
`;

const StSeleteR = styled.select`
  border: 2px solid powderblue;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const StSeleteL = styled.select`
  border: 2px solid powderblue;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
`;

const StSearch = styled.input`
  border: 2px solid powderblue;
  width: 250px;
  height: 30px;
  border-radius: 10px;
`;

const STPostCon = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
`;

const StOrder = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
  margin-left: auto;
  margin-right: auto;
`;

const StPost = styled.button`
  font-size: 35px;
  width: 45px;
  height: 45px;
  border-radius: 23px;
  border: none;
  margin-top: 10px;
  background-color: #d9d9d9;
  cursor: pointer;
  :hover {
    background-color: #6688ab;
    transition: 0.3s;
  }
`;

const StTrend = styled.button`
  background-color: #f3f5f5;
  margin: 20px 10px 0 10px;
  font-size: 17px;
  border: none;
  cursor: pointer;
`;
