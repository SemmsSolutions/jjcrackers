// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "../styles/AdminDashboard.css";

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     category: "",
//     image: "",
//     offerPercent: 0,
//     stock: 0,
//   });
//   const [editId, setEditId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const fileInputRef = useRef();

//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:5000/api/products");
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleAddOrUpdate = async () => {
//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/products/${editId}`, form);
//         setEditId(null);
//       } else {
//         await axios.post("http://localhost:5000/api/products", form);
//       }
//       setForm({
//         title: "",
//         price: "",
//         category: "",
//         image: "",
//         offerPercent: 0,
//         stock: 0,
//       });
//       setImagePreview("");
//       fetchProducts();
//     } catch (err) {
//       alert("❌ Something went wrong!");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure to delete?")) {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       fetchProducts();
//     }
//   };

//   const handleEdit = (product) => {
//     setForm(product);
//     setEditId(product._id);
//     setImagePreview(product.image);
//     window.scrollTo(0, 0);
//   };

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm({ ...form, image: reader.result });
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const filteredProducts = products.filter((p) =>
//     p.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-primary">🛠 Admin Dashboard</h2>

//       {/* 🔍 Search */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="🔍 Search product"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* 📷 Image + Form */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div
//             onClick={handleImageClick}
//             className="image-upload-box"
//           >
//             {imagePreview ? (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="preview-img"
//               />
//             ) : (
//               <p className="text-muted">📷 Click to select image</p>
//             )}
//           </div>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             accept="image/*"
//             onChange={handleImageChange}
//           />

//           <input
//             className="form-control mb-2"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             type="number"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => setForm({ ...form, price: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             placeholder="Category"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             type="number"
//             placeholder="Offer %"
//             value={form.offerPercent}
//             onChange={(e) => setForm({ ...form, offerPercent: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             type="number"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => setForm({ ...form, stock: e.target.value })}
//           />
//           <button
//             className="btn btn-success w-100"
//             onClick={handleAddOrUpdate}
//           >
//             {editId ? "✏️ Update Product" : "➕ Add Product"}
//           </button>
//         </div>
//       </div>

//       {/* 🧾 Product List */}
//       <h4 className="text-secondary mb-3">Product List</h4>
//       <div className="product-list">
//         {filteredProducts.map((p) => {
//           const discounted = Math.round(p.price - (p.price * (p.offerPercent || 0)) / 100);
//           return (
//             <div className="product-card" key={p._id}>
//               <img
//                 src={p.image}
//                 alt={p.title}
//                 className="card-img-top"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{p.title}</h5>
//                 <p>Stock: {p.stock}</p>
//                 {p.offerPercent > 0 ? (
//                   <p className="text-danger mb-1">
//                     ₹{discounted} <del className="text-muted">₹{p.price}</del>
//                   </p>
//                 ) : (
//                   <p>₹{p.price}</p>
//                 )}
//                 <p className="text-muted">{p.category}</p>
//                 {p.offerPercent > 0 && (
//                   <span className="badge bg-warning">{p.offerPercent}% OFF</span>
//                 )}
//               </div>
//               <div className="card-footer d-flex justify-content-between">
//                 <button
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={() => handleEdit(p)}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={() => handleDelete(p._id)}
//                 >
//                   ❌ Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// // ✅ Full Admin Dashboard Script with Product & Order Status Management + Email Sending
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { API } from "../api";
// import "../styles/AdminDashboard.css";

// const emptyForm = {
//   title: "",
//   price: "",
//   category: "",
//   image: "",
//   offerPercent: 0,
//   stock: 0,
// };

// const toNumber = (v) => {
//   const n = Number(v);
//   return Number.isFinite(n) ? n : 0;
// };

// export default function AdminDashboard() {
//   const [products, setProducts] = useState([]); // always array
//   const [orders, setOrders] = useState([]);     // always array
//   const [form, setForm] = useState(emptyForm);
//   const [editId, setEditId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const fileInputRef = useRef();

//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//   }, []);

//   // --- API fetchers (defensive) ---
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API}/api/products`);
//       // accept: array OR {items, total} OR {products: [...]}
//       const data = res.data;
//       const list = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.items)
//         ? data.items
//         : Array.isArray(data?.products)
//         ? data.products
//         : [];
//       setProducts(list);
//     } catch (e) {
//       console.error("fetchProducts error:", e);
//       setProducts([]);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API}/api/orders`);
//       const data = res.data;
//       const list = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.items)
//         ? data.items
//         : Array.isArray(data?.orders)
//         ? data.orders
//         : [];
//       setOrders(list);
//     } catch (e) {
//       console.error("fetchOrders error:", e);
//       setOrders([]);
//     }
//   };

//   // --- CRUD: products ---
//   const handleAddOrUpdate = async () => {
//     try {
//       const payload = {
//         title: String(form.title || "").trim(),
//         price: toNumber(form.price),
//         category: String(form.category || "").trim(),
//         image: form.image || "",
//         offerPercent: toNumber(form.offerPercent),
//         stock: toNumber(form.stock),
//       };

