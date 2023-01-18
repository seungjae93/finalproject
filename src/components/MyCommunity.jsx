import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getmypagePosts } from "../redux/api/mypageApi";

const MyCommunity = () => {
  const { data, error, isLoading, isError } = useQuery(
    ["community"],
    getmypagePosts
  );

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  console.log(data);

  return (
    <>
      <div>
        {data?.myposts.map((posts) => {
          return (
            <>
              <div key={`mypage_${posts.id}`}>
                <div>게시글 고유값:{posts.postId}</div>
                <div>게시글 제목:{posts.title}</div>
                <div>작성 시간:{posts.createdAt}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyCommunity;
