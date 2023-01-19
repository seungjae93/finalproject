import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import proflie from "../img/proflie.png";
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
    if (getCookie("token")) {
      checkCookie();
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <StNavbar>
        <div>
          <StLogo
            src={require("../images/logo.jpg")}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <StNavbarMenu>
          <StNavbarMenuItem
            onClick={() => {
              navigate("/");
            }}
          >
            서비스 소개
          </StNavbarMenuItem>
          <StNavbarMenuItem
            onClick={() => {
              navigate("/map");
            }}
          >
            지도
          </StNavbarMenuItem>
          <StNavbarMenuItem
            onClick={() => {
              navigate("/review");
            }}
          >
            후기작성
          </StNavbarMenuItem>
          <StNavbarMenuItem
            onClick={() => {
              navigate("/list");
            }}
          >
            커뮤니티
          </StNavbarMenuItem>
          <StNavbarMenuItem
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이페이지
          </StNavbarMenuItem>

          {userStatus ? (
            <img className="profile" alt="proflie" src={proflie}></img>
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
  cursor: pointer;
  padding-left: 8vw;
`;

const StNavbarMenu = styled.ul`
  display: flex;
  padding-top: 5vh;
`;

const StNavbarMenuItem = styled.button`
  border: none;
  background-color: transparent;
  font-size: 17px;
  padding: 10px 4px;
  margin: 5px;
  cursor: pointer;
  position: relative;
  left: -10%;
  top: -3vh;
  justify-content: flex-end;
`;
