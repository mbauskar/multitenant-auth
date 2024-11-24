import React from "react";
import { Link } from "react-router-dom";

const ItemList = () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

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
