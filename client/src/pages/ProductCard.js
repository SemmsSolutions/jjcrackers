import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="card mb-3">
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p>₹{product.price}</p>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => addToCart(product)}>
            ➕ Add to Cart
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/checkout", { state: { product } })}
          >
            🛒 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
