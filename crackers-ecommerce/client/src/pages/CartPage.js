import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const gst = Math.round(total * 0.18);
  const final = total + gst;

  return (
    <div className="container mt-5">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between">
                <span>{item.title}</span>
                <div>
                  ₹{item.price}
                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>Subtotal: ₹{total}</p>
          <p>GST (18%): ₹{gst}</p>
          <h5>Total: ₹{final}</h5>
          <button className="btn btn-success">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
