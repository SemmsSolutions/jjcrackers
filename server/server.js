// // ✅ Load environment variables
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // ✅ Import routes
// const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// // ✅ Middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Debug print
// console.log("MONGO_URL from env:", process.env.MONGO_URL);

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("✅ MongoDB connected");

//     // ✅ Start server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🌐 Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed:", err.message);
//     process.exit(1);
//   });

// // ✅ API Routes
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("🚀 Crackers E-Commerce API Running Successfully");
// });require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // ✅ Razorpay routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  });

// API routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/payment", paymentRoutes); // ✅ Razorpay API

// Test route
app.get("/", (req, res) => {
  res.send("🔥 Crackers E-Commerce Backend Running");
});
