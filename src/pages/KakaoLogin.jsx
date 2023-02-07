import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { __kakaoLogin } from "../redux/modules/kakaoSlice";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

const KakaoLogin = () => {
  const isLogin = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const oAuth = () => {
    const code = location.search.split("=")[1];
    dispatch(__kakaoLogin(code));
  };

  useEffect(() => {
    if (!isLogin) return;
    navigate("/");
  }, [isLogin]);

  useEffect(() => {
    oAuth();
  }, []);

  return (
    <>
      <LoadingSpinner />
    </>
  );
};

export default KakaoLogin;
