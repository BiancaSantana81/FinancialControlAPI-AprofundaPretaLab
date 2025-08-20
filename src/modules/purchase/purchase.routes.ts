import { Router } from "express";
import { getAllPurchases, getPurchaseById } from "./purchase";

export const purchaseRouter = Router();

purchaseRouter.get("/", async (_req, res) => {
  const purchases = await getAllPurchases();
  res.status(200).json(purchases);
});

purchaseRouter.get("/:id", async (req, res) => {
  try {
    const purchase = await getPurchaseById(req.params.id);
    res.status(200).json(purchase);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});