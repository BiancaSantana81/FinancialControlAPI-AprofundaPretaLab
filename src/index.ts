import express from "express";
import { handleConversation } from "./shared/services/prompt";
import { productsRouter } from "./modules/products/product.routes";
import { checkoutRouter } from "./modules/purchase/checkout.routes";
import { purchaseRouter } from "./modules/purchase/purchase.routes";
import { transactionsRouter } from "./modules/transactions/transactions.routes";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "API is running" });
});

// Rotas agrupadas por módulo
app.use("/products", productsRouter);
app.use("/checkout", checkoutRouter);
app.use("/purchases", purchaseRouter);
app.use("/transactions", transactionsRouter);

// Rota AI
app.post("/ai", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleConversation(prompt);
  res.json(result);
});

export default app;
