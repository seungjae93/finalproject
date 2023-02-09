import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { __kakaoLogout } from "../redux/modules/kakaoSlice";
import { useMutation } from "@tanstack/react-query";
import logo from "../images/logo.webp";

const Header = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(false);

  const { login } = useSelector((state) => state.user);

  const { mutate } = useMutation(__kakaoLogout, {
    onSuccess: () => {
      navigate("/");
    },
  });

  const logout = () => {
    window.alert("감사합니다!");
    localStorage.clear();
    setUserStatus(false);
    mutate();
  };

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  };

  const onLogin = () => {
    navigate("/login");
  };

  const onCommentHandler = () => {
    if (!userStatus) {
      alert("로그인을 해주세요");
      navigate("/login");
    } else navigate("/review");
  };

  useEffect(() => {
    checkToken();
  }, [login]);

  return (
    <>
      <StNavbar>
        <div className="header">
          <StLogo
            src={logo}
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

            <StNavbarMenuItem onClick={onCommentHandler}>
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
  background-color: #ffffff;
  width: 100vw;
  min-width: 1420px;
  height: 80px;
  border-bottom: 1px solid #c4cbcd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  .header {
    width: 100%;
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
  gap: 25px;
`;

const StNavbarMenuItem = styled.div`
  font-size: 17px;
  cursor: pointer;
`;
