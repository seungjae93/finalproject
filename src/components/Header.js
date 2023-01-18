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
    <Wrap>
      {userStatus ? (
        <img alt="proflie" src={proflie}></img>
      ) : (
        <button onClick={login}>로그인 </button>
      )}

      <button onClick={logout}> 로그아웃 </button>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  display: flex;
  background-color: powderblue;
  width: 100%;
  height: 3rem;
`;
