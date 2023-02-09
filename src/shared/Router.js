import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import ScrollToTop from "../shared/ScrollToTop";
import MainMap from "../pages/map/MainMap";
import KakaoLogin from "../pages/login/KakaoLogin";
import Login from "../pages/login/Login";
import ReviewPage from "../pages/reviewpage/ReviewPage";
import Mypage from "../pages/mypage/Mypage";
import PostList from "../pages/community/PostList";
import PostDetail from "../pages/community/PostDetail";
import PostEdit from "../pages/community/PostEdit";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<MainMap />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
        <Route path="/list" element={<PostList />} />
        <Route path="/:postId" element={<PostDetail />} />
        <Route path="/edit/:postId" element={<PostEdit />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
