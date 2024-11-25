import React, { createContext, useState } from "react";
import { loginUser, logoutUser } from "./services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    const {
      isLoggedIn = false,
      error = "",
      userProfile = {},
    } = await loginUser(username, password);
    setLoginError(error);
    setIsAuthenticated(isLoggedIn);
    const roles = userProfile?.roles || [];
    setUserProfile({ ...userProfile, isAdmin: roles.includes("Admin") });
  };
  const logout = async () => {
    const loggedOut = await logoutUser();
    if (loggedOut) {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loginError, isAuthenticated, login, logout, userProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
