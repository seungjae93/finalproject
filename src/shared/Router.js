import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainMap from "../pages/MainMap";
import KakaoLogin from "../pages/KakaoLogin";
import Login from "../pages/Login";
import ReviewPage from "../pages/ReviewPage";
import Mypage from "../pages/Mypage";
import PostList from "../pages/PostCommunity/PostList";
import PostDetail from "../pages/PostCommunity/PostDetail";
import PostEdit from "../pages/PostCommunity/PostEdit";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
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
