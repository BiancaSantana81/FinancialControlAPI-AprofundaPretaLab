import { Router } from "express";
import { getAllProducts, getProductById } from "./product";
import { getProducts } from "../../shared/services/products";

export const productsRouter = Router();

productsRouter.get("/", async (_req, res) => {
  const products = await getProducts();
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

