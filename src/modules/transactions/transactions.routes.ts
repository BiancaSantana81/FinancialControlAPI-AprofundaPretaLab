import { Router } from "express";
import { createTransaction, getAllTransactions, getTransactionById } from "./transaction";

export const transactionsRouter = Router();

transactionsRouter.get("/", async (_req, res) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

transactionsRouter.get("/:id", async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    res.status(200).json(transaction);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

transactionsRouter.post("/", async (req, res) => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
