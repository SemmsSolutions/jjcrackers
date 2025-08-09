// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const sendMail = require("../utils/sendMail");

// // 🛒 Place Order & Send Mail
// router.post("/", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();

//     await sendMail(order);

//     res.status(200).json({ success: true, message: "Order placed and mail sent", order });
//   } catch (err) {
//     console.error("❌ Order Error:", err.message);
//     res.status(500).json({ error: "❌ Order Failed" });
//   }
// });

// // 📋 Get All Orders
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🚫 Cancel Order & Send Mail
// router.put("/:id/cancel", async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);

//     if (!order) return res.status(404).json({ error: "Order not found" });
//     if (order.status === "Delivered")
//       return res.status(400).json({ error: "Cannot cancel delivered order" });
//     if (order.status === "Cancelled")
//       return res.status(400).json({ error: "Order already cancelled" });

//     order.status = "Cancelled";
//     await order.save();

//     // Send cancellation mail (you can create a separate sendCancelMail util or reuse sendMail with flag)
//     await sendMail(order, { cancelled: true });

//     res.json({ success: true, message: "Order cancelled and mail sent", order });
//   } catch (err) {
//     console.error("❌ Cancel Order Error:", err.message);
//     res.status(500).json({ error: "Failed to cancel the order. Please try again." });
//   }
// });

// module.exports = router;

// ✅ orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const sendMail = require("../utils/sendMail");

// 🛒 Place Order & Send Mail
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    await sendMail(order);
    res.status(200).json({ success: true, message: "Order placed and mail sent", order });
  } catch (err) {
    console.error("❌ Order Error:", err.message);
    res.status(500).json({ error: "❌ Order Failed" });
  }
});

// 📋 Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚫 Cancel Order
router.put("/:id/cancel", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (["Delivered", "Cancelled"].includes(order.status)) return res.status(400).json({ error: "Invalid cancel action" });
    order.status = "Cancelled";
    await order.save();
    await sendMail(order, { cancelled: true });
    res.json({ success: true, message: "Order cancelled", order });
  } catch (err) {
    console.error("❌ Cancel Error:", err.message);
    res.status(500).json({ error: "Cancel failed" });
  }
});

// ✅ Admin Status Update
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    await sendMail(order, { updated: true });
    res.json({ success: true, message: "Status updated", order });
  } catch (err) {
    console.error("❌ Status Update Error:", err.message);
    res.status(500).json({ error: "Failed to update status" });
  }
});

module.exports = router;