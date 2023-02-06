import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getmypagePosts } from "../../redux/api/reviewApi";

const MyCommunity = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery(
    ["community"],
    getmypagePosts
  );

  if (isLoading) return <h2> 로딩중 .. </h2>;
  if (isError) return <h2> Error : {error.toString()} </h2>;

  return (
    <>
      <StMyCommBox>
        <StInnerBox>
          <StCommBoxTitle>내가 남긴 글</StCommBoxTitle>

          {data?.myposts.map((posts) => {
            return (
              <StMyComm>
                <div className="comment_wrapper" key={`${posts.postId}`}>
                  <div className="time">
                    {new Date(posts?.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </div>
                  <div>
                    <button
                      className="title"
                      onClick={() => {
                        navigate(`/${posts.postId}`);
                      }}
                    >
                      {posts.title}
                    </button>
                    <div className="body">{posts.content}</div>
                  </div>
                </div>
              </StMyComm>
            );
          })}
        </StInnerBox>
        <div style={{ height: "40px" }}></div>
      </StMyCommBox>
    </>
  );
};

export default MyCommunity;

const StMyCommBox = styled.div`
  width: 1254px;
  border-top: 1px solid #c4cbcd;
  background-color: #ffffff;
  margin: auto;
`;

const StInnerBox = styled.div`
  width: 990px;
  margin: auto;
`;

const StCommBoxTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin: 30px 0 30px 0;
`;

const StMyComm = styled.div`
  border-top: 0.5px solid #c4cbcd;
  border-bottom: 0.2px solid #c4cbcd;
  width: 1000px;
  height: 100px;
  display: flex;
  align-items: center;

  .comment_wrapper {
    display: flex;
  }
  .time {
    display: flex;
    align-items: center;
    margin-left: 20px;
    width: 150px;
    font-size: 15px;
  }
  .title {
    background-color: transparent;
    cursor: pointer;
    border: none;
    font-size: 20px;
    font-weight: 600;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }
  .body {
    padding-top: 5px;
    font-size: 16px;
    line-height: normal;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }
`;
