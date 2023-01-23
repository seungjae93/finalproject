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

  const handle = {
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setAddress(data.address + data.buildingName);
      setJibunAddress(inputValue(data));
      setOpenPostcode(false);
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
      <StTitle>이집은 후기 작성하기</StTitle>

      <StSearch>
        <StButton onClick={handle.clickButton}> 주소 검색 </StButton>
        {openPostcode && (
          <DaumPostcode
            style={{ width: "400px", height: "300px" }}
            onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        )}
      </StSearch>

      <StContainer>
        <StAddress>
          <StAdd> 주소 </StAdd>
          <StInt
            type="text"
            name="address"
            value={address}
            onChange={() => {}}
            placeholder="우편번호 찾기를 이용하세요(도로명주소)"
            size="45"
          />
        </StAddress>

        <StSeAddress>
          <StInt
            type="text"
            name="setJibunAddress"
            value={address_jibun}
            onChange={() => {}}
            placeholder="우편번호 찾기를 이용하세요(지번주소)"
            size="45"
          />
        </StSeAddress>

        <StType>
          <StAdd> 주거 형태 </StAdd>

          <StSelectOne name="residence_type" onChange={onChangeHandler}>
            <Stoption value="">선택해 주세요</Stoption>
            <Stoption value="원룸">원룸</Stoption>
            <Stoption value="투룸">투룸</Stoption>
          </StSelectOne>

          <StSelectOne name="transaction_type" onChange={onChangeHandler}>
            <Stoption value="">선택해 주세요</Stoption>
            <Stoption value="월세">월세</Stoption>
            <Stoption value="전세">전세</Stoption>
          </StSelectOne>
        </StType>

        <StBasicWrap>
          <StAdd> 기본 정보 </StAdd>
          <StBasic>
            <StBasicTitle>공급면적:</StBasicTitle>
            <input
              type="number"
              name="acreage"
              value={input.acreage}
              onChange={onChangeHandler}
              placeholder="평수 입력란입니다."
            />
          </StBasic>
          <StBasic>
            <StBasicTitle>보증금:</StBasicTitle>
            <input
              type="number"
              name="deposit"
              value={input.deposit}
              onChange={onChangeHandler}
              placeholder="보증금 입력란입니다."
            />
          </StBasic>
          <StBasic>
            <StBasicTitle>월세:</StBasicTitle>
            <input
              type="number"
              name="monthly_payment"
              value={input.monthly_payment}
              onChange={onChangeHandler}
              placeholder="월세 입력란입니다."
            />
          </StBasic>
        </StBasicWrap>

        <StComment>
          <StTitle> 이집은 후기 상세정보</StTitle>
          <StTitleComment> Q1 벌래가 얼마나 자주 나오나요? </StTitleComment>
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

          <StTitleComment>
            Q2 하수구에서 냄새가 얼마나 올라오나요?
          </StTitleComment>
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

          <StTitleComment> Q3 층간소음이 심한가요?</StTitleComment>
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

          <StTitleComment>Q4 벽간소음이 심한가요? </StTitleComment>
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

          <StTitleComment> Q5 거주지 주변 환경은 조용한가요?</StTitleComment>
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

          <StTitleComment>Q6 결로나 곰팡이가 보이나요? </StTitleComment>
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

          <StTitleComment>Q7 주차는 공간은 넉넉하고 편한가요?</StTitleComment>
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

          <StTitleComment>Q8 보안은 좋은가요?</StTitleComment>
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

          <StTitleComment> Q9 이집의 장점을 적어주세요 </StTitleComment>
          <Sttextarea
            name="good"
            value={input.good}
            onChange={onChangeHandler}
            placeholder="장점을 자유롭게 적어 주세요"
            cols="75"
            rows="7"
          />

          <StTitleComment> Q10 이집의 단점을 적어주세요 </StTitleComment>
          <Sttextarea
            name="bad"
            value={input.bad}
            onChange={onChangeHandler}
            placeholder="단점을 자유롭게 적어 주세요"
            cols="75"
            rows="7"
          />

          <StTitleComment>이집의 별점을 선택해주세요</StTitleComment>
          <StSelectStar name="star" onChange={onChangeHandler}>
            <option value="">별점을 선택해 주세요</option>
            <option value="1">⭐️</option>
            <option value="2">⭐️⭐️</option>
            <option value="3">⭐️⭐️⭐️</option>
            <option value="4">⭐️⭐️⭐️⭐️</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
          </StSelectStar>

          <StPicture>
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
    </>
  );
};

export default Review;

const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
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

const StButton = styled.button`
  padding: 6px 25px;
  background-color: white;
  border: 1px solid #aec90c;
  border-radius: 8px;
  font-size: 20px;

  cursor: pointer;
  :hover {
    background-color: #aec90c;
    transition: 0.5s;
  }
`;

const StSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
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

const StAddress = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`;

const StAdd = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const StInt = styled.input`
  width: 80%;
  height: 2rem;
  border: 2px solid #c4cbcd;
  border-radius: 7px;
  ::placeholder {
    font-size: 15px;
  }
`;

const StSeAddress = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`;

const StType = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;

const StSelectOne = styled.select`
  width: 35%;
  height: 2rem;
  margin: 10px;
  border: 2px solid #c4cbcd;
  border-radius: 10px;
  color: black;
`;

const Stoption = styled.option`
  color: black;
`;

const StBasicWrap = styled.div`
  width: 60%;
  margin-top: 30px;
`;

const StBasic = styled.div`
  position: relative;
  left: 20%;
  display: flex;
  margin-bottom: 5%;
`;

const StBasicTitle = styled.div`
  font-size: 16px;
  margin-right: 3%;
`;

const StComment = styled.div`
  text-align: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
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
  border: 2px solid gray;
  border-radius: 10px;
  resize: none;
  ::placeholder {
    color: gray;
  }
`;

const StBut = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-top: 10%;
  margin-bottom: 10%;
`;
