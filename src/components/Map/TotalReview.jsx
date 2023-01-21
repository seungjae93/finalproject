import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
import BarChart from "./BarChart";
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
        <BarChart />;
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
