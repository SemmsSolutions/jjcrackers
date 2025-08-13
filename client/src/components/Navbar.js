// import React from "react";
// import { Link } from "react-router-dom";
// import { FaPhoneAlt, FaUser } from "react-icons/fa";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   return (
//     <header className="navbar-header">
//       {/* Top bar */}
//       <div className="top-bar">
//         <div className="min-order">🎆 Minimum Order Enquire ₹2000 🎆</div>
//         <div className="login">
//           <Link to="/admin-login" className="login-link">
//             <FaUser /> Login
//           </Link>
//         </div>
//       </div>

//       {/* Main navbar */}
//       <nav className="main-navbar">
//         <div className="logo">
//           <img src="/logo.png" alt="Crackers Shop" />
//         </div>

//         <ul className="nav-links">
//           <li><Link to="/" className="active">Home</Link></li>
      
//           <li><Link to="/cart">Cart</Link></li>
//           <li><Link to="/products">Products</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//           <li><Link to="/enquiry">Quick Enquiry</Link></li>
//         </ul>

//         <div className="contact">
//           <FaPhoneAlt className="phone-icon" />
//           <div>
//             <p>(+91) 754 002 7151</p>
//             <p>(+91) 956 691 3888</p>
//           </div>
//         </div>
//       </nav>

