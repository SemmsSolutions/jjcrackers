// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// export default function ProductCard({ product }) {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   return (
//     <div className="card mb-3">
//       <img src={product.image} className="card-img-top" alt={product.title} />
//       <div className="card-body">
//         <h5 className="card-title">{product.title}</h5>
//         <p>₹{product.price}</p>
//         <div className="d-flex gap-2">
//           <button className="btn btn-success" onClick={() => addToCart(product)}>
//             ➕ Add to Cart
//           </button>
//           <button
//             className="btn btn-outline-primary"
//             onClick={() => navigate("/checkout", { state: { product } })}
//           >
//             🛒 Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";


// export default function ProductCard({ product }) {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   // Safe number parsing
//   const price = Number.isFinite(+product?.price) ? +product.price : 0;
//   const off = Number.isFinite(+product?.offerPercent) ? +product.offerPercent : 0;
//   const stock = Number.isFinite(+product?.stock) ? +product.stock : 0;
//   const hasOffer = off > 0;

//   const discounted = hasOffer
//     ? Math.max(0, Math.round(price - (price * off) / 100))
//     : price;

//   return (
//     <div className="card product-card mb-3">
//       <div className="product-thumb-wrap">
//         {hasOffer && <span className="badge-offer">{off}% OFF</span>}
//         <img
//           src={product.image}
//           alt={product.title}
//           className="card-img-top product-thumb"
//           loading="lazy"
//         />
//       </div>

//       <div className="card-body">
//         <div className="product-title">{product.title}</div>
//         {product.code ? (
//           <div className="product-code">{product.code}</div>
//         ) : null}
//         <div className="price-row">
//           {hasOffer ? (
//             <>
//               <span className="price-new">₹{discounted}</span>
//               <span className="price-old">₹{price}</span>
//             </>
//           ) : (
//             <span className="price-new">₹{price}</span>
//           )}
//         </div>

//         <div className="stock-row">
//           <small className={stock > 0 ? "in-stock" : "out-stock"}>
//             {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
//           </small>
//         </div>

//         <div className="d-flex gap-2 mt-2">
//           <button
//             className="btn btn-success flex-fill"
//             onClick={() => addToCart(product)}
//             disabled={stock <= 0}
//             title={stock <= 0 ? "Out of stock" : "Add to cart"}
//           >
//             ➕ Add to Cart
//           </button>
//           <button
//             className="btn btn-outline-primary"
//             onClick={() => navigate("/checkout", { state: { product } })}
//             disabled={stock <= 0}
//           >
//             🛒 Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const price = Number.isFinite(+product?.price) ? +product.price : 0;
  const off = Number.isFinite(+product?.offerPercent) ? +product.offerPercent : 0;
  const stock = Number.isFinite(+product?.stock) ? +product.stock : 0;
  const hasOffer = off > 0;
  const discounted = hasOffer
    ? Math.max(0, Math.round(price - (price * off) / 100))
    : price;

  const unit = product.unit || "pcs"; // pcs/pac/roll/box

  return (
    <div className="card product-card mb-3">
      <div className="product-thumb-wrap">
        {hasOffer && <span className="badge-offer">{off}% OFF</span>}
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top product-thumb"
          loading="lazy"
        />
      </div>

      <div className="card-body">
        <div className="product-title">{product.title}</div>
        {product.code && <div className="product-code">{product.code}</div>}

        <div className="price-row">
          {hasOffer ? (
            <>
              <span className="price-new">₹{discounted}</span>
              <span className="price-old">₹{price}</span>
            </>
          ) : (
            <span className="price-new">₹{price}</span>
          )}
        </div>

        <div className="stock-row">
          <small className={stock > 0 ? "in-stock" : "out-stock"}>
            {stock > 0 ? `In stock: ${stock} ${unit}` : "Out of stock"}
          </small>
        </div>

        <div className="d-flex gap-2 mt-2">
          <button
            className="btn btn-success flex-fill"
            onClick={() => addToCart(product)}
            disabled={stock <= 0}
            title={stock <= 0 ? "Out of stock" : "Add to cart"}
          >
            ➕ Add to Cart
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/checkout", { state: { product } })}
            disabled={stock <= 0}
          >
            🛒 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
