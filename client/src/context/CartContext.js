import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or empty array
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart or increase quantity if it already exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item._id === product._id);
      if (exists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Update quantity for a specific product in cart (min quantity 1)
  const updateQty = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, qty: qty > 0 ? qty : 1 } : item
      )
    );
  };

  // Remove product from cart by id
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