//       {/* Firecracker animations in 3 places */}
//       <div className="cracker cracker-left"></div>
//       <div className="cracker cracker-center"></div>
//       <div className="cracker cracker-right"></div>
//     </header>
//   );
// };

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaPhoneAlt, FaUser, FaSearch, FaHistory } from "react-icons/fa";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (query.trim() === "") {
//         setResults([]);
//         return;
//       }

//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/products/search?q=${query}`
//         );
//         const data = await res.json();
//         setResults(data);
//       } catch (err) {
//         console.error("Search error:", err);
//         setResults([]);
//       }
//     };

//     const timer = setTimeout(fetchResults, 300);
//     return () => clearTimeout(timer);
//   }, [query]);

//   const handleSelect = (id) => {
//     setQuery("");
//     setResults([]);
//     navigate(`/product/${id}`);
//   };

//   return (
//     <header className="navbar-header">
//       {/* Top bar */}
//       <div className="top-bar">
//         <div className="min-order">🎆 Minimum Order Enquire ₹2000 🎆</div>
//         <div className="login">
//           <Link to="/admin" className="login-link">
//             <FaUser /> Login
//           </Link>
//         </div>
//       </div>

//       {/* Main navbar */}
//       <nav className="main-navbar">
//         <div className="logo">
//           <img src="/logo.png" alt="Crackers Shop" />
//         </div>

//         <ul className="nav-links">
//           <li><Link to="/" className="active">Home</Link></li>
//           <li><Link to="/cart">Cart</Link></li>
//           <li><Link to="/products">Products</Link></li>
//           {/* Fixed link here to "/orders" */}
//           <li><Link to="/orders"><FaHistory /> Order History</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//           <li><Link to="/enquiry">Quick Enquiry</Link></li>
//         </ul>

//         {/* Search Bar */}
//         <div className="search-bar-container">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-input"
//           />
//           {results.length > 0 && (
//             <ul className="search-dropdown">
//               {results.map((item) => (
//                 <li key={item._id} onClick={() => handleSelect(item._id)}>
//                   {item.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="contact">
//           <FaPhoneAlt className="phone-icon" />
//           <div>
//             <p>(+91) 754 002 7151</p>
//             <p>(+91) 956 691 3888</p>
//           </div>
//         </div>
//       </nav>

//       {/* Firecracker animations */}
//       <div className="cracker cracker-left"></div>
//       <div className="cracker cracker-center"></div>
//       <div className="cracker cracker-right"></div>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaPhoneAlt, FaUser, FaSearch, FaHistory } from "react-icons/fa";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (query.trim() === "") {
//         setResults([]);
//         return;
//       }

//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/products/search?q=${query}`
//         );
//         const data = await res.json();
//         setResults(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Search error:", err);
//         setResults([]);
//       }
//     };

//     const timer = setTimeout(fetchResults, 300); // debounce search
//     return () => clearTimeout(timer);
//   }, [query]);

//   const handleSelect = (id) => {
//     setQuery("");
//     setResults([]);
//     navigate(`/product/${id}`);
//   };

//   return (
//     <header className="navbar-header">
//       {/* Top bar */}
//       <div className="top-bar">
//         <div className="min-order">🎆 Minimum Order Enquire ₹2000 🎆</div>
//         <div className="login">
//           <Link to="/admin" className="login-link">
//             <FaUser /> Login
//           </Link>
//         </div>
//       </div>

//       {/* Main navbar */}
//       <nav className="main-navbar">
//         <div className="logo">
//           <img src="/logo.png" alt="Crackers Shop" />
//         </div>

//         <ul className="nav-links">
//           <li><Link to="/" className="active">Home</Link></li>
//           <li><Link to="/cart">Cart</Link></li>
//           <li><Link to="/products">Products</Link></li>
//           <li><Link to="/orders"><FaHistory /> Order History</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//           <li><Link to="/enquiry">Quick Enquiry</Link></li>
//         </ul>

//         {/* Search Bar */}
//         <div className="search-bar-container">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-input"
//           />
//           {results.length > 0 && (
//             <ul className="search-dropdown show">
//               {results.map((item) => (
//                 <li key={item._id} onClick={() => handleSelect(item._id)}>
//                   {item.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="contact">
//           <FaPhoneAlt className="phone-icon" />
//           <div>
//             <p>(+91) 754 002 7151</p>
//             <p>(+91) 956 691 3888</p>
//           </div>
//         </div>
//       </nav>

//       {/* Firecracker animations */}
//       <div className="cracker cracker-left"></div>
//       <div className="cracker cracker-center"></div>
//       <div className="cracker cracker-right"></div>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaPhoneAlt, FaUser, FaSearch, FaHistory } from "react-icons/fa";
// import { API } from "../api";
// import "../styles/Navbar.css";
 

// const Navbar = ({ setSearchQuery, searchQuery }) => {
//   const [localQuery, setLocalQuery] = useState(searchQuery || "");
//   const [results, setResults] = useState([]);
//   const [cats, setCats] = useState([]);
//   const [catOpen, setCatOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => { setSearchQuery(localQuery); }, [localQuery, setSearchQuery]);

//   // 🔎 suggestions
//   useEffect(() => {
//     const fetchResults = async () => {
//       if (localQuery.trim() === "") { setResults([]); return; }
//       try {
//         const res = await fetch(`${API}/api/products/search?q=${encodeURIComponent(localQuery)}`);
//         const data = await res.json();
//         setResults(Array.isArray(data) ? data : []);
//       } catch { setResults([]); }
//     };
//     const t = setTimeout(fetchResults, 300);
//     return () => clearTimeout(t);
//   }, [localQuery]);

//   // 🗂️ categories
//   useEffect(() => {
//     (async () => {
//       try {
//         const r = await fetch(`${API}/api/products/categories`);
//         const d = await r.json();
//         setCats(Array.isArray(d) ? d : []);
//       } catch { setCats([]); }
//     })();
//   }, []);

//   const handleSelect = (id) => {
//     setLocalQuery(""); setResults([]); navigate(`/product/${id}`);
//   };

//   const goCategory = (c) => {
//     setCatOpen(false);
//     const val = c.slug || c.name || c;
//     navigate(`/products?category=${encodeURIComponent(val)}`);
//   };

//   return (
//     <header className="navbar-header">
//       <div className="top-bar">
//         <div className="min-order">🎆 Minimum Order Enquire ₹2000 🎆</div>
//         <div className="login">
//           <Link to="/admin" className="login-link"><FaUser /> Login</Link>
//         </div>
//       </div>

//       <nav className="main-navbar">
//         <div className="logo">
//           <img src="/logo.png" alt="Crackers Shop" />
//         </div>

//         {/* All Categories */}
//         <div
//           className="cat-dropdown"
//           onMouseEnter={() => setCatOpen(true)}
//           onMouseLeave={() => setCatOpen(false)}
//         >
//           <button className="cat-toggle" onClick={() => setCatOpen(p => !p)}>
//             All Categories ▾
//           </button>
//           {catOpen && (
//             <ul className="cat-menu">
//               {cats.length === 0 && <li className="cat-item">No categories</li>}
//               {cats.map((c) => {
//                 const key = c._id || c.slug || c.name || c;
//                 const label = c.name || c.slug || String(c);
//                 return (
//                   <li key={key}>
//                     <button className="cat-item" onClick={() => goCategory(c)}>{label}</button>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>

//         <ul className="nav-links">
//           <li><Link to="/" className="active">Home</Link></li>
//           <li><Link to="/cart">Cart</Link></li>
//           <li><Link to="/products">Products</Link></li>
//           <li><Link to="/orders"><FaHistory /> Order History</Link></li>
//           <li><Link to="/contact">Contact Us</Link></li>
//           <li><Link to="/enquiry">Quick Enquiry</Link></li>
//         </ul>

//         <div className="search-bar-container">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={localQuery}
//             onChange={(e) => setLocalQuery(e.target.value)}
//             className="search-input"
//           />
//           {results.length > 0 && (
//             <ul className="search-dropdown show">
//               {results.map((item) => (
//                 <li key={item._id} onClick={() => handleSelect(item._id)}>
//                   {item.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="contact">
//           <FaPhoneAlt className="phone-icon" />
//           <div>
//             <p>(+91) 754 002 7151</p>
//             <p>(+91) 956 691 3888</p>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaHistory } from "react-icons/fa";
import { API } from "../api";
import "../styles/Navbar.css";
import logo from "../images/logo.png";

const Navbar = () => {
  const [cats, setCats] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const catRootRef = useRef(null);
  const navigate = useNavigate();

  // close categories on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (catRootRef.current && !catRootRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // load categories
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/api/products/categories`);
        const d = await r.json();
        setCats(Array.isArray(d) ? d : []);
      } catch {
        setCats([]);
      }
    })();
  }, []);

  // category click → /products?category=Name
  const goCategory = (c) => {
    const val = c.name || c; // matches Product.category string
    setCatOpen(false);
    navigate(`/products?category=${encodeURIComponent(val)}`);
  };

  return (
    <header className="navbar-header">
      {/* ===== Top bar with scrolling text + banner image ===== */}
      <div className="top-bar">
        <div className="min-order" aria-live="polite">
          <span className="scroll-text">
            🎆 Diwali sale is open now. Please buy early to get best discounts. Happy Diwali....!!! 🎆
          </span>
        </div>
       
      </div>

      {/* ===== Main Navbar ===== */}
      <nav className="main-navbar">
        <div className="logo">
          {/* place your logo in /public/logo.png */}
          <img src={logo} alt="JJ Crackers Shop" />
        </div>

        {/* All Categories (click to toggle) */}
        <div id="cat-dd-root" className="cat-dropdown" ref={catRootRef}>
          <button
            type="button"
            className="cat-toggle"
            onClick={() => setCatOpen((p) => !p)}
            aria-expanded={catOpen}
            aria-haspopup="menu"
          >
            All Categories ▾
          </button>

          {catOpen && (
            <ul className="cat-menu" role="menu">
              {cats.length === 0 && <li className="cat-item muted">No categories</li>}
              {cats.map((c) => {
                const key = c._id || c.slug || c.name || c;
                const label = c.name || c.slug || String(c);
                return (
                  <li key={key} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      className="cat-item"
                      onMouseDown={(e) => e.preventDefault()} // avoid losing focus before click
                      onClick={() => goCategory(c)}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <ul className="nav-links">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/orders"><FaHistory />&nbsp;Order History</Link></li>
          <li><Link to="/enquiry">Quick Enquiry</Link></li>
        </ul>

        <div className="contact">
          <FaPhoneAlt className="phone-icon" />
          <div>
            <p>(+91) 88831 24111</p>
          </div>
        </div>
      </nav>

      {/* Decorative crackers - don’t block clicks */}
      <div className="cracker cracker-left"></div>
      <div className="cracker cracker-center"></div>
      <div className="cracker cracker-right"></div>
    </header>
  );
};

export default Navbar;
