import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie, deleteCookie } from "../shared/cookie";

const Header = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(false);

  const checkCookie = () => {
    if (getCookie("token")) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  };

  const logout = () => {
    deleteCookie("token");
    window.alert("로그아웃 하시겠습니까?");
    setUserStatus(false);
    navigate("/");
  };

  const login = () => {
    navigate("/login");
    checkCookie();
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <>
      {/* Navbar */}
      <StNavbar>
        <div>
          <StLogo src={require("../images/logo.jpg")} alt="logo" />
        </div>
        <StNavbarMenu>
          <StNavbarMenuItem>서비스 소개</StNavbarMenuItem>
          <StNavbarMenuItem>지도</StNavbarMenuItem>
          <StNavbarMenuItem>후기작성</StNavbarMenuItem>
          <StNavbarMenuItem>커뮤니티</StNavbarMenuItem>
          <StNavbarMenuItem>마이페이지</StNavbarMenuItem>

          {userStatus ? (
            <StImg
              className="profile"
              alt="proflie"
              src={require("../images/proflie.jpg")}
            ></StImg>
          ) : (
            <StNavbarMenuItem onClick={login}>로그인 </StNavbarMenuItem>
          )}
          <StNavbarMenuItem className="logoutBtn" onClick={logout}>
            로그아웃
          </StNavbarMenuItem>
        </StNavbarMenu>
      </StNavbar>
    </>
  );
};

export default Header;

const StNavbar = styled.nav`
  border-bottom: 1px solid #c4cbcd;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: center;
  padding: 5px;
  font-family: "Open Sans", sans-serif;
`;

const StLogo = styled.img`
  width: 200px;
  height: 70px;
`;

const StNavbarMenu = styled.ul`
  display: flex;
  padding-left: 0;
  padding-top: 5%;
`;

const StNavbarMenuItem = styled.li`
  list-style: none;
  padding: 7px 4px;
  margin: 8px;
  cursor: pointer;
  position: relative;
  left: -10%;
  top: -3vh;
  justify-content: flex-end;
`;

const StImg = styled.img`
  position: relative;
  left: -10%;
  top: -3vh;
`;
