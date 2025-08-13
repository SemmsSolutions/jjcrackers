// // src/App.js
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import ProductList from "./pages/ProductList";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderHistory from "./pages/OrderHistory";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import QuickEnquiryForm from "./pages/QuickEnquiryForm";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <ToastContainer position="bottom-right" theme="colored" />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/orders" element={<OrderHistory />} />
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/enquiry" element={<QuickEnquiryForm />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;



// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import ProductList from "./pages/ProductList";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderHistory from "./pages/OrderHistory";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import QuickEnquiryForm from "./pages/QuickEnquiryForm";

// import About from "./components/About";
// import Contact from "./components/Contact";
// import Terms from "./components/Terms";
// import Privacy from "./components/Privacy";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <ToastContainer position="bottom-right" theme="colored" />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/orders" element={<OrderHistory />} />
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/enquiry" element={<QuickEnquiryForm />} />

//         {/* New pages */}
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/terms" element={<Terms />} />
//         <Route path="/privacy" element={<Privacy />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;


import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import QuickEnquiryForm from "./pages/QuickEnquiryForm";
import About from "./components/About";
import Contact from "./components/Contact";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Refund from "./components/CancellationRefundPolicy";
import Safety from "./components/FireSafetyTips";
import Faq from "./components/FAQ";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // ✅ Lift search state
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Pass setSearchQuery to Navbar */}
      <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <ToastContainer position="bottom-right" theme="colored" />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Pass searchQuery to ProductList */}
        <Route path="/products" element={<ProductList searchQuery={searchQuery} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/enquiry" element={<QuickEnquiryForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
