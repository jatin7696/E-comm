import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  console.log("this is props === ", props);
  const navigate = useNavigate();
  const { cartItems, addToCart, onRemove } = props;
  console.log("this is cartitems === ", cartItems.length);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  console.log("totalPrice " + totalPrice);
  async function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };

    script.onload = async () => {
      try {
        //setLoading(true);
        console.log("running");
        const result = await axios.post("http://localhost:8080/create-order", {
          amount: totalPrice,
        });
        console.log("resultfromorder   ", result.data);
        const { amount, id: order_id, currency } = result.data;

        const {
          data: { key: razorpayKey },
        } = await axios.get("http://localhost:8080/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "example name",
          description: "example transaction",
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post("http://localhost:8080/pay-order", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
            navigate("/Cart");
            // fetchOrders();
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        //setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        // setLoading(false);
      }
    };
    document.body.appendChild(script);
  }
  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button className="remove" onClick={() => onRemove(item)}>
                -
              </button>{" "}
              <button
                key={item.id}
                className="add"
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ${item.price}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={loadRazorpay}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Cart;
