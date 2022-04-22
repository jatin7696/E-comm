import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Signin");
  };
  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://yt3.ggpht.com/ytc/AKedOLR09bCpy_XTq2scU91URc0pWG0EqS_Yc_Zg-r9pBQ=s900-c-k-c0x00ffffff-no-rj"
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
            <Link to="/Logout" onClick={logout}>
              Logout
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
