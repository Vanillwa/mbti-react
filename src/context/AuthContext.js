import { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const sessionUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const sessionIsLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(sessionIsLoggedIn);
  const [userInfo, setUserInfo] = useState(sessionUserInfo);
  const url = process.env.REACT_APP_SOCKET_URL;
  const socket = io(url, { withCredentials: true })

  const login = (info) => {
    sessionStorage.setItem("userInfo", JSON.stringify(info));
    sessionStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    setUserInfo(info);
    socket.emit("ask-join", res.userInfo.userId);
  };

  const logout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const memoUserInfo = useMemo(() => {
    return { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn };
  }, [userInfo, isLoggedIn]);

  return <AuthContext.Provider value={{ memoUserInfo, login, logout }}>{children}</AuthContext.Provider>;
};


export function useAuthContext() {
  return useContext(AuthContext);
}
