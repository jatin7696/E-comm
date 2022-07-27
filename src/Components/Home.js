import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import stripecheckout from "reat-stripe-checkout";

import Cart from "./Cart";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [trial, setTrial] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [CartIt, setCartIt] = useState([]);
  const url = "http://localhost:8080";
  const cartArr = [];

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  // console.log("top pagenumber", pageNumber);

  function ab(ci) {
    ci.find((x) => {
      //  console.log("this is another function ====", x._id);
    });
  }
  ab(cartItems);

  useEffect(() => {
    getProducts();
  }, [pageNumber]);

  /********************************** Get Products from backend through API ********************************************************* */

  const getProducts = async () => {
    try {
      let result = await fetch(`${url}/api/products?page=${pageNumber}`, {
        method: "GET",
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      // var newArrayDataOfOjbect = result.values(data)
      //let entries = Object.values(result);
      //  console.log("this is company=== ", result);

      //   console.log("this isb price ", typeof result);
      // if (result) {
      //productsAll = result;
      //console.log(entries, "==== all data");
      // }

      //console.log(result, "==== all data");
      // setfilterProducts(productsAll);
      //setProducts(result);
      setProducts(result.products);
      setTrial(result.products);
      setNumberOfPages(result.totalPages);
    } catch (err) {
      // console.log("error occured === ", err);
    }
  };
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(pageNumber + 1, numberOfPages - 1));
  };
  const deleteProduct = async (id) => {
    //console.log("this is deleted id ======", id);
    let result = await fetch(`${url}/api/delete/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  /********************************** Search Products from backend through API ********************************************************* */

  const searchHandle = async (event) => {
    let key = event.target.value;
    //  console.log("this is search >> ", key);
    if (key) {
      let result = await fetch(`${url}/api/search/${key}`);
      result = await result.json();
      //   console.log("thisisreturnbsearchhhhhhhhhhhhhhhh", result);
      if (result) {
        setTrial(result);
      }
    } else {
      getProducts();
    }
  };

  // console.log(products);

  /********************************** Filter Function ********************************************************* */

  const filterResult = async (pr) => {
    // console.log(pr)
    const result = await products.filter((currData) => {
      //  console.log(currData.category, pr);
      // console.log("this is under filter === ", currData);
      return currData.category === pr;
    });

    // setProducts(result);
    setTrial(result);
  };

  // const funToAdd = (items, arr) => {
  //   let i = 0;
  //   arr[i] = items;
  //   i = i + 1;
  //   return arr;
  // };

  /********************************** ADD TO CART functionality ********************************************************* */
  const addToCart = async (product) => {
    // console.log("this is ppppppppppppppppppp   ", product._id);
    //const addToCart

    // console.log("cart array ", cartArr);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    //  console.log("userId ==== ", userId);
    //  console.log("this is reacting prodyct  ===  ", product);
    //setCart([...cart, product]);
    //let cartArr = funToAdd(product, cart);
    // console.log("cartArray ", cartArr);
    // cartArr.push(product);
    // cartArr.push();
    // console.log("cartArray1 1 ", cartArr);

    //setCart([...cart, product]);
    // if (setCart === []) {
    //   console.log("this is under if condition of setcart");
    //   setCart([...Cart, product]);
    // } else {
    //   console.log("this is under else condition of setcart");
    //setCart([...cart, product]);
    // }
    //setCartIt([(CartIt) => product]);
    //console.log("thisissetcartit == ", setCartIt);
    //console.log("this is reacting ==  > ", cartArr);
    // let addToCart = await fetch("http://localhost:8080/addToCart", {
    //   method: "post",
    //   body: JSON.stringify(product),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // headers: {
    //   authorization: JSON.parse(localStorage.getItem("token")),
    // },
    // });
    // console.log("this is reactingsssss ==  > ", addToCart);
    //setCart([...cart, product]);
    const exist = cartItems.find((x) => x._id == product._id);
    if (exist) {
      //   console.log("under exit condition");
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id
            ? {
                ...exist,
                qty: exist.qty + 1,
              }
            : x
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const cartPage = () => {
    navigate("/Cart");
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id
            ? {
                ...exist,
                qty: exist.qty - 1,
              }
            : x
        )
      );
    }
  };

  return (
    <div className="product-list">
      <h1> Product List </h1>
      <button className="cat" onClick={() => cartPage()}>
        Go To Cart({cart.length})
      </button>
      {/* <h1>Page of {pageN umber + 1}</h1>*/}
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <div className="cat-div">
        <button className="cat" onClick={() => filterResult("Mobile")}>
          <b> Mobile </b>
        </button>
        <button className="cat" onClick={() => filterResult("Food")}>
          <b> Food </b>
        </button>
        <button className="cat" onClick={() => getProducts()}>
          <b> All </b>
        </button>
        <Cart
          cartItems={cartItems}
          addToCart={addToCart}
          onRemove={onRemove}
          countCartItems={cartItems.length}
        ></Cart>
      </div>
      <div class="container">
        <div class="row row-cols-6">
          <div class="col" className="Colitems">
            <b className="font"> S.No </b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Name </b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Price </b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Category </b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> compamy </b>
          </div>
          <div class="col" className="Colitems">
            <b className="font"> Operation </b>
          </div>
        </div>
      </div>
      {trial ? (
        trial.map((item, index) => (
          <div class="container">
            <div class="row row-cols-6" key={index}>
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
                <button onClick={() => addToCart(item)}> Add To Cart </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1> No Result Found </h1>
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
