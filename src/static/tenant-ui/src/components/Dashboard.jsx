import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  const {
    userProfile: { isAdmin = false },
  } = useContext(AuthContext);
  return (
    <div className="dashboard d-flex flex-column align-items-center h-100">
      <h1>Modules</h1>
      <div className="dashboard-items">
        <Link className="dashboard-item" to="/products">
          Products
        </Link>
        {isAdmin ? (
          <Link className="dashboard-item" to="/users">
            Users
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
