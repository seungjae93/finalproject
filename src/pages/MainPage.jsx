import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { CgChevronRight } from "react-icons/cg";
import Button from "../components/button/Button";
import mainPageCommunity from "../images/mainPageCommunity.webp";
import mainPageReview from "../images/mainPageReview.webp";
import mainPageMap from "../images/mainPageMap.webp";
import mainPageCenter from "../images/mainPageCenter.webp";
import mainPageSubImg1 from "../images/mainPageSubImg1.webp";
import mainPageSubImg2 from "../images/mainPageSubImg2.webp";
import mainPageSubImg3 from "../images/mainPageSubImg3.webp";

const MainPage = () => {
  const navigate = useNavigate();

  const onReviewPost = () => {
    if (localStorage.getItem("token") === null) {
      alert("로그인을 해주세요");
      navigate("/login");
    } else navigate("/review");
  };

  return (
    <>
      <StHomeContainer>
        <StTopImage>
          <img className="mainImg" src={mainPageCenter} alt="mainPageCenter" />
          <StTopBox>
            <div className="leftContent1">
              <div className="content1">이 집은 어떨까?</div>
            </div>
            <div className="content2">
              원룸,투룸,역세권 말고
              <br /> 진짜 살아봐야 아는 정보
            </div>
            <div className="content3">
              중개인도, 집주인도 알려주지 않는 꿀정보를 알아보세요.
            </div>
            <StTopButton>
              <Button.Primary
                size="large"
                fs="1.1rem"
                fw="600"
                onClick={() => {
                  navigate("/map");
                }}
              >
                후기 보러가기
              </Button.Primary>
            </StTopButton>
          </StTopBox>
        </StTopImage>
        <StCenterBox>
          <StCenterWrap>
            <div className="centerContent1">
              진짜 살아본 사람들의 <br /> 생생한 후기
            </div>
            <div className="centerContent2">
              당신이 알고싶은 진짜 집의 정보를 알려드립니다.
            </div>

            <Button.Primary
              size="large"
              fs="1.1rem"
              fw="600"
              onClick={() => {
                navigate("/map");
              }}
            >
              후기 보러가기
            </Button.Primary>

            <Button.Primary
              outlined
              size="large"
              fs="1.1rem"
              fw="600"
              onClick={onReviewPost}
            >
              후기 쓰러가기
            </Button.Primary>
          </StCenterWrap>
          <img src={mainPageSubImg1} alt="mainPageSubImg1" />
          <img src={mainPageSubImg2} alt="mainPageSubImg2" />
          <img src={mainPageSubImg3} alt="mainPageSubImg3" />
        </StCenterBox>
        <StBottomBox>
          <StBottomWrap>
            <img src={mainPageMap} alt="mainPageMap" />

            <StBottomContent>
              <div className="bottomContentTitle">지도로 보는 지역별 후기</div>
              <div className="bottomContent">
                <div className="bottomContentMargin">
                  지도를 통해 다양한 지역의 생활 후기를 알아볼 수 있습니다.
                </div>
                <div> 다양한 사람들의 살아본 이야기를 들어보세요.</div>
              </div>

              <div className="bottomContentBtnWrap">
                <button
                  className="bottomContentBtn"
                  onClick={() => {
                    navigate("/map");
                  }}
                >
                  바로가기
                  <CgChevronRight
                    style={{
                      color: "#819608",
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </button>
              </div>
            </StBottomContent>
          </StBottomWrap>
          <StBottomWrap>
            <img src={mainPageReview} alt="mainPageReview" />

            <StBottomContent>
              <div className="bottomContentTitle">
                꼼꼼하게 돌아볼 수 있는 후기 작성
              </div>
              <div className="bottomContent">
                <div className="bottomContentMargin">
                  나를 위한, 다음 거주자를 위한 후기를 작성해보세요.
                </div>
                <div>
                  섬세하게 나누어진 문항을 따라오면 꼼꼼하게 리뷰할 수 있습니다.
                </div>
              </div>

              <div className="bottomContentBtnWrap">
                <button className="bottomContentBtn" onClick={onReviewPost}>
                  바로가기
                  <CgChevronRight
                    style={{
                      color: "#819608",
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </button>
              </div>
            </StBottomContent>
          </StBottomWrap>
          <StBottomWrap>
            <img src={mainPageCommunity} alt="mainPageCommunity" />

            <StBottomContent>
              <div className="bottomContentTitle">
                지역 사람들간의 대화를 위한 커뮤니티
              </div>
              <div className="bottomContent">
                <div className="bottomContentMargin">
                  내 주변의 이웃들과 주거와 관련된 문제를 나누어요.
                </div>
                <div> 혼자서는 어려웠던 문제가 이웃들의 지혜로 풀립니다.</div>
              </div>

              <div className="bottomContentBtnWrap">
                <button
                  className="bottomContentBtn"
                  onClick={() => {
                    navigate("/list");
                  }}
                >
                  바로가기
                  <CgChevronRight
                    style={{
                      color: "#819608",
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </button>
              </div>
            </StBottomContent>
          </StBottomWrap>
        </StBottomBox>
        <StFooterBox>
          <StFooterWrap>
            <div className="footerContentTitle">
              이웃들과 주거 관련 문제를 논의해요.
            </div>
            <div className="footerContent">
              <div className="footerContentMargin">
                마음고생이 많은 법적 분쟁 부터 집안일을 도와줄 사소한 일상의
                팁까지, 이집은 사랑방에서 모두 모여앉아 이야기꽃을 피워요.
              </div>
              <div> 도란도란 이야기 하다보면 동네의 정을 느낄 수 있어요.</div>
            </div>
          </StFooterWrap>
          <StFooterBtn>
            <Button.Primary
              size="large"
              fs="1.1rem"
              fw="600"
              onClick={() => {
                navigate("/login");
              }}
            >
              간편가입하고 이야기 나누기
            </Button.Primary>
          </StFooterBtn>
        </StFooterBox>
      </StHomeContainer>
    </>
  );
};

export default MainPage;

//Home
const StHomeContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-width: 1280px;
  height: 100%;
  font-family: "Pretendard";
`;
const StTopImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .mainImg {
    width: 1254px;
    height: 550px;
  }
`;

const StTopBox = styled.div`
  padding-left: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  width: 480px;
  height: 310px;
  background-color: #ffffff;
  opacity: 75%;
  position: absolute;
  margin-top: 140px;
  margin-left: 650px;
  text-align: left;

  .content1 {
    margin-top: 15px;
    font-size: 17px;
    font-weight: 600;
    color: #737d81;
  }
  .content2 {
    font-size: 36px;
    font-weight: bold;
    line-height: 45px;
  }
  .content3 {
    font-size: 18px;
    font-weight: 600;
    color: #4b5054;
  }
`;

const StTopButton = styled.div`
  margin-left: 45px;
`;

//Review
const StCenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 1919px;
  height: 450px;
  gap: 30px;
`;
const StCenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .centerContent1 {
    width: 300px;
    font-size: 1.9rem;
    font-weight: bold;
    line-height: 40px;
  }
  .centerContent2 {
    font-size: 1rem;
  }
`;
const StBottomBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  gap: 20px;
  width: 100%;
`;
const StBottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 1192px;
  height: 380px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 15px;
`;
const StBottomContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 65%;
  gap: 20px;
  margin-left: 20px;

  .bottomContentTitle {
    font-size: 24px;
    font-weight: bold;
  }
  .bottomContent {
    font-size: 18px;
  }
  .bottomContentMargin {
    margin-bottom: 15px;
  }
  .bottomContentBtnWrap {
    display: flex;
    justify-content: flex-end;
  }
  .bottomContentBtn {
    display: inline;
    outline: none;
    margin-right: 20px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    color: #819608;
    background: none;
    cursor: pointer;
  }
`;

const StFooterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 300px;
  background-color: #d7dbdc;
  margin-top: 50px;
`;
const StFooterWrap = styled.div`
  width: 790px;
  height: 190px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  .footerContentTitle {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .footerContent {
    font-size: 1rem;
  }
  .footerContentMargin {
    margin-bottom: 10px;
  }
`;
const StFooterBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
