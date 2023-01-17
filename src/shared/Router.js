import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Header from "../components/Header";
import Community from "../pages/Community";
import MainMap from "../pages/MainMap";
import KakaoLogin from "../pages/KakaoLogin";
import Login from "../pages/Login";
import Review from "../pages/Review";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/comm" element={<Community />} />
        <Route path="/map" element={<MainMap />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
