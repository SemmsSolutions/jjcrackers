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

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// helper to escape regex
const escapeRx = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/products?category=&q=&page=&limit=&sort=createdAt:desc
router.get("/", async (req, res) => {
  try {
    const { category = "", q = "", page = 1, limit = 64, sort = "createdAt:desc" } = req.query;

    const filter = {};
    // category filter — accept exact name (case-insensitive) and a slug-like value
    if (category) {
      const nameRx = new RegExp(`^${escapeRx(category)}$`, "i"); // "Ground" == "ground"
      const fromSlug = String(category).toLowerCase().replace(/-/g, " "); // "ground-chakkar" -> "ground chakkar"
      const slugRx = new RegExp(`^${escapeRx(fromSlug)}$`, "i");

      filter.$or = [{ category: { $regex: nameRx } }, { category: { $regex: slugRx } }];
    }

    // textual query
    if (q) {
      const rx = new RegExp(String(q).trim(), "i");
      filter.$or = filter.$or
        ? [...filter.$or, { title: { $regex: rx } }, { category: { $regex: rx } }]
        : [{ title: { $regex: rx } }, { category: { $regex: rx } }];
    }

    // sorting
    let sortObj = { createdAt: -1 };
    if (sort) {
      const [k, dir] = String(sort).split(":");
      if (k) sortObj = { [k]: dir === "asc" ? 1 : -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Distinct categories for Navbar: GET /api/products/categories
router.get("/categories", async (req, res) => {
  try {
    const cats = await Product.distinct("category", { category: { $ne: "" } });
    const shaped = cats.map((c) => ({
      name: c,
      slug: String(c).toLowerCase().replace(/\s+/g, "-"),
    }));
    res.json(shaped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lightweight search for navbar suggestions: GET /api/products/search?q=
router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);
    const rx = new RegExp(q, "i");
    const items = await Product.find({ $or: [{ title: rx }, { category: rx }] })
      .select("_id title")
      .limit(20);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single product
router.get("/:id", async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { title, price, category, image, offerPercent, stock } = req.body;
    const product = await Product.create({
      title,
      price,
      category,
      image,
      offerPercent: offerPercent || 0,
      stock: stock ?? 0,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { title, price, category, image, offerPercent, stock } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { title, price, category, image, offerPercent: offerPercent || 0, stock },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

// ✅ productRoutes.js
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

// // 🔍 Search products
// router.get("/search", async (req, res) => {
//   try {
//     const q = req.query.q?.trim();
//     if (!q) return res.json([]); // return empty array if search is empty

//     const regex = new RegExp(q, "i"); // case-insensitive partial match
//     const products = await Product.find({
//       $or: [
//         { title: { $regex: regex } },
//         { category: { $regex: regex } }
//       ]
//     }).limit(20);

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
