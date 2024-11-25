import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../services/items";
import Table from "./Table";

const ItemList = () => {
  // const [error, setError] = useState("");
  const [items, setItems] = useState([]);

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
      <h1>Items</h1>
      <Table items={items} columns={columns} />
    </div>
  );
};

export default ItemList;
