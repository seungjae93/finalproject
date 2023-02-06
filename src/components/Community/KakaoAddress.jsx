import React from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

export const KakaoAddress = ({
  openPostcode,
  handle,
  address,
  address_jibun,
}) => {
  return (
    <>
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
    </>
  );
};

const StPostbox = styled.div`
  margin-top: 90px;
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
