import React from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();
  const error = "";

  return (
    <div className="user-form">
      <div className="form-group pb-2">
        <label htmlFor="name">Username</label>
        <input
          id="username"
          className="form-control"
          placeholder="Enter username"
          aria-describedby="usernameHelp"
          // onChange={(e) => setname(e.target.value)}
        />
        <small id="nameHelp" className="form-text text-muted">
          This will be the username used for login
        </small>
      </div>
      <div className="form-group pb-2">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter First Name"
          className="form-control"
          // onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <div className="form-group pb-2">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter Last Name"
          className="form-control"
          // onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <div className="pt-2 text-center">
        <button onClick={null} className="btn btn-primary">
          Save User
        </button>
        <button onClick={null} className="btn btn-danger mx-2">
          Disable User
        </button>
      </div>
      {error ? <div className="py-2 error text-center">{error}</div> : null}
    </div>
  );
};

export default UserPage;
