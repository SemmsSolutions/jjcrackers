import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const STATUS_STEPS = ["Pending", "Picked", "Shipped", "Delivered", "Cancelled"];

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCancelId, setLoadingCancelId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        setOrders(res.data.reverse()); // recent first
        setError(null);
      })
      .catch(() => {
        setError("Failed to load orders. Please try again.");
      });
  }, []);

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setLoadingCancelId(id);
      await axios.put(`http://localhost:5000/api/orders/${id}/cancel`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel the order. Please try again.");
    } finally {
      setLoadingCancelId(null);
    }
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/order-tracking/${orderId}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: 700, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Your Orders</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 && !error ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => {
          const currentStepIndex = STATUS_STEPS.indexOf(order.status);

          return (
            <div
              key={order._id}
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "20px",
                paddingBottom: "15px",
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
                padding: "15px",
              }}
            >
              <h4>Customer: {order.name}</h4>
              <p>Mobile: {order.phone}</p>
              <p>Address: {order.address}</p>
              <p>Payment: {order.paymentMode}</p>
              <p>
                Total: <strong>₹{order.total}</strong>
              </p>
              <small>Ordered on: {new Date(order.createdAt).toLocaleString()}</small>

              {/* Status Tracker */}
              <div style={{ display: "flex", marginTop: 15, gap: 8 }}>
                {STATUS_STEPS.map((status, i) => (
                  <div
                    key={status}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 4,
                      textAlign: "center",
                      backgroundColor:
                        i === currentStepIndex
                          ? order.status === "Cancelled"
                            ? "#dc3545"
                            : "#007bff"
                          : i < currentStepIndex
                          ? "#28a745"
                          : "#ccc",
                      color: "white",
                      fontWeight: i === currentStepIndex ? "bold" : "normal",
                      fontSize: 14,
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                {order.status !== "Delivered" && order.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    disabled={loadingCancelId === order._id}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      cursor: loadingCancelId === order._id ? "not-allowed" : "pointer",
                    }}
                  >
                    {loadingCancelId === order._id ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}

                <button
                  onClick={() => handleTrackOrder(order._id)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderHistory;
