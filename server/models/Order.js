const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      _id: String,
      title: String,
      price: Number,
      image: String,
      qty: Number,
    },
  ],
  total: Number,
  name: String,
  phone: String,
  email: String, // added for email notifications
  address: String,
  paymentMode: String,
  status: {
    type: String,
    enum: ["Pending", "Picked", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