//       if (!payload.title) return alert("Title required");
//       if (payload.price < 0) return alert("Price invalid");

//       if (editId) {
//         await axios.put(`${API}/api/products/${editId}`, payload);
//         setEditId(null);
//       } else {
//         await axios.post(`${API}/api/products`, payload);
//       }

//       setForm(emptyForm);
//       setImagePreview("");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Something went wrong!");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete?")) return;
//     try {
//       await axios.delete(`${API}/api/products/${id}`);
//       fetchProducts();
//     } catch (e) {
//       console.error(e);
//       alert("❌ Delete failed");
//     }
//   };

//   const handleEdit = (p) => {
//     // avoid copying _id, timestamps, etc. into form
//     setForm({
//       title: p.title || "",
//       price: p.price ?? "",
//       category: p.category || "",
//       image: p.image || "",
//       offerPercent: p.offerPercent ?? 0,
//       stock: p.stock ?? 0,
//     });
//     setEditId(p._id);
//     setImagePreview(p.image || "");
//     window.scrollTo(0, 0);
//   };

//   // --- Image upload (base64 preview) ---
//   const handleImageClick = () => fileInputRef.current?.click();

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm((f) => ({ ...f, image: reader.result }));
//       setImagePreview(String(reader.result || ""));
//     };
//     reader.readAsDataURL(file);
//   };

//   // --- Orders: status update ---
//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       await axios.put(`${API}/api/orders/${orderId}/status`, { status: newStatus });
//       await fetchOrders();
//       alert("✅ Status updated and email sent");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to update status");
//     }
//   };

//   // --- Derived: search-safe filter (no crash) ---
//   const list = Array.isArray(products) ? products : [];
//   const filteredProducts = list.filter((p) =>
//     String(p?.title || "").toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-primary">🛠 Admin Dashboard</h2>

//       {/* Search */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="🔍 Search product"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Add / Edit */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div onClick={handleImageClick} className="image-upload-box" role="button">
//             {imagePreview ? (
//               <img src={imagePreview} alt="Preview" className="preview-img" />
//             ) : (
//               <p className="text-muted m-0">📷 Click to select image</p>
//             )}
//           </div>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             accept="image/*"
//             onChange={handleImageChange}
//           />

//           <input
//             className="form-control mb-2"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             type="number"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => setForm({ ...form, price: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             placeholder="Category"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//           />
//           <input
//             className="form-control mb-2"
//             type="number"
//             placeholder="Offer %"
//             value={form.offerPercent}
//             onChange={(e) => setForm({ ...form, offerPercent: e.target.value })}
//           />
//           <input
//             className="form-control mb-3"
//             type="number"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={(e) => setForm({ ...form, stock: e.target.value })}
//           />

//           <div className="d-flex gap-2">
//             <button className="btn btn-success flex-fill" onClick={handleAddOrUpdate}>
//               {editId ? "✏️ Update Product" : "➕ Add Product"}
//             </button>
//             {editId && (
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   setEditId(null);
//                   setForm(emptyForm);
//                   setImagePreview("");
//                 }}
//               >
//                 ✖ Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Product list */}
//       <h4 className="text-secondary mb-3">Product List</h4>
//       <div className="product-list">
//         {filteredProducts.map((p) => {
//           const price = toNumber(p.price);
//           const off = toNumber(p.offerPercent);
//           const discounted = Math.round(price - (price * off) / 100);

//           return (
//             <div className="product-card" key={p._id}>
//               <img src={p.image} alt={p.title} className="card-img-top" />
//               <div className="card-body">
//                 <h5 className="card-title">{p.title}</h5>
//                 <p>Stock: {toNumber(p.stock)}</p>
//                 {off > 0 ? (
//                   <p className="text-danger mb-1">
//                     ₹{discounted} <del className="text-muted">₹{price}</del>
//                   </p>
//                 ) : (
//                   <p>₹{price}</p>
//                 )}
//                 <p className="text-muted">{p.category}</p>
//                 {off > 0 && (
//                   <span className="badge bg-warning">{off}% OFF</span>
//                 )}
//               </div>
//               <div className="card-footer d-flex justify-content-between">
//                 <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(p)}>
//                   ✏️ Edit
//                 </button>
//                 <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>
//                   ❌ Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//         {filteredProducts.length === 0 && (
//           <div className="text-muted">No products found.</div>
//         )}
//       </div>

//       {/* Orders */}
//       <h4 className="text-secondary mt-5 mb-3">Order Management</h4>
//       {orders.map((order) => (
//         <div key={order._id} className="border p-3 mb-3 rounded shadow-sm">
//           <p><strong>{order.name}</strong> - {order.phone}</p>
//           <p>₹{toNumber(order.total)} | Status: <strong>{order.status}</strong></p>
//           <select
//             value={order.status}
//             onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
//             className="form-select mb-2"
//           >
//             {["Pending", "Picked", "Shipped", "Delivered", "Cancelled"].map((s) => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//       ))}
//       {orders.length === 0 && <div className="text-muted">No orders yet.</div>}
//     </div>
//   );
// }


