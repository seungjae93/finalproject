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
      navigate("/login");
    } else navigate("/review");
  };

  useEffect(() => {
    checkCookie();
  }, [login]);

  useEffect(() => {
    const logout = () => {
      setUserStatus(false);
    };
    window.addEventListener("storage", logout);
    return () => window.removeEventListener("storage", logout);
  }, []);

  return (
    <>
      <StNavbar>
        <div className="header">
          <StLogo
            src={require("../images/logo.jpg")}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />

          <StNavbarMenu>
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
        </div>
      </StNavbar>
    </>
  );
};

export default Header;

const StNavbar = styled.div`
  max-width: 1920px;
  min-width: 900px;
  height: 80px;
  border-bottom: 1px solid #c4cbcd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  .header {
    width: 1600px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const StLogo = styled.img`
  width: 144px;
  height: 50px;
  cursor: pointer;
`;

const StNavbarMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StNavbarMenuItem = styled.div`
  font-size: 17px;
  cursor: pointer;
`;
