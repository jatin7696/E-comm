import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Nav = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Login");
  };
  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://cdn3.vectorstock.com/i/1000x1000/68/02/circle-swirl-round-business-2d-logo-vector-4056802.jpg"
      />
      {auth ? (
        <ul className="Nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/AddProduct">Add Product</Link>
          </li>
          <li>
            <Link to="/Update">Update Product</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
          <li>
            <Link to="/Signup" onClick={logout}>
              Logout {auth.name}
            </Link>
          </li>
          <li>
            <Link to="/Cart" className="cart-right">
              Cart
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="Nav-ul nav-right">
          {" "}
          <li>
            <Link to="/Login">login</Link>
          </li>
          <li>
            <Link to="/Signup">SignUp</Link>
          </li>{" "}
        </ul>
      )}
    </div>
  );
};

export default Nav;
