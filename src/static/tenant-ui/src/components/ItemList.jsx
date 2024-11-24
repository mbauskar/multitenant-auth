import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../services/items";

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

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - <Link to={`/items/${item.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
