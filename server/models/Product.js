// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   price: { type: Number, default: 0 },
//   category: { type: String, default: "" },
//   image: { type: String, default: "" },
//   offerPercent: { type: Number, default: 0 },
//   stock: { type: Number, default: 0 },
// }, { timestamps: true });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  price: { type: Number, default: 0 },
  category: { type: String, default: "", trim: true }, // store plain name or slug
  image: { type: String, default: "" },
  offerPercent: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

// 🔎 better search performance
productSchema.index({ title: "text", category: 1 });

module.exports = mongoose.model("Product", productSchema);
