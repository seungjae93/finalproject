import styled from "styled-components";

const ServeReviewModal = ({ setModalOpen, estateIdData }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  console.log(estateIdData);

  return (
    <ModalBackdrop>
      <StContainer>
        <StCloseBut onClick={closeModal}>X</StCloseBut>

        <StReviewBox>
          <div>
            <p> 이 집에는 3개의 후기가 있습니다. </p>
          </div>
          <StReview>
            <StScore>
              <div>별</div>

              <StAverage> 평균 점수 </StAverage>
              <div> / 5.0</div>
            </StScore>

            <div>
              <StDate>
                {/* {new Date(comments?.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}  */}
              </StDate>
            </div>
          </StReview>
        </StReviewBox>
      </StContainer>
    </ModalBackdrop>
  );
};
export default ServeReviewModal;

const ModalBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StContainer = styled.div`
  position: relative;
  display: flex;
  width: 25%;
  height: 100%;
  background-color: white;
  left: 670px;

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

const StCloseBut = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const StReviewBox = styled.div`
  margin: 30px 0 0 20px;
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
  font-weight: bold;
  color: rgb(129, 150, 8);
  margin-left: 5px;
`;

const StDate = styled.div`
  margin-right: 20px;
`;
