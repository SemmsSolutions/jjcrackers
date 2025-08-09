const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("your_mongo_url_here").then(async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  const admin = new Admin({ username: "admin@gmail.com", password: hashed });
  await admin.save();
  console.log("✅ Admin created");
  process.exit();
});
