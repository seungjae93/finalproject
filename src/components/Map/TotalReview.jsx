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

  console.log(data);
  return (
    <>
      <StReviewContainer>
        <StAddressWrap>
          <h3>건물명 </h3>
          <div>{data?.estate?.address_jibun}</div>
          <div className="detailModal">
            <button onClick={showModal}>모달 띄우기</button>
            {modalOpen && (
              <ServeReviewModal
                setModalOpen={setModalOpen}
                estateIdData={data}
              />
            )}
          </div>
        </StAddressWrap>
        {estateInfoData?.map((el) => {
          return (
            <StModalContainer>
              <div>
                집주인이 문제를 잘 해결해주시나요? {el.communication.toFixed(1)}
              </div>
              <ReviewInfoBar communication={el.communication.toFixed(1)} />
              <div>보안은 어떤가요? {el.safe.toFixed(1)}</div>
              <ReviewInfoBar safe={el.safe.toFixed(1)} />
              <div>벌레가 나오나요? {el.bug.toFixed(1)}</div>
              <ReviewInfoBar bug={el.bug.toFixed(1)} />
              <div>하수구 냄새가 나나요? {el.smell.toFixed(1)}</div>
              <ReviewInfoBar smell={el.smell.toFixed(1)} />
              <div>층간소음이 심한가요? {el.floor_noise.toFixed(1)}</div>
              <ReviewInfoBar floor_noise={el.floor_noise.toFixed(1)} />
              <div>벽간소음이 심한가요? {el.walls_noise.toFixed(1)}</div>
              <ReviewInfoBar walls_noise={el.walls_noise.toFixed(1)} />
              <div>동네소음이 심한가요? {el.town_noise.toFixed(1)}</div>
              <ReviewInfoBar town_noise={el.town_noise.toFixed(1)} />
              <div>결로/곰팡이가 생기나요? {el.mold.toFixed(1)}</div>
              <ReviewInfoBar mold={el.mold.toFixed(1)} />
              <div>주차가 편리한가요? {el.parking.toFixed(1)}</div>
              <ReviewInfoBar parking={el.parking.toFixed(1)} />
            </StModalContainer>
          );
        })}
      </StReviewContainer>
    </>
  );
};

export default TotalReview;

const StReviewContainer = styled.div`
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
`;

const StAddressWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .detailModal {
    justify-content: flex-end;
  }
`;
const StModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
