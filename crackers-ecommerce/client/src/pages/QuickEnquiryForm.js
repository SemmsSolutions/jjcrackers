// src/pages/QuickEnquiryForm.jsx
import React, { useState } from "react";
import axios from "axios";

const QuickEnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/enquiry", formData);
      alert("✅ Enquiry submitted successfully!");
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (error) {
      alert("❌ Failed to submit enquiry. Please try again.");
    }
  };

  return (
    <div className="enquiry-container" style={{ padding: "40px", textAlign: "center" }}>
      <h2>Corporate / Bulk Enquiry Form</h2>
      <p>Let us know your requirements and we’ll contact you shortly.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Phone"
          value={formData.mobile}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
        />
        <textarea
          name="message"
          placeholder="Your Requirements"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuickEnquiryForm;
