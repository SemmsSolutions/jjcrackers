// node scripts/set-default-unit.js
const mongoose = require("mongoose");
const Product = require("../models/Product");
(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await Product.updateMany(
    { unit: { $exists: false } },
    { $set: { unit: "pcs" } }
  );
  console.log("Default unit set to 'pcs' for old products");
  process.exit(0);
})();
