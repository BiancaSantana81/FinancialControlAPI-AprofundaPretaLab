import express from "express";
import { handleConversation } from "./shared/services/prompt";
import { createTransaction, getAllTransactions, getTransactionById } from "./modules/transactions/transaction";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "API is running" });
});


// transaction post
app.post("/transactions", async (req, res) => {
  try {
    const created = await createTransaction(req.body);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/ai", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleConversation(prompt);
  res.json(result);
});

app.get("/transactions", async (_req, res) => {
  const all = await getAllTransactions();
  res.json(all);
});

app.get("/transactions/:id", async (req, res) => {
  try {
    const transaction = await getTransactionById(req.params.id);
    res.json(transaction);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default app;
