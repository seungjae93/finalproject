import React, { useState, useEffect, useCallback } from "react";
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
    //API요청을 중복이 아닌 한번만 발생할 수 있게
    //50%의 화면이 보여질 때 노출되었다고 판단
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [clickOrder, setClickOrder] = useState("");
  const [page, setPage] = useState(1);
  const [postList, setPostlist] = useState([]);

  const { login } = useSelector((state) => state.user);

  const { data, error, isLoading, isError, refetch } = useQuery(
    ["posts", clickOrder],
    () => getCommunity(page, searchTerm, clickOrder, selected),
    {
      onSuccess: (data) => {
        console.log(data);
        page === 1
          ? setPostlist([...data.posts])
          : setPostlist([...postList, ...data.posts]);
      },
    }
  );
  //데이터 베이스에 요청이 없으면 막는다.
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
    if (inView && data?.posts?.length === 24) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    throttledRefetch();
  }, [selected]);

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

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
          <StTrend onClick={() => setClickOrder("recent")}>최신순</StTrend>

          <StTrend onClick={() => setClickOrder("trend")}>댓글순</StTrend>
        </div>
        <div>
          <StPost onClick={onPostHandler}> 글쓰기 </StPost>
        </div>
      </StOrder>

      <STPostCon>
        {postList &&
          postList?.map((posts) => {
            return <PostListCard key={`main_${posts.postId}`} posts={posts} />;
          })}
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
  width: 1250px;
  height: 40px;
  border-bottom: 3px solid #c4cbcd;
  padding: 0 0 6px 0;
`;

const StSeleteR = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const StSeleteL = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
`;

const StSearch = styled.input`
  border: 2px solid #a6b2b9;
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
  width: 1250px;
`;

const StOrder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1150px;
  margin-left: auto;
  margin-right: auto;
`;

const StTrend = styled.button`
  background-color: #f3f5f5;
  margin: 10px 10px 0 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const StPost = styled.button`
  font-size: 13px;
  width: 60px;
  height: 30px;
  border: 1px solid #a6b2b9;
  border-radius: 5px;
  margin-top: 10px;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #a8c4e1;
    transition: 0.2s;
  }
`;
