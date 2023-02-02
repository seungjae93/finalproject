import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../components/styles/GlobalStyle";
import { useNavigate } from "react-router";
import { useAddPost } from "../redux/api/reviewApi";
import Button from "../components/button/Button";
import useInputItem from "../hooks/useInputItem";
import DaumPostcode from "react-daum-postcode";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { input, onChangeHandler } = useInputItem();
  const [address, setAddress] = useState("");
  const [address_jibun, setJibunAddress] = useState("");
  const [image, setImage] = useState([]);
  const [openPostcode, setOpenPostcode] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const { mutate: addPost } = useAddPost();

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    formData.append("address_jibun", address_jibun);

    if (input.residence_type.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.transaction_type.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.deposit.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.monthly_payment.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.acreage.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.communication.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.bug.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.smell.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.floor_noise.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.walls_noise.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.town_noise.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.mold.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.parking.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.safe.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.good.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.bad.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else if (input.star.length === 0) {
      alert("모든 항목을 입력해주세요!");
    } else {
      for (let key of formData.keys()) {
        // console.log(key);
      }
      for (let value of formData.values()) {
        // console.log(value);
      }

      for (const property in input) {
        formData.append(`${property}`, input[property]);
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
    // 주소 선택 이벤트
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
            {openPostcode && (
              <StPostbox>
                <DaumPostcode
                  style={{ width: "400px", height: "500px" }}
                  onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="" // 기본적으로 입력되어있는 검색어
                />
              </StPostbox>
            )}
            <StAddressWrap>
              <StAddress>
                <StInt
                  type="text"
                  name="address"
                  value={address}
                  onChange={() => {}}
                  placeholder="주소 검색을 이용하세요(도로명주소 입력)"
                />
              </StAddress>
              <StSeAddress>
                <StInt2
                  type="text"
                  name="setJibunAddress"
                  value={address_jibun}
                  onChange={() => {}}
                  placeholder="주소 검색을 이용하세요(지번주소 입력)"
                />
              </StSeAddress>
              <Stsub>*등기부등본 상의 주소를 입력해주세요.</Stsub>
            </StAddressWrap>

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
                <StHomeUnit>원</StHomeUnit>
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
                <StHomeUnit>원</StHomeUnit>
              </StBasic>
            </StHomeSection>

            <StComment>
              <StCommentWrap>
                <StTitleComment>
                  Q1.집주인과의 원활한 소통이 가능했나요?
                </StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-5"
                      type="radio"
                      name="communication"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-5">1</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-6"
                      type="radio"
                      name="communication"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-6">2</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-7"
                      type="radio"
                      name="communication"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-7">3</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-8"
                      type="radio"
                      name="communication"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-8">4</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-9"
                      type="radio"
                      name="communication"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-9">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>연락이 안돼요</span>
                  <span>보통</span>
                  <span>잘 해결해줘요</span>
                </StRadioBtnTitle>
              </StCommentWrap>
              <StCommentWrap>
                <StTitleComment>Q2. 벌레가 많이 나오나요?</StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-10"
                      type="radio"
                      name="bug"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-10">1</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-11"
                      type="radio"
                      name="bug"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-11">2</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-12"
                      type="radio"
                      name="bug"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-12">3</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-13"
                      type="radio"
                      name="bug"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-13">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-14"
                      type="radio"
                      name="bug"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-14">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>많이나와요</span>
                  <span>보통</span>
                  <span>안나와요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment> Q3. 하수구 냄새가 많이 나나요?</StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-15"
                      type="radio"
                      name="smell"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-15">1</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-16"
                      type="radio"
                      name="smell"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-16">2</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-17"
                      type="radio"
                      name="smell"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-17">3</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-18"
                      type="radio"
                      name="smell"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-18">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-19"
                      type="radio"
                      name="smell"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-19">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>심하게나요</span>
                  <span>보통</span>
                  <span>나지않아요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment>Q4.층간소음이 심한가요? </StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-20"
                      type="radio"
                      name="floor_noise"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-20">1</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-21"
                      type="radio"
                      name="floor_noise"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-21">2</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-22"
                      type="radio"
                      name="floor_noise"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-22">3</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-23"
                      type="radio"
                      name="floor_noise"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-23">4</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-24"
                      type="radio"
                      name="floor_noise"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-24">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>시끄러워요</span>
                  <span>보통</span>
                  <span>조용해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment>Q5 벽간 소음이 심한가요?</StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-25"
                      type="radio"
                      name="walls_noise"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-25">1</label>
                  </div>

                  <div className="radioBtn">
                    <input
                      id="radio-26"
                      type="radio"
                      name="walls_noise"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-26">2</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-27"
                      type="radio"
                      name="walls_noise"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-27">3</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-28"
                      type="radio"
                      name="walls_noise"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-28">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-29"
                      type="radio"
                      name="walls_noise"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-29">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>시끄러워요</span>
                  <span>보통</span>
                  <span>조용해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment>Q6.집 주변 환경이 조용한가요? </StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-30"
                      type="radio"
                      name="town_noise"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-30">1</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-31"
                      type="radio"
                      name="town_noise"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-31">2</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-32"
                      type="radio"
                      name="town_noise"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-32">3</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-33"
                      type="radio"
                      name="town_noise"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-33">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-34"
                      type="radio"
                      name="town_noise"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-34">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>시끄러워요</span>
                  <span>보통</span>
                  <span>조용해요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment>Q7.결로, 곰팡이가 심한가요?</StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-35"
                      type="radio"
                      name="mold"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-35">1</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-36"
                      type="radio"
                      name="mold"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-36">2</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-37"
                      type="radio"
                      name="mold"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-37">3</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-38"
                      type="radio"
                      name="mold"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-38">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-39"
                      type="radio"
                      name="mold"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-39">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>심해요</span>
                  <span>보통</span>
                  <span>없어요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment>Q8.주차가 편한가요?</StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-40"
                      type="radio"
                      name="parking"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-40">1</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-41"
                      type="radio"
                      name="parking"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-41">2</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-42"
                      type="radio"
                      name="parking"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-42">3</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-43"
                      type="radio"
                      name="parking"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-43">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-44"
                      type="radio"
                      name="parking"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-44">5</label>
                  </div>
                </StRadioBtnWrap2>
                <StRadioBtnTitle>
                  <span>불편했어요</span>
                  <span>보통</span>
                  <span>편했어요</span>
                </StRadioBtnTitle>
              </StCommentWrap>

              <StCommentWrap>
                <StTitleComment>Q9.보안이 잘 되어있나요?</StTitleComment>
                <StRadioBtnWrap2>
                  <div className="radioBtn">
                    <input
                      id="radio-45"
                      type="radio"
                      name="safe"
                      value="1"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-45">1</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-46"
                      type="radio"
                      name="safe"
                      value="2"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-46">2</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-47"
                      type="radio"
                      name="safe"
                      value="3"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-47">3</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-48"
                      type="radio"
                      name="safe"
                      value="4"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-48">4</label>
                  </div>
                  <div className="radioBtn">
                    <input
                      id="radio-49"
                      type="radio"
                      name="safe"
                      value="5"
                      onChange={onChangeHandler}
                    />
                    <label htmlFor="radio-49">5</label>
                  </div>
                </StRadioBtnWrap2>
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

const StPostbox = styled.div`
  margin-top: 90px;
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

const StAddressWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StAddress = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const StSeAddress = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Stsub = styled.span`
  font-size: 13px;
  color: gray;
  margin: 10px 380px 0 0;
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

const StInt = styled.input`
  margin-right: 150px;
  width: 450px;
  height: 35px;
  border: 2px solid #c4cbcd;
  border-radius: 7px;
  ::placeholder {
    font-size: 15px;
  }
`;

const StInt2 = styled.input`
  margin-right: 10px;
  width: 590px;
  height: 35px;
  border: 2px solid #c4cbcd;
  border-radius: 7px;
  ::placeholder {
    font-size: 15px;
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

const StRadioBtnWrap2 = styled.div`
  margin-left: 45px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 400px;

  .radioBtn {
    font-size: 18px;
  }
  .radioBtn input[type="radio"] {
    display: none;
  }
  .radioBtn label {
    display: block;
    border-radius: 15px;
    margin: 0 auto;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 35px;
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
    color: black;
  }
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
