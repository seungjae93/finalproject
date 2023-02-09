import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
import ReviewInfoBar from "../../elements/ReviewInfoBar";
import ServeReviewModal from "./ServeReviewModal";
import dabangLogo from "../../images/dabangLogo.svg";
import zigbangLogo from "../../images/zigbangLogo.svg";

const TotalReview = ({ estateIdData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [estateInfoData, setEstateInfoData] = useState([]);
  const { data: showReview } = useQuery(
    ["showReview", estateIdData],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MAP_SERVER}/review/items/${estateIdData}`
      );
      const { data } = response.data;
      const { estateInfoArr } = data;
      setEstateInfoData([estateInfoArr]);
      return data;
    }
  );

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <StReviewContainer>
        <StAddressWrap>
          <div className="addressName">
            건물명
            <button className="detailModalBtn" onClick={showModal}>
              상세보기
            </button>
          </div>
          <div className="addressJibun">
            {showReview?.estate?.address_jibun}
          </div>
          <div className="detailModal">
            {modalOpen && (
              <ServeReviewModal
                setModalOpen={setModalOpen}
                estateIdData={showReview}
              />
            )}
          </div>
        </StAddressWrap>
        <div className="crawlInfo">
          <div className="crawlWrapper">
            <div className="crawlMarginLeft">
              <img src={dabangLogo} alt="dabangLogo" />
            </div>
            <div className="crawlMarginLeft">
              다방 이 집 매물보기 (준비중..)
            </div>
          </div>
          <div className="crawlWrapper">
            <div className="crawlMarginLeft">
              <img src={zigbangLogo} alt="zigbangLogo" />
            </div>
            <div className="crawlMarginLeft">
              직방 이 집 매물보기 (준비중..)
            </div>
          </div>
        </div>

        {estateInfoData &&
          estateInfoData?.map((el, index) => {
            return (
              <StModalContainer key={`map-total-${index}`}>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div>집주인이 문제를 잘 해결해주시나요?</div>
                    <div className="scoreWrap">
                      {el?.communication.toFixed(1)}점
                    </div>
                  </div>
                  <div>
                    <ReviewInfoBar
                      communication={el?.communication.toFixed(1)}
                    />
                  </div>
                  <div className="evalWrap">
                    <div>연락이 안되요</div>
                    <div>잘 해결해줘요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div>보안은 어떤가요?</div>
                    <div className="scoreWrap">{el?.safe.toFixed(1)}점</div>
                  </div>
                  <div>
                    <ReviewInfoBar safe={el?.safe.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>불안해요</div>
                    <div>안전해요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div>벌레가 나오나요?</div>
                    <div className="scoreWrap"> {el?.bug.toFixed(1)}점</div>
                  </div>
                  <div>
                    <ReviewInfoBar bug={el?.bug.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>많아요</div>
                    <div>없어요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div> 하수구 냄새가 나나요? </div>
                    <div className="scoreWrap"> {el?.smell.toFixed(1)}점</div>
                  </div>
                  <div>
                    <ReviewInfoBar smell={el?.smell.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>심해요</div>
                    <div>안나요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div> 벽간소음이 심한가요? </div>
                    <div className="scoreWrap">
                      {" "}
                      {el?.walls_noise.toFixed(1)}점
                    </div>
                  </div>
                  <div>
                    <ReviewInfoBar walls_noise={el?.walls_noise.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>심해요</div>
                    <div>조용해요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div>동네소음이 심한가요? </div>
                    <div className="scoreWrap">
                      {el?.town_noise.toFixed(1)}점
                    </div>
                  </div>
                  <div>
                    <ReviewInfoBar town_noise={el?.town_noise.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>심해요</div>
                    <div>조용해요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div> 결로/곰팡이가 생기나요?</div>
                    <div className="scoreWrap"> {el?.mold.toFixed(1)}점</div>
                  </div>
                  <div>
                    <ReviewInfoBar mold={el?.mold.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>잘생겨요</div>
                    <div>없어요</div>
                  </div>
                </div>
                <div className="totalWrap">
                  <div className="addressScoreWrap">
                    <div>주차가 편리한가요? </div>
                    <div className="scoreWrap"> {el?.parking.toFixed(1)}점</div>
                  </div>
                  <div>
                    <ReviewInfoBar parking={el?.parking.toFixed(1)} />
                  </div>
                  <div className="evalWrap">
                    <div>불편해요</div>
                    <div>편해요</div>
                  </div>
                </div>
              </StModalContainer>
            );
          })}
      </StReviewContainer>
    </>
  );
};

export default React.memo(TotalReview);

const StReviewContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 425px;
  height: 85vh;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }

  .crawlInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .crawlWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .crawlMarginLeft {
    margin-top: 20px;
    margin-left: 10px;
  }
`;

const StAddressWrap = styled.div`
  width: 400px;
  height: 100px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .detailModal {
    display: flex;
    justify-content: flex-end;
  }
  .detailModalBtn {
    border: 2px solid #819608;
    display: inline;
    outline: none;
    margin-right: 30px;
    border-radius: 10px;
    font-size: 1rem;
    line-height: 1.5;
    color: #819608;
    background: none;
    cursor: pointer;
  }
  .addressName {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .addressJibun {
    font-weight: 500;
  }
`;
const StModalContainer = styled.div`
  margin-top: 20px;
  width: 400px;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    font-size: 0.95rem;
    font-weight: 500;
  }
  .totalWrap {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
    border-bottom: 1px solid #d9d9d9;
  }
  .addressScoreWrap {
    display: flex;
    justify-content: space-between;
  }
  .scoreWrap {
    color: #aec90b;
    margin-right: 10px;
  }
  .evalWrap {
    display: flex;
    justify-content: space-between;

    div {
      color: #737d81;
      font-size: 0.8rem;
    }
  }
`;
