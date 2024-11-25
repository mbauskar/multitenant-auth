import Table from "./Table";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/products";
import React, { useEffect, useState, useContext } from "react";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const {
    userProfile: { isAdmin = false },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchProducts();
      if (response?.error) {
        // setError(response?.error);
        return;
      }
      setProducts(response.items);
    };

    fetch();
  }, []);

  const onRowClick = (item) => {
    const { id } = item;
    navigate(`/products/${id}`);
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
        items={products}
        columns={columns}
        onRowClick={onRowClick}
        allowRowClick={isAdmin}
      />
    </div>
  );
};

export default ProductList;
