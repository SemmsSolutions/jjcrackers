import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="container mt-4">
      <h3>Admin Order Management</h3>
      {orders.map((order) => (
        <div key={order._id} className="border p-2 mb-2">
          <p><strong>{order.name}</strong> — ₹{order.total}</p>
          <p>Status: {order.status}</p>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Picked">Picked</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
