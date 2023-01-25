import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
import ReviewInfoBar from "../../elements/ReviewInfoBar";
import ServeReviewModal from "./ServeReviewModal";

const TotalReview = ({ estateIdData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [estateInfoData, setEstateInfoData] = useState([]);
  const { data } = useQuery(["showReview", estateIdData], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_MAP_SERVER}/review/items/${estateIdData}`
    );
    const { data } = response.data;
    const { estateInfoArr } = data;
    setEstateInfoData([estateInfoArr]);
    return data;
  });

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div>건물명 : {data?.estate?.address_jibun} </div>
      {estateInfoData?.map((el) => {
        return (
          <StModalContainer>
            <div>집주인이 문제를 잘 해결해주시나요? {el.communication}</div>
            <ReviewInfoBar communication={el.communication} />
            <div>보안은 어떤가요? {el.safe}</div>
            <ReviewInfoBar safe={el.safe} />
            <div>벌레가 나오나요? {el.bug}</div>
            <ReviewInfoBar bug={el.bug} />
            <div>하수구 냄새가 나나요? {el.smell}</div>
            <ReviewInfoBar smell={el.smell} />
            <div>층간소음이 심한가요? {el.floor_noise}</div>
            <ReviewInfoBar floor_noise={el.floor_noise} />
            <div>벽간소음이 심한가요? {el.walls_noise}</div>
            <ReviewInfoBar walls_noise={el.walls_noise} />
            <div>동네소음이 심한가요? {el.town_noise}</div>
            <ReviewInfoBar town_noise={el.town_noise} />
            <div>결로/곰팡이가 생기나요? {el.mold}</div>
            <ReviewInfoBar mold={el.mold} />
            <div>주차가 편리한가요? {el.parking}</div>
            <ReviewInfoBar parking={el.parking} />
          </StModalContainer>
        );
      })}

      <div>
        <button onClick={showModal}>모달 띄우기</button>
        {modalOpen && (
          <ServeReviewModal setModalOpen={setModalOpen} estateIdData={data} />
        )}
      </div>
    </>
  );
};

export default TotalReview;

const StModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
