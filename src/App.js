import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { lazy, Suspense, useContext, useEffect } from "react";
import { LoginContext } from "./api/loginContextApi";
import PageLoading from "./components/layout/PageLoading";

const Loading = <PageLoading />;
const Login = lazy(() => import("./components/pages/LoginPage"));
const Enroll = lazy(()=>import("./components/pages/EnrollPostPage"));

function App() {
  const { setIsLogin } = useContext(LoginContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  return (
    <Container>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={Loading}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={Loading}>
                <Enroll />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  position: relative;
`;
