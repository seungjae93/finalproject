import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingSpinner from "../components/loading/LoadingSpinner";
const MainPage = React.lazy(() => import("../pages/MainPage"));
const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
const MainMap = React.lazy(() => import("../pages/MainMap"));
const KakaoLogin = React.lazy(() => import("../pages/KakaoLogin"));
const Login = React.lazy(() => import("../pages/Login"));
const ReviewPage = React.lazy(() => import("../pages/ReviewPage"));
const Mypage = React.lazy(() => import("../pages/Mypage"));
const PostList = React.lazy(() => import("../pages/PostCommunity/PostList"));
const PostDetail = React.lazy(() =>
  import("../pages/PostCommunity/PostDetail")
);
const PostEdit = React.lazy(() => import("../pages/PostCommunity/PostEdit"));
const PrivateRoutes = React.lazy(() => import("../shared/PrivateRoutes"));
const ScrollToTop = React.lazy(() => import("./ScrollToTop"));
const PostForm = React.lazy(() => import("../components/Community/PostForm"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
