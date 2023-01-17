import styled from "styled-components";
import axios from "axios";
import { throttle, debounce } from "lodash";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import TotalModal from "../components/MapModal/TotalModal";
import SubModal from "../components/MapModal/SubModal";
import React, { useState, useCallback, useEffect, useRef } from "react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(); //지도 줌레벨
  const [positions, setPositions] = useState();
  const markerArray = [];

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

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

      const { data } = response.data;
      setSearchData(data);
    } catch (error) {}
  }, 500);

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
      const { data } = response.data;
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
      const { data } = response.data;
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
      const { data } = response.data;
      setPositions(data);
    } catch (error) {}
  };

  //레벨에 따라 response 데이터 형식이 달라 빈 배열에 push
  zoomLevel < 3
    ? positions && markerArray.push(...positions)
    : 2 < zoomLevel < 5
    ? positions &&
      positions?.map((value) => {
        if (Array.isArray(value)) {
          value?.map((el) => {
            markerArray.push(el);
          });
        }
      })
    : zoomLevel > 4 && markerArray.push(...positions);

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
      {modalOpen && <TotalModal modalHandler={modalHandler} />}
      {modalOpen && <SubModal modalHandler={modalHandler} />}
      <StContainer>
        <SearchContainer>
          <StSearch
            type="text"
            onChange={onAddressHandler}
            value={searchAddress}
          />
          {searchAddress && (
            <AutoSearchContainer>
              <AutoSearchWrap>
                {searchData?.map((el, index) => {
                  return (
                    <AutoSearchData key={searchData.index}>{el}</AutoSearchData>
                  );
                })}
              </AutoSearchWrap>
            </AutoSearchContainer>
          )}
          <button onClick={onSearchHandler}>검색</button>
        </SearchContainer>
        <StReviewContainer></StReviewContainer>
        <StMapContainer>
          <Map // 지도를 표시할 Container
            center={state.center}
            isPanto={state.isPanto}
            style={{
              // 지도의 크기
              width: "60%",
              height: "100%",
            }}
            ref={mapRef}
            level={3} // 지도의 확대 레벨
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
            }, 100)}
          >
            //마커
            {markerArray.map((el) => {
              return (
                <MapMarker
                  key={`${el.estateId}-${el.lat}`}
                  position={el}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                    size: {
                      width: 24,
                      height: 35,
                    }, // 마커이미지의 크기입니다
                  }}
                  // title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  onClick={modalHandler}
                />
              );
            })}
            //커스텀 오버레이
            {zoomLevel > 8
              ? positions &&
                positions.map((el) => {
                  return (
                    <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                      key={el.lat}
                      position={el}
                    >
                      {/* 커스텀 오버레이에 표시할 내용입니다 */}
                      <div
                        className="label"
                        style={{ color: "#000", backgroundColor: "red" }}
                      >
                        <span className="left"></span>
                        <span className="center">{el.doName}</span>
                        <span className="right"></span>
                      </div>
                    </CustomOverlayMap>
                  );
                })
              : 6 < zoomLevel < 9
              ? positions &&
                positions.map((el) => {
                  return (
                    <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                      key={el.lat}
                      position={el}
                    >
                      {/* 커스텀 오버레이에 표시할 내용입니다 */}
                      <div
                        className="label"
                        style={{ color: "#000", backgroundColor: "blue" }}
                      >
                        <span className="left"></span>
                        <span className="center">{el.cityName}</span>
                        <span className="right"></span>
                      </div>
                    </CustomOverlayMap>
                  );
                })
              : null}
          </Map>
        </StMapContainer>
      </StContainer>
    </>
  );
};
export default MainMap;

const StContainer = styled.div`
  max-width: 1920px;
  min-width: 680px;
  height: 855px;
`;
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border: 0;
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
  height: 20vh;
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
const StReviewContainer = styled.div``;

const StMapContainer = styled.div`
  width: 100%;
  height: 100%;
`;