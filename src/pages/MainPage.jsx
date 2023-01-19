import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <StBody>
        {/* Home */}
        <StSectionHome>
          <StMainImage src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&dl=patrick-perkins-3wylDrjxH-E-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb" />
          <StHomeBox>
            <StHomeBoxContent>
              <div className="content1">이 집은 어떨까?</div>
              <div className="content2">
                원룸,투룸,역세권 말고
                <br /> 진짜 살아봐야 아는 정보
              </div>
              <div className="content3">
                중개인도, 집주인도 알려주지 않는 꿀정보를 알아보세요
              </div>
              <button
                className="reviewBtn"
                onClick={() => {
                  navigate("/map");
                }}
              >
                <img src={require("../images/Group 388.jpg")} alt="button" />
              </button>
            </StHomeBoxContent>
          </StHomeBox>
        </StSectionHome>

        {/* Riview  */}
        <StSectionReview>
          <StReviewWrap>
            <StReviewBox1>
              <div className="reviewContent1">
                진짜 살아본 사람들의 <br /> 생생한 후기
              </div>
              <div className="reviewContent2">
                당신이 알고싶은 진짜 집의 정보를 알려드립니다.
              </div>
            </StReviewBox1>
            <StReviewBox2>
              <button
                className="aboutBtn"
                onClick={() => {
                  navigate("/map");
                }}
              >
                <img src={require("../images/Group 388.jpg")} alt="button" />
              </button>
              <button
                className="aboutBtn"
                onClick={() => {
                  navigate("/review");
                }}
              >
                <img src={require("../images/Group 464.jpg")} alt="button" />
              </button>
            </StReviewBox2>

            <StReviewBox3>
              <img
                className="aboutImg"
                src={require("../images/Group 421.jpg")}
                alt="imgbox1"
              />
              <img
                className="aboutImg"
                src={require("../images/Group 422.jpg")}
                alt="imgbox2"
              />
              <img
                className="aboutImg"
                src={require("../images/Group 423.jpg")}
                alt="imgbox3"
              />
            </StReviewBox3>
          </StReviewWrap>
        </StSectionReview>

        {/* Detail */}
        <StSectionDetail>
          <StDetailBox1>
            <img
              className="detailBoxImage"
              src={require("../images/Rectangle 1561.jpg")}
              alt="img1"
            />
            <div className="detailBoxContents">
              <p>지도로 보는 지역별 후기</p>
              <p>
                지도를 통해 다양한 지역의 생활 후기를 알아볼 수 있습니다.
                <br /> 다양한 사람들의 살아본 이야기를 들어보세요
              </p>

              <button
                className="go"
                onClick={() => {
                  navigate("/map");
                }}
              >
                바로가기
              </button>
            </div>
          </StDetailBox1>

          <StDetailBox2>
            <img
              className="detailBoxImage"
              src={require("../images/Rectangle 1562.jpg")}
              alt="img2"
            />
            <div className="detailBoxContents">
              <p>꼼꼼하게 돌아볼 수 있는 후기 작성</p>
              <p>
                나를 위한, 다음 거주자를 위한 후기를 작성해보세요.
                <br /> 섬세하게 나누어진 문항을 따라오면 꼼꼼하게 리뷰할 수
                있습니다.
              </p>

              <div
                className="go"
                onClick={() => {
                  navigate("/review");
                }}
              >
                바로가기
              </div>
            </div>
          </StDetailBox2>

          <StDetailBox3>
            <img
              className="detailBoxImage"
              src={require("../images/Rectangle 1563.jpg")}
              alt="img3"
            />
            <div className="detailBoxContents">
              <p>지역 사람들간의 대화를 위한 커뮤니티</p>
              <p>
                내 주변의 이웃들과 주거와 관련된 문제를 나누어요.
                <br /> 혼자서는 어려웠던 문제가 이웃들의 지혜로 풀립니다.
              </p>

              <div
                className="go"
                onClick={() => {
                  navigate("/list");
                }}
              >
                바로가기
              </div>
            </div>
          </StDetailBox3>
        </StSectionDetail>

        <StSectionBottom>
          <div className="bottomContents">
            <div>이웃들과 주거 관련 문제를 논의해요</div>
            <p>
              마음고생이 많은 법적 분쟁 부터 집안일을 도와줄 사한 일상의 팁까지,
              이집은 사랑방에서 모두 모여앉아 이야기꽃을 피워요
            </p>
            <p>도란도란 이야기 하다보면 동네의 정을 느낄 수 있어요.</p>
          </div>
          <button
            className="bottomBtn"
            onClick={() => {
              navigate("/login");
            }}
          >
            <img src={require("../images/Group 477.jpg")} alt="button" />
          </button>
        </StSectionBottom>

        <StSectionFooter>
          <img
            className="footerImg"
            src={require("../images/Group 481.jpg")}
            alt="button"
          />
        </StSectionFooter>
      </StBody>
    </>
  );
};

