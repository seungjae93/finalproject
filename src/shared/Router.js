import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Header from "../components/Header";
import MainMap from "../pages/MainMap";
import KakaoLogin from "../pages/KakaoLogin";
import Login from "../pages/Login";
import Review from "../pages/Review";
import Mypage from "../pages/Mypage";
import PostList from "../pages/PostCommunity/PostList";
import PostForm from "../components/Community/PostForm";
import PostDetail from "../pages/PostCommunity/PostDetail";
import PostEdit from "../pages/PostCommunity/PostEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MainMap />} />
        <Route path="/auth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<Review />} />
        <Route path="/mypage" element={<Mypage />} />

        <Route path="/list" element={<PostList />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/:postId" element={<PostDetail />} />
        <Route path="/edit/:postId" element={<PostEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
