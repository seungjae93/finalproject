import React from "react";
import styled from "styled-components";

export const Selected = ({
  HandleChange,
  postLocation1,
  postLocation2,
  selected,
}) => {
  return (
    <>
      <StSeleteBox>
        <StSeleteR name="postLocation1" onChange={HandleChange}>
          <StOption value="">시,도 선택</StOption>
          {postLocation1.map((el) => (
            <StOption key={el.postLocation1} value={el.postLocation1}>
              {el.codeNm}
            </StOption>
          ))}
        </StSeleteR>
        <StSeleteL name="postLocation2" onChange={HandleChange}>
          <StOption value="">구,군 선택</StOption>
          {postLocation2
            .filter((el) => el.postLocation1 === selected.postLocation1)
            .map((el) => (
              <StOption key={el.postLocation2} value={el.codeNm}>
                {el.codeNm}
              </StOption>
            ))}
        </StSeleteL>
      </StSeleteBox>
    </>
  );
};

export const SeletedOne = ({
  onHandleAllView,
  HandleChange,
  postLocation1,
  postLocation2,
  selected,
  search,
  setSearch,
  throttledRefetch,
}) => {
  return (
    <>
      <StSeleteBoxOne>
        <StSelete>
          <div>
            <StSeleteAll onClick={onHandleAllView}>모든 지역</StSeleteAll>
            <StSeleteRe name="postLocation1" onChange={HandleChange}>
              <option value="">시,도 선택</option>
              {postLocation1.map((el) => (
                <option key={el.postLocation1} value={el.postLocation1}>
                  {el.codeNm}
                </option>
              ))}
            </StSeleteRe>
            <StSeleteLe name="postLocation2" onChange={HandleChange}>
              <option value="">구,군 선택</option>
              {postLocation2
                .filter((el) => el.postLocation1 === selected.postLocation1)
                .map((el) => (
                  <option key={el.postLocation2} value={el.codeNm}>
                    {el.codeNm}
                  </option>
                ))}
            </StSeleteLe>
          </div>
          <StSearch
            type="text"
            value={search}
            placeholder="검색하기"
            onChange={(e) => {
              setSearch(e.target.value);
              throttledRefetch();
            }}
          />
        </StSelete>
      </StSeleteBoxOne>
    </>
  );
};

const StSeleteBox = styled.div`
  width: 70%;
`;

const StSeleteR = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 8px;
  margin-right: 20px;
  cursor: pointer;
`;

const StSeleteL = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
`;

const StOption = styled.option`
  border: none;
  border: 2px solid #a6b2b9;
`;

// ===========================================One

const StSeleteBoxOne = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
  height: 50px;
  min-width: 900px;
`;

const StSeleteAll = styled.button`
  background-color: white;
  border: 2px solid #c4cbcd;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const StSelete = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1250px;
  height: 50px;
  border-bottom: 3px solid #c4cbcd;
`;

const StSeleteRe = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const StSeleteLe = styled.select`
  border: 2px solid #a6b2b9;
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
`;

const StSearch = styled.input`
  border: 2px solid #a6b2b9;
  width: 250px;
  height: 30px;
  border-radius: 10px;
`;
