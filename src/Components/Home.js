import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//const Home1 = () => {};
const Home = () => {
  // let productsAll = [];
  //console.log(productsAll, "data");
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  // const [color, setcolor] = useState("whiteButton");
  // const [toggle, setToggle] = React.useState(false);

  //let [filterproducts, setfilterProducts] = useState([]);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  console.log("top pagenumber", pageNumber);

  useEffect(() => {
    getProducts();
  }, [pageNumber]);

  const getProducts = async () => {
    try {
      let result = await fetch(
        `http://localhost:8080/products?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      result = await result.json();
      // var newArrayDataOfOjbect = result.values(data)
      //let entries = Object.values(result);
      console.log("this is company=== ", result);

      //   console.log("this isb price ", typeof result);
      // if (result) {
      //productsAll = result;
      //console.log(entries, "==== all data");
      // }

      //console.log(result, "==== all data");
      // setfilterProducts(productsAll);
      //setProducts(result);
      setProducts(result.products);
      setNumberOfPages(result.totalPages);
    } catch (err) {
      console.log("error occured === ", err);
    }
  };
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(pageNumber + 1, numberOfPages - 1));
  };
  const deleteProduct = async (id) => {
    console.log("this is deleted id ======", id);
    let result = await fetch(`http://localhost:8080/delete/${id}`, {
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

  const filterResult = async (pr) => {
    //setfilterProducts = pr;
    //getProducts();
    //console.log("this is filter function >> ", productsAll);
    //const arr = products;
    //arr = products;
    const result = await products.filter((currData) => {
      console.log("this is under filter === ", currData);
      return currData.category === pr;
    });
    //  [filterproducts, result];
    console.log("this is category >> ", result);
    //productsAll = result;
    //console.log(productsAll, "==== all;;;;;;; data");
    setProducts(result);
    // setfilterProducts(result);
    // setTimeout(() => {
    //   console.log("this is under settimeout");
    //   getProducts();
    // }, 5000);
    // getProducts();
  };

  // let btn_class = this.state.black ? "blackButton" : "whiteButton";
  // function changeColor() {
  //   this.setcolor({ black: !this.setcolor.black });
  // }
  return (
    <div className="product-list">
      <h1>Product List</h1>
      {/* <h1>Page of {pageNumber + 1}</h1>*/}
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
      <button className="cat" onClick={gotoPrevious}>
        Previous
      </button>

      {pages.map((pageIndex) => (
        <button
          className="pagination-Btn"
          key={pageIndex}
          // style={{ backgroundColor: toggle ? "orange" : "white" }}
          onClick={() => {
            // setToggle(!toggle);
            setPageNumber(pageIndex);
          }}
          // onClick={() => {
          //   console.log("this is index", pageIndex);
          //   // document.body.style.backgroundColor = "salmon";
          //   // event.target.style.backgroundColor = "salmon";
          //   // item.style.backgroundColor = "#fff";

          //   setPageNumber(pageIndex);
          // }}
        >
          {pageIndex + 1}
        </button>
      ))}
      <button className="cat" onClick={gotoNext}>
        Next
      </button>
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