// ✅ Full Admin Dashboard Script with Product & Order Status Management + Email Sending + Unit Selection
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API } from "../api";
import "../styles/AdminDashboard.css";

const emptyForm = {
  title: "",
  price: "",
  category: "",
  image: "",
  offerPercent: 0,
  stock: 0,
  unit: "pcs", // default unit
};

const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // --- API fetchers ---
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/api/products`);
      const data = res.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.products)
        ? data.products
        : [];
      setProducts(list);
    } catch (e) {
      console.error("fetchProducts error:", e);
      setProducts([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders`);
      const data = res.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.orders)
        ? data.orders
        : [];
      setOrders(list);
    } catch (e) {
      console.error("fetchOrders error:", e);
      setOrders([]);
    }
  };

  // --- CRUD: products ---
  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        title: String(form.title || "").trim(),
        price: toNumber(form.price),
        category: String(form.category || "").trim(),
        image: form.image || "",
        offerPercent: toNumber(form.offerPercent),
        stock: toNumber(form.stock),
        unit: String(form.unit || "pcs"),
      };

      if (!payload.title) return alert("Title required");
      if (payload.price < 0) return alert("Price invalid");

      if (editId) {
        await axios.put(`${API}/api/products/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(`${API}/api/products`, payload);
      }

      setForm(emptyForm);
      setImagePreview("");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await axios.delete(`${API}/api/products/${id}`);
      fetchProducts();
    } catch (e) {
      console.error(e);
      alert("❌ Delete failed");
    }
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title || "",
      price: p.price ?? "",
      category: p.category || "",
      image: p.image || "",
      offerPercent: p.offerPercent ?? 0,
      stock: p.stock ?? 0,
      unit: p.unit || "pcs",
    });
    setEditId(p._id);
    setImagePreview(p.image || "");
    window.scrollTo(0, 0);
  };

  // --- Image upload ---
  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, image: reader.result }));
      setImagePreview(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  // --- Orders: status update ---
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`${API}/api/orders/${orderId}/status`, { status: newStatus });
      await fetchOrders();
      alert("✅ Status updated and email sent");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  // --- Derived: search-safe filter ---
  const list = Array.isArray(products) ? products : [];
  const filteredProducts = list.filter((p) =>
    String(p?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">🛠 Admin Dashboard</h2>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add / Edit */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div onClick={handleImageClick} className="image-upload-box" role="button">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            ) : (
              <p className="text-muted m-0">📷 Click to select image</p>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Offer %"
            value={form.offerPercent}
            onChange={(e) => setForm({ ...form, offerPercent: e.target.value })}
          />
          <input
            className="form-control mb-2"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          {/* Unit selection */}
          <select
            className="form-select mb-3"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          >
            <option value="pcs">pcs</option>
            <option value="pac">pac</option>
            <option value="box">box</option>
            <option value="roll">roll</option>
          </select>

          <div className="d-flex gap-2">
            <button className="btn btn-success flex-fill" onClick={handleAddOrUpdate}>
              {editId ? "✏️ Update Product" : "➕ Add Product"}
            </button>
            {editId && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm(emptyForm);
                  setImagePreview("");
                }}
              >
                ✖ Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product list */}
      <h4 className="text-secondary mb-3">Product List</h4>
      <div className="product-list">
        {filteredProducts.map((p) => {
          const price = toNumber(p.price);
          const off = toNumber(p.offerPercent);
          const discounted = Math.round(price - (price * off) / 100);

          return (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p>Stock: {toNumber(p.stock)} {p.unit || "pcs"}</p>
                {off > 0 ? (
                  <p className="text-danger mb-1">
                    ₹{discounted} <del className="text-muted">₹{price}</del>
                  </p>
                ) : (
                  <p>₹{price}</p>
                )}
                <p className="text-muted">{p.category}</p>
                {off > 0 && (
                  <span className="badge bg-warning">{off}% OFF</span>
                )}
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(p)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>
                  ❌ Delete
                </button>
              </div>
            </div>
          );
        })}
        {filteredProducts.length === 0 && (
          <div className="text-muted">No products found.</div>
        )}
      </div>

      {/* Orders */}
      <h4 className="text-secondary mt-5 mb-3">Order Management</h4>
      {orders.map((order) => (
        <div key={order._id} className="border p-3 mb-3 rounded shadow-sm">
          <p><strong>{order.name}</strong> - {order.phone}</p>
          <p>₹{toNumber(order.total)} | Status: <strong>{order.status}</strong></p>
          <select
            value={order.status}
            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
            className="form-select mb-2"
          >
            {["Pending", "Picked", "Shipped", "Delivered", "Cancelled"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
      {orders.length === 0 && <div className="text-muted">No orders yet.</div>}
    </div>
  );
}
