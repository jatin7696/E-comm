import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct } from "./Components/AddProduct";
import Nav from "./Components/Nav";
import "./App.css";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PrivateComponent from "./Components/PrivateComponent";
//import "bootstrap/dist/css/bootstrap.css";
//import Carousel from "./Components/Carousel";
import UpdateProduct from "./Components/Update";
import ContactUs from "./Components/ContactUs";
// import Cart from "./Components/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/" element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/Contact" element={<ContactUs />} />
            {/*<Route path="/Cart" element={<Cart />} />*/}
          </Route>

          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
