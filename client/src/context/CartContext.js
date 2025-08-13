// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   // Initialize cart state from localStorage or empty array
//   const [cart, setCart] = useState([]);

//   // Load cart from localStorage when component mounts
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Add product to cart or increase quantity if it already exists
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const exists = prevCart.find((item) => item._id === product._id);
//       if (exists) {
//         return prevCart.map((item) =>
//           item._id === product._id
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, qty: 1 }];
//     });
//   };

//   // Update quantity for a specific product in cart (min quantity 1)
//   const updateQty = (id, qty) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
//       )
//     );
//   };

//   // Remove product from cart by id
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== id));
//   };

//   // Clear entire cart
//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "cart_v1";

/* ---------- utils ---------- */
const safeParse = (txt) => {
  try {
    const v = JSON.parse(txt ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

/* ---------- reducer ---------- */
function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return Array.isArray(action.payload) ? action.payload : [];
    }
    case "ADD": {
      const { product, qty = 1 } = action.payload;
      if (!product || !product._id) return state;
      const n = Math.max(1, Number(qty) || 1);
      const i = state.findIndex((it) => it._id === product._id);
      if (i === -1) return [...state, { ...product, qty: n }];
      const next = [...state];
      const cur = Number(next[i].qty) || 1;
      next[i] = { ...next[i], qty: cur + n };
      return next;
    }
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      const n = Math.max(1, Number(qty) || 1);
      return state.map((it) => (it._id === id ? { ...it, qty: n } : it));
    }
    case "REMOVE":
      return state.filter((it) => it._id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

/* ---------- provider ---------- */
export const CartProvider = ({ children }) => {
  // lazy init from localStorage once (avoids mount flash & JSON errors)
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window === "undefined") return [];
    return safeParse(localStorage.getItem(STORAGE_KEY));
  });

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // quota/full/private mode etc.
      console.warn("cart persist failed:", e);
    }
  }, [cart]);

  // cross-tab sync (if cart changed in another tab)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        dispatch({ type: "HYDRATE", payload: safeParse(e.newValue) });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* API (same names as yours) */
  const value = useMemo(
    () => ({
      cart,
      addToCart: (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } }),
      updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } }),
      removeFromCart: (id) => dispatch({ type: "REMOVE", payload: id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
