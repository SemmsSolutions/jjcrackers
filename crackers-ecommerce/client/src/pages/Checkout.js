// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import "../styles/Checkout.css";


// const Checkout = () => {
//   const location = useLocation();
//   const { cart, clearCart } = useCart();

//   // Check if coming from Buy Now
//   const productFromBuyNow = location.state?.product;
//   const items = productFromBuyNow
//     ? [{ ...productFromBuyNow, qty: 1 }]
//     : cart;

//   const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const gst = total * 0.18;
//   const grandTotal = total + gst;

//   // 📝 Form State
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [paymentMode, setPaymentMode] = useState("COD");

//   const handlePlaceOrder = async () => {
//     if (!name || !phone || !address) {
//       alert("⚠️ Please fill all details");
//       return;
//     }

//     const orderData = {
//       items,
//       total: grandTotal,
//       name,
//       phone,
//       address,
//       paymentMode,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (res.ok) {
//         alert("✅ Order Placed!");
//         if (!productFromBuyNow) clearCart();
//       } else {
//         alert("❌ Order Failed");
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//       alert("❌ Order Failed");
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h3>🧾 Order Summary</h3>
//       {items.map((item) => (
//         <div key={item._id}>
//           <p>{item.title} - ₹{item.price} x {item.qty}</p>
//         </div>
//       ))}
//       <h5>Subtotal: ₹{total.toFixed(2)}</h5>
//       <h5>GST (18%): ₹{gst.toFixed(2)}</h5>
//       <h4>Total: ₹{grandTotal.toFixed(2)}</h4>

//       <hr />
//       <h4>📝 Customer Details</h4>
//       <input
//         type="text"
//         placeholder="Full Name"
//         className="form-control mb-2"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="tel"
//         placeholder="Phone Number"
//         className="form-control mb-2"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <textarea
//         placeholder="Delivery Address"
//         className="form-control mb-2"
//         rows="3"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       ></textarea>

//       <label className="form-label">Payment Method</label>
//       <select
//         className="form-control mb-3"
//         value={paymentMode}
//         onChange={(e) => setPaymentMode(e.target.value)}
//       >
//         <option value="COD">Cash on Delivery</option>
//         <option value="Online">Online Payment</option>
//       </select>

//       <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
//         ✅ Confirm Order
//       </button>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import "../styles/Checkout.css";

// const Checkout = () => {
//   const location = useLocation();
//   const { cart, clearCart } = useCart();

//   // Check if coming from Buy Now
//   const productFromBuyNow = location.state?.product;
//   const items = productFromBuyNow
//     ? [{ ...productFromBuyNow, qty: 1 }]
//     : cart;

//   const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const gst = total * 0.18;
//   const grandTotal = total + gst;

//   // 📝 Form State
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [paymentMode, setPaymentMode] = useState("COD");

//   const handlePlaceOrder = async () => {
//     if (!name || !phone || !address) {
//       alert("⚠️ Please fill all details");
//       return;
//     }

//     const orderData = {
//       items,
//       total: grandTotal,
//       name,
//       phone,
//       address,
//       paymentMode,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (res.ok) {
//         alert("✅ Order Placed!");
//         if (!productFromBuyNow) clearCart();
//       } else {
//         alert("❌ Order Failed");
//       }
//     } catch (error) {
//       console.error("Order Error:", error);
//       alert("❌ Order Failed");
//     }
//   };

//   return (
//     <div className="checkout-container">
//       {/* Order Summary */}
//       <h3>🧾 Order Summary</h3>
//       {items.map((item) => (
//         <div className="order-item" key={item._id}>
//           <p>{item.title}</p>
//           <p>₹{item.price} x {item.qty}</p>
//         </div>
//       ))}

//       {/* Totals */}
//       <div className="total-box">
//         <h5>Subtotal: ₹{total.toFixed(2)}</h5>
//         <h5>GST (18%): ₹{gst.toFixed(2)}</h5>
//         <h4>Total: ₹{grandTotal.toFixed(2)}</h4>
//       </div>

//       <hr />

//       {/* Customer Details */}
//       <h4>📝 Customer Details</h4>
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="tel"
//         placeholder="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <textarea
//         placeholder="Delivery Address"
//         rows="3"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       ></textarea>

//       {/* Payment Method */}
//       <label className="form-label">Payment Method</label>
//       <select
//         value={paymentMode}
//         onChange={(e) => setPaymentMode(e.target.value)}
//       >
//         <option value="COD">Cash on Delivery</option>
//         <option value="Online">Online Payment</option>
//       </select>

//       {/* Confirm Button */}
//       <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
//         ✅ Confirm Order
//       </button>
//     </div>
//   );
// };

// export default Checkout;





import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const productFromBuyNow = location.state?.product;
  const selectedItems = location.state?.selectedItems; // From Cart selection

  const items = productFromBuyNow
    ? [{ ...productFromBuyNow, qty: 1 }]
    : selectedItems || cart;

  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = total * 0.18;
  const grandTotal = Math.round(total + gst);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    const res = await fetch("http://localhost:5000/api/payment/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: grandTotal }),
    });
    return res.json();
  };

  const verifyPayment = async (paymentData) => {
    const res = await fetch("http://localhost:5000/api/payment/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    return res.json();
  };

  const saveOrder = async (orderDetails) => {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    });
    return res.ok;
  };

  const handlePlaceOrder = async () => {
    if (!name || !email || !phone || !address) {
      alert("⚠️ Please fill all customer details");
      return;
    }

    if (paymentMode === "Online") {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("❌ Razorpay SDK failed to load.");
        return;
      }

      try {
        const orderData = await createOrder();

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: "INR",
          name: "JJ Crackers Hub",
          description: "Crackers Order Payment",
          order_id: orderData.id,
          handler: async (response) => {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              const saved = await saveOrder({
                items,
                total: grandTotal,
                name,
                email,
                phone,
                address,
                paymentMode: "Online",
                paymentId: response.razorpay_payment_id,
              });

              if (saved) {
                alert("✅ Payment Successful & Order Placed!");
                if (!productFromBuyNow && !selectedItems) clearCart();
                navigate("/orders");
              } else {
                alert("❌ Order Save Failed");
              }
            } else {
              alert("❌ Payment Verification Failed");
            }
          },
          prefill: { name, email, contact: phone },
          theme: { color: "#F37254" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Payment Error:", error);
        alert("❌ Payment Failed");
      }
    } else {
      const saved = await saveOrder({
        items,
        total: grandTotal,
        name,
        email,
        phone,
        address,
        paymentMode: "COD",
      });

      if (saved) {
        alert("✅ COD Order Placed!");
        if (!productFromBuyNow && !selectedItems) clearCart();
        navigate("/orders");
      } else {
        alert("❌ Order Save Failed");
      }
    }
  };

  return (
    <div className="checkout-container">
      <h3>🧾 Order Summary</h3>
      {items.map((item) => (
        <div className="order-item" key={item._id || item.title}>
          <p>{item.title}</p>
          <p>₹{item.price} x {item.qty}</p>
        </div>
      ))}

      <div className="total-box">
        <h5>Subtotal: ₹{total.toFixed(2)}</h5>
        <h5>GST (18%): ₹{gst.toFixed(2)}</h5>
        <h4>Total: ₹{grandTotal}</h4>
      </div>

      <hr />
      <h4>📝 Customer Details</h4>
      <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea placeholder="Delivery Address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

      <label className="form-label">Payment Method</label>
      <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
        <option value="COD">Cash on Delivery</option>
        <option value="Online">Online Payment</option>
      </select>

      <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
        ✅ Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
