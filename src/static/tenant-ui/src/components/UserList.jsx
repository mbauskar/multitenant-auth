import React from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - <Link to={`/users/${user.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
