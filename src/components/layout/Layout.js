import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100vw;
  box-sizing: border-box;
`;

const Main = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;
