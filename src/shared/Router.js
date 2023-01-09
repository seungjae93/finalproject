import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Header from "../components/Header";
import Community from "../pages/Community";
import AddPost from "../pages/AddPost";
import MainMap from "../pages/MainMap";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post" element={<AddPost />} />
        <Route path="/comm" element={<Community />} />
        <Route path="/map" element={<MainMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
