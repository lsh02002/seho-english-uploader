import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideMenu = () => {
  return (
    <Container>
      <Title>
        <Link to="/">
          SEHOMALL <span>(clone coding)</span>
        </Link>
      </Title>
      <CatLink to={"/cat/new"}>NEW ARRIVAL</CatLink>
      <CatLink to={"/cat/BAGS"}>BAGS</CatLink>
      <CatLink to={"/cat/WALLETS"}>WALLETS</CatLink>
      <CatLink to={"/cat/ACCESSORIES"}>ACCESSORIES</CatLink>
      <CatLink to={"/cat/SCARVES"}>SCARVES</CatLink>
      <CatLink to={"/about"}>ABOUT</CatLink>
      <CatLink to={"/notice?page=1&size=5"}>NOTICE</CatLink>
      <CatLink to={"/contact"}>CONTACT</CatLink>
      <CatLink to={"/instagram"}>INSTAGRAM</CatLink>
    </Container>
  );
};

export default SideMenu;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  margin-top: 10px;
  padding: 30px 0 30px 0;
  // border: 1px solid lightgray;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.65);
  a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.div`
  width: 100%;
  font-size: 40px;
  color: red;
  span {
    font-size: 18px;
  }
`;

const CatLink = styled(Link)`
  width: 100%;
  padding: 0 0 0 30px;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(82, 72, 72, 0.1);
  }
`;
