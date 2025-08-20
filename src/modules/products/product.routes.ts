import { Router } from "express";
import { getAllProducts, getProductById } from "./product";

export const productsRouter = Router();

// GET /api/products
productsRouter.get("/", async (_req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

// GET /api/products/:id
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

