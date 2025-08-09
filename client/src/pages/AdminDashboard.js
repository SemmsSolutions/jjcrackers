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


// ✅ Full Admin Dashboard Script with Product & Order Status Management + Email Sending

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    offerPercent: 0,
    stock: 0,
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/orders");
    setOrders(res.data);
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/products", form);
      }
      setForm({ title: "", price: "", category: "", image: "", offerPercent: 0, stock: 0 });
      setImagePreview("");
      fetchProducts();
    } catch (err) {
      alert("❌ Something went wrong!");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
    setImagePreview(product.image);
    window.scrollTo(0, 0);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
      alert("✅ Status updated and email sent");
    } catch (err) {
      alert("❌ Failed to update status");
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">🛠 Admin Dashboard</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row mb-4">
        <div className="col-md-6">
          <div onClick={handleImageClick} className="image-upload-box">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            ) : (
              <p className="text-muted">📷 Click to select image</p>
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
          <button className="btn btn-success w-100" onClick={handleAddOrUpdate}>
            {editId ? "✏️ Update Product" : "➕ Add Product"}
          </button>
        </div>
      </div>

      <h4 className="text-secondary mb-3">Product List</h4>
      <div className="product-list">
        {filteredProducts.map((p) => {
          const discounted = Math.round(p.price - (p.price * (p.offerPercent || 0)) / 100);
          return (
            <div className="product-card" key={p._id}>
              <img src={p.image} alt={p.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p>Stock: {p.stock}</p>
                {p.offerPercent > 0 ? (
                  <p className="text-danger mb-1">
                    ₹{discounted} <del className="text-muted">₹{p.price}</del>
                  </p>
                ) : (
                  <p>₹{p.price}</p>
                )}
                <p className="text-muted">{p.category}</p>
                {p.offerPercent > 0 && (
                  <span className="badge bg-warning">{p.offerPercent}% OFF</span>
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
      </div>

      <h4 className="text-secondary mt-5 mb-3">Order Management</h4>
      {orders.map((order) => (
        <div key={order._id} className="border p-3 mb-3 rounded shadow-sm">
          <p><strong>{order.name}</strong> - {order.phone}</p>
          <p>₹{order.total} | Status: <strong>{order.status}</strong></p>
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
    </div>
  );
};

export default AdminDashboard;
