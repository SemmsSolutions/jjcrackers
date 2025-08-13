import Product from "../models/Product.js";

// GET /api/products?category=&q=&page=&limit=
export const getProducts = async (req, res, next) => {
  try {
    const { category, q, page = 1, limit = 64 } = req.query;
    const filter = {};
    if (category) filter.category = category; // use slug or name consistently
    if (q) filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { code: { $regex: q, $options: "i" } }
    ];

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total/Number(limit)) });
  } catch (e) { next(e); }
};

// GET /api/products/search?q= (lightweight for navbar suggestions)
export const searchSuggestions = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);
    const items = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { code: { $regex: q, $options: "i" } }
      ]
    }).select("title _id").limit(10);
    res.json(items);
  } catch (e) { next(e); }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (e) { next(e); }
};
