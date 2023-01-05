import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import KakaoLogin from "../pages/KakaoLogin";
import Main from "../pages/Main";
import Header from "../component/Header";
import Community from "../pages/Community";
import AddPost from "../pages/AddPost";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/post" element={<AddPost />} />
        <Route path="/comm" element={<Community />} />
        <Route path="/" element={<Main />} />
        {/* <Route path="/auth/kakao" element={<KakaoLogin />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
