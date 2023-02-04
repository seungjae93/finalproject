import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { throttle, debounce } from "lodash";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import TotalReview from "../components/Map/TotalReview";
import Button from "../components/button/Button";
import clusterer34 from "../images/clusterer34.svg";
import clusterer89 from "../images/clusterer89.svg";
import marker from "../images/marker.svg";
import logoGray from "../images/logoGray.svg";

const { kakao } = window;

// 주소 입력후 검색 클릭 시 원하는 주소로 이동
const MainMap = () => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.5472661928352, lng: 127.068276018078 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const mapRef = useRef();

  //자동검색
  const [searchAddress, setSearchAddress] = useState("");
  const [autoSearchKeyword, setAutoSearchKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownDataIndex, setDropDownDataIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  //지도 레벨
  const [zoomLevel, setZoomLevel] = useState(6);

  //서버에서 받는 지도 좌표
  const [positions, setPositions] = useState();

  //마커 좌표
  const [markerArray, setMarkerArray] = useState([]);

  //estateId props 넘길때
  const [markerArrayEstateId, setMarkerArrayEstateId] = useState(0);

  //마커 클릭시 props 넘기기
  const [markerClickOn, setMarkerClickOn] = useState(false);

  //검색어 받아오는 로직
  const onAddressHandler = throttle(async (e) => {
    const { value } = e.target;
    setSearchAddress(value);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MAP_SERVER}/search/${value}`,
        {
          search: value,
        }
      );

      const { data } = response?.data;
      setSearchData(data);
    } catch (error) {}
  }, 700);

  //검색어 클릭시 input값 변환
  const clickDropDownItem = (el) => {
    setSearchAddress(el);
    onSearchHandler(el);
  };

  // 검색창 키보드 이동
  const ArrowDown = "ArrowDown";
  const ArrowUp = "ArrowUp";
  const Enter = "Enter";

  const onSubmitSearch = debounce((e) => {
    if (e.key === Enter) {
      onSearchHandler();
    }

    if (e.key === ArrowDown) {
      setDropDownDataIndex(dropDownDataIndex + 1);
      /* childElementCount는 li tag의 개수를 의미하고, 검색 내역 인덱스 키워드에서
           또 아래 키를 누르면 맨처음 인덱스 키워드로 돌아가라는 의미이다. */
      if (inputRef.current === dropDownDataIndex + 1) {
        setDropDownDataIndex(0);
      }
    }
    if (e.key === ArrowUp) {
      setDropDownDataIndex(dropDownDataIndex - 1);

      if (dropDownDataIndex <= 0) {
        setDropDownDataIndex(-1);
      }
    }
  }, 200);

  //장소 검색 객체 생성
  const ps = new kakao.maps.services.Places();

  //장소검색이 완료됐을 때 호출되는 콜백함수
  const placesSearchCB = function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
      const newSearch = data[0];
      setState({
        center: { lat: Number(newSearch.y), lng: Number(newSearch.x) },
        isPanto: true,
      });
    }
  };

  //키워드로 장소를 검색
  const onSearchHandler = useCallback(
    async (el) => {
      el
        ? ps.keywordSearch(`${el}`, placesSearchCB)
        : ps.keywordSearch(`${searchAddress}`, placesSearchCB);
      try {
        await axios.post(`${process.env.REACT_APP_API_MAP_SERVER}/search`, {
          text: `${searchAddress}`,
        });
      } catch (error) {}
      setSearchAddress("");
    },
    [searchAddress]
  );

  //마우스 휠 이동시 지도 레벨 변화에 따라 동서남북좌표 보내는 부분
  const onPosHandler = async (value) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_MAP_SERVER}/map`,
        {
          ...value,
        }
      );
      const { data } = response?.data;
      setPositions(data);
    } catch (error) {}
  };

  //마우스 드래그 이동시 동서남북 좌표 보내는 부분
  const onDragHandler = async (value) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_MAP_SERVER}/map`,
        {
          ...value,
        }
      );
      const { data } = response?.data;
      setPositions(data);
    } catch (error) {}
  };

  //검색어 입력시 위치가 바뀔때 동서남북 좌표 보내는 부분
  const onGeoHandler = async (geoLocation) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_MAP_SERVER}/map`,
        {
          ...geoLocation,
        }
      );
      const { data } = response?.data;
      setPositions(data);
    } catch (error) {}
  };

  const getOverlayAreaName = (zoomLevel) => {
    if (zoomLevel > 8) {
      return "doName";
    } else if (zoomLevel === 6 || zoomLevel === 5) {
      return "dongName";
    } else if (zoomLevel === 7 || zoomLevel === 8) {
      return "cityName";
    } else {
      return;
    }
  };

  const renderItem = () => {
    if (!positions) return null;
    if (zoomLevel < 3) return null;
    return (
      <>
        {zoomLevel > 4
          ? positions?.map((el) => {
              const name = el[getOverlayAreaName(zoomLevel)];
              if (name === "" || !name) return null;
              return (
                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                  key={el.estateId}
                  position={el}
                >
                  {/* 커스텀 오버레이에 표시할 내용입니다 */}
                  <ClustererImg>
                    <img src={clusterer89} alt="clusterer89" />
                    <Clusterer89Txt>{name}</Clusterer89Txt>
                  </ClustererImg>
                </CustomOverlayMap>
              );
            })
          : 2 < zoomLevel < 5
          ? markerArray?.map((el) => {
              if (!el.index) return null;
              return (
                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                  key={el.estateId}
                  position={el.locate ?? el}
                >
                  {/* 커스텀 오버레이에 표시할 내용입니다 */}
                  <ClustererImg>
                    <img src={clusterer34} alt="clusterer32" />
                    <ClustererTxt>{el.index}</ClustererTxt>
                  </ClustererImg>
                </CustomOverlayMap>
              );
            })
          : null}
      </>
    );
  };

  const MarkerClickHandler = (estateId) => {
    setMarkerClickOn(true);
    setMarkerArrayEstateId(estateId);
  };

  useEffect(() => {
    if (!positions) return;
    let newArray = [];

    if (zoomLevel < 3) {
      newArray.push(...positions);
      setMarkerArray(newArray);
    } else if (2 < zoomLevel < 5) {
      positions?.map((el) => {
        if (Array.isArray(el)) {
          newArray.push({ locate: el[0], index: el.length });
          setMarkerArray(newArray);
        }
      });
    }
  }, [zoomLevel, positions]);

  useEffect(() => {
    /* 현재 보이는 위치에 대한 좌표 값을 받아와주는 부분 */
    const mapObject = mapRef.current;
    if (!mapObject) return;
    const geoLocation = {
      swLatLng: {
        lat: mapObject.getBounds().getSouthWest().getLat(),
        lng: mapObject.getBounds().getSouthWest().getLng(),
      },
      neLatLng: {
        lat: mapObject.getBounds().getNorthEast().getLat(),
        lng: mapObject.getBounds().getNorthEast().getLng(),
      },
      zoomLevel: mapObject.getLevel(),
    };
    onGeoHandler(geoLocation);
  }, [state]);

  return (
    <>
      <StContainer>
        <SearchContainer>
          <StSearch
            type="search"
            placeholder="지역, 지하철역, 학교 검색하기"
            onKeyDown={onSubmitSearch}
            onChange={onAddressHandler}
            value={isHaveInputValue ? autoSearchKeyword : searchAddress}
          />
          {searchAddress && (
            <AutoSearchContainer>
              <AutoSearchWrap ref={inputRef}>
                {searchData?.map((el, index) => {
                  return (
                    <AutoSearchData
                      isFocus={dropDownDataIndex === index ? true : false}
                      key={`map-main-${index}`}
                      onClick={() => clickDropDownItem(el)}
                      onMouseOver={() =>
                        setDropDownDataIndex(dropDownDataIndex)
                      }
                    >
                      {el}
                    </AutoSearchData>
                  );
                })}
              </AutoSearchWrap>
            </AutoSearchContainer>
          )}
          <Button.Primary size="small" onClick={() => onSearchHandler()}>
            검색하기
          </Button.Primary>
        </SearchContainer>

        <StWrapper>
          <StReviewContainer>
            {markerClickOn === true && markerArrayEstateId ? (
              <TotalReview estateIdData={markerArrayEstateId} />
            ) : (
              <StEmptyContainer>
                <img src={logoGray} alt="logoGray" />
                <div>검색창을 이용해주세요</div>
                <div>마커를 클릭하면 정보가 나와요</div>
              </StEmptyContainer>
            )}
          </StReviewContainer>
          <StMapContainer>
            <Map // 지도를 표시할 Container
              center={state.center}
              isPanto={state.isPanto}
              style={{
                // 지도의 크기
                width: "100%",
                height: "86.4vh",
              }}
              ref={mapRef}
              // 지도의 확대 레벨
              level={6}
              maxLevel={11}
              onZoomChanged={(map) => setZoomLevel(map.getLevel())}
              onDragEnd={(map) => {
                onDragHandler({
                  swLatLng: {
                    lat: map.getBounds().getSouthWest().getLat(),
                    lng: map.getBounds().getSouthWest().getLng(),
                  },
                  neLatLng: {
                    lat: map.getBounds().getNorthEast().getLat(),
                    lng: map.getBounds().getNorthEast().getLng(),
                  },
                  zoomLevel: map.getLevel(),
                });
              }}
              onBoundsChanged={debounce((map) => {
                onPosHandler({
                  swLatLng: {
                    lat: map.getBounds().getSouthWest().getLat(),
                    lng: map.getBounds().getSouthWest().getLng(),
                  },
                  neLatLng: {
                    lat: map.getBounds().getNorthEast().getLat(),
                    lng: map.getBounds().getNorthEast().getLng(),
                  },
                  zoomLevel: map.getLevel(),
                });
              }, 600)}
            >
              {zoomLevel < 3 &&
                markerArray?.map((el) => {
                  return (
                    <MapMarker
                      key={el.estateId}
                      position={el ?? el}
                      image={{
                        src: marker,
                        // 마커이미지의 주소입니다
                        size: {
                          width: 50,
                          height: 50,
                        }, // 마커이미지의 크기입니다
                      }}
                      onClick={() => MarkerClickHandler(el.estateId)}
                    />
                  );
                })}
              {renderItem()}
            </Map>
          </StMapContainer>
        </StWrapper>
      </StContainer>
    </>
  );
};
export default MainMap;
const ClustererImg = styled.div`
  background-size: cover;
  position: relative;
`;
const Clusterer89Txt = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 500;
`;
const ClustererTxt = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 550;
  font-family: "Pretendard";
`;
const StContainer = styled.div`
  width: 100%;
  height: 86.4vh;
  min-width: 1000px;
`;
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1360px;
  height: 45px;
  border: 0;
  gap: 10px;
`;
const StSearch = styled.input`
  padding: 10px;
  width: 351px;
  height: 31px;
  background-color: #eaeaea;
  border: 1px solid #a6b2b9;
  border-radius: 5px;
`;
const AutoSearchContainer = styled.div`
  position: absolute;
  width: 450px;
  height: 200px;
  top: 45px;
  z-index: 3;
  background-color: #fff;
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
const AutoSearchWrap = styled.ul`
  list-style: none;
`;

const AutoSearchData = styled.li`
  position: relative;
  width: 430px;
  padding: 10px 0px;
  margin: auto;
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 86.4vh;
`;

const StReviewContainer = styled.div`
  width: 600px;
  height: 86.4vh;
`;
const StEmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 86.4vh;
  gap: 10px;
`;

const StMapContainer = styled.div`
  width: 100%;
  height: 86.4vh;
`;
