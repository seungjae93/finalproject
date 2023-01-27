import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAddPost } from "../redux/api/reviewApi";
import useInputItem from "../hooks/useInputItem";
import DaumPostcode from "react-daum-postcode";

const Review = () => {
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

    for (let key of formData.keys()) {
      console.log(key);
    }
    for (let value of formData.values()) {
      console.log(value);
    }

    for (const property in input) {
      formData.append(`${property}`, input[property]);
    }

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    const review = formData;
    addPost(review);

    navigate("/mypage");
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
      console.log(data);
      return data.autoJibunAddress + data.buildingName;
    } else {
      return data.jibunAddress + data.buildingName;
    }
  };

  return (
    <>
      <StReviewWrap>
        <StReviewBox>
          <StTitle>이집은 후기 작성하기</StTitle>
          <button onClick={openPostcodeHandler}>누르면 주소열림</button>
          <StContainer>
            {openPostcode && (
              <div>
                <DaumPostcode
                  style={{ width: "400px", height: "500px" }}
                  onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="" // 기본적으로 입력되어있는 검색어
                />
              </div>
            )}

            <input
              type="text"
              name="address"
              value={address}
              onChange={() => {}}
              placeholder="우편번호 찾기를 이용하세요(도로명주소)"
              size="45"
            />
            <input
              type="text"
              name="setJibunAddress"
              value={address_jibun}
              onChange={() => {}}
              placeholder="우편번호 찾기를 이용하세요(지번주소)"
              size="45"
            />
            {/* <StButton onClick={handle.clickButton}> 주소 검색 </StButton>
            <StAddress>
              <StInt
                type="text"
                name="address"
                value={address}
                onChange={() => {}}
                placeholder="주소 검색을 이용하세요(도로명주소 입력)"
                size="45"
              />
            </StAddress>
            <StSeAddress>
              <StInt
                type="text"
                name="setJibunAddress"
                value={address_jibun}
                onChange={() => {}}
                placeholder="주소 검색을 이용하세요(지번주소 입력)"
                size="45"
              />
            </StSeAddress> */}

            {/* {openPostcode && (
              <DaumPostcode
                style={{ width: "300px", height: "300px" }}
                onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
              />
            )} */}

            <StHomeSection>
              <StAddStyle> 주거 형태 </StAddStyle>
              <StAddStyle2>
                <div className="selectOne">
                  <label for="select1">
                    <span>원룸</span>
                  </label>
                  <input
                    type="radio"
                    id="select1"
                    name="residence_type"
                    value="원룸"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="selectTwo">
                  <label for="select2">
                    <span>투룸</span>
                  </label>
                  <input
                    id="select2"
                    type="radio"
                    name="residence_type"
                    value="투룸"
                    onChange={onChangeHandler}
                  />
                </div>
              </StAddStyle2>
              <StBasic>
                <StBasicTitle>평수</StBasicTitle>
                <input
                  type="number"
                  name="acreage"
                  value={input.acreage}
                  onChange={onChangeHandler}
                  placeholder="평수 입력란입니다."
                />
                <span>평</span>
              </StBasic>
              {/* <StAddStyle2> */}
              <input
                type="radio"
                name="transaction_type"
                value="월세"
                onChange={onChangeHandler}
              />
              월세
              <input
                type="radio"
                name="transaction_type"
                value="전세"
                onChange={onChangeHandler}
              />
              전세
              {/* </StAddStyle2> */}
              <StBasic>
                <StBasicTitle>보증금</StBasicTitle>
                <input
                  type="number"
                  name="deposit"
                  value={input.deposit}
                  onChange={onChangeHandler}
                  placeholder="보증금 입력란입니다."
                />
                <span>원</span>
              </StBasic>
              <StBasic>
                <StBasicTitle>월세</StBasicTitle>
                <input
                  type="number"
                  name="monthly_payment"
                  value={input.monthly_payment}
                  onChange={onChangeHandler}
                  placeholder="월세 입력란입니다."
                />
                <span>원</span>
              </StBasic>
            </StHomeSection>

            <StComment>
              <StTitleComment>
                Q1.집주인과의 원활한 소통이 가능했나요?
              </StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="communication"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="communication"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="communication"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="communication"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="communication"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q2 벌레가 많이 나오나요?</StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="bug"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="bug"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="bug"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="bug"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="bug"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment> Q3 하수구 냄새가 많이 나나요?</StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="smell"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="smell"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="smell"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="smell"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="smell"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q4.층간소음이 심한가요? </StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="floor_noise"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="floor_noise"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="floor_noise"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="floor_noise"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="floor_noise"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q5 벽간 소음이 심한가요?</StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="walls_noise"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="walls_noise"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="walls_noise"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="walls_noise"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="walls_noise"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q6.집 주변 환경이 조용한가요? </StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="town_noise"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="town_noise"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="town_noise"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="town_noise"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="town_noise"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q7.결로, 곰팡이가 심한가요?</StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="mold"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="mold"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="mold"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="mold"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="mold"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q8.주차가 편한가요?</StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="parking"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="parking"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="parking"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="parking"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="parking"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

              <StTitleComment>Q9.보안이 잘 되어있나요?</StTitleComment>
              <StDetail>
                <input
                  type="radio"
                  name="safe"
                  value="1"
                  onChange={onChangeHandler}
                />
                1
                <input
                  type="radio"
                  name="safe"
                  value="2"
                  onChange={onChangeHandler}
                />
                2
                <input
                  type="radio"
                  name="safe"
                  value="3"
                  onChange={onChangeHandler}
                />
                3
                <input
                  type="radio"
                  name="safe"
                  value="4"
                  onChange={onChangeHandler}
                />
                4
                <input
                  type="radio"
                  name="safe"
                  value="5"
                  onChange={onChangeHandler}
                />
                5
              </StDetail>

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

              <StPicture>
                <StTitleComment>Q12. 이집의 사진을 추가해주세요</StTitleComment>
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
                    <div key={id}>
                      <StyledImage src={image} alt={`${image}-${id}`} />
                    </div>
                  ))}
                </StImageGruop>
              </StPicture>

              <StTitleComment>
                Q13.이 집의 종합적인 만족도를 별점으로 표현해 주세요
              </StTitleComment>
              <StSelectStar name="star" onChange={onChangeHandler}>
                <option value="">별점을 선택해 주세요</option>
                <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              </StSelectStar>

              <div>
                <StBut onClick={onSubmitHandler}>
                  <img
                    src={require("../images/Group 389.jpg")}
                    alt="submit button"
                  />
                </StBut>
              </div>
            </StComment>
          </StContainer>
        </StReviewBox>
      </StReviewWrap>
    </>
  );
};

