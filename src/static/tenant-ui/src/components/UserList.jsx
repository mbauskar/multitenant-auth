import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchUsers } from "../services/users";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchUsers();
      if (response?.error) {
        setError(response?.error);
        return;
      }
      setUsers(response.users);
    };

    fetch();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - <Link to={`/users/${user.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
