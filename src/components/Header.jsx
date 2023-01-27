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
    if (!userStatus) {
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
          <div>
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
          </div>
          {userStatus ? (
            <>
              <StNavbarMenuItem
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                마이페이지
              </StNavbarMenuItem>
              <StNavbarMenuItem className="logoutBtn" onClick={logout}>
                로그아웃
              </StNavbarMenuItem>
            </>
          ) : (
            <StNavbarMenuItem onClick={onLogin}>로그인</StNavbarMenuItem>
          )}
        </StNavbarMenu>
      </StNavbar>
    </>
  );
};

export default Header;

const StNavbar = styled.nav`
  border-bottom: 1px solid #c4cbcd;

  align-items: center;
  display: flex;
  width: 100%;
  height: 80px;
  background-color: white;
  font-family: "Open Sans", sans-serif;
`;

const StLogo = styled.img`
  width: 200px;
  height: 70px;
  cursor: pointer;
  padding-left: 200px;
`;

const StNavbarMenu = styled.ul`
  display: flex;
  padding-top: 10px;
  padding-left: 500px;
  align-items: center;
  justify-content: space-between;
`;

const StNavbarMenuItem = styled.button`
  border: none;
  background-color: transparent;
  font-size: 17px;
  padding-left: 20px;
  align-items: flex-end;
  cursor: pointer;
`;
