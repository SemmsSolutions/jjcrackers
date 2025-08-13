// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "./ProductCard";

// const ProductList = ({ searchQuery }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = "http://localhost:5000/api/products";

//         // If there is a search query, call the search endpoint
//         if (searchQuery && searchQuery.trim() !== "") {
//           url = `http://localhost:5000/api/products/search?q=${encodeURIComponent(
//             searchQuery
//           )}`;
//         }

//         const res = await axios.get(url);
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, [searchQuery]); // refetch when searchQuery changes

//   return (
//     <div className="container mt-4">
//       <h2>🎇 Crackers Available</h2>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridAutoFlow: "column",
//             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//             gap: "16px",
//             overflowX: "auto",
//             paddingBottom: "10px",
//             scrollSnapType: "x mandatory",
//           }}
//         >
//           {products.map((p) => (
//             <div
//               key={p._id}
//               style={{
//                 minWidth: "250px",
//                 scrollSnapAlign: "start",
//               }}
//             >
//               <ProductCard product={p} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "../api";
import ProductCard from "../pages/ProductCard"; // NOTE: adjust path if yours differs
import "../styles/ProductList.css";

export default function ProductList({ searchQuery }) {
  const [sp] = useSearchParams();
  const category = sp.get("category") || "";
  const qFromUrl = sp.get("q") || "";

  // Prefer lifted search from Navbar; else use URL ?q=
  const q = useMemo(() => {
    const s = (searchQuery || "").trim();
    return s !== "" ? s : (qFromUrl || "").trim();
  }, [searchQuery, qFromUrl]);

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 24;

  useEffect(() => {
    setPage(1);
  }, [category, q]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = new URL(`${API}/api/products`);
        if (category) url.searchParams.set("category", category);
        if (q) url.searchParams.set("q", q);
        url.searchParams.set("page", page);
        url.searchParams.set("limit", limit);

        const { data } = await axios.get(url.toString());
        if (Array.isArray(data)) {
          setProducts(data);
          setTotal(data.length);
          setPages(1);
        } else {
          setProducts(data.items || []);
          setTotal(data.total || 0);
          setPages(data.pages || 1);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setTotal(0);
        setPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, q, page]); // API base is stable import

  return (
    <div className="container mt-4 product-list-page">
      <div className="pl-header">
        <h2>🎇 Crackers Available {category ? `— ${category}` : ""}</h2>
        {q ? <span className="pl-chip">Search: {q}</span> : null}
      </div>

      {loading ? (
        <div className="pl-skel-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="pl-skel" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="pl-empty">No products found.</p>
      ) : (
        <>
          <div className="pl-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {pages > 1 && (
            <div className="pl-pager">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="pl-btn"
              >
                Prev
              </button>
              <span className="pl-pageinfo">
                {page} / {pages} • {total} items
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page >= pages}
                className="pl-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
