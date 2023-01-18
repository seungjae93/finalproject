import React from "react";
import styled from "styled-components";

const MainPage = () => {
  return (
    <>
      <StBody>
        {/* Home */}
        <StSectionHome>
          <StMainImage src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&dl=patrick-perkins-3wylDrjxH-E-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb" />
          <StHomeBox>
            <StHomeBoxContent>
              <span>이 집은 어떨까?</span>
              <div>원룸,투룸,역세권 말고 진짜 살아봐야 아는 정보</div>
              <div>중개인도, 집주인도 알려주지 않는 꿀정보를 알아보세요</div>
              <img src={require("../images/Group 388.jpg")} alt="button" />
            </StHomeBoxContent>
          </StHomeBox>
        </StSectionHome>

        {/* Riview  */}
        <StSectionReview>
          <StReviewBox1>
            <div>
              진짜 살아본 사람들의 <br /> 생생한 후기
            </div>
            <p>당신이 알고싶은 진짜 집의 정보를 알려드립니다</p>
          </StReviewBox1>
          <StReviewBox2>
            <img
              className="aboutBtn"
              src={require("../images/Group 388.jpg")}
              alt="button"
            />
            <img
              className="aboutBtn"
              src={require("../images/Group 464.jpg")}
              alt="button"
            />
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
              <div className="go">바로가기 ></div>
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
              <div className="go">바로가기 ></div>
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
              <div className="go">바로가기 ></div>
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
          <img
            className="bottomBtn"
            src={require("../images/Group 477.jpg")}
            alt="button"
          />
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
  padding: 20px;
  padding-top: 150px;
  text-align: center;
`;

const StMainImage = styled.img`
  width: 1200px;
  height: 600px;
`;

const StHomeBox = styled.div`
  width: 30rem;
  height: 15rem;
  background-color: #ffffff;
  position: absolute;
  top: 70vh;
  left: 50%;
`;

const StHomeBoxContent = styled.div`
  position: relative;
  margin-top: 50px;
`;

const StSectionReview = styled.div`
  background-color: #f7fae7;
  margin: auto;
  max-width: 1920px;
  height: 400px;
  .aboutBtn {
    width: 230px;
    height: auto;
    display: block;
    margin-top: 15px;
  }
  .aboutImg {
    display: inline;
    margin-left: 25px;
  }
`;

const StReviewBox1 = styled.div`
  position: relative;
  top: 5vh;
  left: 10%;
`;

const StReviewBox2 = styled.div`
  position: relative;
  top: 10vh;
  left: 10%;
`;
const StReviewBox3 = styled.div`
  position: relative;
  top: -15vh;
  left: 34%;
`;

const StSectionDetail = styled.div`
  background-color: #f0f0f0;
  max-width: 1920px;
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
  left: 10%;

  .detailBoxImage {
    width: 500px;
    height: 300px;
    position: relative;
    top: 5vh;
    left: 8%;
  }
  .detailBoxContents {
    position: relative;
    top: -15vh;
    left: 55%;
  }
  .go {
    color: #819608;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    width: 70px;
    height: 26px;
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
  left: 10%;
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
    color: #819608;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    width: 70px;
    height: 26px;
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
  left: 10%;
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
    color: #819608;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;
    width: 70px;
    height: 26px;
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
