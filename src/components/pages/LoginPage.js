import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserLogin } from "../../api/sehoEnglishUploaderApi";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../api/loginContextApi";
import Layout from "../layout/Layout";

const LoginPage = () => {
  const { setIsLogin } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const OnEmailChange = (e) => {
    setErrMessage("");
    setEmail(e.target.value);
  };

  const OnPasswordChange = (e) => {
    setErrMessage("");
    setPassword(e.target.value);
  };

  const OnLogin = () => {
    UserLogin(email, password)
      .then((res) => {
        console.log("login ", res);
        localStorage.setItem("nickname", res.data.data.nickname);
        localStorage.setItem("accessToken", res.headers.accesstoken);
        localStorage.setItem("refreshToken", res.headers.refreshtoken);

        setIsLogin(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setErrMessage(err.response.data.detailMessage);
        }
      });
  };

  return (
    <Layout>
      <Main>
        <Title>LOGIN</Title>
        <Email>
          <div>이메일</div>
          <input
            type="email"
            value={email}
            onChange={(e) => OnEmailChange(e)}
          />
        </Email>
        <Password>
          <div>패스워드</div>
          <input
            type="password"
            value={password}
            onChange={(e) => OnPasswordChange(e)}
          />
        </Password>
        {errMessage && <Error>{errMessage}</Error>}
        <Login onClick={OnLogin}>로그인</Login>
      </Main>
    </Layout>
  );
};

export default LoginPage;

const Main = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 360px;
  border: 1px solid lightgray;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-weight: normal;
  margin: 5px;
`;

const Email = styled.div`
  width: 100%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  input[type="email"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Password = styled.div`
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  input[type="password"] {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Login = styled.button`
  margin-top: 20px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: gray;
  cursor: pointer;
  color: white;
  transition: 0.2s;
  &:hover {
    background-color: lightgray;
  }
`;

const Error = styled.span`
  color: red;
  padding: 20px 0 0 0;
`;
