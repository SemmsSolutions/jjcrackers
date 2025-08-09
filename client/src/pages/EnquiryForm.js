
import React, { useState } from "react";
import axios from "axios";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    designation: "",
    email: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/enquiries", formData);
      alert("Enquiry submitted successfully!");
    } catch (err) {
      alert("Failed to submit enquiry");
    }
  };

  return (
    <div className="enquiry-container">
      <h4>Contact With Us</h4>
      <h2>Corporate / Bulk Enquiries</h2>
      <form onSubmit={handleSubmit} className="enquiry-form">
        <div className="row">
          <input type="text" name="name" placeholder="Your name *" onChange={handleChange} required />
          <input type="text" name="designation" placeholder="Designation *" onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="text" name="phone" placeholder="Phone Number *" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email ID *" onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="text" name="company" placeholder="Company" onChange={handleChange} />
          <input type="text" name="location" placeholder="Location *" onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EnquiryForm;
