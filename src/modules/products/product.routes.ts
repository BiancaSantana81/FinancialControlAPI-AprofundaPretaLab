import { Router } from "express";
import { getProducts } from "../../shared/services/products";

export const productsRouter = Router();

productsRouter.get("/", async (_req, res) => {
  const products = await getProducts();
  res.json(products);
});

