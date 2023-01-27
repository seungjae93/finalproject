import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const MainPage = () => {
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.user);

  const reviewHandler = () => {
    if (login === false) {
      alert("로그인을 해 주세요");
    } else navigate("/review");
  };

  return (
    <>
      <StBody>
        {/* Home */}
        <StSectionHome>
          <StMainImage>
            <img
              className="mainImg"
              src={require("../images/main.jpg")}
              alt="main"
            />
          </StMainImage>
          <StHomeBox>
            <StHomeBoxContent>
              <div className="content1">이 집은 어떨까?</div>
              <div className="content2">
                원룸,투룸,역세권 말고
                <br /> 진짜 살아봐야 아는 정보
              </div>
              <div className="content3">
                중개인도, 집주인도 알려주지 않는 꿀정보를 알아보세요.
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
              {/* 이 버튼은 왜 작동을 안하는가?????? */}
              <button
                className="aboutBtn1"
                onClick={() => {
                  navigate("/map");
                }}
              >
                후기 보러가기
              </button>

              <button
                className="aboutBtn2"
                onClick={() => {
                  navigate("/review");
                }}
              >
                후기 쓰러가기
              </button>
            </StReviewBox1>

            <StReviewBox2>
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
            </StReviewBox2>
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
              <div className="detailTitle">지도로 보는 지역별 후기</div>
              <div className="detailBody">
                지도를 통해 다양한 지역의 생활 후기를 알아볼 수 있습니다.
                <br /> 다양한 사람들의 살아본 이야기를 들어보세요.
              </div>

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
              <div className="detailTitle">
                꼼꼼하게 돌아볼 수 있는 후기 작성
              </div>
              <div className="detailBody">
                나를 위한, 다음 거주자를 위한 후기를 작성해보세요.
                <br /> 섬세하게 나누어진 문항을 따라오면 꼼꼼하게 리뷰할 수
                있습니다.
              </div>

              <button className="go" onClick={reviewHandler}>
                바로가기
              </button>
            </div>
          </StDetailBox2>

          <StDetailBox3>
            <img
              className="detailBoxImage"
              src={require("../images/Rectangle 1563.jpg")}
              alt="img3"
            />
            <div className="detailBoxContents">
              <div className="detailTitle">
                지역 사람들간의 대화를 위한 커뮤니티
              </div>
              <div className="detailBody">
                내 주변의 이웃들과 주거와 관련된 문제를 나누어요.
                <br /> 혼자서는 어려웠던 문제가 이웃들의 지혜로 풀립니다.
              </div>

              <button
                className="go"
                onClick={() => {
                  navigate("/list");
                }}
              >
                바로가기
              </button>
            </div>
          </StDetailBox3>
        </StSectionDetail>

        <StSectionBottom>
          <div className="bottomContents">
            <div className="bottomTitle">
              이웃들과 주거 관련 문제를 논의해요
            </div>
            <div className="bottomBody">
              마음고생이 많은 법적 분쟁 부터 집안일을 도와줄 사한 일상의 팁까지,
              이집은 사랑방에서 모두 모여앉아 이야기꽃을 피워요.
            </div>
            <div className="bottomBody">
              도란도란 이야기 하다보면 동네의 정을 느낄 수 있어요.
            </div>
          </div>
          <button
            className="bottomBtn"
            onClick={() => {
              navigate("/map");
            }}
          >
            간편가입하고 이야기 나누기
          </button>
        </StSectionBottom>

        <Footer />
      </StBody>
    </>
  );
};

export default MainPage;

const StBody = styled.body`
  font-family: "Open Sans", sans-serif;
  margin: 0;
`;

// Home
const StSectionHome = styled.section`
  max-width: 1920px;
  height: 550px;
  margin: auto;
  padding-left: 170px;
  text-align: center;
  display: flex;
`;

const StMainImage = styled.div`
  .mainImg {
    width: 1254px;
    height: 550px;
  }
`;

