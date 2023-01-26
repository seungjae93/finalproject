import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getmypagePosts } from "../redux/api/mypageApi";

const MyCommunity = () => {
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

          {data?.myposts.map((posts) => {
            return (
              <StMyComm>
                <div className="comment_wrapper" key={`mypage_${posts.postId}`}>
                  <div className="time">
                    {new Date(posts.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="title">{posts.title}</div>
                  <div className="body">{posts.content}</div>
                </div>
              </StMyComm>
            );
          })}
        </StMyCommBox>
      </StCommBoxWrap>

      <StBottom>
        <div className="myInfo">내 정보</div>
        <div className="byebye">회원 탈퇴</div>
      </StBottom>
    </>
  );
};

export default MyCommunity;

const StCommBoxWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
  border-top: solid 1px #c4cbcd;
`;

const StMyCommBox = styled.div`
  width: 1254px;
  height: 650px;
  background-color: #ffffff;
  margin: auto;
`;

const StCommBoxTitle = styled.div`
  display: flex;
  .reple {
    font-size: 16px;
    font-weight: 800;
    padding-left: 110px;
    padding-top: 50px;
    padding-bottom: 40px;
  }
`;

const StMyComm = styled.div`
  border-top: 1px solid #c4cbcd;
  border-bottom: 0.5px solid #c4cbcd;
  width: 1000px;
  height: 100px;
  padding: 1%;
  margin: auto;

  .comment_wrapper {
    text-align: left;
  }

  .time {
    width: 150px;
    border: 1px solid red;
    margin-top: 40px;
    font-size: 15px;
  }
  .title {
    border: 1px solid blue;
    margin-left: 70px;
    font-size: 20px;
    font-weight: 600;
  }
  .body {
    border: 1px solid green;
    padding-top: 10px;
    margin-left: 250px;
    font-size: 18px;
    font-weight: 500;
  }
`;

const StBottom = styled.div`
  width: 1254px;
  height: 200px;
  background-color: #ffffff;
  border-top: 1px solid #c4cbcd;
  margin: auto;
  .myInfo {
    position: relative;
    font-weight: 600;
    top: 3vh;
    left: 15%;
  }
  .byebye {
    position: relative;
    top: 6vh;
    left: 15%;
  }
`;
