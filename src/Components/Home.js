import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//const Home1 = () => {};
const Home = () => {
  const [products, setProducts] = useState([]);
  // let [filterproducts, setfilterProducts] = useState([]);
  // let productsAll = [];
  // console.log(productsAll, "data");

  // console.log(productsAll, "==== all;;;;;;; data");
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8080/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log("this is company=== ", result);
    //console.log("this isb price ", result);
    // if (result) {
    // productsAll = result;
    // console.log(result, "==== all data");
    // }

    //console.log(result, "==== all data");
    // setfilterProducts(productsAll);
    //setProducts(result);
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log("this is deleted id ======", id);
    let result = await fetch(`http://localhost:8080/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    console.log("this is search >> ", key);
    if (key) {
      let result = await fetch(`http://localhost:8080/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  //console.log(productsAll, " all");
  const filterResult = async (pr) => {
    //setfilterProducts = pr;
    //getProducts();
    //console.log("this is filter function >> ", productsAll);
    const arr = products;
    const result = await arr.filter((currData) => {
      console.log("this is under filter === ", currData);
      return currData.category === pr;
    });
    //  [filterproducts, result];
    console.log("this is category >> ", result);
    //productsAll = result;
    //console.log(productsAll, "==== all;;;;;;; data");
    setProducts(result);
    // setTimeout(() => {
    //   console.log("this is under settimeout");
    //   getProducts();
    // }, 5000);
    // getProducts();
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <div className="cat-div">
        <button className="cat" onClick={() => filterResult("Mobile")}>
          <b> Mobile</b>
        </button>
        <button className="cat" onClick={() => filterResult("Food")}>
          <b>Food</b>
        </button>
        <button className="cat" onClick={() => getProducts()}>
          <b> All</b>
        </button>
      </div>
      <div class="container">
        <div class="row row-cols-6">
          <div class="col" className="Colitems">
            <b className="font"> S. No</b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Name</b>
          </div>
          <div class="col" className="Colitems">
            <b className="font">Price</b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Category</b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> compamy</b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Operation</b>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        products.map((item, index) => (
          <div class="container">
            <div class="row row-cols-6" key={item._id}>
              <div class="col" className="Colitems">
                {index + 1}
              </div>
              <div class="col" className="Colitems">
                {item.name}
              </div>
              <div class="col" className="Colitems">
                {item.price}
              </div>
              <div class="col" className="Colitems">
                {item.category}
              </div>
              <div class="col" className="Colitems">
                {item.company}
              </div>
              <div class="col" className="Colitems">
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="delBtn"
                >
                  Delete
                </button>
                <Link to={"/update/" + item._id}>Update </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
    // <input
    //   type=""
    //   className="search-product-box"
    //   placeholder="Search Product"
    //   onChange={searchHandle}
    // />

    // <ul>
    //   <li>S. No.</li>
    //   <li>Name</li>
    //   <li>Price</li>
    //   <li>Category</li>
    //   <li>compamy</li>
    //   <li>Operation</li>
    // </ul>
    // {products.length > 0 ? (
    //   products.map((item, index) => (
    //     <ul key={item._id}>
    //       <li>{index + 1}</li>
    //       <li>{item.name}</li>
    //       <li>{item.price}</li>
    //       <li>{item.category}</li>
    //       <li>{item.company}</li>

    //       <li>
    //         <button onClick={() => deleteProduct(item._id)} className="delBtn">Delete</button>
    //         {"   "}
    //         <Link to={"/update/" + item._id}>Update </Link>
    //       </li>
    //     </ul>
    //   ))
    // ) : (
    //   <h1>No Result Found</h1>
    // )}
    // <div className="cat-div">
    //   <button className="cat" onClick={() => filterResult("Mobile")}>
    //     Mobile
    //   </button>
    //   <button className="cat" onClick={() => filterResult("Food")}>
    //     Food
    //   </button>
    //   <button className="cat" onClick={() => getProducts()}>
    //     All
    //   </button>
    // </div>
  );
};

export default Home;
