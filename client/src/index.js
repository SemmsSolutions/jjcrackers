// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <CartProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </CartProvider>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "react-toastify/dist/ReactToastify.css"; // Toast CSS import

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
