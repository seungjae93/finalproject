import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getmypagePosts } from "../../redux/api/mypageApi";

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
      <StCommBoxWrap>
        <StMyCommBox>
          <StCommBoxTitle>
            <div className="reple">내가 남긴 글</div>
          </StCommBoxTitle>

          <StInnerBox>
            {data?.myposts.map((posts) => {
              return (
                <StMyComm>
                  <div
                    className="comment_wrapper"
                    key={`mypage_${posts.postId}`}
                  >
                    <div className="time">
                      {new Date(posts.createdAt).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <StMyComm2>
                      <button
                        className="title"
                        onClick={() => {
                          navigate(`/${posts.postId}`);
                        }}
                      >
                        {posts.title}
                      </button>
                      <div className="body">{posts.content}</div>
                    </StMyComm2>
                  </div>
                </StMyComm>
              );
            })}
          </StInnerBox>
        </StMyCommBox>
      </StCommBoxWrap>
    </>
  );
};

export default MyCommunity;

const StCommBoxWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
`;

const StMyCommBox = styled.div`
  width: 1254px;
  border-top: 1px solid #c4cbcd;
  background-color: #ffffff;
  margin: auto;
`;

const StInnerBox = styled.div`
  overflow-y: auto;
  padding-bottom: 50px;
`;

const StCommBoxTitle = styled.div`
  display: flex;
  .reple {
    font-size: 16px;
    font-weight: 800;
    padding: 50px 0 40px 110px;
  }
`;

const StMyComm = styled.div`
  border-top: 0.5px solid #c4cbcd;
  border-bottom: 0.2px solid #c4cbcd;
  width: 1000px;
  height: 100px;
  padding: 1%;
  margin: auto;

  .comment_wrapper {
    text-align: left;
    display: flex;
  }

  .time {
    width: 150px;
    margin-top: 40px;
    font-size: 15px;
  }
  .title {
    background-color: transparent;
    cursor: pointer;
    border: none;
    margin-left: 15px;
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
    margin-left: 15px;
    font-size: 18px;
    font-weight: 500;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }
`;

const StMyComm2 = styled.div`
  width: 1000px;
`;
