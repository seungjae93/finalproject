import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { hangjungdong } from "../../components/community/hangjungdong";
import PostListCard from "../../components/community/PostListCard";
import { debounce } from "lodash";
import { useInView } from "react-intersection-observer";
import { getCommunity } from "../../redux/api/communityApi";
import InfiniteScroll from "react-infinite-scroller";
import { SeletedOne } from "../../components/community/Selected";
import Button from "../../components/button/Button";

const PostList = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    postLocation1: "",
    postLocation2: "",
  });
  const { postLocation1, postLocation2 } = hangjungdong;
  const [showAll, setShowAll] = useState(false);

  const [search, setSearch] = useState("");
  const [clickOrder, setClickOrder] = useState("");

  const { ref, inView } = useInView({
    // ref가 화면에 나타나면 inView는 true, 아니면 false를 반환한다.
    threshold: 0.9,
    triggerOnce: true,
    //API요청을 중복이 아닌 한번만 발생할 수 있게
  });

  const {
    data,
    refetch,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["posts", clickOrder],
    ({ pageParam = 1 }) =>
      getCommunity(pageParam, clickOrder, selected, search),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
      //API 에 요청할 때 사용될 pageParam 값을 정할 수 있다.
    }
  );
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };
  const onPostHandler = () => {
    if (localStorage.getItem("token") === null) {
      alert("로그인을 해주세요");
      navigate("/login");
    } else navigate("/post");
  };
  const onHandleAllView = () => {
    setShowAll(!showAll);
    setSelected({
      postLocation1: "",
      postLocation2: "",
    });
  };

  const throttledRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 200),
    []
  );
  //useCallback으로 디바운스 함수의 재생성을 막아야한다
  //text를 칠때마다 state값이 바뀌면서, 컴포넌트 리렌더링을 유발하는데,
  //리렌더링 될때마다 _debounce함수가 재생성 되기 때문

  useEffect(() => {
    throttledRefetch();
  }, [throttledRefetch, selected, showAll, clickOrder]);

  useEffect(() => {
    if (inView) {
    }
  }, [inView]);

  if (isLoading) return <h2> 잠시만 기다려 주세요 </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;
  return (
    <>
      <SeletedOne
        onHandleAllView={onHandleAllView}
        HandleChange={HandleChange}
        postLocation1={postLocation1}
        postLocation2={postLocation2}
        selected={selected}
        search={search}
        setSearch={setSearch}
        throttledRefetch={throttledRefetch}
      />

      <StOrder>
        <div>
          <StTrend onClick={() => setClickOrder("recent")}>최신순</StTrend>
          <StTrend onClick={() => setClickOrder("trend")}>댓글순</StTrend>
        </div>
        <div>
          <Button.Community
            gap={10}
            style={{ border: " 1px solid #a6b2b9" }}
            onClick={onPostHandler}
          >
            글쓰기
          </Button.Community>
        </div>
      </StOrder>
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {/* hasNextPage 다음 또는 이전 페이지가 있는지 확인 하는 속성
      fetchNextPage 다음 페이지를 가져오기 위한 반환 속성  */}
        <STPostCon>
          {data?.pages[0]?.posts.length !== 0 ? (
            data?.pages?.map((page) => {
              return page?.posts?.map((posts) => {
                return (
                  <PostListCard key={`main_${posts.postId}`} posts={posts} />
                );
              });
            })
          ) : (
            <>
              <StNonePost>해당 지역 게시물이 존재하지 않습니다.</StNonePost>
            </>
          )}
        </STPostCon>
      </InfiniteScroll>

      <div style={{ height: "100px" }} ref={ref}></div>
    </>
  );
};

export default PostList;

const STPostCon = styled.div`
  display: flex;
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

const StNonePost = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  font-size: 25px;
  font-weight: bold;
  margin-top: 150px;
`;
