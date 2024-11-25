import React from "react";
import { useParams } from "react-router-dom";

const ItemPage = () => {
  const { id } = useParams();
  const error = "";

  return (
    <div className="product-form">
      <div className="form-group pb-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="form-control"
          placeholder="Enter name"
          aria-describedby="nameHelp"
          // onChange={(e) => setname(e.target.value)}
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
          // onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <div className="pt-2 text-center">
        <button onClick={null} className="btn btn-primary">
          Save Product
        </button>
        <button onClick={null} className="btn btn-danger mx-2">
          Disable Product
        </button>
      </div>
      {error ? <div className="py-2 error text-center">{error}</div> : null}
    </div>
  );
};

export default ItemPage;
