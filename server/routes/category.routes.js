import { Router } from "express";
import { listCategories, listCategoriesFromProducts } from "../controllers/category.controller.js";
const r = Router();
r.get("/", listCategories);                 // /api/categories
r.get("/from-products", listCategoriesFromProducts);  // /api/categories/from-products
export default r;
