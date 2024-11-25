import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRouter from "./components/AuthRouter";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import UserList from "./components/UserList";
import UserPage from "./components/UserPage";
import Layout from "./components/Layout";
import Signup from "./components/Signup";

import "./App.css";
import { AuthContext } from "./AuthContext";
import { fetchUserProfile } from "./services/users";

function App() {
  const { setUserProfile, setIsAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchUserProfile();
      if (response?.error) {
        setError(response?.error);
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);
      setUserProfile(response);
    };

    fetch();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<AuthRouter />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