const StHomeBox = styled.div`
  width: 31rem;
  height: 18rem;
  background-color: #ffffff;
  opacity: 90%;
  position: absolute;
  margin-top: 110px;
  margin-left: 680px;
`;

const StHomeBoxContent = styled.div`
  margin-top: 10px;
  text-align: left;

  .content1 {
    font-size: 17px;
    color: #737d81;
    margin-top: 25px;
    margin-left: 60px;
  }
  .content2 {
    margin-top: 5px;
    margin-left: 60px;
    font-size: 36px;
    font-weight: bold;
  }
  .content3 {
    margin-top: 15px;
    margin-left: 60px;
    font-size: 18px;
    color: #4b5054;
  }
  .reviewBtn {
    margin-top: 25px;
    margin-left: 60px;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

//Review
const StSectionReview = styled.div`
  background-color: #f7fae7;
  max-width: 1920px;
  height: 450px;
  display: flex;

  .aboutImg {
    width: 250px;
    height: 257px;
    display: inline;
    margin-left: 25px;
  }
`;

const StReviewWrap = styled.div`
  margin-left: 50px;
  text-align: left;
`;

const StReviewBox1 = styled.div`
  padding-top: 70px;
  padding-left: 40px;
  width: 500px;
  height: 350px;

  .reviewContent1 {
    font-size: 32px;
    font-weight: bold;
    padding-bottom: 20px;
    padding-left: 80px;
  }
  .reviewContent2 {
    font-size: 20px;
    padding-bottom: 20px;
    padding-left: 80px;
  }
  .aboutBtn1 {
    background-color: #c1de0d;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 340px;
    height: 50px;
    margin-top: 15px;
    margin-left: 75px;
  }
  .aboutBtn2 {
    background-color: white;
    border: 2px solid #c1de0d;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    width: 340px;
    height: 50px;
    display: block;
    margin-top: 15px;
    margin-left: 75px;
  }
`;

const StReviewBox2 = styled.div`
  position: absolute;
  padding-left: 520px;
  top: 710px;
  display: flex;
`;

//Detail
const StSectionDetail = styled.div`
  background-color: #f0f0f0;
  max-width: 1920px;
  margin: auto;
  height: 1200px;
  align-items: center;
`;

const StDetailBox1 = styled.div`
  width: 1192px;
  height: 380px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-left: 150px;

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
    .detailTitle {
      font-size: 20px;
      font-weight: 600;
    }
    .detailBody {
      font-size: 17px;
      padding-top: 2%;
    }
  }
  .go {
    border: none;
    background-color: transparent;
    color: #819608;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    padding-top: 2.5%;
  }
`;

const StDetailBox2 = styled.div`
  width: 1192px;
  height: 380px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-left: 150px;

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
    .detailTitle {
      font-size: 20px;
      font-weight: 600;
    }
    .detailBody {
      font-size: 17px;
      padding-top: 2%;
    }
  }
  .go {
    border: none;
    background-color: transparent;
    color: #819608;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    padding-top: 2.5%;
  }
`;

const StDetailBox3 = styled.div`
  width: 1192px;
  height: 380px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-left: 150px;

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
    .detailTitle {
      font-size: 20px;
      font-weight: 600;
    }
    .detailBody {
      font-size: 17px;
      padding-top: 2%;
    }
  }
  .go {
    border: none;
    background-color: transparent;
    color: #819608;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    padding-top: 2.5%;
  }
`;

//Bottom
const StSectionBottom = styled.div`
  background-color: #d7dbdc;
  max-width: 1920px;
  height: 350px;
  margin: auto;
  margin-top: 5%;
  .bottomContents {
    padding-top: 60px;
    padding-left: 180px;
    .bottomTitle {
      font-size: 24px;
      font-weight: 600;
      padding-bottom: 1%;
    }
    .bottomBody {
      font-size: 19px;
      font-weight: 400;
    }
  }
  .bottomBtn {
    background-color: #c1de0d;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 360px;
    height: 50px;
    margin-top: 60px;
    margin-left: 630px;
  }
`;
