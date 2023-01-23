import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
import ServeReviewModal from "./ServeReviewModal";

const TotalReview = ({ estateIdData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const { data } = useQuery(["showReview", estateIdData], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_MAP_SERVER}/review/items/${estateIdData.estateId}`
    );

    const { data } = response.data;

    return data;
  });
  const estate = data?.estate;
  const estateInfoArr = data?.estateInfoArr;
  console.log(data);

  return (
    <>
      {/* {estateInfoArr?.map((el) => { */}
      <StModalContainer>
        <div>건물명 : {estate?.address_jibun}</div>
        <div>bugs:</div>
        <div>communication:</div>
        <div>floor_noise:</div>
        <div>mold:</div>
        <div>parking:</div>
        <div>safe:</div>
        <div>smell:</div>
        <div>town_noise:</div>
        <div>walls_noise:</div>
        <ReviewContainer>
          <ReviewBar point={3} />
          {[1, 2, 3, 4, 5, 6].map((value) => {
            return <ReviewPoint />;
          })}
        </ReviewContainer>
        <div>
          <button onClick={showModal}>모달 띄우기</button>
          {modalOpen && (
            <ServeReviewModal setModalOpen={setModalOpen} estateIdData={data} />
          )}
        </div>
      </StModalContainer>

      {/* })} */}
    </>
  );
};

export default TotalReview;

const StModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ReviewContainer = styled.div`
  height: 10px;
  width: 300px;
  background-color: #c4cbcd;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewPoint = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 20px;
  background-color: #b8d60b;
  z-index: 2;
`;

const ReviewBar = styled.div`
  height: 10px;
  width: 180px;
  width: ${({ point }) => (point ? `${(300 * point) / 5}` : 0)}px;
  background-color: #819608;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
`;
