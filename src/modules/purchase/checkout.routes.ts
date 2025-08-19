import { Router } from "express";
import { createPurchase } from "./purchase";

export const checkoutRouter = Router();

checkoutRouter.post("/", async (req, res) => {
  try {
    const purchase = await createPurchase(req.body);
    res.status(200).json({message: "Compra processada com sucesso!"});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
