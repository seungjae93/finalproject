import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

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
        <StCloseBut onClick={closeModal}>X</StCloseBut>

        <StTitle>
          {" "}
          이 집에는 {estateIdData?.reviewArr.length} 개의 후기가 있습니다.{" "}
        </StTitle>

        {estateIdData?.reviewArr.map((review) => {
          return (
            <StReviewBox
              onClick={() => openDetailModal(review.reviewId)}
              key={`map_${review.reviewId}`}
            >
              <StReview>
                <StScore>
                  <div>별</div>

                  <StAverage> {review.star} </StAverage>

                  <div> / 5.0</div>
                </StScore>

                <div>
                  <StDate>
                    {new Date(review?.updatedAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </StDate>
                </div>
              </StReview>

              {detailModal[review.reviewId] && (
                <>
                  <StDetailModal
                    ref={modalRef}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StMonthly>
                      보증금 : {review.deposit} / 월세 :{" "}
                      {review.monthly_payment}
                    </StMonthly>

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

                    <StGoodBadBox>
                      <StGoodBad>장점</StGoodBad>
                      <StContent> {review.good} </StContent>
                    </StGoodBadBox>

                    <StGoodBadBox>
                      <StGoodBad> 단점 </StGoodBad>
                      <StContent>{review.bad}</StContent>
                    </StGoodBadBox>

                    {imageModal && (
                      <ModalBackdrop>
                        <StimageDetail>
                          <StCloseButton onClick={DetailCloseModal}>
                            X
                          </StCloseButton>
                          <StDetailImg alt="" src={imageModal} />
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
export default ServeReviewModal;

const StContainer = styled.div`
  position: fixed;
  top: 95px;
  right: 0;
  z-index: 100;
  width: 20%;
  height: 100%;
  padding: 30px;
  justify-content: center;
  background-color: white;

  animation: fadeInRight 1s;
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const StTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const StCloseBut = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StReviewBox = styled.div`
  margin: 30px 0 0 0;
  width: 490px;
`;

const StReview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f5f5;
  padding-left: 20px;
  width: 390px;
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
`;

const StAverage = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: rgb(129, 150, 8);
  margin-left: 15px;
`;

const StDate = styled.div`
  margin-right: 30px;
`;

const StDetailModal = styled.div`
  background-color: white;
  position: absolute;
  border: 5px solid #f3f5f5;
  border-radius: 15px;
  margin-top: 5px;
  width: 405px;
  height: 600px;
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
`;

const StMonthly = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 365px;
  height: 40px;
  border-bottom: 5px solid #f3f5f5;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const StContents = styled.div`
  display: flex;
  padding: 20px;
  width: 370px;
  height: 90px;
`;

const StPictureOne = styled.img`
  width: 120px;
  height: 100px;
  margin: 3px;
  border-radius: 5px;
  background-color: powderblue;
  cursor: pointer;
`;

const StGoodBadBox = styled.div`
  border: 0px solid white;
  width: 370px;
  height: 150px;
  margin: 20px;
`;

const StGoodBad = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const StContent = styled.div`
  width: 370px;
  height: 120px;
  font-size: 13px;
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
  width: 500px;
  height: 400px;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`;

const StCloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StDetailImg = styled.img`
  width: 500px;
  height: 400px;
  border-radius: 10px;
`;
