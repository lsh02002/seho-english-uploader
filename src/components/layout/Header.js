import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../../api/loginContextApi";
import { UserLogout } from "../../api/sehomallApi";

const Header = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);

  const OnLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      UserLogout().catch((err) => {
        console.error("logout ", err);
      });
      localStorage.removeItem("nickname");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLogin(false);
    }
  };

  return (
    <Container>
      <Menu>        
        <Link to="/enroll">ENROLL</Link>
        {!isLogin ? (
          <>
            <Link to="/signup">SIGNUP</Link>
            <Link to="/login">LOGIN</Link>
          </>
        ) : (
          <>
            <Link onClick={OnLogout}>LOGOUT</Link>
          </>
        )}       
      </Menu>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 10px;
  opacity: 1;
  z-index: 5;
`;

const Menu = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.65);
  a {
    text-decoration: none;
    color: black;
  }
  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: gray;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 14px;
    padding-left: 2px;
  }
`;
