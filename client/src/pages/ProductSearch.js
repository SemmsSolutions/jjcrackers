
// ✅ ProductSearch.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductSearch.css';


const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        axios.get(`/api/products/search?q=${query}`)
          .then(res => setResults(res.data))
          .catch(() => setResults([]));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {results.length > 0 && (
        <ul className="search-dropdown">
          {results.slice(0, 5).map(item => (
            <li key={item._id} className="search-item">
              <img src={item.image} alt={item.title} />
              <div className="info">
                <strong>{item.title}</strong>
                <div className="price">
                  ₹{item.price} {item.offerPercent > 0 && <span className="offer">({item.offerPercent}% OFF)</span>}
                </div>
              </div>
            </li>
          ))}
          <li className="see-all">See all results...</li>
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;

