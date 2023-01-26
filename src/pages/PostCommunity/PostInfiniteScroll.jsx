import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getScrollCommunity } from "../../redux/api/communityApi";

const PostInfiniteScroll = () => {
  const { data, isLoading } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 0 }) => getScrollCommunity(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage + 1; // 다음 페이지를 호출할 때 사용 될 pageParam
      },
    }
  );

  if (isLoading) {
    return <div> 로딩중... </div>;
  }

  return <></>;
};

export default PostInfiniteScroll;
