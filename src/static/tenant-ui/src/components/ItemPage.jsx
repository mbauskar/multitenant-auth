import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { fetchItem, saveItem, enableDisableItem } from "../services/items";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const {
    userProfile: { isAdmin = false },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchItem(id);
      if (response?.error) {
        setError(response?.error);
        return;
      }

      setItem(response);
    };

    fetch();
  }, []);

  const setItemValues = (e) => {
    setItem({ ...item, [e.target.id]: e.target.value });
  };

  const save = async () => {
    setError("");
    setStatus("");
    const response = await saveItem(item);
    if (response?.error) {
      setError(response?.error);
      return;
    }

    setStatus("Item saved successfully ...");
  };

  const disableOrEnable = async () => {
    setError("");
    setStatus("");
    const response = await enableDisableItem(item?.id, !item?.is_disabled);
    if (response?.error) {
      setError(response?.error);
      return;
    }

    setItem({ ...item, is_disabled: !item?.is_disabled });
    setStatus(response?.status);
  };

  return (
    <div className="product-form">
      <div className="form-group pb-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={item?.name || ""}
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
          value={item?.price || ""}
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
            className={`btn ${!item.is_disabled ? "btn-danger" : "btn-success"} mx-2`}
          >
            {!item.is_disabled ? "Disable" : "Enable"} Product
          </button>
        </div>
      ) : null}
      {error ? <div className="py-2 error text-center">{error}</div> : null}
      {status ? <div className="py-2 success text-center">{status}</div> : null}
    </div>
  );
};

export default ItemPage;