export default MainPage;

const StBody = styled.body`
  font-family: "Open Sans", sans-serif;
  margin: 0;
`;

const StSectionHome = styled.section`
  max-width: 1920px;
  margin: auto;
  padding-top: 150px;
  text-align: center;
`;

const StMainImage = styled.img`
  position: relative;
  top: -10vh;
  width: 1400px;
  height: 800px;
`;

const StHomeBox = styled.div`
  width: 36rem;
  height: 23rem;
  background-color: #ffffff;
  opacity: 90%;
  position: absolute;
  top: 420px;
  left: 50%;
`;

const StHomeBoxContent = styled.div`
  margin-top: 50px;
  text-align: left;
  .content1 {
    font-size: 20px;
    position: relative;
    top: 2vh;
    left: 3vw;
  }
  .content2 {
    position: relative;
    top: 3vh;
    left: 3vw;
    font-size: 38px;
    font-weight: bold;
  }
  .content3 {
    font-size: 22px;
    position: relative;
    top: 5vh;
    left: 3vw;
  }
  .reviewBtn {
    cursor: pointer;
    position: relative;
    top: 8vh;
    left: 6vw;
    border: none;
    background-color: transparent;
  }
`;

const StSectionReview = styled.div`
  background-color: #f7fae7;
  margin: auto;
  max-width: 1920px;
  height: 400px;

  .aboutBtn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 80px;
    display: block;
    margin-top: 15px;
  }
  .aboutImg {
    width: 250px;
    height: 257px;
    display: inline;
    margin-left: 25px;
  }
`;

const StReviewWrap = styled.div`
  margin-left: 10%;
`;

const StReviewBox1 = styled.div`
  position: relative;
  top: 5vh;
  left: 10%;
  .reviewContent1 {
    font-size: 32px;
    font-weight: bold;
  }
  .reviewContent2 {
    position: relative;
    top: 30px;
    font-size: 20px;
  }
`;

const StReviewBox2 = styled.div`
  position: relative;
  top: 10vh;
  left: 10%;
`;
const StReviewBox3 = styled.div`
  position: relative;
  top: -12vh;
  left: 34%;
`;

const StSectionDetail = styled.div`
  background-color: #f0f0f0;
  max-width: 1920px;
  margin: auto;
  height: 1200px;
  align-items: center;
`;

const StDetailBox1 = styled.div`
  position: relative;
  width: 1192px;
  height: 380px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  left: 15%;

  .detailBoxImage {
    width: 500px;
    height: 300px;
    position: relative;
    top: 5vh;
    left: 10%;
  }
  .detailBoxContents {
    position: relative;
    top: -15vh;
    left: 55%;
  }
  .go {
    border: none;
    background-color: transparent;
    color: #819608;
    cursor: pointer;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 16px;
    width: 80px;
    height: 20px;
  }
`;

const StDetailBox2 = styled.div`
  position: relative;
  width: 1192px;
  height: 380px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  left: 15%;

  .detailBoxImage {
    width: 500px;
    height: 300px;
    position: relative;
    top: 5vh;
    left: 10%;
  }
  .detailBoxContents {
    position: relative;
    top: -13vh;
    left: 55%;
  }
  .go {
    border: none;
    background-color: transparent;
    color: #819608;
    cursor: pointer;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 16px;
    width: 80px;
    height: 20px;
  }
`;

const StDetailBox3 = styled.div`
  position: relative;
  width: 1192px;
  height: 380px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  left: 15%;

  .detailBoxImage {
    width: 500px;
    height: 300px;
    position: relative;
    top: 5vh;
    left: 10%;
  }
  .detailBoxContents {
    position: relative;
    top: -15vh;
    left: 55%;
  }
  .go {
    border: none;
    background-color: transparent;
    color: #819608;
    cursor: pointer;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 16px;
    width: 80px;
    height: 20px;
  }
`;

const StSectionBottom = styled.div`
  background-color: #d7dbdc;
  max-width: 1920px;
  height: 400px;
  margin: auto;
  .bottomContents {
    position: relative;
    top: 10vh;
    left: 10%;
  }
  .bottomBtn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: relative;
    top: 15vh;
    left: 40%;
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
