import Table from "./Table";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../services/items";
import React, { useEffect, useState, useContext } from "react";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const {
    userProfile: { isAdmin = false },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchItems();
      if (response?.error) {
        // setError(response?.error);
        return;
      }
      setItems(response.items);
    };

    fetch();
  }, []);

  const onRowClick = (item) => {
    const { id } = item;
    navigate(`/items/${id}`);
  };

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "name",
      label: "Product Name",
    },
    {
      name: "price",
      label: "Price",
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      <Table
        items={items}
        columns={columns}
        onRowClick={onRowClick}
        allowRowClick={isAdmin}
      />
    </div>
  );
};

export default ItemList;
