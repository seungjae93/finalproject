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
      <div>
        <StCommBoxWrap>
          <StMyCommBox>
            <StCommBoxTitle>
              <div className="reple">내가 남긴 글</div>
              <div className="reple">내가 남긴 댓글</div>
            </StCommBoxTitle>

            {data?.myposts.map((posts) => {
              return (
                <StMyComm>
                  <div key={`mypage_${posts.postId}`}>
                    <div className="time">{posts.createdAt}</div>
                    <div className="postId">번호:{posts.postId}</div>
                    <div className="title">게시글 제목:{posts.title}</div>
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

        <StSectionFooter>
          <img
            className="footerImg"
            src={require("../images/Group 481.jpg")}
            alt="button"
          />
        </StSectionFooter>
      </div>
    </>
  );
};

export default MyCommunity;

const StCommBoxWrap = styled.div`
  border-top: solid 1px #c4cbcd;
`;

const StMyCommBox = styled.div`
  margin: auto;
  max-width: 1920px;
  height: 80vh;
`;

const StCommBoxTitle = styled.div`
  display: flex;
  .reple {
    font-size: 16px;
    font-weight: 800;
    padding-right: 2%;
    position: relative;
    top: 5vh;
    left: 14%;
  }
`;

const StMyComm = styled.div`
  position: relative;
  top: 10vh;

  border-top: 1px solid #c4cbcd;
  border-bottom: 0.5px solid #c4cbcd;
  width: 70vw;
  height: 100px;
  padding: 1%;
  margin: auto;

  .time {
    position: relative;
    top: 5vh;
    font-size: 15px;
  }
  .postId {
    position: relative;
    top: 5vh;
    /* left: 20%; */
  }
  .title {
    position: relative;
    left: 25%;
    top: -3vh;
    font-size: 20px;
    font-weight: 600;
  }
`;

const StBottom = styled.div`
  max-width: 1920px;
  height: 200px;
  border-top: 1px solid #c4cbcd;
  position: relative;
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

const StSectionFooter = styled.div`
  max-width: 1920px;
  height: 300px;
  margin: auto;
  .footerImg {
    position: relative;
    max-width: 1920px;
    height: 205px;
  }
`;
