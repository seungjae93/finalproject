import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { getCommunity } from "../../redux/api/communityApi";
import { hangjungdong } from "../../components/Community/hangjungdong";
import PostListCard from "../../components/Community/PostListCard";
import { useInView } from "react-intersection-observer";

const PostList = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    postLocation1: "",
    postLocation2: "",
  });
  const { postLocation1, postLocation2 } = hangjungdong;

  const { ref, inView } = useInView({
    // ref가 화면에 나타나면 inView는 true, 아니면 false를 반환한다.
    threshold: 0.5,
    triggerOnce: true,
    //50%의 화면이 보여질 때 노출되었다고 판단
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [clickOrder, setClickOrder] = useState("");
  const [page, setPage] = useState(1);
  const [postList, setPostlist] = useState("");

  const { login } = useSelector((state) => state.user);

  const { error, isLoading, isError, refetch } = useQuery(
    ["posts", clickOrder, page],
    () => getCommunity(page, searchTerm, clickOrder, selected),
    {
      onSuccess: (data) => {
        page === 1
          ? setPostlist([...data.posts]) //data를 하나의 배열로 쌓아둔다
          : setPostlist([...postList, ...data.posts]); // 다음부터 차곡차곡
      },
    },
    {
      cacheTime: 20000, //20초
    }
  );

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const onPostHandler = () => {
    if (login === false) {
      alert("로그인을 해주세요");
    } else navigate("/post");
  };

  const throttledRefetch = useCallback(debounce(refetch, 200), []);

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    throttledRefetch({ searchTerm });
  }, [searchTerm, throttledRefetch, selected]);

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;
  console.log(postList);

  return (
    <>
      <StSeleteBox>
        <StSelete>
          <div>
            {/* <StSeleteAll onClick={() => onHandleAllView}>모든 지역</StSeleteAll> */}
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              throttledRefetch();
            }}
          />
        </StSelete>
      </StSeleteBox>

      <StOrder>
        <div>
          <StPost onClick={onPostHandler}> + </StPost>
        </div>
        <div>
          <StTrend onClick={() => setClickOrder("recent")}>최신순</StTrend>

          <StTrend onClick={() => setClickOrder("trend")}>댓글순</StTrend>
        </div>
      </StOrder>

      <STPostCon>
        {postList ? (
          postList?.map((posts) => {
            return <PostListCard key={`main_${postList}`} posts={posts} />;
          })
        ) : (
          <div>No data</div>
        )}
      </STPostCon>
      <div ref={ref} style={{ height: "100px" }}></div>
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

// const StSeleteAll = styled.button`
//   background-color: white;
//   border: 2px solid powderblue;
//   text-align: center;
//   font-size: 16px;
//   width: 180px;
//   height: 30px;
//   border-radius: 10px;
//   margin-right: 20px;
//   cursor: pointer;
// `;

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
