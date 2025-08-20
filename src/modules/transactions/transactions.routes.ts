import { Router } from "express";
import { createTransactionRepository } from "./transaction.repository.factory";
import { Transaction } from "./transaction.entitie";

export const transactionsRouter = Router();
const repo = createTransactionRepository();

transactionsRouter.get("/", async (_req, res) => {
  try {
    const transactions = await repo.findAll();
    res.status(200).json(transactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

transactionsRouter.get("/:id", async (req, res) => {
  try {
    const transaction = await repo.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

transactionsRouter.post("/", async (req, res) => {
  try {
    const { amount, description, date, type, category } = req.body;

    const transaction = new Transaction(
      "",
      amount,
      description,
      date,
      type,
      category
    );

    const created = await repo.save(transaction);
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});
