import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import React, { useEffect, useState, useContext } from "react";
import {
  fetchProduct,
  saveProduct,
  enableDisableItem,
} from "../services/products";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const {
    userProfile: { isAdmin = false },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchProduct(id);
      if (response?.error) {
        setError(response?.error);
        return;
      }

      setProduct(response);
    };

    fetch();
  }, []);

  const setItemValues = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const save = async () => {
    setError("");
    setStatus("");
    const response = await saveProduct(product);
    if (response?.error) {
      setError(response?.error);
      return;
    }

    setStatus("Item saved successfully ...");
  };

  const disableOrEnable = async () => {
    setError("");
    setStatus("");
    const response = await enableDisableItem(
      product?.id,
      !product?.is_disabled,
    );
    if (response?.error) {
      setError(response?.error);
      return;
    }

    setProduct({ ...product, is_disabled: !product?.is_disabled });
    setStatus(response?.status);
  };

  return (
    <div className="product-form">
      <div className="form-group pb-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={product?.name || ""}
          className="form-control"
          placeholder="Enter name"
          aria-describedby="nameHelp"
          onChange={setItemValues}
        />
        <small id="nameHelp" className="form-text text-muted">
          This will be the product name.
        </small>
      </div>
      <div className="form-group pb-2">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          placeholder="price"
          className="form-control"
          value={product?.price || ""}
          onChange={setItemValues}
        />
      </div>
      {isAdmin ? (
        <div className="pt-2 text-center">
          <button onClick={save} className="btn btn-primary">
            Save Product
          </button>
          <button
            onClick={disableOrEnable}
            className={`btn ${!product.is_disabled ? "btn-danger" : "btn-success"} mx-2`}
          >
            {!product.is_disabled ? "Disable" : "Enable"} Product
          </button>
        </div>
      ) : null}
      {error ? <div className="py-2 error text-center">{error}</div> : null}
      {status ? <div className="py-2 success text-center">{status}</div> : null}
    </div>
  );
};

export default ProductPage;
