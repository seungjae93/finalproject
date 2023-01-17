import React, { useState } from "react";
import styled from "styled-components";
import { useAddPost } from "../redux/api/reviewApi";
import PostCode from "../pages/PostCode";
import useInputItem from "../hooks/useInputItem";

const Review = () => {
  const { input, onChangeHandler } = useInputItem();
  const [address, setAddress] = useState("");
  const [address_jibun, setJibunAddress] = useState("");
  const [image, setImage] = useState([]);

  const { mutate: addPost } = useAddPost();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    formData.append("address_jibun", address_jibun);

    for (const property in input) {
      formData.append(`${property}`, input[property]);
    }

    for (let i = 0; i < image.length; i++) {
      formData.append("images", image[i]);
    }

    const review = formData;
    addPost(review);
  };

  return (
    <>
      <h1>후기를 작성하는 페이지 입니다</h1>
      <StContainer>
        <PostCode setAddress={setAddress} setJibunAddress={setJibunAddress} />
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
        <select name="residence_type" onChange={onChangeHandler}>
          <option value="">선택해 주세요</option>
          <option value="원룸">원룸</option>
          <option value="투룸">투룸</option>
        </select>
        <select name="transaction_type" onChange={onChangeHandler}>
          <option value="">선택해 주세요</option>
          <option value="월세">월세</option>
          <option value="전세">전세</option>
        </select>
        <input
          type="number"
          name="deposit"
          value={input.deposit}
          onChange={onChangeHandler}
          placeholder="보증금 입력란입니다."
        />
        <input
          type="number"
          name="monthly_payment"
          value={input.monthly_payment}
          onChange={onChangeHandler}
          placeholder="월세 입력란입니다."
        />
        <input
          type="number"
          name="acreage"
          value={input.acreage}
          onChange={onChangeHandler}
          placeholder="평수 입력란입니다."
        />
        <div>집 주인이 문제를 잘 해결해 주는지 평가</div>
        <div>
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
        </div>
        <div>벌래가 얼마나 자주 나오는지 평가</div>
        <div>
          <input type="radio" name="bug" value="1" onChange={onChangeHandler} />
          1
          <input type="radio" name="bug" value="2" onChange={onChangeHandler} />
          2
          <input type="radio" name="bug" value="3" onChange={onChangeHandler} />
          3
          <input type="radio" name="bug" value="4" onChange={onChangeHandler} />
          4
          <input type="radio" name="bug" value="5" onChange={onChangeHandler} />
          5
        </div>
        <div>하수구에서 냄새가 얼마나 나는지 평가</div>
        <div>
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
        </div>
        <div>층간소음이 심한지 평가</div>
        <div>
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
        </div>
        <div>벽간소음이 심한지 평가</div>
        <div>
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
        </div>
        <div>거주지 주변 환경은 조용한지 평가</div>
        <div>
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
        </div>
        <div>결로나 곰팡이가 있는지 평가</div>
        <div>
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
        </div>
        <div>주차는 편리한지 평가</div>
        <div>
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
        </div>
        <div>보안은 좋은지 평가</div>
        <div>
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
        </div>
        <textarea
          name="good"
          value={input.good}
          onChange={onChangeHandler}
          placeholder="장점을 적는 공간입니다"
          cols="25"
          rows="5"
        />
        <textarea
          name="bad"
          value={input.bad}
          onChange={onChangeHandler}
          placeholder="단점을 적는 공간입니다"
          cols="25"
          rows="5"
        />
        <div>--사진업로드--</div>
        <input
          multiple
          name="reviewImage"
          accept="image/*"
          type="file"
          onChange={(e) => setImage([...e.target.files])}
        />
        <select name="star" onChange={onChangeHandler}>
          <option value="">별점을 선택해 주세요</option>
          <option value="1">*</option>
          <option value="2">**</option>
          <option value="3">***</option>
          <option value="4">****</option>
          <option value="5">*****</option>
        </select>
        <button onClick={onSubmitHandler}>후기 제출</button>
      </StContainer>
    </>
  );
};

export default Review;

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
