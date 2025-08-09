// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, updateQty, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   // State to keep track of selected item IDs
//   const [selectedItems, setSelectedItems] = useState([]);

//   // Update selectedItems when cart changes (e.g. item removed)
//   useEffect(() => {
//     // By default select all items when cart loads
//     setSelectedItems(cart.map((item) => item._id));
//   }, [cart]);

//   // Toggle selection of a single item
//   const toggleSelectItem = (id) => {
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
//     } else {
//       setSelectedItems([...selectedItems, id]);
//     }
//   };

//   // Calculate totals only for selected items
//   const selectedCartItems = cart.filter((item) => selectedItems.includes(item._id));

//   const subtotal = selectedCartItems.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );
//   const gst = subtotal * 0.18;
//   const total = subtotal + gst;

//   const handleCheckout = () => {
//     if (selectedItems.length === 0) {
//       alert("Please select at least one item to proceed.");
//       return;
//     }
//     // Option 1: Navigate and pass selected items via state or query param
//     // navigate("/checkout", { state: { selectedItems } });
    
//     // Option 2: Or you can store selected items in context or localStorage before navigating
//     // For simplicity, just navigating for now
//     navigate("/checkout");
//   };

//   return (
//     <div className="container py-4">
//       <h3>🛒 Your Cart</h3>

//       {cart.length === 0 ? (
//         <p>Cart is empty</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div className="card mb-3" key={item._id}>
//               <div className="d-flex justify-content-between align-items-center p-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(item._id)}
//                   onChange={() => toggleSelectItem(item._id)}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <div style={{ flexGrow: 1 }}>
//                   <h5>{item.title}</h5>
//                   <p>₹{item.price}</p>
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.qty}
//                     onChange={(e) =>
//                       updateQty(item._id, parseInt(e.target.value))
//                     }
//                     style={{ width: "60px" }}
//                   />
//                 </div>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => removeFromCart(item._id)}
//                 >
//                   ❌ Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <hr />
//           <h5>Subtotal: ₹{subtotal.toFixed(2)}</h5>
//           <h5>GST (18%): ₹{gst.toFixed(2)}</h5>
//           <h4>Total: ₹{total.toFixed(2)}</h4>

//           <button className="btn btn-primary mt-3" onClick={handleCheckout}>
//             ✅ Proceed to Checkout
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(cart.map((item) => item._id));
  }, [cart]);

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedCartItems = cart.filter((item) => selectedItems.includes(item._id));
  const subtotal = selectedCartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }
    navigate("/checkout", { state: { selectedItems: selectedCartItems } });
  };

  return (
    <div className="cart-page">
      <h3 className="cart-header">🛒 Shopping Cart</h3>

      {cart.length === 0 ? (
        <p className="empty-msg">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item-card" key={item._id}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => toggleSelectItem(item._id)}
                className="cart-checkbox"
              />

              <img src={item.image} alt={item.title} className="cart-item-image" />

              <div className="cart-item-details">
                <h5 className="cart-item-title">{item.title}</h5>
                <p className="cart-price">₹{item.price}</p>
                <div className="qty-container">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item._id, parseInt(e.target.value) || 1)
                    }
                  />
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h5>Subtotal: ₹{subtotal.toFixed(2)}</h5>
            <h5>GST (18%): ₹{gst.toFixed(2)}</h5>
            <h4>Total: ₹{total.toFixed(2)}</h4>
            <button className="checkout-btn" onClick={handleCheckout}>
              ✅ Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
