import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import kakaologo from "../img/kakaologo.png";
import { __kakaoLogin } from "../redux/modules/kakaoSlice";

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  // const code = new URL(window.location.href).searchParams.get("code");
  const code = location.search.split("=")[1];

  const hendleKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
    dispatch(__kakaoLogin(code));
  };

  return (
    <>
      <a href={KAKAO_AUTH_URL} onClick={hendleKakao}>
        <img alt="kakaologo" src={kakaologo}></img>
      </a>

      <div>{code}</div>
    </>
  );
};

export default KakaoLogin;
