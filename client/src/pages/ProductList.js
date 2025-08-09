import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>🎇 Crackers Available</h2>

      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "10px",
          scrollSnapType: "x mandatory",  // for nicer scroll snapping on supported browsers
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              minWidth: "250px",  // fixed card width
              scrollSnapAlign: "start", // snap to start
            }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
