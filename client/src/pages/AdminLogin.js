import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username, password
      });
      localStorage.setItem("adminToken", res.data.token);
      alert("Login success");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default AdminLogin;
