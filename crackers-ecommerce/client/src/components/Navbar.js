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
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUser, FaSearch, FaHistory } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (id) => {
    setQuery("");
    setResults([]);
    navigate(`/product/${id}`);
  };

  return (
    <header className="navbar-header">
      {/* Top bar */}
      <div className="top-bar">
        <div className="min-order">🎆 Minimum Order Enquire ₹2000 🎆</div>
        <div className="login">
          <Link to="/admin" className="login-link">
            <FaUser /> Login
          </Link>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="main-navbar">
        <div className="logo">
          <img src="/logo.png" alt="Crackers Shop" />
        </div>

        <ul className="nav-links">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/products">Products</Link></li>
          {/* Fixed link here to "/orders" */}
          <li><Link to="/orders"><FaHistory /> Order History</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/enquiry">Quick Enquiry</Link></li>
        </ul>

        {/* Search Bar */}
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          {results.length > 0 && (
            <ul className="search-dropdown">
              {results.map((item) => (
                <li key={item._id} onClick={() => handleSelect(item._id)}>
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="contact">
          <FaPhoneAlt className="phone-icon" />
          <div>
            <p>(+91) 754 002 7151</p>
            <p>(+91) 956 691 3888</p>
          </div>
        </div>
      </nav>

      {/* Firecracker animations */}
      <div className="cracker cracker-left"></div>
      <div className="cracker cracker-center"></div>
      <div className="cracker cracker-right"></div>
    </header>
  );
};

export default Navbar;
