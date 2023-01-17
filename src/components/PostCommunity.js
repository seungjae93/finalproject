import React from "react";
import styled from "styled-components";

const PostCommunity = () => {
  return (
    <div>
      <CardWrapper>
        <ImageCarrier
          alt=""
          src="image"
          style={{ width: "320px", height: "190px" }}
        />
        <TitleCarrier> 제목 </TitleCarrier>
        <ContentCarrier> 내용 </ContentCarrier>
      </CardWrapper>
    </div>
  );
};

export default PostCommunity;

const CardWrapper = styled.div`
  background-color: white;
  width: 320px;
  height: 380px;
  border: 2px solid black;
  border-radius: 20px;
  margin: 100px 0 0 35px;
  text-align: center;
  z-index: 900px;
  box-shadow: 0px 1px 5px 1px #dddddd;
  :hover {
    box-shadow: 0px 5px 10px 1px #181818;
    transition: all 0.3s;
  }
`;

const ImageCarrier = styled.img`
  width: 320px;
  height: 200px;
  border: 0px solid black;
`;

const TitleCarrier = styled.span`
  font-size: 30px;
  font-style: bold;
`;

const ContentCarrier = styled.div``;
