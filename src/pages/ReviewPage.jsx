import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../components/styles/GlobalStyle";
import { useNavigate } from "react-router";
import { useAddPost } from "../redux/api/reviewApi";
import Button from "../components/button/Button";
import useInputItem from "../hooks/useInputItem";
import { Radio } from "../components/Community/Radio";
import { KakaoAddress } from "../components/Community/KakaoAddress";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { input, onChangeHandler } = useInputItem();
  const [address, setAddress] = useState("");
  const [address_jibun, setJibunAddress] = useState("");
  const [image, setImage] = useState([]);
  const [openPostcode, setOpenPostcode] = useState(false);
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = window.URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    setShowImages(imageUrlLists);
  };

  const { mutate: addPost } = useAddPost();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    formData.append("address_jibun", address_jibun);
    const nameLengths = [
      "residence_type",
      "transaction_type",
      "deposit",
      "monthly_payment",
      "acreage",
      "communication",
      "bug",
      "smell",
      "floor_noise",
      "walls_noise",
      "town_noise",
      "mold",
      "parking",
      "safe",
      "good",
      "bad",
      "star",
    ];
    let empty = false;
    for (const nameLength of nameLengths) {
      if (input[nameLength].length === 0) {
        empty = true;
        break;
      }
    }
    if (empty) {
      alert("모든 항목을 입력해주세요!");
    } else {
      for (const nameLength in input) {
        formData.append(`${nameLength}`, input[nameLength]);
      }
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
      const review = formData;
      addPost(review);
      window.alert("후기가 등록 되었습니다!");
      navigate("/mypage");
    }
  };
  const openPostcodeHandler = () => {
    setOpenPostcode(!openPostcode);
  };
  const handle = {
    selectAddress: (data) => {
      setAddress(data.address + data.buildingName);
      setJibunAddress(inputValue(data));
    },
  };
  const inputValue = (data) => {
    if (data.jibunAddress === "") {
      return data.autoJibunAddress + data.buildingName;
    } else {
      return data.jibunAddress + data.buildingName;
    }
  };
  return (
    <>
      <GlobalStyle />
      <StReviewWrap>
        <StReviewBox>
          <StTitle>이집은 후기 작성하기</StTitle>
          <StTitle1>주소</StTitle1>
          <StButton onClick={openPostcodeHandler}>주소검색</StButton>
          <StContainer>
            <KakaoAddress
              openPostcode={openPostcode}
              handle={handle}
              address={address}
              address_jibun={address_jibun}
            />
            <StHomeSection>
              <StAddStyle> 주거 형태 </StAddStyle>
              <StRadioBtnWrap1>
                <div className="radioBtn">
                  <input
                    id="radio-1"
                    type="radio"
                    name="residence_type"
                    value="원룸"
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="radio-1">원룸</label>
                </div>
                <div className="radioBtn">
                  <input
                    id="radio-2"
                    type="radio"
                    name="residence_type"
                    value="투룸"
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="radio-2">투룸</label>
                </div>
              </StRadioBtnWrap1>
              <StBasic>
                <StBasicTitle>평수</StBasicTitle>
                <StHomeInput
                  type="text"
                  name="acreage"
                  value={input.acreage}
                  onChange={onChangeHandler}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                <StHomeUnit>평</StHomeUnit>
              </StBasic>
              <StRadioBtnWrap1>
                <div className="radioBtn">
                  <input
                    id="radio-3"
                    type="radio"
                    name="transaction_type"
                    value="월세"
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="radio-3">월세</label>
                </div>
                <div className="radioBtn">
                  <input
                    id="radio-4"
                    type="radio"
                    name="transaction_type"
                    value="전세"
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="radio-4">전세</label>
                </div>
              </StRadioBtnWrap1>
              <StBasic>
                <StBasicTitle>보증금</StBasicTitle>
                <StHomeInput
                  type="text"
                  name="deposit"
                  value={input.deposit}
                  onChange={onChangeHandler}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                <StHomeUnit>만원</StHomeUnit>
              </StBasic>
              <StBasic>
                <StBasicTitle>월세</StBasicTitle>
                <StHomeInput
                  type="text"
                  name="monthly_payment"
                  value={input.monthly_payment}
                  onChange={onChangeHandler}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                <StHomeUnit>만원</StHomeUnit>
              </StBasic>
            </StHomeSection>
            <StComment>
              <StCommentWrap>
                <StTitleComment>
                  Q1.집주인과의 원활한 소통이 가능했나요?
                </StTitleComment>
                <Radio
                  id={[5, 6, 7, 8, 9]}
                  name="communication"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>연락이 안돼요</span>
                  <span>보통</span>
                  <span>잘 해결해줘요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q2. 벌레가 많이 나오나요?</StTitleComment>
                <Radio
                  id={[10, 11, 12, 13, 14]}
                  name="bug"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>많이나와요</span>
                  <span>보통</span>
                  <span>안나와요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment> Q3. 하수구 냄새가 많이 나나요?</StTitleComment>
                <Radio
                  id={[15, 16, 17, 18, 19]}
                  name="smell"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>심하게나요</span>
                  <span>보통</span>
                  <span>나지않아요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q4.층간소음이 심한가요? </StTitleComment>
                <Radio
                  id={[20, 21, 22, 23, 24]}
                  name="floor_noise"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>시끄러워요</span>
                  <span>보통</span>
                  <span>조용해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q5 벽간 소음이 심한가요?</StTitleComment>
                <Radio
                  id={[25, 26, 27, 28, 29]}
                  name="walls_noise"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>시끄러워요</span>
                  <span>보통</span>
                  <span>조용해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q6.집 주변 환경이 조용한가요? </StTitleComment>
                <Radio
                  id={[30, 31, 32, 33, 34]}
                  name="town_noise"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>시끄러워요</span>
                  <span>보통</span>
                  <span>조용해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q7.결로, 곰팡이가 심한가요?</StTitleComment>
                <Radio
                  id={[35, 36, 37, 38, 39]}
                  name="mold"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>심해요</span>
                  <span>보통</span>
                  <span>없어요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q8.주차가 편한가요?</StTitleComment>
                <Radio
                  id={[40, 41, 42, 43, 44]}
                  name="parking"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>불편했어요</span>
                  <span>보통</span>
                  <span>편했어요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q9.보안이 잘 되어있나요?</StTitleComment>
                <Radio
                  id={[45, 46, 47, 48, 49]}
                  name="safe"
                  onChangeHandler={onChangeHandler}
                  values={[1, 2, 3, 4, 5]}
                />
                <StRadioBtnTitle>
                  <span>불안해요</span>
                  <span>보통</span>
                  <span>안전해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment> Q10. 이집의 장점을 적어주세요 </StTitleComment>
                <Sttextarea
                  name="good"
                  value={input.good}
                  onChange={onChangeHandler}
                  placeholder="장점을 자유롭게 적어 주세요"
                  cols="60"
                  rows="7"
                />
                <StTitleComment> Q11. 이집의 단점을 적어주세요 </StTitleComment>
                <Sttextarea
                  name="bad"
                  value={input.bad}
                  onChange={onChangeHandler}
                  placeholder="단점을 자유롭게 적어 주세요"
                  cols="60"
                  rows="7"
                />
              </StCommentWrap>
            </StComment>
            <StPicture>
              <StTitleComment2>Q12. 이집의 사진을 추가해주세요</StTitleComment2>
              <StCommentAdd>
                (청결도, 컨디션 등을 확인할 수 있는 사진)
              </StCommentAdd>
              <StUpload htmlFor="file"> 사진 업로드 </StUpload>
              <input
                type="file"
                id="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  setImage([...e.target.files]);
                  handleAddImages(e);
                }}
                style={{ display: "none" }}
              />
              <StImageGruop>
                {showImages.map((image, id) => (
                  <StImageWrap key={id}>
                    <StyledImage src={image} alt={`${image}-${id}`} />
                  </StImageWrap>
                ))}
              </StImageGruop>
            </StPicture>

            <StCommentWrap>
              <StTitleComment3>
                Q13.이 집의 종합적인 만족도를 별점으로 표현해 주세요
              </StTitleComment3>
              <StSelectStar name="star" onChange={onChangeHandler}>
                <option value="">별점을 선택해 주세요</option>
                <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              </StSelectStar>
            </StCommentWrap>
            <StBut>
              <Button.Primary
                size="large"
                fs="20px"
                fw="600"
                onClick={onSubmitHandler}
              >
                작성완료
              </Button.Primary>
            </StBut>
          </StContainer>
        </StReviewBox>
      </StReviewWrap>
    </>
  );
};

