import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated,
    loginError = "",
    tenantName,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirectIfLoggedIn = () => {
    if (!isAuthenticated) {
      return;
    }

    navigate("/dashboard");
  };

  useEffect(() => redirectIfLoggedIn(), []);
  useEffect(() => redirectIfLoggedIn(), [isAuthenticated]);
  useEffect(() => setError(loginError), [loginError]);

  const handleLogin = () => {
    setError("");
    if (!username.length || !password.length) {
      setError("Invalid username or password");
      return;
    }

    login(username, password);
  };

  return (
    <div className="px-4 d-flex flex-row h-100">
      <div className="banner" style={{ flex: 1 }}>
        <div>
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>
            {tenantName}
          </div>
          <div>
            Welcome to {tenantName}, Please Sign In or Sign Up to proceed
          </div>
        </div>
      </div>
      <div className="p-2 d-flex flex-row align-items-center">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group pb-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control"
              placeholder="Enter username"
              aria-describedby="usernameHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
            <small id="usernameHelp" className="form-text text-muted">
              Enter your username to login.
            </small>
          </div>
          <div className="form-group pb-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-2">
            <button onClick={handleLogin} className="btn btn-primary w-100">
              Login
            </button>
          </div>
          {error ? <div className="py-2 error text-center">{error}</div> : null}
          <hr />
          <div className="pt-2">
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-success w-100"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
