import express from "express";
import { Transaction, transactions } from "./data";

const app = express();
app.use(express.json());

export async function getTransitionById(id: string): Promise<Transaction> {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) throw new Error("Transaction not found");
  return transaction;
}

export async function createTransaction(transaction: Transaction): Promise<Transaction> {
  const exists = transactions.find((t) => t.id === transaction.id);
  if (exists) throw new Error("Transaction with this ID already exists");
  transactions.push(transaction);
  return transaction;
}

app.post("/transactions", async (req, res) => {
  const transaction: Transaction = req.body;

  try {
    const created = await createTransaction(transaction);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to create transaction" });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await getTransitionById(id);
    res.json(transaction);
  } catch (error: any) {
    res.status(404).json({ message: error.message || `Transaction with ${id} not found.` });
  }
});

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});

export default app;
