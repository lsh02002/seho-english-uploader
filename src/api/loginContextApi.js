import { createContext, useState } from "react";

const loginDefault = { isLogin: false, setIsLogin: () => {} };
const LoginContext = createContext(loginDefault);

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isHeartUpdated, setIsHeartUpdated] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, isHeartUpdated, setIsHeartUpdated }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
