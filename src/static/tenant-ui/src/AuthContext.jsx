import React, { createContext, useState } from "react";
import { loginUser } from "./services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    const { isLoggedIn = false, error = "" } = await loginUser(
      username,
      password,
    );
    setIsAuthenticated(isLoggedIn);
    setLoginError(error);
  };
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{ loginError, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
