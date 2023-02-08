import React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import ImageDetailCarousel from "./ImageDetailCarousel";
import { CgClose, CgChevronDown } from "react-icons/cg";
import Star from "../../images/Star.svg";

const ServeReviewModal = ({ setModalOpen, estateIdData }) => {
  const [detailModal, setDetailModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetailModal = (reviewId) => {
    setIsModalOpen(!isModalOpen);
    setDetailModal((prevState) => {
      Object.keys(prevState).forEach((key) => (prevState[key] = false));
      return { ...prevState, [reviewId]: isModalOpen };
    });
    let handler;
    if (isModalOpen) {
      document.removeEventListener("mousedown", handler);
    } else {
      const handler = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setDetailModal({ ...detailModal, [reviewId]: false });
        }
      };
      document.addEventListener("mousedown", handler);
    }
  };

  const onImageModal = (imageUrl) => {
    setImageModal(imageUrl);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const DetailCloseModal = () => {
    setImageModal(false);
  };

  return (
    <>
      <StContainer>
        <CgClose
          style={{
            color: "737D81",
            position: "absolute",
            width: "25px",
            height: "25px",
            right: "10px",
            top: "10px",
          }}
          onClick={closeModal}
        />

        <StTitle>
          이 집에는 {estateIdData?.reviewArr.length} 개의 후기가 있습니다.
        </StTitle>

        {estateIdData?.reviewArr.map((review) => {
          return (
            <StReviewBox
              onClick={() => openDetailModal(review.reviewId)}
              key={`map_${review.reviewId}`}
            >
              <StReview>
                <StScore>
                  <img src={Star} alt="star" />

                  <StAverage> {review.star} </StAverage>

                  <div className="TotalFontSize"> / 5.0</div>
                </StScore>

                <div>
                  {new Date(review?.updatedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <div>
                  <CgChevronDown
                    style={{
                      color: "737D81",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
              </StReview>

              {detailModal[review.reviewId] && (
                <>
                  <StDetailModal
                    ref={modalRef}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StContents>
                      {review?.imageUrl.map((image) => (
                        <StPictureOne
                          key={`image_${image}`}
                          onClick={() => onImageModal(image)}
                          alt=""
                          src={image}
                        />
                      ))}
                    </StContents>

                    <StMonthly>
                      보증금 : {review.deposit} / 월세 :{" "}
                      {review.monthly_payment}
                    </StMonthly>

                    <StGoodBadContainer>
                      <StGoodBadBox>
                        <StGoodBad>장점</StGoodBad>
                        <StContent>{review.good}</StContent>
                      </StGoodBadBox>

                      <StGoodBadBox>
                        <StGoodBad>단점</StGoodBad>
                        <StContent>{review.bad} </StContent>
                      </StGoodBadBox>
                    </StGoodBadContainer>

                    {imageModal && (
                      <ModalBackdrop>
                        <StimageDetail>
                          <ImageDetailCarousel imageUrl={review.imageUrl} />
                          <CgClose
                            style={{
                              color: "2d2d2d",
                              position: "absolute",
                              width: "25px",
                              height: "25px",
                              right: "10px",
                              top: "10px",
                            }}
                            onClick={DetailCloseModal}
                          />
                        </StimageDetail>
                      </ModalBackdrop>
                    )}
                  </StDetailModal>
                </>
              )}
            </StReviewBox>
          );
        })}
      </StContainer>
    </>
  );
};
export default React.memo(ServeReviewModal);

const StContainer = styled.div`
  position: absolute;
  justify-content: center;
  top: 120px;
  width: 400px;
  height: 80.6vh;
  right: 0;
  z-index: 100;
  padding: 30px;
  background-color: white;

  animation: fadeInRight 0.6s;
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translate3d(0%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const StTitle = styled.div`
  font-weight: 500;
`;

const StReviewBox = styled.div`
  width: 400px;
`;

const StReview = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  height: 60px;
  .star {
    position: relative;
    left: 75%;
    top: -2.5vh;
  }
`;

const StScore = styled.div`
  display: flex;
  align-items: center;
  .TotalFontSize {
    color: #737d81;
    font-size: 20px;
  }
`;

const StAverage = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #819608;
  margin-left: 15px;
`;

const StDetailModal = styled.div`
  background-color: white;
  position: absolute;
  border-radius: 15px;
  margin-top: 5px;
  width: 420px;
  height: 50vh;
  animation: DetailModal 0.3s;
  @keyframes DetailModal {
    0% {
      opacity: 0;
      transform: translate3d(0, -5%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }
`;

const StMonthly = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;

const StContents = styled.div`
  margin: 20px 0px 30px 0px;
  display: flex;
  width: 400px;
  height: 120px;
  gap: 5px;
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }
`;

const StPictureOne = styled.img`
  width: 120px;
  height: 100px;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const StGoodBadContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StGoodBadBox = styled.div`
  width: 370px;
  height: 150px;
  margin: 20px;
`;

const StGoodBad = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #819608;
`;

const StContent = styled.div`
  padding: 4px;
  width: 370px;
  height: 120px;
  font-size: 0.9rem;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #ccc;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const StimageDetail = styled.div`
  width: 550px;
  height: 400px;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;
