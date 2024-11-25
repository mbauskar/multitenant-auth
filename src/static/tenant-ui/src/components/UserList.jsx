import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "./Table";

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

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "username",
      label: "Username",
    },
    {
      name: "first_name",
      label: "First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      <Table items={users} columns={columns} />
    </div>
  );
};

export default UserList;