export default Review;

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
  padding-bottom: 30px;
  padding-top: 50px;
`;

const StButton = styled.button`
  position: absolute;
  top: 275px;
  margin-left: 610px;
  width: 121px;
  height: 34px;
  background-color: #c4cbcd;
  border: none;
  border-radius: 5px;
  font-size: 20px;

  cursor: pointer;
  :hover {
    background-color: #aec90c;
    transition: 0.3s;
  }
`;

const StSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

const StAddress = styled.div`
  display: flex;
  text-align: center;
  padding-top: 80px;
  padding-left: 150px;
`;

const StSeAddress = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 150px;
`;

const StAdd = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  margin-top: 15px;
  position: absolute;
`;

const StCommentAdd = styled.div`
  font-size: 15px;
  margin-bottom: 30px;
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

const StyledImage = styled.img`
  width: 250px;
  height: 200px;
  background-color: transparent;
  border: 1px solid darkgray;
  margin-top: 25%;
`;
const StUpload = styled.label`
  text-align: center;
  padding: 12px 50px;
  border: 1px solid #aec90c;
  background-color: white;
  border-radius: 10px;
  width: 100px;
  cursor: pointer;
`;

const StInt = styled.input`
  margin-right: 150px;
  width: 450px;
  height: 2rem;
  border: 2px solid #c4cbcd;
  border-radius: 7px;
  ::placeholder {
    font-size: 15px;
  }
`;

const StBasic = styled.div`
  width: 300px;
  display: flex;
  margin-bottom: 5%;
`;

const StBasicTitle = styled.div`
  font-size: 16px;
  margin-right: 18px;
`;

const StHomeSection = styled.div`
  display: block;
  padding: 2%;
  text-align: center;
`;

const StAddStyle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const StAddStyle2 = styled.div`
  padding-bottom: 20px;
  display: flex;
  .selectOne {
    width: 170px;
    height: 34px;
    border: 1px solid gray;
    border-radius: 10px;
  }
  .selectOne input[type="radio"] {
    display: none;
    vertical-align: middle;
  }
  .selectOne input[type="radio"]:checked {
    border: 2px solid #c1de0d;
    background-color: #c1de0d;
  }
  .selectOne label {
    cursor: pointer;
    display: block;
    border-radius: 10px;
    text-align: center;
    line-height: 34px;
  }
  .selectTwo {
    width: 170px;
    height: 34px;
    border: 1px solid gray;
    border-radius: 10px;
  }
  .selectTwo input[type="radio"] {
    display: none;
    vertical-align: middle;
  }
  .selectTwo label {
    cursor: pointer;
    display: block;
    border-radius: 10px;
    text-align: center;
    line-height: 34px;
  }

  label:hover {
    border: 1px solid #c1de0d;
  }

  span {
    vertical-align: middle;
    font-size: 18px;
  }
`;

const StComment = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const StTitleComment = styled.div`
  margin-top: 5%;
  font-size: 20px;
  font-weight: 600;
`;

const StDetail = styled.div`
  margin-top: 15px;
`;

const Sttextarea = styled.textarea`
  margin-top: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  resize: none;
  ::placeholder {
    color: gray;
  }
`;

const StSelectStar = styled.select`
  text-align: center;
  width: 200px;
  height: 2rem;
  margin: 10px;
  border: 2px solid #c4cbcd;
  border-radius: 10px;
  color: black;
`;

const StBut = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-top: 10%;
  margin-bottom: 10%;
`;
