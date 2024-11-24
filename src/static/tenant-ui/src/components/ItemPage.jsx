import React from "react";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Item {id}</h1>
      <button>Disable</button>
    </div>
  );
};

export default ItemPage;
