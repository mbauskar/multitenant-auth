import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/items">Items</Link> | <Link to="/users">Users</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
