import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getScrollCommunity } from "../../redux/api/communityApi";
import InfiniteScroll from "react-infinite-scroller";

const PostInfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery(
      "posts",
      ({ pageParam = 0 }) => getScrollCommunity(pageParam),
      //pageParam은 useInfiniteQuery가 현재 어떤 페이지에 있는지를
      //확인할 수 있는 파라미터 값
      {
        // params: {
        //   postId: pageParam,
        // },
        getNextPageParam: (lastPage) => {
          //다음 api를 요청할 때 사용될 pageParam값을 정한다.
          return lastPage.data.postId + 1;
        },
      }
    );

  const handleScroll = () => {
    // 페이지의 총 높이
    const scrollHeight = document.documentElement.scrollHeight;
    // 이미 스크롤된 보이지 않는 구간의 높이
    const scrollTop = document.documentElement.scrollTop;
    // 현재 보여지는 페이지의 높이
    const clientHeight = document.documentElement.clientHeight;
    // scrollTop(이전 높이) + clientHeight(현재 높이) 가 scrollHeight(총 높이) 보다 클 경우 === 최하단일 경우
    // fetchNextPage 함수 호출.
    if (scrollTop + clientHeight >= scrollHeight) return fetchNextPage();
  };

  useEffect(() => {
    // 스크롤 감지 이벤트를 연결
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 스크롤 함수 (handleScroll) 가 한번만 등록될 수 있도록 동작 후 제거.
      window.removeEventListener("scroll", handleScroll);
    };
  });

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map((posts) => {
          posts.resulus.map((posts) => {
            return (
              //리턴값
              map
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
};

export default PostInfiniteScroll;
