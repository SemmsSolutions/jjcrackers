import React, { useEffect, useState } from "react";

const STATUS_STEPS = ["Pending", "Picked", "Shipped", "Delivered"];

const OrderTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      fetch(`http://localhost:5000/api/orders/${orderId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Order not found");
          return res.json();
        })
        .then((data) => {
          setOrder(data);
          setError(null);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!order) return <p>No order data found.</p>;

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="container mt-4" style={{ maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h3>📦 Order Tracking</h3>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ₹{order.total}</p>

      <div className="progress-steps" style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
        {STATUS_STEPS.map((status, i) => (
          <div
            key={status}
            className={`step ${i === currentStepIndex ? "active" : i < currentStepIndex ? "completed" : ""}`}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: i === currentStepIndex ? "#007bff" : i < currentStepIndex ? "#28a745" : "#ccc",
              color: "white",
              marginRight: i !== STATUS_STEPS.length - 1 ? "8px" : 0,
              fontWeight: i === currentStepIndex ? "bold" : "normal",
            }}
          >
            {status}
          </div>
        ))}
      </div>

      <h4>Order Items</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {order.items.map((item) => (
          <li key={item._id} style={{ display: "flex", marginBottom: 12, alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 8 }}>
            <img src={item.image} alt={item.title} width={60} height={60} style={{ objectFit: "cover", borderRadius: 6, marginRight: 12 }} />
            <div>
              <div><strong>{item.title}</strong></div>
              <div>Qty: {item.qty}</div>
              <div>Price: ₹{item.price}</div>
            </div>
          </li>
        ))}
      </ul>

      <h4>Customer Details</h4>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
    </div>
  );
};

export default OrderTracking;
