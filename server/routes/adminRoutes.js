const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// 🔐 Simple admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ msg: "Invalid username" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ msg: "Invalid password" });

    res.json({ msg: "Login successful" }); // No token, just success
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