export default ReviewPage;

const StReviewWrap = styled.div`
  max-width: 1920px;
  background-color: #f3f5f5;
`;

const StReviewBox = styled.div`
  width: 1252px;
  background-color: #ffffff;
  margin: auto;
`;
const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top: 50px;
`;

const StTitle1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 10px;
  padding-top: 70px;
`;

const StButton = styled.button`
  position: absolute;
  top: 296px;
  margin-left: 800px;
  width: 120px;
  height: 41px;
  background-color: #c4cbcd;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  :hover {
    background-color: #c2de0d;
    transition: 0.3s;
  }
`;

const StBasic = styled.div`
  width: 330px;
  padding-top: 15px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StBasicTitle = styled.div`
  font-size: 16px;
  margin-right: 20px;
`;

const StHomeInput = styled.input`
  width: 140px;
  height: 25px;
  border: 2px solid #c4cbcd;
  border-radius: 5px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const StHomeUnit = styled.div`
  font-size: 15px;
  margin-left: 15px;
`;

const StHomeSection = styled.div`
  display: block;
  width: 330px;
  text-align: center;
`;

const StAddStyle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const StRadioBtnWrap1 = styled.div`
  padding-bottom: 30px;
  padding-top: 30px;
  display: flex;

  .radioBtn {
    font-size: 17px;
    width: 150px;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 0 10px 0 10px;
  }
  .radioBtn input[type="radio"] {
    display: none;
  }
  .radioBtn label {
    display: block;
    border-radius: 8px;
    margin: 0 auto;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }

  /* hover */
  .radioBtn input[type="radio"]:hover + label {
    background: #c2de0d;
    color: #fff;
  }
  /* Checked */
  .radioBtn input[type="radio"]:checked + label {
    background: #c2de0d;
    color: #fff;
  }
  /* Disabled */
  .radioBtn input[type="radio"] + label {
    border: 2px solid #c4cbcd;
  }
`;

