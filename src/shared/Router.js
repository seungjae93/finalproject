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
import PrivateRoutes from "../shared/PrivateRoutes";
import ScrollToTop from "./ScrollToTop";
import PostForm from "../components/Community/PostForm";

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
          <Route path="/post" element={<PostForm />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/edit/:postId" element={<PostEdit />} />
        </Route>
        <Route path="/list" element={<PostList />} />
        <Route path="/:postId" element={<PostDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
