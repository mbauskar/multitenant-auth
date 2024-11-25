import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../services/items";
import Table from "./Table";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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
      <h1>Items</h1>
      <Table items={items} columns={columns} onRowClick={onRowClick} />
    </div>
  );
};

export default ItemList;
