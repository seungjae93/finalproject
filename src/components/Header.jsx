import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie, deleteCookie } from "../shared/cookie";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(false);

  const { login } = useSelector((state) => state.user);

  const checkCookie = () => {
    if (getCookie("token")) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  };

  const logout = () => {
    window.alert("로그아웃 하시겠습니까?");
    deleteCookie("token");
    localStorage.clear();
    setUserStatus(false);
    navigate("/");
  };

  const onLogin = () => {
    navigate("/login");
  };

  const onCommentHanler = () => {
    if (login === false) {
      alert("로그인을 해주세요");
    } else navigate("/review");
  };

  useEffect(() => {
    checkCookie();
  }, [login]);

  return (
    <>
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

          <StNavbarMenuItem onClick={onCommentHanler}>
            후기작성
          </StNavbarMenuItem>

          <StNavbarMenuItem
            onClick={() => {
              navigate("/list");
            }}
          >
            커뮤니티
          </StNavbarMenuItem>

          {userStatus ? (
            <>
              <StImg
                className="profile"
                alt="proflie"
                src={require("../images/proflie.jpg")}
                onClick={() => {
                  navigate("/mypage");
                }}
              ></StImg>
              <StNavbarMenuItem className="logoutBtn" onClick={logout}>
                로그아웃
              </StNavbarMenuItem>
            </>
          ) : (
            <Stkakalogin
              src={require("../images/kakaologo.jpg")}
              onClick={onLogin}
            ></Stkakalogin>
          )}
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
  justify-content: space-around;
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

const StImg = styled.img`
  position: relative;
  left: -10%;
  top: -3vh;
  cursor: pointer;
`;

const Stkakalogin = styled.img`
  position: relative;
  left: -10%;
  top: -3vh;
  cursor: pointer;
`;
