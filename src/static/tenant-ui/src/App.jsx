import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRouter from "./components/AuthRouter";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ItemList from "./components/ItemList";
import ItemPage from "./components/ItemPage";
import UserList from "./components/UserList";
import UserPage from "./components/UserPage";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthRouter />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