const StComment = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const StCommentWrap = styled.div`
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
`;

const StTitleComment = styled.div`
  margin: 10% 0 5% 0;
  font-size: 20px;
  font-weight: 600;
`;

const StRadioBtnTitle = styled.div`
  display: flex;
  margin-left: 50px;
  padding-top: 10px;
  font-size: 13px;
  text-align: center;
  justify-content: space-between;
  width: 380px;
`;

const Sttextarea = styled.textarea`
  border: 1px solid gray;
  border-radius: 5px;
  resize: none;
  ::placeholder {
    color: gray;
  }
`;

const StTitleComment2 = styled.div`
  margin: 10% 0 0 0;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const StTitleComment3 = styled.div`
  margin: 10% 0 0 0;
  padding-bottom: 40px;
  font-size: 20px;
  font-weight: 600;
`;

const StCommentAdd = styled.div`
  font-size: 15px;
  margin-bottom: 45px;
`;

const StPicture = styled.div`
  text-align: center;
  margin: 40px;
`;

const StImageGruop = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

const StImageWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin: auto;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 180px;
  background-color: transparent;
  margin-top: 30px;
  padding: 0 15px 0 15px;
`;

const StUpload = styled.label`
  width: 100px;
  padding: 12px 50px;
  border: 2px solid #c4cbcd;
  border-radius: 10px;
  background-color: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
  :hover {
    background-color: #c2de0d;
  }
`;

const StSelectStar = styled.select`
  text-align: center;
  width: 180px;
  height: 38px;
  margin-bottom: 100px;
  border: 2px solid #c4cbcd;
  border-radius: 10px;
  color: black;
`;

const StBut = styled.div`
  border: none;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 150px;
`;
