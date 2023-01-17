import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { __kakaoLogin } from "../redux/modules/kakaoSlice";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const Auth = () => {
    const code = location.search.split("=")[1];
    dispatch(__kakaoLogin(code));
  };

  useEffect(() => {
    Auth();
    navigate("/");
  }, []);

  return (
    <>
      <div> 로딩중 </div>
    </>
  );
};

export default KakaoLogin;
