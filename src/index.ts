import express from "express";
import { Transaction, transactions } from "./data";

const app = express();

export async function getTransitionById(id: string): Promise<Transaction> {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) throw new Error("Transaction not found");
  return transaction;
}

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await getTransitionById(id);
    res.json(transaction);
  } catch (error:any) {
    res.status(404).json({ message: error.message || `Transaction with ${id} not found.`});
  }
});

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});

export default app;
