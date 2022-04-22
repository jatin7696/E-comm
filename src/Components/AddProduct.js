import React, { useState, useEffect } from "react";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setCompnay] = React.useState("");
  const [error, setError] = React.useState(false);
  const addProduct = async () => {
    console.log("jhjfgsjbdfbgjsbjk", name, price, category);
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:8080/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="register">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setcategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};
