import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { throttle, debounce } from "lodash";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import TotalReview from "../components/Map/TotalReview";

const { kakao } = window;

// 주소 입력후 검색 클릭 시 원하는 주소로 이동
const MainMap = () => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 36.7738248327742, lng: 127.05384284728 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const mapRef = useRef();

  //자동검색
  const [searchAddress, setSearchAddress] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownDataIndex, setDropDownDataIndex] = useState(-1);
  //지도 레벨
  const [zoomLevel, setZoomLevel] = useState(3.5);
  //서버에서 받는 지도 좌표
  const [positions, setPositions] = useState();
  //마커 좌표
  const [markerArray, setMarkerArray] = useState([]);
  const [markerClickOn, setMarkerClickOn] = useState(false);
  const inputRef = useRef();
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
      setIsHaveInputValue(true);
    } catch (error) {}
  }, 700);

  //검색어 클릭시 input값 변환
  const clickDropDownItem = (clickedItem) => {
    setSearchAddress(clickedItem);
    setIsHaveInputValue(false);
    onSearchHandler();
  };

  //enter키를 눌렀을 때 동작할 코드
  const onSubmitSearch = debounce((e) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
    if (isHaveInputValue) {
      if (e.key === "ArrowDown" && searchData.length - 1 > dropDownDataIndex) {
        setDropDownDataIndex(dropDownDataIndex + 1);
      }

      if (e.key === "ArrowUp" && dropDownDataIndex >= 0)
        setDropDownDataIndex(dropDownDataIndex - 1);

      if (e.key === "Enter" && dropDownDataIndex >= 0) {
        clickDropDownItem(searchData[dropDownDataIndex]);
        setDropDownDataIndex(-1);
      }
    }
  }, 200);

  //장소 검색 객체 생성
  const ps = new kakao.maps.services.Places();

  //장소검색이 완료됐을 때 호출되는 콜백함수
  const placesSearchCB = function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(data);
      const newSearch = data[0];
      setState({
        center: { lat: Number(newSearch.y), lng: Number(newSearch.x) },
        isPanto: true,
      });
    }
  };

  //키워드로 장소를 검색
  const onSearchHandler = useCallback(async () => {
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    try {
      await axios.post(`${process.env.REACT_APP_API_MAP_SERVER}/search`, {
        text: `${searchAddress}`,
      });
    } catch (error) {}
    setSearchAddress("");
  }, [searchAddress]);

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

  const getOverlayStyle = (zoomLevel) => {
    if (zoomLevel > 8) {
      return "red";
    } else if (zoomLevel === 6 || zoomLevel === 5) {
      return "green";
    } else if (zoomLevel === 7 || zoomLevel === 8) {
      return "blue";
    } else {
      return;
    }
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
              return (
                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                  key={el.estateId}
                  position={el}
                >
                  {/* 커스텀 오버레이에 표시할 내용입니다 */}
                  <div
                    className="label"
                    style={{
                      color: "#000",
                      backgroundColor: `${getOverlayStyle(zoomLevel)}`,
                    }}
                  >
                    <span className="left"></span>
                    <span className="center">{name}</span>
                    <span className="right"></span>
                  </div>
                </CustomOverlayMap>
              );
            })
          : 2 < zoomLevel < 5
          ? markerArray?.map((el) => {
              return (
                <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                  key={el.estateId}
                  position={el.locate ?? el}
                >
                  {/* 커스텀 오버레이에 표시할 내용입니다 */}
                  <div
                    className="label"
                    style={{
                      color: "white",
                      backgroundColor: "skyblue",
                    }}
                  >
                    <span className="left"></span>
                    <span className="center">{el.index}</span>
                    <span className="right"></span>
                  </div>
                </CustomOverlayMap>
              );
            })
          : null}
      </>
    );
  };

  const MarkerClickHandler = () => {
    setMarkerClickOn(true);
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

  console.log(markerArray);

  return (
    <>
      <StContainer>
        <SearchContainer isHaveInputValue={isHaveInputValue}>
          <StSearch
            type="search"
            onKeyPress={onSubmitSearch}
            onChange={onAddressHandler}
            value={searchAddress}
            ref={inputRef}
          />
          {searchAddress && (
            <AutoSearchContainer>
              <AutoSearchWrap>
                {/* onKeyDown={onHandleDropDownKey} */}
                {searchData?.map((el, index) => {
                  return (
                    <AutoSearchData
                      key={searchData.index}
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
          <button onClick={onSearchHandler}>검색</button>
        </SearchContainer>

        <StWrapper>
          <StReviewContainer>
            {markerClickOn === true && <TotalReview />}
          </StReviewContainer>
          <StMapContainer>
            <Map // 지도를 표시할 Container
              center={state.center}
              isPanto={state.isPanto}
              style={{
                // 지도의 크기
                width: "100%",
                height: "100vh",
              }}
              ref={mapRef}
              // 지도의 확대 레벨
              level={3}
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
                      // estateIdData={el.estateId}
                      position={el}
                      image={{
                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                        // 마커이미지의 주소입니다
                        size: {
                          width: 24,
                          height: 35,
                        }, // 마커이미지의 크기입니다
                      }}
                      onClick={MarkerClickHandler}
                    >
                      {el.estateId}
                    </MapMarker>
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

const StContainer = styled.div`
  /* max-width: 1920px;
  min-width: 680px;
  height: 855px; */
  width: 100%;
  height: 100vh;
`;
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border: 0;
  gap: 10px;
`;
const StSearch = styled.input`
  width: 20%;
  height: 70%;
  padding-left: 10px;
  background-color: #eaeaea;
  border: 0;
  outline: 1px;
`;
const AutoSearchContainer = styled.div`
  position: absolute;
  width: 23%;
  height: 25vh;
  top: 45px;
  z-index: 3;
  background-color: #fff;
`;
const AutoSearchWrap = styled.ul`
  list-style: none;
`;

const AutoSearchData = styled.li`
  position: relative;
  width: 90%;
  padding: 10px 8px;
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
  height: 100%;
`;

const StReviewContainer = styled.div`
  width: 600px;
  height: 100%;
`;

const StMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
