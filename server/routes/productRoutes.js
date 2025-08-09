// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// // 🟢 Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ➕ Add new product
// router.post("/", async (req, res) => {
//   try {
//     const { title, price, category, image, offerPercent } = req.body;

//     const newProduct = new Product({
//       title,
//       price,
//       category,
//       image,
//       offerPercent: offerPercent || 0,
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 📝 Update product by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { title, price, category, image, offerPercent } = req.body;

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         price,
//         category,
//         image,
//         offerPercent: offerPercent || 0,
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // 🗑️ Delete product by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.json({ msg: "Product deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;

// ✅ productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 🟢 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ Add new product
router.post("/", async (req, res) => {
  try {
    const { title, price, category, image, offerPercent } = req.body;

    const newProduct = new Product({
      title,
      price,
      category,
      image,
      offerPercent: offerPercent || 0,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📝 Update product by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, price, category, image, offerPercent } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        price,
        category,
        image,
        offerPercent: offerPercent || 0,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🗑️ Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 Search products
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;
    const regex = new RegExp(q, "i");
    const products = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { category: { $regex: regex } }
      ]
    }).limit(20);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;