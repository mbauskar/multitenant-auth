import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { saveUser } from "../services/users";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const setUserValues = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSignUp = async () => {
    const response = await saveUser(user);
    if (response?.error) {
      setError(response?.error);
      return;
    }
    alert("Signed up successfullly ...");
    navigate("/login");
  };

  return (
    <div className="signup">
      <div className="signup-form">
        <h1>Signup</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group pb-2">
            <label htmlFor="username">Username</label>
            <input
              required
              id="username"
              className="form-control"
              placeholder="Enter username"
              aria-describedby="usernameHelp"
              onChange={setUserValues}
            />
            <small id="usernameHelp" className="form-text text-muted">
              Enter your username to login.
            </small>
          </div>
          <div className="form-group pb-2">
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={setUserValues}
            />
          </div>
          <div className="form-group pb-2">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              placeholder="First Name"
              className="form-control"
              onChange={setUserValues}
            />
          </div>
          <div className="form-group pb-2">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              placeholder="Last Name"
              className="form-control"
              onChange={setUserValues}
            />
          </div>
          <div className="form-group pb-2">
            <label htmlFor="email">Email Id</label>
            <input
              required
              id="email"
              type="email"
              placeholder="Email Id"
              className="form-control"
              onChange={setUserValues}
            />
          </div>
          <div className="pt-2">
            <button onClick={handleSignUp} className="btn btn-primary w-100">
              Sign Up
            </button>
          </div>
          {error ? <div className="py-2 error text-center">{error}</div> : null}
        </form>
      </div>
    </div>
  );
};

export default Signup;
